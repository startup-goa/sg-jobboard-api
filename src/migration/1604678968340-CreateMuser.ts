import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMuser1604678968340 implements MigrationInterface {
    name = 'CreateMuser1604678968340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" ADD "phonenumber" character varying(15) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "phonenumber"`);
    }

}
