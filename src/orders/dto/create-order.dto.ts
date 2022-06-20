import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateOrderDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  customer: string;

  @IsNotEmpty({ each: true })
  products: string[];

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  shippingAddress: string;
}
