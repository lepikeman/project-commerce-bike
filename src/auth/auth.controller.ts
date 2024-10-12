import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const token = this.authService.login(req.user);
    return { id: req.user.id, token };
  }

  @Post('refresh')
  refreshToken(@Req() req) {
    return this.authService.refreshToken(req.user.id);
  }
}
