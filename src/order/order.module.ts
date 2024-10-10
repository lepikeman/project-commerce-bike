import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from '../entity/order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), OrderModule],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
