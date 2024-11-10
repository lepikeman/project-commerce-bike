import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from './dto-users/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto-users/update-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async updateHashedRefreshToken(userId: number, hashed_refresh_token: string) {
    return await this.userRepository.update(
      { id: userId },
      { hashed_refresh_token: hashed_refresh_token },
    );
  }

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
  }

  async findById(id: number) {
    try {
      return this.userRepository.findOne({
        where: { id },
        select: ['username', 'email_user', 'id', 'hashed_refresh_token'],
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  findByEmail(email_user: string) {
    const userEmail = this.userRepository.findOne({
      where: {
        email_user,
      },
    });
    if (!userEmail) {
      throw new HttpException('userEmail not found', HttpStatus.NOT_FOUND);
    }
    return userEmail;
  }

  async updateProfile(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Partial<User>> {
    console.log('Starting update profile for userId:', userId);
    console.log('Received DTO:', updateUserDto);
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    console.log('Found user:', user);
    if (!user) {
      throw new BadRequestException('Utilisateur non trouvé');
    }
    try {
      console.log('Comparing passwords');
      console.log(
        'Current password from request:',
        updateUserDto.currentPassword,
      );
      console.log('Stored hashed password:', user.password);

      const passwordValid = await bcrypt.compare(
        updateUserDto.currentPassword,
        user.password,
      );

      console.log('Password validation result:', passwordValid);

      if (!passwordValid) {
        throw new UnauthorizedException('Mot de passe incorrect');
      }
    } catch (error) {
      console.error('Error during password validation:', error);
      throw error;
    }

    let hasChanges = false;
    const userToUpdate = new User();
    userToUpdate.id = userId;

    if (
      updateUserDto.email_user &&
      updateUserDto.email_user !== user.email_user
    ) {
      console.log('Checking email update:', updateUserDto.email_user);
      const emailExists = await this.userRepository.findOne({
        where: {
          email_user: updateUserDto.email_user,
          id: Not(userId),
        },
      });
      if (emailExists) {
        throw new BadRequestException('Cet email est déjà utilisé');
      }
      userToUpdate.email_user = updateUserDto.email_user;
      hasChanges = true;
      console.log('Email will be updated');
    }

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      console.log('Checking username update:', updateUserDto.username);
      const usernameExists = await this.userRepository.findOne({
        where: {
          username: updateUserDto.username,
          id: Not(userId),
        },
      });
      if (usernameExists) {
        throw new BadRequestException("Ce nom d'utilisateur est déjà utilisé");
      }
      userToUpdate.username = updateUserDto.username;
      hasChanges = true;
      console.log('Username will be updated');
    }

    if (updateUserDto.newPassword) {
      console.log('Updating password');
      const salt = await bcrypt.genSalt();
      userToUpdate.password = await bcrypt.hash(
        updateUserDto.newPassword,
        salt,
      );
      hasChanges = true;
      console.log('Password will be updated');
    }

    if (!hasChanges) {
      console.log('No changes detected');
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    try {
      console.log('Attempting to save changes');
      const savedUser = await this.userRepository.save(userToUpdate);
      console.log('Save successful:', savedUser);

      const updatedUser = await this.userRepository.findOne({
        where: { id: userId },
      });
      console.log('Final updated user:', updatedUser);

      const { password, ...userWithoutPassword } = updatedUser;
      return userWithoutPassword;
    } catch (error) {
      console.error('Error during save/update:', error);
      throw new BadRequestException(
        'Erreur lors de la mise à jour: ' + error.message,
      );
    }
  }

  async deleteUser(userId: number) {
    try {
      const entity = await this.userRepository.findOne({
        where: { id: userId },
        withDeleted: true,
      });

      if (!entity) {
        throw new HttpException(
          `Entity with ${userId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      if (entity.deleted_at) {
        throw new HttpException(
          `Entity with ${userId} already deleted`,
          HttpStatus.CONFLICT,
        );
      }

      const result = await this.userRepository.softDelete(userId);
      if (result.affected === 0) {
        throw new Error(`error when deleting entity with id ${userId}`);
      }

      this.logger.log(`Entity with id ${userId} deleted successfully`);
    } catch (error) {
      this.logger.log(`Error deleting entity with id ${userId}`);
    }
  }

  async restore(userId: number): Promise<void> {
    try {
      const result = await this.userRepository.restore(userId);
      if (result.affected === 0) {
        throw new Error(`error when restoring entity with id ${userId}`);
      }
      this.logger.log(`Entity with id ${userId} restored successfully`);
    } catch (error) {
      this.logger.log(`Error restoring entity with id ${userId}`);
    }
  }
}
