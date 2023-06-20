import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Date } from 'mongoose';

export class FlashSale {
 
  

  @IsNotEmpty()
  startDate: Date;

  
  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  @IsNumber()
  salePrice: number;

  @IsNumber()
  @IsNotEmpty()
  saleQuantity: number;
}
