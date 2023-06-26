import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.models';
import { CartsModule } from 'src/carts/carts.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    CartsModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
