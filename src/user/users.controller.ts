import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
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
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(createUserDto.email_user);
    if (user) {
      console.log('test commit github');
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    return {
      status: HttpStatus.CREATED,
      message: 'User created successfully',
      data: await this.usersService.create(createUserDto),
    };
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
