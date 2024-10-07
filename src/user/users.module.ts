import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UsersController } from "./users.controller";
import { OrderModule } from "../order/order.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), OrderModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
