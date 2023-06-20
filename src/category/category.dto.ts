import { IsString, IsNumber, IsInt, IsNotEmpty } from 'class-validator';

export class Category {
  @IsString()
  @IsNotEmpty()
  name: string;
}
