import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
  forwardRef,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.dto';
import { Roles } from 'src/roles/roles';
import { Role } from 'src/utils/roles.enum';
import { Schema } from 'mongoose';
import { FlashSaleService } from 'src/flash-sale/flash-sale.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('book')
export class BookController {
  constructor(
    private books: BookService,
    @Inject(forwardRef(() => FlashSaleService))
    private flashSale: FlashSaleService,
  ) {}

  // @Roles(Role.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  @Get()
  async findAll() {
    const getAllBooks = await this.books.fetchAll();
    return getAllBooks;
  }

  // @Roles(Role.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  async findIdProduct(@Param('id') id: string) {
    return this.books.fetchId(id);
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UsePipes(ValidationPipe)
  async addNew(@Body() createNewBooks: Book) {
    return this.books.create({ ...createNewBooks, buyQuantity: 0 });
  }

  @Patch(':id')
  //"6484b9521b6644d842b95f43"
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async editId(@Param('id', ParseIntPipe) id: string, @Body() book: Book) {
    let fetchBooks = await this.books.edit(id, book);
    return fetchBooks;
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch('updateFlashSale/:idProduct/:idFlashSale')
  async updateFlashSale(
    @Param('idFlashSale') idFlashSale: string,
    @Param('idProduct') idProduct: string,
  ) {
    let getIdProduct = await this.books.fetchId(idProduct);
    let flashSaleId = await this.flashSale.findId(idFlashSale);
    if (flashSaleId.saleQuantity > getIdProduct.quantity) {
      throw new Error('Quantity in the books not > quantity flashsale');
    }
    if (getIdProduct.flashSale) {
      throw new Error('Have Flash Sale');
    }
    let fetchBooks = await this.books.edit(idProduct, {
      ...getIdProduct,
      flashSale: idFlashSale,
    });
    return fetchBooks;
  }

  @Delete(':id')
  async removeIdProduct(@Param('id') id: string) {
    return await this.books.delete(id);
  }
}
