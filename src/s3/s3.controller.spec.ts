/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Test, TestingModule } from '@nestjs/testing';
import { S3 } from 'aws-sdk';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';

describe('S3Controller', () => {
  let controller: S3Controller;
  let service: S3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [S3Controller],
      providers: [S3Service],
    }).compile();

    controller = module.get<S3Controller>(S3Controller);
    service = module.get<S3Service>(S3Service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a success data from AWS', async () => {
    // @ts-ignore
    const file: File = {
      name: 'my_file',
    };
    const bucket = 'my_bucket';

    // @ts-ignore
    const result: S3.ManagedUpload.SendData = {
      Bucket: bucket,
    };

    jest
      .spyOn(service, 'upload')
      .mockImplementation(() => Promise.resolve(result));

    const resultExpected = await service.upload(file, bucket);

    expect(resultExpected).toBe(result);
  });
});
