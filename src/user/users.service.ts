import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from './dto-users/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findOne(id: number) {
    return `This action returns #${id} user`;
  }

  findByEmail(email_user: string) {
    return this.userRepository.findOne({
      where: {
        email_user,
      },
    });
  }
}
