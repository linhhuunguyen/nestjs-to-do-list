import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './api/user/user.module';
import { TodoModule } from './api/todo/todo.module';
import { AuthModule } from './api/auth/auth.module';
import { ProductImageModule } from './api/product-image/product-image.module';
import { ProductsModule } from './api/products/products.module';
import { CategoryModule } from './api/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        synchronize: configService.get<boolean>('DATABASE_SYNC'),
        logging: configService.get<boolean>('DATABASE_LOGGING'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),
    UserModule,
    TodoModule,
    AuthModule,
    ProductImageModule,
    ProductsModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
