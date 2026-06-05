import { ConfigService } from '@nestjs/config';
export declare class S3Service {
    private readonly configService;
    private readonly s3Client;
    private readonly bucketName;
    private readonly region;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File): Promise<string>;
}
