import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';
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

  async login(userId: number) {
    const { accessToken, refreshToken } = await this.generateUserTokens(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.usersService.updateHashedRefreshToken(
      userId,
      hashedRefreshToken,
    );
    return {
      userId,
      accessToken,
      refreshToken,
    };
  }

  async generateUserTokens(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);
    return { accessToken, refreshToken };
  }

  async refreshToken(userId: number) {
    const { accessToken, refreshToken } = await this.generateUserTokens(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.usersService.updateHashedRefreshToken(
      userId,
      hashedRefreshToken,
    );
    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  async validateToken(userId: number, token: string) {
    const user = this.usersService.findById(userId);
    if (!user || !token) throw new UnauthorizedException('Invalid token');
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = this.usersService.findById(userId);
    if (!user || !(await user).hashedRefreshToken)
      throw new UnauthorizedException('Invalide Refresh Token');
    const refreshTokenMatches = await argon2.verify(
      (await user).hashedRefreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches)
      throw new UnauthorizedException('Refresh Token not found');

    return { id: userId };
  }

  async signOut(userId: number) {
    await this.usersService.updateHashedRefreshToken(userId, null);
    return true;
  }
}
