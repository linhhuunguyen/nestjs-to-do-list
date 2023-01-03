import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(createCategory: CreateCategoryDto) {
    const category: Category = new Category();
    category.name = createCategory.name;
    category.slug = createCategory.slug;
    category.description = createCategory.description;
    category.created_at = new Date().toLocaleString();
    category.updated_at = new Date().toDateString();

    if (createCategory.parent) {
      const existingParent: Category | null = await Category.findOneBy({
        id: Number(createCategory.parent),
      });
      if (!existingParent) {
        return new BadRequestException('Category does not exist');
      }

      category.parentCategory = existingParent;
    }

    return this.categoryRepository.save(category);
  }

  listCategory() {
    return this.categoryRepository.find({
      relations: { childCategory: true, parentCategory: true },
    });
  }
}
