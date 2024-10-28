import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../entity/product.entity';
import { CreateProductDto } from './dto-products/create-product.dto';
import { UpdateProductDto } from './dto-products/update-product.dto';
import { TrimPipe } from '../utility/trimPipe';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  //Get all products (with optional filter)
  @Get()
  async findAll(@Query('factorynew') factorynew: string): Promise<Product[]> {
    try {
      if (factorynew) {
        return factorynew === 'true'
          ? this.productService.findNew()
          : this.productService.findOld();
      }
      return this.productService.findAll();
    } catch (error) {
      throw new HttpException('Cannot find product', HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @UsePipes(TrimPipe)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createProductDto: CreateProductDto) {
    const product = this.productService.create(createProductDto);
    if (!product) {
      throw new HttpException('Error creating product', HttpStatus.BAD_REQUEST);
    }
    return {
      status: HttpStatus.CREATED,
      message: 'Product created',
      data: product,
    };
  }

  //get By ID
  @Get('/get:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const product = this.productService.findOne(id);
    if (!product) {
      throw new HttpException('Error finding product', HttpStatus.BAD_REQUEST);
    }
    return {
      status: HttpStatus.OK,
      message: 'Product with ID',
      data: product,
    };
  }

  //Delete : /products/delete/id
  @Delete('/delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    const product = this.productService.delete(id);
    if (!product) {
      throw new HttpException('Error deleting product', HttpStatus.BAD_REQUEST);
    }
    return {
      status: HttpStatus.OK,
      message: 'Product with ID deleted successfully',
      data: product,
    };
  }

  @Put('/update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = this.productService.updateProduct(id, updateProductDto);
    if (!product) {
      throw new HttpException('Error updating product', HttpStatus.BAD_REQUEST);
    }
    return {
      status: HttpStatus.OK,
      message: 'Product with ID updated successfully',
      data: product,
    };
  }
}
