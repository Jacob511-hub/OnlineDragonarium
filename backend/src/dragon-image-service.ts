import path from 'path';
import { promises as fsPromises } from 'fs';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

export const getDragonImages = async (imageService: DragonImageService, imageFileName: string) => {
    try {
        const imagePath = path.join(imageService.getBasePath?.() || '', imageFileName);

        try {
            await fsPromises.access(imagePath);
            return { found: true, filePath: imagePath };
        } catch {
            // File not found
        }

        return { found: false, error: { status: 404, json: { message: "Image not found" } } };
    } catch (error) {
        console.error('Error serving image:', error);
        return { found: false, error: { status: 500, json: { message: 'Server error' } } };
    }
};

export interface DragonImageService {
    getImageStream(filename: string): NodeJS.ReadableStream;
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

export const getDragonImageService = (): DragonImageService => {
    const imageDirectory = process.env.IMAGE_BASE_PATH || path.join(__dirname, './images');
    return new DiskDragonImageService(imageDirectory);
};