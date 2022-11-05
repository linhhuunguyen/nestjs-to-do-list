import * as xlsx from 'node-xlsx';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';

import { IPaginateParams } from 'src/common/interfaces/app.interface';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    private userService: UserService,
  ) {}
  async create(createTodoDto: CreateTodoDto, userId: number) {
    const todo: Todo = new Todo();
    todo.title = createTodoDto.title;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.user = await this.userService.findOneUser(userId);
    return this.todoRepository.save(todo);
  }
  async findAllTodoByUserNotCompleted(
    userId: number,
    paginateParams: IPaginateParams,
  ) {
    const conditions: any = {};

    conditions.user = { id: userId };

    if (paginateParams.search) {
      conditions.title = Like(`%${paginateParams.search}%`);
    }

    if (paginateParams.completed) {
      conditions.completed = paginateParams.completed;
    }

    const page =
      paginateParams.page && paginateParams.page > 0
        ? Number(paginateParams.page)
        : 1;
    const pageSize =
      paginateParams.pageSize && paginateParams.pageSize > 0
        ? Number(paginateParams.pageSize)
        : 20;

    const paramFinds: FindManyOptions = {
      relations: ['user'],
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: conditions,
    };

    if (paginateParams.sortBy) {
      paramFinds.order = {
        title: paginateParams.sortBy === 'desc' ? 'DESC' : 'ASC',
      };
    }

    const [result, total] = await this.todoRepository.findAndCount(paramFinds);

    const totalPage =
      total % pageSize === 0
        ? total / pageSize
        : Math.floor(total / pageSize) + 1;

    return {
      data: result,
      total: total,
      page: page,
      pageSize: pageSize,
      totalPage: totalPage,
    };
  }

  findAllTodoByUserCompleted(userId: number) {
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: true },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<any> {
    const isExcelFile = file.originalname?.match(/\.xlsx$|\.csv$|\.xls$/i);
    if (!isExcelFile) throw new BadRequestException('Please upload excel file');
    const data = xlsx.parse(file.buffer);
    const checkExcelFileForm = data[0].data[0][0] === 'Todo';
    if (!checkExcelFileForm)
      throw new BadRequestException(
        'wrong form. Please upload the correct form',
      );
    const listTodo = data[0].data.slice(1);
    for (const item of listTodo) {
      const todo: Todo = new Todo();
      todo.title = item[0];
      todo.date = new Date().toLocaleString();
      todo.completed = false;
      todo.user = await this.userService.findOneUser(1);
      await this.todoRepository.save(todo);
    }
    return 'upload success';
  }

  remove(id: number) {
    return this.todoRepository.delete(id);
  }
}
