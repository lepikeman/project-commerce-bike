import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}