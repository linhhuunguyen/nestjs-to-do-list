import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import * as argon2d from 'argon2';

import { Constants } from 'src/utils/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ERROR } from 'src/common/error-code.const';
import { IPaginateParams } from 'src/common/interfaces/app.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email, firstName, lastName, password } = createUserDto;
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException(ERROR.EMAIL_ALREADY.MESSAGE);
    }
    const user: User = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = await argon2d.hash(password);
    user.role = Constants.ROLES.ADMIN_ROLE;
    return this.userRepository.save(user);
  }
  async findAll(paginateParams: IPaginateParams) {
    const conditions: any = {};
    if (paginateParams.search) {
      conditions.firstName = Like(`%${paginateParams.search}%`);
    }

    if (paginateParams.status) {
      conditions.status = Number(paginateParams.status);
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
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: conditions,
    };

    if (paginateParams.sortBy) {
      paramFinds.order = {
        firstName: paginateParams.sortBy === 'desc' ? 'DESC' : 'ASC',
      };
    }
    const [result, total] = await this.userRepository.findAndCount(paramFinds);

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
  findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }
  findOneUser(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }
  findOneByEmail(email: string) {
    const a = this.userRepository.findOne({
      where: { email: email },
    });
    console.log(a);
    return a;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
