import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto-users/create-user.dto';
import { UsersService } from './users.service';
import { OrderService } from '../order/order.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private orderService: OrderService,
  ) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return this.usersService.findOne(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('order')
  getOrderWithDetails(@Req() req) {
    console.log(req.user.sub);
    const userId = req.user.sub;
    return this.orderService.findOrderWithDetails(userId);
  }

  //TODO : PUT METHOD
  //TODO : DELETE METHOD
}
