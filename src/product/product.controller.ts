// @ts-ignore
// @ts-ignore

import { Controller, Get, Param, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from "./product.entity";
import { FindOneOptions } from "typeorm";

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  //Get All
  @Get()
  async findAll(@Req() request: Request): Promise<Product[]> {
    try {
      return await this.productService.findAll();
    } catch (error) {
      console.error('Erreur');
      throw error;
    }
  }
  //get By ID
  @Get('/get:id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Get('/factorynew')
  findNew(@Param() factorynew: string) {
    return this.productService.findNew(factorynew);
  }

  @Get('/factoryold')
  findOld(@Param() factorynew: string) {
    return this.productService.findOld(factorynew);
  }
}





