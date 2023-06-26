import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { FlashSaleController } from './flash-sale/flash-sale.controller';
import { Reflector } from '@nestjs/core';
import { FlashSaleService } from './flash-sale/flash-sale.service';
import { APP_GUARD } from '@nestjs/core';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.models';
import { CategoryModule } from './category/category.module';
import { CategorySchema } from './schemas/category.models';
import { BookSchema } from './schemas/book.models';
import { HistoryOrderController } from './history-order/history-order.controller';
import { HistoryOrderModule } from './history-order/history-order.module';
import { RolesModule } from './roles/roles.module';
import { RolesGuard } from './roles/roles.guard';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { ChatGptController } from './chat-gpt/chat-gpt.controller';
import { ChatGptService } from './chat-gpt/chat-gpt.service';
import { FlashSaleModule } from './flash-sale/flash-sale.module';
import { FlashSaleSchema } from './schemas/flash-sale.models';
import { CommentsController } from './comments/comments.controller';
import { CommentsModule } from './comments/comments.module';
// import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './auth/constants';
import { OrdersDetailController } from './orders-detail/orders-detail.controller';
import { OrdersDetailService } from './orders-detail/orders-detail.service';
import { CartsController } from './carts/carts.controller';
import { CartsModule } from './carts/carts.module';
import { CartsSchema } from './schemas/carts.models';
import { OrdersDetailsSchema } from './schemas/ordersDetails.models';
import { CommentsSchema } from './schemas/comments.models';
import { CommentsService } from './comments/comments.service';
import { OrdersDetailModule } from './orders-detail/orders-detail.module';

@Module({
  imports: [
    AuthModule,
    BookModule,
    UserModule,
   
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    CategoryModule,
    MongooseModule.forFeature([{ name: 'category', schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: 'book', schema: BookSchema }]),
    MongooseModule.forFeature([{ name: 'flashsale', schema: FlashSaleSchema }]),
    MongooseModule.forFeature([{ name: 'carts', schema: CartsSchema }]),
    MongooseModule.forFeature([
      { name: 'ordersDetails', schema: OrdersDetailsSchema },
    ]),
    MongooseModule.forFeature([{ name: 'comments', schema: CommentsSchema }]),
    HistoryOrderModule,
    RolesModule,
    FlashSaleModule,
    CartsModule,
    OrdersDetailModule,
  ],
  controllers: [
    AppController,
    CategoryController,
    BookController,
    FlashSaleController,
    UserController,
    HistoryOrderController,
    ChatGptController,
    CommentsController,
    OrdersDetailController,
    CartsController,
  ],
  providers: [
    AppService,
    CategoryService,
    BookService,
    FlashSaleService,
    UserService,
    Reflector,
    AuthService,
    ChatGptService,
    OrdersDetailService,
    CommentsService,
  ],
})
export class AppModule {}
