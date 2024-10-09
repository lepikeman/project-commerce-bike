import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { config} from "dotenv";
import { Product } from './product/product.entity';
import { DataSource } from "typeorm";
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from "./user/user.entity";
import { Order } from "./order/order.entity";
import { OrderModule } from './order/order.module';
config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Product, User, Order],
      synchronize: false,
    }),
    ProductModule,
    UsersModule,
    AuthModule,
    OrderModule,
  ],

})
export class AppModule {
  constructor(private dataSource: DataSource) {
  }
}
