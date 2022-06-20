import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Door } from 'src/doors/schemas/door.schema';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ type: Types.ObjectId, ref: User.name })
  author: User | string;

  @Prop({ type: Types.ObjectId, ref: Door.name })
  product: Door | string;

  @Prop()
  content: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
