import { S3 } from 'aws-sdk';

export const s3Client = new S3({
  accessKeyId: 'access_key',
  secretAccessKey: 'secret_access_key',
});
