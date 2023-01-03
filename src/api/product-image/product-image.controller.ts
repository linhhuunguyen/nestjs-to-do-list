import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductImageDto } from './dto/create-product_image.dto';
import { ProductImageService } from './product-image.service';

@Controller()
@ApiTags('upload image')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @Post('/upload-product-image/:productId')
  createProductImage(
    @Body() createProductImageDto: CreateProductImageDto,
    @Param('productId') productId: number,
  ) {
    return this.productImageService.createProductImage(
      createProductImageDto,
      productId,
    );
  }
}
