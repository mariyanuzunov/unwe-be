import { IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { OrderStatus } from '../order.enum';

export class UpdateOrderDto {
  @Transform(({ value }) => value.trim())
  @IsIn(Object.values(OrderStatus))
  status: string;
}
