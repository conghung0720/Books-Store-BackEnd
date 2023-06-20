import { Body, Injectable } from '@nestjs/common';
import { Book } from './book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookDocument } from 'src/schemas/book.models';
import { FlashSaleDocument } from 'src/schemas/flash-sale.models';

@Injectable()
export class BookService {
  constructor(
    @InjectModel('book')
    private bookModel: Model<BookDocument>,
   
  ) {}

  async create(book: Book) {
    const newBook = new this.bookModel(book);
    return newBook.save();
  }

  async delete(id: string) {
    return await this.bookModel.findByIdAndRemove(id);
  }

  async fetchAll() {
    return await this.bookModel.find().populate([{ path: 'category' }, { path: 'flashSale' }]).exec();
  }

  async fetchId(id: string) {
    let getBook = await this.bookModel.findById(id).exec();
    return getBook;
  }

  async edit(id: string, book: {}) {
    const editBooks = await this.bookModel.findByIdAndUpdate(id, book).exec();
    return editBooks;
  }
}
