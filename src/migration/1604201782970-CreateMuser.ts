import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMuser1604201782970 implements MigrationInterface {
    name = 'CreateMuser1604201782970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_application" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "job_application" ADD "type" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_application" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "job_application" ADD "type" character varying(500)`);
    }

}
