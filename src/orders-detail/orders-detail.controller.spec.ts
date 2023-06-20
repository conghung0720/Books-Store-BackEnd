import { Test, TestingModule } from '@nestjs/testing';
import { OrdersDetailController } from './orders-detail.controller';

describe('OrdersDetailController', () => {
  let controller: OrdersDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersDetailController],
    }).compile();

    controller = module.get<OrdersDetailController>(OrdersDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
