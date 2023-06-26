import { Body, Controller, Post } from '@nestjs/common';
import { CartsService } from './carts.service';
import { Get, Param } from '@nestjs/common';
@Controller('carts')
export class CartsController {
  constructor(private cartsSerivce: CartsService) {}

  @Post(':idCart')
  async updateCart(@Param('idCart') idCart: string, @Body() changeItems: any) {
    return await this.cartsSerivce.edit(idCart, changeItems);
  }

  @Get(':id')
  async getAll(@Param('id') id: string) {
    return await this.cartsSerivce.fetchId(id);
  }

  @Get('/delete/:id')
  async deleteCart(@Param('id') id: string) {
    console.log(id);
    return await this.cartsSerivce.deleteCart(id);
  }
}
