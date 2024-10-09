import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from "../user/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import refreshJwtConfig from '../config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY) private refreshTokenConfig:ConfigType<typeof refreshJwtConfig>,
  ) {
  }

  async signIn(email_user: string, password: string) {
    const user = await this.usersService.findByEmail(email_user);
    if (!user) {
      throw new UnauthorizedException('Incorrect credential');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      throw new UnauthorizedException("Incorrect credential");
    }

    const payload = { sub: user.id, email: user.email_user };
    return this.generateUserTokens(payload);
  }

  async generateUserTokens(payload) {
    const access_token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig);
    return { access_token, refreshToken }
  }
}
