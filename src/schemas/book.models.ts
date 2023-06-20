import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Category } from './category.models';
import { FlashSale } from './flash-sale.models';

export type BookDocument = Document & Book;

@Schema()
export class Book {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'category',
  })
  category: Category;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'flashsale',
  })
  flashSale: string;

  @Prop()
  author: string;

  @Prop()
  title: string;

  @Prop()
  images: string[];

  @Prop()
  price: number;

  @Prop()
  quantity: number;

  @Prop()
  buyQuantity: number;

  @Prop()
  publisher: string;

  @Prop()
  supplier: string;
}
export const BookSchema = SchemaFactory.createForClass(Book);
