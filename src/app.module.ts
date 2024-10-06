import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { config } from 'dotenv';
import { Product } from './product/product.entity';
import { DataSource } from "typeorm";
import { UsersService } from './user/users.service';
import { UsersModule } from './user/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { Users } from "./user/users.entity";
config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '140815',
      database: 'db_ecommerce_bike',
      entities: [Product, Users],
      synchronize: false,
    }),
    ProductModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
  }
}
