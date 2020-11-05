import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMuser1604204869326 implements MigrationInterface {
    name = "CreateMuser1604204869326"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"company\" ADD \"companyDispName\" character varying(200) NOT NULL");
        await queryRunner.query("ALTER TABLE \"company\" ADD CONSTRAINT \"UQ_57c3708f62b852a2315d0bc6570\" UNIQUE (\"companyDispName\")");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"company\" DROP CONSTRAINT \"UQ_57c3708f62b852a2315d0bc6570\"");
        await queryRunner.query("ALTER TABLE \"company\" DROP COLUMN \"companyDispName\"");
    }

}
