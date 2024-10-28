import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto-users/create-user.dto';
import { UsersService } from './users.service';
import { OrderService } from '../order/order.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UpdateUserDto } from './dto-users/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private orderService: OrderService,
  ) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('register')
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
      data: await this.usersService.findById(req.user.id),
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

  @UseGuards(JwtAuthGuard)
  @Put('modify')
  async updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateProfile(req.user.id, updateUserDto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async softDelete(@Param('id') id: number): Promise<void> {
    try {
      await this.usersService.deleteUser(id);
    } catch (error) {
      throw new HttpException('Error deleting user', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('restore/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async restore(@Param('id') id: number): Promise<void> {
    try {
      await this.usersService.restore(id);
    } catch (error) {
      throw new HttpException('Error restoring user', HttpStatus.BAD_REQUEST);
    }
  }
}
