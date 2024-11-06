import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1730911554945 implements MigrationInterface {
  name = 'PostRefactoring1730911554945';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_orders" ADD "paid" boolean NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tb_orders" DROP COLUMN "paid"`);
  }
}

//npx typeorm-ts-node-commonjs migration:generate ./src/migrations/PostRefactoring -d src/data-source.ts