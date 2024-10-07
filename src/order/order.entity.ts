import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Product } from "../product/product.entity";

@Entity('tb_orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_date: Date;

  @Column()
  user_id: number;

  @Column()
  product_id: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product, (product) => product.orders)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}