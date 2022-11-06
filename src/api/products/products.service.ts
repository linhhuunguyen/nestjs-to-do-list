import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  createProduct(createProduct: CreateProductDto) {
    const product: Product = new Product();
    product.name = createProduct.name;
    product.description = createProduct.description;
    product.quantity = createProduct.quantity;
    product.price = createProduct.price;
    product.sale_price = createProduct.sale_price;
    product.brand = createProduct.brand;
    product.sku = createProduct.sku;
    product.status = createProduct.status;
    product.ratings = createProduct.ratings;
    product.create_at = new Date().toLocaleString();
    return this.productRepository.save(product);
  }

  productDetail(productId: number) {
    return this.productRepository.findOne({
      where: { id: productId },
      relations: {
        images: true,
      },
    });
  }

  listProduct() {
    return this.productRepository.find({ relations: { images: true } });
  }
}
