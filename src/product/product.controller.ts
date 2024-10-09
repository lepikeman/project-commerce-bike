import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes } from "@nestjs/common";
import { ProductService } from './product.service';
import { Product } from "../entity/product.entity";
import { CreateProductDto } from "./dto-products/create-product.dto";
import { UpdateProductDto } from "./dto-products/update-product.dto";
import { TrimPipe } from "../utility/trimPipe";

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
  @UsePipes(TrimPipe)
  create(@Body() createProductDto: CreateProductDto){
    return this.productService.create(createProductDto);
  }
//get By ID
  @Get('/get:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }
  //Delete : /products/delete/id
  @Delete('/delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }

  @Put('/update/:id')
  update(@Param('id', ParseIntPipe) id: number,
         @Body() updateProductDto: UpdateProductDto){
    return this.productService.updateProduct(id, updateProductDto);
  }

}




