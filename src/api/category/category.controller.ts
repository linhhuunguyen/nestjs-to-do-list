import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller()
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/add-category')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get('/list-category')
  listCategory() {
    return this.categoryService.listCategory();
  }
}
