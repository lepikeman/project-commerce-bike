import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { Users } from "./users.entity";
import { CreateUserDto } from "./dto-users/create-user.dto";
import * as bcrypt from 'bcrypt';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
  constructor( @InjectRepository(Users) private readonly userRepository: Repository<Users>) {}
  async create(createUserDto: CreateUserDto): Promise<Users> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({ ...createUserDto, password: hashedPassword, });
    return this.userRepository.save(user);
  }

  async findByUsername(username: string): Promise<Users> {
    return this.userRepository.findOne({ where: { username } });
  }

}
