import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { config } from 'dotenv';
import { Product } from './product/product.entity';
import { DataSource } from "typeorm";
config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '140815',
      database: 'db_ecommerce_bike',
      entities: [Product],
      synchronize: false,
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
  }
}
