import { IsDate, IsNumber, IsString, Length, Max } from 'class-validator';

export class Comments {
  @IsDate()
  dateComment: Date;

  @IsNumber()
  @Max(5)
  rating: number;

  @IsString()
  @Length(10, 100)
  comments: string;
}
