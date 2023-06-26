import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Mongoose } from 'mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/utils/roles.enum';
import { Schema as MongooseSchema } from 'mongoose';

export type CartDocument = Carts & Document;

@Schema()
export class Carts {
  @Prop()
  items: any[];

  @Prop({ default: 0 })
  quantityItems: number;

  @Prop({ default: 0 })
  priceItemsNotFlashSale: number;

  @Prop({ default: 0 })
  fullPrice: number;

  @Prop({ default: 0 })
  priceItemsHaveFlashSale: number;
}

export const CartsSchema = SchemaFactory.createForClass(Carts);
