import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsSchema } from 'src/schemas/comments.models';
import { CommentsController } from './comments.controller';
import { OrdersDetailService } from 'src/orders-detail/orders-detail.service';
import { OrdersDetailModule } from 'src/orders-detail/orders-detail.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'comments', schema: CommentsSchema }]),
    OrdersDetailService,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
