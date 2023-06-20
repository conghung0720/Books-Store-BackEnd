import { Module } from '@nestjs/common';
import { HistoryOrderService } from './history-order.service';

@Module({
  providers: [HistoryOrderService]
})
export class HistoryOrderModule {}
