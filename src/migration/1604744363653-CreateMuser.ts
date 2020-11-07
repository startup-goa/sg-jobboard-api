import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMuser1604744363653 implements MigrationInterface {
    name = 'CreateMuser1604744363653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_application" ADD "experiencemin" double precision NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "job_application" ADD "experiencemax" double precision NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_application" DROP COLUMN "experiencemax"`);
        await queryRunner.query(`ALTER TABLE "job_application" DROP COLUMN "experiencemin"`);
    }

}
