import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../user/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<{ acces_token:string }> {
    const user = await this.usersService.findByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.username };
    return { acces_token: this.jwtService.sign(payload) };
  }
}

