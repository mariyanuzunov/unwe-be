import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type DoorDocument = Door & Document;

@Schema({ timestamps: true })
export class Door {
  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  manufacturer: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  imgUrl: string;
}

export const DoorSchema = SchemaFactory.createForClass(Door);
