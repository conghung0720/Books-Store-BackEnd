import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (token) {
      try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req['user'] = decoded; // Gán thông tin người dùng từ JWT vào request
      } catch (err) {
        // Xử lý khi JWT không hợp lệ
      }
    }

    next();
  }
}
