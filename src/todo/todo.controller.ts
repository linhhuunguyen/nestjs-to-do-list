import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { Express } from 'express';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { QueryParamDto } from './dto/query-todo-param.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('todo')
@ApiTags('Todo')
@ApiSecurity('JWT-auth')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  // @ApiConsumes('multipart/form-data')
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.todoService.uploadFile(file);
  }

  @Post('/add/:userId')
  create(
    @Body() createTodoDto: CreateTodoDto,
    @Param('userId') userId: number,
  ) {
    return this.todoService.create(createTodoDto, userId);
  }

  @Get('/findAllNotCompleted/:userId')
  findAllTodoByUserNotCompleted(
    @Param('userId') userId: number,
    @Query() queryParamDto: QueryParamDto,
  ) {
    return this.todoService.findAllTodoByUserNotCompleted(
      Number(userId),
      queryParamDto,
    );
  }

  @Get('/findAllCompleted/:userId')
  findAllTodoByUserCompleted(@Param('userId') userId: number) {
    return this.todoService.findAllTodoByUserCompleted(Number(userId));
  }

  @Delete('/delete/:todoId')
  removeTodo(@Param('todoId') todoId: number) {
    return this.todoService.remove(todoId);
  }
}
