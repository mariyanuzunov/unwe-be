import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Door } from 'src/doors/schemas/door.schema';
import { OrderStatus } from '../order.enum';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: User.name })
  customer: User | string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Door.name }] })
  products: Door[] | string[];

  @Prop()
  shippingAddress: string;

  @Prop({ default: OrderStatus.REGISTERED })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
