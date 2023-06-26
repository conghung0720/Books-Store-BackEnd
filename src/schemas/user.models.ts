import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Mongoose, Schema as MongooseSchema } from 'mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/utils/roles.enum';
import { Carts } from './carts.models';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  sex: string;

  @Prop()
  roles: Role[];

  @Prop({
    data: Buffer,
    contentType: String,
    default: 'https://simpleicon.com/wp-content/uploads/user1.png',
  })
  avatar: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'carts' })
  cartId: string;

  @Prop()
  address: string | undefined;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
