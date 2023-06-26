import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import mongoose, { Connection, Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.models';
import { hashPassword } from 'src/utils/bcrypt';
import { ObjectId } from 'mongoose';
import { CartsService } from 'src/carts/carts.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    private cartsService: CartsService,
    @InjectConnection() private connection: Connection,
  ) {}

  async findId(userName: string): Promise<User | undefined> {
    const getAllUser = await this.userModel.find().exec();
    const idOfUser = (await getAllUser).find(
      (user) => user.userName === userName,
    );
    return await this.userModel.findById(idOfUser).exec();
  }

  async findUserName(userName: string): Promise<User | undefined> {
    const getAllUser = await this.userModel.find().exec();
    const getUserName = getAllUser.find((user) => user.userName === userName);
    return getUserName;
  }

  async createUser(user: User) {
    let idCart = await this.cartsService.create();
    const hashPasswordUser = {
      ...user,
      password: await hashPassword(user.password),
    };
    const newUser = new this.userModel({ ...hashPasswordUser, cartId: idCart });
    return await newUser.save();
  }
  async updateUserById(id: string, updatedFields: Partial<User>): Promise<User | null> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, updatedFields);
    await user.save();

    return user;
  }
}
