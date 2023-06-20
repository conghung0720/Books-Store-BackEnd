import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  HttpCode,
  Request,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, response } from 'express';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/utils/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtSerivce: JwtService,
    private userSerivce: UserService,
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  async signIn(
    @Request() req,
    @Body() signIn: Record<string, any>,
    @Res({ passthrough: true }) response: Response,
  ) {
    // console.log(signIn);
    const user = await this.authService.signIn(
      signIn.userName,
      signIn.password,
    );

    response.cookie('token', user, {
      httpOnly: true,
    });

    return user;
  }

  @Get('profile')
  @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.)
  async getProfile(@Request() req) {
    const userJWT = await req.user;
    return await this.userSerivce.findId(userJWT.username);
  }

  @Post('/register')
  async signUp(@Body() signUp: User) {
    return await this.authService.signUp(signUp);
  }
}
