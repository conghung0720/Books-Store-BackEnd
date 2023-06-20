import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FlashSaleDocument } from 'src/schemas/flash-sale.models';
import { FlashSale } from './flash-sale.dto';

@Injectable()
export class FlashSaleService {
  constructor(
    @InjectModel('flashsale')
    private flashSaleModel: Model<FlashSaleDocument>,
  ) {}

  async findId(id: string) {
    const populatedFlashSale = await this.flashSaleModel
      .findById(id)
      .populate({ path: 'product', strictPopulate: false })
      .exec();
    return populatedFlashSale;
  }

  async findAll() {
    return await this.flashSaleModel
      .find()
      .populate({ path: 'product', strictPopulate: false })
      .exec();
  }

  async update(id: string) {
    return await this.flashSaleModel.findByIdAndUpdate(id).exec();
  }

  async create(flashSale: FlashSale) {
    const newFlashSale = new this.flashSaleModel(flashSale);
    return await newFlashSale.save();
  }

  async remove(id: string) {
    return await this.flashSaleModel.findByIdAndRemove(id).exec();
  }

  // async checkExistFlashSale(listProduct: string[]) {
  //   const getListFlashSale = await this.flashSaleModel.find().exec();
  //   const checkExistBook = getListFlashSale.find((value) =>
  //     listProduct.map((item) => item === value._id),
  //   );

  //   return checkExistBook;
  // }
}
