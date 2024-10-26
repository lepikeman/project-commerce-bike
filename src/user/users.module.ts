import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from '../entity/user.entity';
import { UsersController } from './users.controller';
import { OrderModule } from '../order/order.module';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]), OrderModule],
  controllers: [UsersController],
  providers: [UsersService, JwtService, JwtAuthGuard],
  exports: [UsersService],
})
export class UsersModule {}
