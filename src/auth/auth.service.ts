import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import refreshJwtConfig from '../config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import { AuthJwtPayload } from '../types/auth-jwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async validateUser(email_user: string, password: string) {
    const user = await this.usersService.findByEmail(email_user);
    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch)
      throw new UnauthorizedException('Incorrect credential');
    
    return { id: user.id };
  }

  login(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    return this.jwtService.sign(payload);
  }

  async generateUserTokens(payload) {
    const access_token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig);
    return { access_token, refreshToken };
  }

  refreshToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const token = this.jwtService.sign(payload);
  }
}
