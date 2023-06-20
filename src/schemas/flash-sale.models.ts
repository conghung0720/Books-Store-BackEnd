import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Book } from './book.models';

export type FlashSaleDocument = Document & FlashSale;

@Schema()
export class FlashSale {
  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  salePrice: number;

  @Prop()
  saleQuantity: number;
}

export const FlashSaleSchema = SchemaFactory.createForClass(FlashSale);
