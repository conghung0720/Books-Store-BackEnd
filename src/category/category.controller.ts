import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
  Res,
  HttpStatus,
  ParseIntPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Categories } from 'src/utils/type';
import { Category } from './category.dto';
import { Response } from 'express';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/utils/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { LocalStrategy } from 'src/auth/local.strategy';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private categories: CategoryService) {}

  @UseGuards(AuthGuard)
  @Get()
  // @Roles(Role.Admin)
  findAll(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK);
    return this.categories.fetchCategories();
  }

  @Roles('admin')
  @Delete('/delete/:id')
  deleteId(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.categories.delete(id);
  }
  @Roles('admin')
  @Get(':id')
  findId(
    @Param('id', ParseIntPipe)
    id: string,
  ) {
    return this.categories.findId(id);
  }

  @Post('/create')
  @Roles('admin')
  @UsePipes(ValidationPipe)
  async create(@Body() createNewCategory: Category) {
    let categoriesFull = await this.categories.fetchCategories();
    categoriesFull.map((value) => {
      if (value.name.toLowerCase() === createNewCategory.name.toLowerCase()) {
        throw new Error('Exist Name Category');
      }
    });
    return await this.categories.create(createNewCategory);
  }
}
