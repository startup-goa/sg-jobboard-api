import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMuser1604736185835 implements MigrationInterface {
    name = 'CreateMuser1604736185835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "companyEmail" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "UQ_f0641328989fcb4a92496a07c11" UNIQUE ("companyEmail")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "UQ_f0641328989fcb4a92496a07c11"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "companyEmail"`);
    }

}
