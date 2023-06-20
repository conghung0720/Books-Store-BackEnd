import { Module, forwardRef } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from 'src/schemas/book.models';
import { FlashSaleModule } from 'src/flash-sale/flash-sale.module';
import { FlashSaleSchema } from 'src/schemas/flash-sale.models';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'book', schema: BookSchema }]),forwardRef(() => FlashSaleModule)],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService]
})
export class BookModule {}
