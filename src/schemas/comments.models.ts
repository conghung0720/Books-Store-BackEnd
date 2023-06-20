import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
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
  book: Book;
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'user',
  })
  user: User;
  @Prop({ type: Date, default: Date.now })
  dateComment: Date;
  @Prop()
  rating: number;
  @Prop()
  comments: string;
}
export const CommentsSchema = SchemaFactory.createForClass(Comments);
