import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @HttpCode(HttpStatus.OK)
  @Put('modify/:id')
  async modifyOrder(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return {
      status: HttpStatus.OK,
      message: 'Order updated successfully',
      data: this.orderService.updateOrder(id, updateOrderDto),
    };
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Delete('delete/:id')
  async deleteOrder(@Param('id') id: number) {
    return {
      status: HttpStatus.OK,
      message: 'Order deleted successfully',
      data: this.orderService.deleteOrder(id),
    };
  }
}
