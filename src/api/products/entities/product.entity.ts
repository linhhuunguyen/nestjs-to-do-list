import { ProductImage } from 'src/api/product-image/entities/product-image.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  sale_price: number;

  @Column()
  brand: string;

  @Column()
  sku: string;

  @Column()
  status: string;

  @Column()
  ratings: string;

  @Column()
  create_at: string;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  images: ProductImage[];
}
