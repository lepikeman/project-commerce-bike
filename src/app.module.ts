import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { pgConfig } from './pgConfig';
import { StripeService } from './stripe/stripe.service';
import { StripeController } from './stripe/stripe.controller';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(pgConfig),
    ProductModule,
    UsersModule,
    AuthModule,
    OrderModule,
  ],
  providers: [StripeService],
  controllers: [StripeController],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
