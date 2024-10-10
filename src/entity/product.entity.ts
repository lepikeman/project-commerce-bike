import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

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

  @Column()
  price: string;

  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];
}
