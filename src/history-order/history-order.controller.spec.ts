import { Test, TestingModule } from '@nestjs/testing';
import { HistoryOrderController } from './history-order.controller';

describe('HistoryOrderController', () => {
  let controller: HistoryOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryOrderController],
    }).compile();

    controller = module.get<HistoryOrderController>(HistoryOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
