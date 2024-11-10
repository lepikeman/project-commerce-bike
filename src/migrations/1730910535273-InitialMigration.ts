import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1730910535273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE tb_users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(100) NOT NULL,
          password VARCHAR(100) NOT NULL,
          email_user VARCHAR(100) NOT NULL,
          hashed_refresh_token VARCHAR(100),
          deleted_at DATE
      );
      CREATE TABLE tb_products (
          id SERIAL PRIMARY KEY,
          product_name VARCHAR(100) NOT NULL,
          price NUMERIC NOT NULL,
          description VARCHAR(255) NOT NULL,
          factorynew BOOLEAN NOT NULL
      );
      CREATE TABLE tb_orders (
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES tb_users(id),
          product_id INT REFERENCES tb_products(id),
          delivered BOOLEAN NOT NULL,
          deleted_at DATE,
          order_date DATE,
          paid BOOLEAN NOT NULL
          
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE tb_orders;
      DROP TABLE tb_products;
      DROP TABLE tb_users;
    `);
  }
}
