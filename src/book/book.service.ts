import { Body, Injectable } from '@nestjs/common';
import { Book } from './book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookDocument } from 'src/schemas/book.models';
import { FlashSaleDocument } from 'src/schemas/flash-sale.models';
import { NotFoundError } from 'rxjs';

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
    return await this.bookModel
      .find()
      .populate([{ path: 'category' }, { path: 'flashSale' }])
      .exec();
  }

  async fetchId(id: string) {
    let getBook = await this.bookModel.findById(id).exec();
    return getBook;
  }

  async edit(id: string, book: {}) {
    const editBooks = await this.bookModel.findByIdAndUpdate(id, book).exec();
    return editBooks;
  }

  async updateQuantity(id: string, quantity: number) {
    const books = await this.bookModel.findById(id);
    if (!books) {
      throw new Error('Book not found');
    }
    books.quantity += quantity;
    await books.save();

    return books;
  }
  async subtractQuantity(id: string, quantity: number) {
    const books = await this.bookModel.findById(id);
    if (!books) {
      throw new Error('Book not found');
    }
    if (books.quantity - quantity < 0) {
      throw new Error('Not < 0');
    }
    books.quantity -= quantity;
    await books.save();

    return books;
  }
}
