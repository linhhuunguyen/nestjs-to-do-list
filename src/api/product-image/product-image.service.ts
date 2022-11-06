import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { CreateProductImageDto } from './dto/create-product_image.dto';
import { ProductImage } from './entities/product-image.entity';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
    private productService: ProductsService,
  ) {}

  async createProductImage(
    createProductImage: CreateProductImageDto,
    productId: number,
  ) {
    const productImage: ProductImage = new ProductImage();
    productImage.image = createProductImage.image;
    productImage.created_at = new Date().toLocaleString();
    productImage.updated_at = new Date().toLocaleString();
    productImage.product = await this.productService.productDetail(productId);
    return this.productImageRepository.save(productImage);
  }
}
