import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { ProductService } from './product.service';
import { Product } from "./product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {
  }
//Get all products (with optional filter)
  @Get()
  async findAll(@Query('factorynew') factorynew: string): Promise<Product[]> {
    if (factorynew) {
      return factorynew === 'true'
        ? this.productService.findNew()
        : this.productService.findOld();
    }
    return this.productService.findAll();
  }
  @Post()
  create(@Body() product: CreateProductDto){
    return this.productService.create(product);
  }
//get By ID
  @Get('/get:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }
}




