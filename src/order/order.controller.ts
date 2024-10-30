import { Controller, Put, Req } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Put('modify')
  async modifyOrder(@Req() req) {}
}
