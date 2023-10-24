import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';
import * as sharp from 'sharp';
import { MinioUploadRequest } from './interfaces';
import { randomUUID } from 'crypto';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class MinioService {
  readonly #_client: Client;
  constructor(config: ConfigService) {
    this.#_client = new Client({
      endPoint: config.getOrThrow<string>('minio.endPoint'),
      accessKey: config.getOrThrow<string>('minio.accessKey'),
      secretKey: config.getOrThrow<string>('minio.secretKey'),
      useSSL: false,
      port: config.getOrThrow<number>('minio.port'),
    });
  }

  async upload(payload: MinioUploadRequest) {
    try {
      const file = Buffer.from(payload.file.split(';base64,')[1], 'base64');
      const { format } = await sharp(file).metadata();
      const objectName = randomUUID();
      await this.#_client.putObject(
        payload.bucket,
        `/${objectName}.${format}`,
        file,
      );
      return `${payload.bucket}/${objectName}.${format}`;
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
