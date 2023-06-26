import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments, CommentsDocument } from 'src/schemas/comments.models';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('comments')
    private commentsModel: Model<CommentsDocument>,
  ) {}

  async findOne(id: string) {
    return await this.commentsModel.findById(id);
  }

  async findAll() {
    return await this.commentsModel.find();
  }

  async findAllCommentBooks(idBooks: string) {
    const getAllComments = await this.findAll();
    const getAllCommentsOfBook = getAllComments.filter(
      (comments) => comments.book.toString() === idBooks,
    );


    return getAllCommentsOfBook;
  }

  async create(comments: Comments) {
    const newComment = new this.commentsModel(comments);
    return newComment.save();
  }
}
