import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { config } from 'dotenv';
import { Product } from './product/product.entity';
import { DataSource } from "typeorm";
import { UsersModule } from './user/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { User } from "./user/user.entity";
import { UsersController } from './user/users.controller';
import { OrderService } from './order/order.service';
import { Order } from "./order/order.entity";

import { OrderModule } from './order/order.module';
import { ProductController } from "./product/product.controller";
import { ConfigModule } from "@nestjs/config";
import { ProductService } from "./product/product.service";
import { UsersService } from "./user/users.service";
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
      entities: [Product, User, Order],
      synchronize: false,
    }),
    ProductModule,
    UsersModule,
    AuthModule,
    OrderModule,
  ],
  // controllers: [UsersController, OrderController, ProductController],
  // providers: [AuthService, ProductService, OrderService, UsersService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
  }
}
