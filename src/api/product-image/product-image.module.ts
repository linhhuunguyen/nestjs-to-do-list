import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';
import { ProductImage } from './entities/product-image.entity';
import { ProductImageController } from './product-image.controller';
import { ProductImageService } from './product-image.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage]), ProductsModule],
  providers: [ProductImageService],
  exports: [ProductImageService],
  controllers: [ProductImageController],
})
export class ProductImageModule {}
