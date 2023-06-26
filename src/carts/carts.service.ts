import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { BookDocument } from 'src/schemas/book.models';
import { CartDocument } from 'src/schemas/carts.models';

@Injectable()
export class CartsService {
  constructor(@InjectModel('cart') private cartModel: Model<CartDocument>) {}

  async create() {
    const firstCart = {
      items: [],
      quantityItems: 0,
      fullPrice: 0,
      priceItemsNotFlashSale: 0,
      priceItemsHaveFlashSale: 0,
    };
    const createFirstCart = new this.cartModel(firstCart);
    await createFirstCart.save();
    return createFirstCart._id;
  }

  async edit(idCart: string, book: any) {
    const fetchId = await this.fetchId(idCart);

    const existingItemIndex = fetchId.items.findIndex(
      (item) => item._id === book._id,
    );

    if (existingItemIndex !== -1) {
      fetchId.items[existingItemIndex].quantity = book.quantity;
    } else {
      fetchId.items.push(book);
    }

    const fullPrice: Number = fetchId.items?.reduce(
      (accumulator, currentValue) => {
        let values: Number = 0;
        if (currentValue.quantity) {
          values += accumulator + +currentValue.price * +currentValue.quantity;
        }
        return values;
      },
      0,
    );

    const editBooks = await this.cartModel
      .findOneAndUpdate(
        { _id: idCart },
        { items: fetchId.items, fullPrice: fullPrice },
        { new: true },
      )
      .exec();

    return editBooks;
  }

  async fetchId(id: string) {
    const check = await this.cartModel.findById(id).exec();

    return check;
  }
  async deleteCart(id: string) {
    const update = {
      items: [],
      quantityItems: 0,
      fullPrice: 0,
      priceItemsNotFlashSale: 0,
      priceItemsHaveFlashSale: 0,
    };

    const updatedCart = await this.cartModel
      .findOneAndUpdate({ _id: id }, update, { new: true })
      .exec();

    return updatedCart;
  }
}
