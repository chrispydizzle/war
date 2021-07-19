import { MigrationInterface, QueryRunner } from 'typeorm'

export class addgamesuff1626686511565 implements MigrationInterface {
  name = 'addgamesuff1626686511565'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "game" ADD "rounds" integer NOT NULL DEFAULT 0')
    await queryRunner.query('ALTER TABLE "game" ADD "wars" integer NOT NULL DEFAULT 0')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "game" DROP COLUMN "wars"')
    await queryRunner.query('ALTER TABLE "game" DROP COLUMN "rounds"')
  }
}
