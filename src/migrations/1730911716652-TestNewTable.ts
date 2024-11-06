import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestNewTable1730911716652 implements MigrationInterface {
  name = 'TestNewTable1730911716652';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tb_test" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "hashedRefreshToken" character varying, "email_user" character varying NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_3c5c18f131aa74c13fba02661fa" UNIQUE ("username"), CONSTRAINT "UQ_08b2dfbafee924f70c405fa1f40" UNIQUE ("email_user"), CONSTRAINT "PK_008b0bfcaa53be388aa80921264" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tb_test"`);
  }
}
