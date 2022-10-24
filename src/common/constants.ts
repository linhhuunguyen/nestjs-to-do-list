import { BadRequestException } from '@nestjs/common';

export const checkIsExcelFile = (file: Express.Multer.File) => {
  const isExcelFile = file.originalname?.match(/\.xlsx$|\.csv$|\.xls$/i);
  if (!isExcelFile) throw new BadRequestException('Please upload excel file');
};
