import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type OrdersDetailsDocument = Document & OrdersDetails;

@Schema()
export class OrdersDetails {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'user', required: true })
  idUser: ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'cart', required: true })
  idCart: string;

  @Prop()
  items: any[];

  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop()
  phone: number;

  @Prop()
  totalPrice: number;

  @Prop()
  discount: number;

  @Prop({ type: Date, default: Date.now })
  createAt: Date;

  @Prop({ type: Date, default: Date.now })
  updateAt: Date;

  @Prop()
  status: string;
}

export const OrdersDetailsSchema = SchemaFactory.createForClass(OrdersDetails);
