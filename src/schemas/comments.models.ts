import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, ObjectId } from 'mongoose';
import { Category } from './category.models';
import { Book } from './book.models';
import { User } from './user.models';

export type CommentsDocument = Document & Comments;

@Schema()
export class Comments {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'book',
    required: true,
  })
  book: string;
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'user',
  })
  user: string;
  @Prop({ type: Date, default: Date.now })
  dateComment: Date;
  @Prop()
  rating: number;
  @Prop()
  comments: string;
}
export const CommentsSchema = SchemaFactory.createForClass(Comments);
