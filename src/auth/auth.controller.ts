import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoginUserDto } from '../user/dto-users/login-user.dto';
import { RefreshAuthGuard } from '../guards/refresh-auth.guard';
import { UsersService } from '../user/users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Request() req) {
    const token = await this.authService.login(req.user.id);
    if (!token) {
      throw new HttpException('Token invalid', HttpStatus.UNAUTHORIZED);
    }
    return {
      status: HttpStatus.OK,
      message: 'User logged in successfully',
      id: req.user.id,
      token,
    };
  }

  @UseGuards(RefreshAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('refresh')
  refreshToken(@Req() req) {
    const refresh = this.authService.refreshToken(req.user.id);
    if (!refresh) {
      throw new HttpException('Token invalid', HttpStatus.UNAUTHORIZED);
    }
    return {
      status: HttpStatus.OK,
      message: 'Refresh token',
      id: req.user.id,
      data: refresh,
    };
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('signout')
  async signOut(@Req() req) {
    if (!req.user) {
      throw new HttpException('Token invalid', HttpStatus.UNAUTHORIZED);
    }
    await this.authService.signOut(req.user.id);
    return {
      status: HttpStatus.OK,
      message: 'User logged out successfully',
    };
  }
}
