import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto-users/create-user.dto";
import { UsersService } from "./users.service";
import { AuthGuard } from "../guards/auth.guard";
import { OrderService } from "../order/order.service";

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService,
              private orderService: OrderService) {}

  @Post('register')
   create(@Body() createUserDto: CreateUserDto) {
    return  this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('account')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Get('order')
  async getOrderWithDetails(@Request() req: any) {
    console.log(req.user.sub);
    const userId = req.user.sub;
    return this.orderService.findOrderWithDetails(userId);
  }

  //TODO : PUT METHOD
  //TODO : DELETE METHOD
}
