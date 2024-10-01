import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  factorynew: boolean;

  @Column()
  description: string;
}