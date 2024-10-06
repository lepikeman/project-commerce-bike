import { IsBoolean, IsNotEmpty, IsString, Length, MaxLength } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Length(10, 60)
  product_name: string;

  @IsBoolean()
  factorynew: boolean

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;
}