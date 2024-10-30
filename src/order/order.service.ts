import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entity/order.entity';
import { Repository } from 'typeorm';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async findOrderWithDetails(userId: number) {
    console.log(userId);
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

  async updateOrder(orderId: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
    });
    if (!order) {
      throw new HttpException('order not found', HttpStatus.NOT_FOUND);
    }
    order.delivered = updateOrderDto.delivered;
    return this.orderRepository.save(order);
  }

  async deleteOrder(orderId: number) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order) {
      throw new HttpException('order not found', HttpStatus.NOT_FOUND);
    }
    console.log('Order deleted successfully', order);
    const result = await this.orderRepository.softDelete(orderId);
    if (result.affected === 0) {
      throw new Error(`Error deleting the order ${orderId}`);
    }
  }
}
