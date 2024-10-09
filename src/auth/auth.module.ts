import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from "../user/users.module";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../strategy/jwt.strategy";
import jwtConfig from '../config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import refreshTokenConfig from '../config/refresh-jwt.config';
import { RefreshJwtStrategy } from '../strategy/refresh.strategy';
import { UsersService } from '../user/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshTokenConfig),
  ],

  providers: [AuthService, UsersService, JwtStrategy, RefreshJwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
