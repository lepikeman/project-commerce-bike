import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1731171954857 implements MigrationInterface {
    name = 'Migrations1731171954857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_orders" ADD "delivered" boolean`);
        await queryRunner.query(`ALTER TABLE "tb_orders" ADD "paid" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_orders" ADD "deleteAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "tb_users" ADD "hashed_refresh_token" character varying`);
        await queryRunner.query(`ALTER TABLE "tb_users" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "tb_users" ADD CONSTRAINT "UQ_4402e5176d3d51b228b3466d07e" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "tb_users" ADD CONSTRAINT "UQ_a597dc3c2f6247cc07cb69a2297" UNIQUE ("email_user")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_users" DROP CONSTRAINT "UQ_a597dc3c2f6247cc07cb69a2297"`);
        await queryRunner.query(`ALTER TABLE "tb_users" DROP CONSTRAINT "UQ_4402e5176d3d51b228b3466d07e"`);
        await queryRunner.query(`ALTER TABLE "tb_users" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "tb_users" DROP COLUMN "hashed_refresh_token"`);
        await queryRunner.query(`ALTER TABLE "tb_orders" DROP COLUMN "deleteAt"`);
        await queryRunner.query(`ALTER TABLE "tb_orders" DROP COLUMN "paid"`);
        await queryRunner.query(`ALTER TABLE "tb_orders" DROP COLUMN "delivered"`);
    }

}
