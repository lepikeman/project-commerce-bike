import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  product_name: string;

  @Column()
  factorynew: boolean;

  @Column({ type: 'text' })
  description: string;
}