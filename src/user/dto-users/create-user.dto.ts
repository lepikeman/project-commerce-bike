import { IsNotEmpty, Length, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @Length(3, 16)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}