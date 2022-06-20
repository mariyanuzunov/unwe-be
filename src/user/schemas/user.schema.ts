import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Door } from 'src/doors/schemas/door.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ default: 'customer' })
  role: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Door.name }], default: [] })
  purchases: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
