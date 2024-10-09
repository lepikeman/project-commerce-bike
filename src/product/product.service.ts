import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { CreateProductDto } from "./dto-products/create-product.dto";
import { UpdateProductDto } from "./dto-products/update-product.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        throw new Error(`Product with id ${id} not found`);
      }
      return product;
    } catch (error) {
      throw new Error(`Product with id ${id}: ${error.message}`);
    }

  }
  async findNew(): Promise<Product[]> {
    try {
    const product = await this.productRepository.find({
      where: {
        factorynew: true
      },
    })
    if (!product) {
      throw new Error(`Product not found`);
    }
    return product;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  async findOld(): Promise<Product[]> {
    try {
      const product = await this.productRepository.find({
        where: {
          factorynew: false
        },
      })
      if (!product) {
        throw new Error(`Product not found`);
      }
      return product;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

    async create(product: CreateProductDto) {
      const newProduct = this.productRepository.create(product);
      return await this.productRepository.save(newProduct);
    }

    async delete(id: number) {
      try {
        const result = await this.productRepository.delete(id);
        if(result.affected === 0) {
          throw new Error(`Product with id ${id} not found`);
        }
        console.log(`Product with id ${id} deleted`);
      } catch (error) {
        console.log(`Error deleting product with id ${id} - ${error.message}`);
        throw new Error(`${error.message}`);
      }
    }

    async updateProduct(id: number, updateProduct: UpdateProductDto) {
      try {
        console.log(`Updating product with id: ${id}`);

        const product = await this.productRepository.findOne({ where: { id } })
        if (!product) {
          throw new Error(`Product with id ${id} not found`);
        }
        console.log(`Product found: ${JSON.stringify(product)}`);

        await this.productRepository.update(id, updateProduct);
        console.log(`Product updated with data: ${JSON.stringify(updateProduct)}`);

        return await this.productRepository.findOne({ where: { id } })
      }catch (error) {
        console.error(`Error updating product: ${error.message}`);
        throw new Error(`${error.message}`);
      }
    }
  }
