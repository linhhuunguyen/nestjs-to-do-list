import {
  BaseEntity,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { IPaginateParams } from './interfaces/app.interface';

export class TypeOrmRepository<T extends BaseEntity> {
  public repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  save(data: any): Promise<T> {
    return this.repository.save(data);
  }

  async findAllByConditions(
    conditions: any,
    paginateParams: IPaginateParams,
    join?: any,
  ) {
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

    if (join) {
      paramFinds.relations = join;
    }
    if (paginateParams.sortBy) {
      paramFinds.order = {
        [paginateParams.sortBy]:
          paginateParams.sortOrder == 'desc' ? 'DESC' : 'ASC',
      };
    }

    const [result, total] = await this.repository.findAndCount(paramFinds);

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

  async findOneByCondition(conditions: FindOneOptions): Promise<T> {
    console.log(conditions);

    return this.repository.findOneOrFail(conditions);
  }

  delete(item: any) {
    return this.repository.delete(item);
  }
}
