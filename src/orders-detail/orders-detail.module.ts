import { Module } from '@nestjs/common';
import { OrdersDetailService } from './orders-detail.service';

@Module({})
export class OrdersDetailModule {
    exports: [OrdersDetailService]
}
