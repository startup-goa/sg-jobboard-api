import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMuser1604679109769 implements MigrationInterface {
    name = 'CreateMuser1604679109769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" ALTER COLUMN "cvPath" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" ALTER COLUMN "cvPath" SET NOT NULL`);
    }

}
