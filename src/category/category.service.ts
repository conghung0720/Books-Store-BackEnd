import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Categories } from 'src/utils/type';
import { Category } from './category.dto';
import { Model } from 'mongoose';
import { CategoryDocument, CategorySchema } from 'src/schemas/category.models';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('category')
    private categoryModel: Model<CategoryDocument>,
  ) {}

  fetchCategories() {
    return this.categoryModel.find().exec();
  }

  async delete(id: string) {
    return await this.categoryModel.findByIdAndRemove(id).exec();
  }

  async findId(id: string) {
    return await this.categoryModel.findById(id).exec();
  }

  async create(category: Category) {
    const newCategory = new this.categoryModel(category);
    return await newCategory.save();
  }
}
