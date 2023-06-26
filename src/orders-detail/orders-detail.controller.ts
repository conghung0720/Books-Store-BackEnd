import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrdersDetails } from 'src/schemas/ordersDetails.models';
import { OrdersDetailService } from './orders-detail.service';

@Controller('orders-detail')
export class OrdersDetailController {
  constructor(private OrderDetailsService: OrdersDetailService) {}

  @Post('')
  async createNew(@Body() orderDetails: OrdersDetails) {
    return await this.OrderDetailsService.create(orderDetails);
  }

  @Get('/list')
  async listOrderDetails() {
    return await this.OrderDetailsService.findAll();
  }

  @Get('cancel/:id')
  async cancelOrderDetails(@Param('id') id: string) {
    return await this.OrderDetailsService.cancelStatus(id);
  }

  @Get('accept/:id')
  async acceptOrderDetails(@Param('id') id: string) {
    return await this.OrderDetailsService.acceptStatus(id);
  }

  @Get('process/:id')
  async processOrderDetails(@Param('id') id: string) {
    return await this.OrderDetailsService.processStatus(id);
  }

  @Get('/user/:idUser')
  async findAllOrderDetailsByUser(@Param('idUser') idUser: string) {
    return await this.OrderDetailsService.findByIdUser(idUser);
  }

  @Get('/:id')
  async findIdOrderDetails(@Param('id') id: string) {
    return await this.OrderDetailsService.findById(id);
  }
}
