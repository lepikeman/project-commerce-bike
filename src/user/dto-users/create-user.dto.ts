import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email_user: string;

  @IsNotEmpty()
  @Length(8, 100)
  password: string;

  @IsNotEmpty()
  @Length(6, 15)
  username: string;
}
