import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity('category')
@Tree('materialized-path')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @TreeChildren()
  childCategory?: Category[];

  @TreeParent()
  parentCategory?: Category;
}
