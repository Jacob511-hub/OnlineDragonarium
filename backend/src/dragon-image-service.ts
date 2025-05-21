import path from 'path';
import { promises as fsPromises } from 'fs';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { S3Client, GetObjectCommand, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

const pipelineAsync = promisify(pipeline);

export const getDragonImages = async (imageService: DragonImageService, imageFileName: string) => {
    try {
      if ('exists' in imageService && typeof imageService.exists === 'function') {
        const exists = await (imageService as any).exists(imageFileName);
        if (!exists) {
          return { found: false, error: { status: 404, json: { message: 'Image not found' } } };
        }
        return { found: true, fileStream: await imageService.getImageStream(imageFileName) };
      } else {
        const imagePath = path.join(imageService.getBasePath?.() || '', imageFileName);
        try {
          await fsPromises.access(imagePath);
          return { found: true, filePath: imagePath };
        } catch {}
        return { found: false, error: { status: 404, json: { message: 'Image not found' } } };
      }
    } catch (error) {
      console.error('Error serving image:', error);
      return { found: false, error: { status: 500, json: { message: 'Server error' } } };
    }
};

export interface DragonImageService {
    getImageStream(filename: string): NodeJS.ReadableStream | Promise<NodeJS.ReadableStream>;
    saveImage(filename: string, data: NodeJS.ReadableStream): Promise<void>;
    getBasePath?(): string;
}

export class DiskDragonImageService implements DragonImageService {
    private basePath: string;

    constructor(basePath: string) {
        this.basePath = basePath;
    }

    getBasePath(): string {
        return this.basePath;
    }

    getImageStream(filename: string): NodeJS.ReadableStream {
        const filePath = path.join(this.basePath, filename);
        return createReadStream(filePath);
    };

    async saveImage(filename: string, data: NodeJS.ReadableStream): Promise<void> {
        const filePath = path.join(this.basePath, filename);
        await fsPromises.mkdir(path.dirname(filePath), { recursive: true });
        const writeStream = createWriteStream(filePath);
        await pipelineAsync(data, writeStream);
    };
};

export class S3DragonImageService implements DragonImageService {
    private bucketName: string;
    private s3: S3Client;
  
    constructor(bucketName: string, region: string) {
      this.bucketName = bucketName;
      this.s3 = new S3Client({ region });
    }
  
    async getImageStream(filename: string): Promise<NodeJS.ReadableStream> {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: filename,
      });
  
      const response = await this.s3.send(command);
      const body = response.Body;
  
      if (!body || !(body instanceof Readable)) {
        throw new Error('Unexpected response stream type from S3');
      }
  
      return body;
    }
  
    async saveImage(filename: string, data: NodeJS.ReadableStream): Promise<void> {
      const chunks: Buffer[] = [];
  
      for await (const chunk of data) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
      }
  
      const buffer = Buffer.concat(chunks);
  
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: filename,
        Body: buffer,
      });
  
      await this.s3.send(command);
    }
  
    async exists(filename: string): Promise<boolean> {
      try {
        const command = new HeadObjectCommand({
          Bucket: this.bucketName,
          Key: filename,
        });
        await this.s3.send(command);
        return true;
      } catch (err: any) {
        if (err.name === 'NotFound' || err.$metadata?.httpStatusCode === 404) {
          return false;
        }
        throw err;
      }
    }
};

export const getDragonImageService = (): DragonImageService => {
    if (process.env.USE_S3 === 'true') {
      return new S3DragonImageService(process.env.S3_BUCKET_NAME!, process.env.AWS_REGION!);
    }
  
    const imageDirectory = process.env.IMAGE_BASE_PATH || path.join(__dirname, './images');
    return new DiskDragonImageService(imageDirectory);
};