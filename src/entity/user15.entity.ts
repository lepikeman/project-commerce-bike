import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('tb_test')
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  hashedRefreshToken: string;

  @Column({ unique: true })
  email_user: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
