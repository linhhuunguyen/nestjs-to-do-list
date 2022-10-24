import { Injectable, UploadedFile } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  uploadFile(file: Express.Multer.File): any {
    console.log(file);
    return file.buffer.toString();
  }
}
