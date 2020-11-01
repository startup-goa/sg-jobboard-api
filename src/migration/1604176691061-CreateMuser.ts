/* eslint-disable quotes */
import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMuser1604176691061 implements MigrationInterface {
    name = 'CreateMuser1604176691061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" ADD "cvPath" character varying(1000) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "cvPath"`);
    }

}
