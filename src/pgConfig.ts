import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { config } from 'dotenv';
config()
export const pgConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname+'/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: true,
}