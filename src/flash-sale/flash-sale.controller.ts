import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { FlashSaleService } from './flash-sale.service';
import { BookService } from 'src/book/book.service';
import { FlashSale } from './flash-sale.dto';
import { throwError } from 'rxjs';

@Controller('flash-sale')
export class FlashSaleController {
  constructor(
    private flashSaleService: FlashSaleService,
    @Inject(forwardRef(() => BookService))
    private bookService: BookService,
  ) {}

  @Post('')
  async createNewFlashSale(@Body() flashSale: FlashSale) {
    return await this.flashSaleService.create(flashSale);
  }

  @Get('/list')
  async getAllListFlashSale() {
    return await this.flashSaleService.findAll();
  }

  @Get(':id')
  async getIdItemFlashSale(@Param('id') id: string) {
    return await this.flashSaleService.findId(id);
  }

  @Get('/product-flash-sale')
  async getProductHaveFlashSale() {
    const getListProduct = this.bookService.fetchAll();
  }

  @Delete(':id')
  async deleteFlashSale(@Param('id') id: string) {
    return await this.flashSaleService.remove(id);
  }
}
