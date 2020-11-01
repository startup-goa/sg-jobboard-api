/* eslint-disable quotes */
import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMuser1604177142609 implements MigrationInterface {
    name = 'CreateMuser1604177142609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_909867e55cc94e350ae38383cb5"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "PK_e04b6157d8ef1cd5bc4ab5ba333"`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "PK_f6ebb8bc5061068e4dd97df3c77" PRIMARY KEY ("jobId")`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "applicantId"`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "applicantemail" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "PK_f6ebb8bc5061068e4dd97df3c77"`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "PK_6120ead4cb2a6e79e251402c431" PRIMARY KEY ("jobId", "applicantemail")`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "applicantmessage" character varying(1000)`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "applicantfullName" character varying(500)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "applicantfullName"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "applicantmessage"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "PK_6120ead4cb2a6e79e251402c431"`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "PK_f6ebb8bc5061068e4dd97df3c77" PRIMARY KEY ("jobId")`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "applicantemail"`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "applicantId" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "PK_f6ebb8bc5061068e4dd97df3c77"`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "PK_e04b6157d8ef1cd5bc4ab5ba333" PRIMARY KEY ("jobId", "applicantId")`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_909867e55cc94e350ae38383cb5" FOREIGN KEY ("applicantId") REFERENCES "applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
