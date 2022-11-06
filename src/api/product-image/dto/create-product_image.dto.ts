import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate } from 'class-validator';

export class CreateProductImageDto {
  @ApiProperty()
  @IsString()
  image: string;

  // @ApiProperty()
  // @IsDate()
  // created_at: Date;

  // @ApiProperty()
  // @IsDate()
  // updated_at: Date;
}
