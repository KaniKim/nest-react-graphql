import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUser1652573836957 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE users (
                id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
                email VARCHAR(20) NOT NULL UNIQUE,
                password VARCHAR(200) NOT NULL,
                name VARCHAR NOT NULL,
                phone VARCHAR NOT NULL,
                created_at Date NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at Date NOT NULL DEFAULT CURRENT_TIMESTAMP
            )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "users"
    `);
  }

}
