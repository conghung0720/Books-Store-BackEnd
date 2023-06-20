import { Body, Injectable, UnauthorizedException, Res } from '@nestjs/common';
import { User } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { hashPassword, isMatchHashPassword } from 'src/utils/bcrypt';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private userSerivce: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(userName: string, pass: any) {
    const user = await this.userSerivce.findId(userName);
    const checkPasswordUser = await isMatchHashPassword(pass, user.password);
    if (!checkPasswordUser) {
      throw new UnauthorizedException('');
    }
    const payload = {
      sub: user.id,
      username: user.userName,
      roles: user.roles,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(@Body() user: User) {
    const checkExistUserId = await this.userSerivce.findId(user.id);
    const checkExistUserName = await this.userSerivce.findUserName(
      user.userName,
    );
    if (checkExistUserId || checkExistUserName) {
      return {
        status: 409,
        error: 'Tồn tại UserName',
      };
    }
    return await this.userSerivce.createUser(user);
  }
}
