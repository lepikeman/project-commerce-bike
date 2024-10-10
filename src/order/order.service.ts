import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entity/order.entity';
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async findOrderWithDetails(userId: number): Promise<any> {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.product', 'product')
      .select([
        'order.id AS order_id',
        'user.username AS username',
        'product.product_name AS product_name',
        'product.description AS description',
        'product.factoryNew AS factorynew',
        'order.order_date',
      ])
      .where('order.user_id = :userId', { userId })
      .getRawMany();
  }
}
