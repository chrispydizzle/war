import { MigrationInterface, QueryRunner } from 'typeorm'

export class updates1626677478019 implements MigrationInterface {
  name = 'updates1626677478019'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "game" DROP CONSTRAINT "FK_cd57acb58d1147c23da5cd09cae"')
    await queryRunner.query('CREATE TABLE "game_winner_player" ("gameId" integer NOT NULL, "playerId" integer NOT NULL, CONSTRAINT "PK_c8cd135dcbdedf338fdd5962b91" PRIMARY KEY ("gameId", "playerId"))')
    await queryRunner.query('CREATE INDEX "IDX_31ab30d665c82eb8a3ea5eead9" ON "game_winner_player" ("gameId") ')
    await queryRunner.query('CREATE INDEX "IDX_8c47af0b4410b2dfbcaa04a974" ON "game_winner_player" ("playerId") ')
    await queryRunner.query('ALTER TABLE "game" DROP COLUMN "winnerId"')
    await queryRunner.query('ALTER TABLE "game_winner_player" ADD CONSTRAINT "FK_31ab30d665c82eb8a3ea5eead95" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE')
    await queryRunner.query('ALTER TABLE "game_winner_player" ADD CONSTRAINT "FK_8c47af0b4410b2dfbcaa04a974f" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "game_winner_player" DROP CONSTRAINT "FK_8c47af0b4410b2dfbcaa04a974f"')
    await queryRunner.query('ALTER TABLE "game_winner_player" DROP CONSTRAINT "FK_31ab30d665c82eb8a3ea5eead95"')
    await queryRunner.query('ALTER TABLE "game" ADD "winnerId" integer')
    await queryRunner.query('DROP INDEX "IDX_8c47af0b4410b2dfbcaa04a974"')
    await queryRunner.query('DROP INDEX "IDX_31ab30d665c82eb8a3ea5eead9"')
    await queryRunner.query('DROP TABLE "game_winner_player"')
    await queryRunner.query('ALTER TABLE "game" ADD CONSTRAINT "FK_cd57acb58d1147c23da5cd09cae" FOREIGN KEY ("winnerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }
}
