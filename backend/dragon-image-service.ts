import path from 'path';
import { promises as fsPromises } from 'fs';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

interface DragonImageService {
    getImageStream(filename: string): NodeJS.ReadableStream;
    saveImage(filename: string, data: NodeJS.ReadableStream): Promise<void>;
}

class DiskDragonImageService implements DragonImageService {
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

export default DiskDragonImageService;