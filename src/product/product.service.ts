import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }
  findNew(factorynew: string): Promise<Product[]> {
    return this.productRepository.find({
      where: {
        factorynew: true
      },
    })
  }

  findOld(factorynew: string): Promise<Product[]> {
    return this.productRepository.find({
      where: {
        factorynew: false
      },
    })
  }
}
