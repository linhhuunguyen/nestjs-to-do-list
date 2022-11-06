import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller()
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/add-new-product')
  createProduct(@Body() createProduct: CreateProductDto) {
    return this.productsService.createProduct(createProduct);
  }

  @Get('/product/:productId')
  productDetail(@Param('productId') productId: number) {
    return this.productsService.productDetail(productId);
  }

  @Get('/list-product')
  listProduct() {
    return this.productsService.listProduct();
  }
}
