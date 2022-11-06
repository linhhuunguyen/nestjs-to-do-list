import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  sale_price: number;

  @ApiProperty()
  @IsString()
  brand: string;

  @ApiProperty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  ratings: string;

  @ApiProperty()
  @IsDate()
  create_at: string;
}
