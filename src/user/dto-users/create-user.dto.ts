import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email_user: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
