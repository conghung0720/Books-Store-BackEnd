import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { Schema } from 'mongoose';
import { FlashSale } from 'src/schemas/flash-sale.models';

export class Book {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  title: string;

  @IsString()
  author: string;

  @IsArray()
  @IsNotEmpty()
  images: string[];

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  publisher: string;

  @IsString()
  supplier: string;

  @IsNumber()
  buyQuantity: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
