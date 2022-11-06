import { Product } from 'src/api/products/entities/product.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProductImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
