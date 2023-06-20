import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.models';
import { CartsModule } from 'src/carts/carts.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://hungdc03:cangimatkhau1@cluster0.h7wnxaj.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    CartsModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
