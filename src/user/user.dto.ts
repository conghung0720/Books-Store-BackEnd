import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { Role } from 'src/utils/roles.enum';

export class User {
  @IsString()
  @IsNotEmpty()
  id: string;

  cartId: any;

  @IsString()
  @IsNotEmpty()
  @Length(6, 16)
  userName: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  roles: [];

  @IsString()
  fullName: string;

  @IsString()
  avatar: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: number;

  @IsString()
  sex: string;

  @IsString()
  address: string;
}
