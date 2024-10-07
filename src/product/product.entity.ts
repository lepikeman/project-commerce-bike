import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../order/order.entity";

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

  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];
}