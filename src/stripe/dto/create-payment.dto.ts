import { IsArray, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsArray()
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;

  @IsString()
  customerEmail: string;
}
