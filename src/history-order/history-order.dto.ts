import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HistoryOrder {
  @IsNotEmpty()
  @IsString()
  idUser: string;

  @IsNumber()
  quantityCancelOrder: number | 0;

  
}
