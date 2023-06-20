import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { BookModule } from 'src/book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CartsSchema } from 'src/schemas/carts.models';

@Module({
  imports: [
    BookModule,
    MongooseModule.forFeature([{ name: 'cart', schema: CartsSchema }]),
  ],
  providers: [CartsService],
  exports: [CartsService],
})
export class CartsModule {}
