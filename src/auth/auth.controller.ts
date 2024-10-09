import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "../user/dto-users/login-user.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.signIn(loginUserDto.email_user, loginUserDto.password);
  }

}
