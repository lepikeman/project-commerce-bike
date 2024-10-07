import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../user/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //fonction de login si tout est bon = create token
  async signIn(username: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Username incorrect');
    }
    const isPasswordMatch = await bcrypt.compare(pass, user.password)
    if(!isPasswordMatch) {
      throw new UnauthorizedException("Mot de passe incorrect");
    }

    const payload = { sub: user.id, username: user.username };
    const access_token = this.jwtService.sign(payload);

    return { access_token }
  }
}

