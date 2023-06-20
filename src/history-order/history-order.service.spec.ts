import { Test, TestingModule } from '@nestjs/testing';
import { HistoryOrderService } from './history-order.service';

describe('HistoryOrderService', () => {
  let service: HistoryOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryOrderService],
    }).compile();

    service = module.get<HistoryOrderService>(HistoryOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
