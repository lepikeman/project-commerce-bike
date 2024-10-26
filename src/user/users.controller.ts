import {
  Body,
  Controller,
  Get,
  HttpCode,
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
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    return {
      status: HttpStatus.CREATED,
      message: 'User created successfully',
      data: await this.usersService.create(createUserDto),
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    if (!req.user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    return {
      status: HttpStatus.OK,
      message: 'Profile found',
      data: await this.usersService.findOne(req.user.id),
    };
  }

  @HttpCode(HttpStatus.FOUND)
  @UseGuards(JwtAuthGuard)
  @Get('order')
  async getOrderWithDetails(@Req() req) {
    const userId = req.user.id;
    if (!userId) {
      throw new HttpException('Token invalid', HttpStatus.UNAUTHORIZED);
    }
    return {
      status: HttpStatus.OK,
      message: 'Order recuperate successfully',
      data: await this.orderService.findOrderWithDetails(userId),
    };
  }

  //TODO : PUT METHOD
  //TODO : DELETE METHOD
}
