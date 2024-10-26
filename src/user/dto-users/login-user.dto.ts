import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

export class LoginUserDto{
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email_user: string;
  @IsNotEmpty()
  @Length(8, 100)
  password: string;
}