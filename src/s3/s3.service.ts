import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { s3Client } from './s3-client';

@Injectable()
export class S3Service {
  async upload(file: File, bucket: string): Promise<S3.ManagedUpload.SendData> {
    const { name } = file;

    return new Promise((resolve, reject) => {
      s3Client.upload(
        {
          Bucket: bucket,
          Key: String(name),
          Body: file.arrayBuffer,
        },
        (err: Error, data: S3.ManagedUpload.SendData) => {
          if (err) {
            reject(err.message);
          }
          resolve(data);
        },
      );
    });
  }
}
