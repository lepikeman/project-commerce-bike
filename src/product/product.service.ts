import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from "./dto/create-product.dto";

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
  }
