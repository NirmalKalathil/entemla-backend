import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly region: string;

  constructor(
    private readonly configService: ConfigService,
  ) {
    const region =
      this.configService.get<string>('AWS_REGION');

    const bucketName =
      this.configService.get<string>('AWS_BUCKET_NAME');

    const accessKeyId =
      this.configService.get<string>(
        'AWS_ACCESS_KEY_ID',
      );

    const secretAccessKey =
      this.configService.get<string>(
        'AWS_SECRET_ACCESS_KEY',
      );

    if (
      !region ||
      !bucketName ||
      !accessKeyId ||
      !secretAccessKey
    ) {
      throw new Error(
        'AWS configuration is missing in .env',
      );
    }

    this.region = region;
    this.bucketName = bucketName;

    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<string> {
    const fileName = `${uuidv4()}-${file.originalname}`;

    const key = `complaints/${fileName}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
  }
}