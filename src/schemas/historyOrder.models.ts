import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';

export type HistoryOrderDocument = Document & HistoryOrder;

@Schema()
export class HistoryOrder {
  @Prop()
  idUser: string;

  @Prop()
  quantityCancelOrder: number;

  @Prop()
  quantityBuyItem: number;

  @Prop()
  historyBuyItems: Object[];
}

export const HistoryOrderSchema = SchemaFactory.createForClass(HistoryOrder);
