import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartsService } from 'src/carts/carts.service';
import { OrdersDetailsDocument } from 'src/schemas/ordersDetails.models';
import { ObjectId } from 'mongodb';
import { BookService } from 'src/book/book.service';

@Injectable()
export class OrdersDetailService {
  constructor(
    private CartService: CartsService,
    @InjectModel('ordersDetails')
    private ordersDetailsModel: Model<OrdersDetailsDocument>,
    private BookService: BookService,
  ) {}

  async findAll() {
    return await this.ordersDetailsModel.find().exec();
  }

  async findById(id: string) {
    return await this.ordersDetailsModel.findById(id).exec();
  }

  async findByIdUser(idUser: string) {
    const getAllOrder = await this.findAll();
    const userId = new ObjectId(idUser);
    const userOrders = getAllOrder.filter(
      (order) => order.idUser.toString() === userId.toString(),
    );
    return userOrders;
  }

  async create(orderDetailData) {
    const newOrderDetail = new this.ordersDetailsModel(orderDetailData);
    await newOrderDetail.save();
    await this.processStatus(newOrderDetail._id);
  }
  async delete(id: string) {
    return await this.ordersDetailsModel.findByIdAndRemove(id).exec();
  }
  async cancelStatus(id: string) {
    const orderDetails = await this.ordersDetailsModel.findById(id).exec();
    orderDetails.items.map((book) => {
      if (book.quantity === null) return;
      this.BookService.updateQuantity(book._id, book.quantity);
    });
    await this.ordersDetailsModel
      .findByIdAndUpdate(id, { status: 'Đã hủy' })
      .exec();
  }
  async acceptStatus(id: string) {
    const orderDetails = await this.ordersDetailsModel.findById(id).exec();
    orderDetails.items.map((book) => {
      if (book.quantity === null) return;
      this.BookService.subtractQuantity(book._id, book.quantity);
    });
    await this.ordersDetailsModel
      .findByIdAndUpdate(id, { status: 'Chấp nhận' })
      .exec();
  }
  async processStatus(id: string) {
    const orderDetails = await this.ordersDetailsModel.findById(id).exec();
    orderDetails.items.map((book) => {
      if (book.quantity === null) return;
      this.BookService.subtractQuantity(book._id, book.quantity);
    });
    await this.ordersDetailsModel
      .findByIdAndUpdate(id, { status: 'Đang xử lý' })
      .exec();
  }
}
