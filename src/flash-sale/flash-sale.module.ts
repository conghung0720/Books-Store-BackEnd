import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashSaleController } from './flash-sale.controller';
import { FlashSaleService } from './flash-sale.service';
import { BookService } from 'src/book/book.service';
import { BookController } from 'src/book/book.controller';
import { BookModule } from 'src/book/book.module';
import { FlashSaleSchema } from 'src/schemas/flash-sale.models';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'flashsale', schema: FlashSaleSchema }]),
    forwardRef(() => BookModule),
  ],
  controllers: [FlashSaleController],
  providers: [FlashSaleService],
  exports: [FlashSaleService],
})
export class FlashSaleModule {}
