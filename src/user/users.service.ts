import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from './dto-users/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

<<<<<<< HEAD
  async create(createUserDto: CreateUserDto) {
    const createUser = this.userRepository.create(createUserDto);
    const password = await bcrypt.hash(createUserDto.password, 10);
    const user = { password, createUser };
    return this.userRepository.save(user);
=======
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    try {
      return this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
>>>>>>> 3e0c7e6 (post CR)
  }

  async findOne(id: number) {
    try {
      return this.userRepository.findOne({
        where: { id },
        select: ['username', 'email_user', 'id'],
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  findByEmail(email_user: string) {
    return this.userRepository.findOne({
      where: {
        email_user,
      },
    });
  }
}
