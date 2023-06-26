import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comments } from 'src/schemas/comments.models';
import { OrdersDetailService } from 'src/orders-detail/orders-detail.service';
import { Types } from 'mongoose';

@Controller('comments')
export class CommentsController {
  constructor(
    private comments: CommentsService,
    private orderDetails: OrdersDetailService,
  ) {}

  @Post('')
  async newComment(@Body() comment: Comments) {
    const idUser = comment.user;
    const orderDetailItems = await this.orderDetails.findByIdUser(idUser);

    const acceptOrderDetailsComments = orderDetailItems
      ?.filter((orderDetail) => orderDetail.status === 'Đã mua')
      .flatMap((orderDetail) => orderDetail.items)
      .filter((item) => comment.book.includes(item._id));

    if (acceptOrderDetailsComments.length > 0) {
      this.comments.create(comment);
    } else {
      throw new Error('U cannot comment');
    }
  }

  @Get(':idBook')
  async getCommentsOfBook(@Param('idBook') id: string) {
    return await this.comments.findAllCommentBooks(id);
  }
}
