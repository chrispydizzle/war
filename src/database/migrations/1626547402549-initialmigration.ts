import { MigrationInterface, QueryRunner } from 'typeorm'

export class initialmigration1626547402549 implements MigrationInterface {
  name = 'initialmigration1626547402549'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "player" ("id" SERIAL NOT NULL, CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "game" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "winnerId" integer, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "game_loser_player" ("gameId" integer NOT NULL, "playerId" integer NOT NULL, CONSTRAINT "PK_793ae38b55dc2eccf784593a4cf" PRIMARY KEY ("gameId", "playerId"))')
    await queryRunner.query('CREATE INDEX "IDX_36afec02e001961e186e22e076" ON "game_loser_player" ("gameId") ')
    await queryRunner.query('CREATE INDEX "IDX_912cc76a55da1a842ab226445d" ON "game_loser_player" ("playerId") ')
    await queryRunner.query('ALTER TABLE "game" ADD CONSTRAINT "FK_cd57acb58d1147c23da5cd09cae" FOREIGN KEY ("winnerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "game_loser_player" ADD CONSTRAINT "FK_36afec02e001961e186e22e076a" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE')
    await queryRunner.query('ALTER TABLE "game_loser_player" ADD CONSTRAINT "FK_912cc76a55da1a842ab226445d9" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "game_loser_player" DROP CONSTRAINT "FK_912cc76a55da1a842ab226445d9"')
    await queryRunner.query('ALTER TABLE "game_loser_player" DROP CONSTRAINT "FK_36afec02e001961e186e22e076a"')
    await queryRunner.query('ALTER TABLE "game" DROP CONSTRAINT "FK_cd57acb58d1147c23da5cd09cae"')
    await queryRunner.query('DROP INDEX "IDX_912cc76a55da1a842ab226445d"')
    await queryRunner.query('DROP INDEX "IDX_36afec02e001961e186e22e076"')
    await queryRunner.query('DROP TABLE "game_loser_player"')
    await queryRunner.query('DROP TABLE "game"')
    await queryRunner.query('DROP TABLE "player"')
  }
}
