/* eslint-disable quotes */
import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMuser1604143721443 implements MigrationInterface {
    name = 'CreateMuser1604143721443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "applicant" ("id" BIGSERIAL NOT NULL, "cvPath" character varying(1000) NOT NULL, "message" character varying(1000), "fullName" character varying(500), "email" character varying(500), "active" boolean NOT NULL DEFAULT true, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f4a6e907b8b17f293eb073fc5ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("compId" SERIAL NOT NULL, "companyName" character varying(200) NOT NULL, "phoneNumber" character varying(15) NOT NULL, "tagline" character varying(1000), "description" character varying(1000), "video" character varying(1000), "website" character varying(1000), "facebookPage" character varying(1000), "linkedinPage" character varying(1000), "logo" character varying(1000), "password" character varying(500) NOT NULL, "active" boolean NOT NULL DEFAULT true, "approved" boolean NOT NULL DEFAULT false, "passwordPpdate_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a7018eb2ac7b827608ba6856ca7" UNIQUE ("companyName"), CONSTRAINT "PK_0e66fd2d3b1364af263eb63d3c6" PRIMARY KEY ("compId"))`);
        await queryRunner.query(`CREATE TABLE "job_application" ("jobId" BIGSERIAL NOT NULL, "compId" integer NOT NULL, "jobTitle" character varying(1000) NOT NULL, "location" character varying(500), "region" character varying(500), "type" character varying(500), "category" character varying(500), "active" boolean NOT NULL DEFAULT true, "phoneNumber" character varying(15), "description" character varying(15), "salarymin" double precision, "salarymax" double precision, "approved" boolean NOT NULL DEFAULT false, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d0452612ad9cb0e20f6f320ebc0" PRIMARY KEY ("jobId"))`);
        await queryRunner.query(`CREATE TABLE "applications" ("jobId" bigint NOT NULL, "applicantId" bigint NOT NULL, "active" boolean NOT NULL DEFAULT true, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e04b6157d8ef1cd5bc4ab5ba333" PRIMARY KEY ("jobId", "applicantId"))`);
        await queryRunner.query(`ALTER TABLE "job_application" ADD CONSTRAINT "FK_933f3da688aef38f6ea2a0361b1" FOREIGN KEY ("compId") REFERENCES "company"("compId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_f6ebb8bc5061068e4dd97df3c77" FOREIGN KEY ("jobId") REFERENCES "job_application"("jobId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_909867e55cc94e350ae38383cb5" FOREIGN KEY ("applicantId") REFERENCES "applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_909867e55cc94e350ae38383cb5"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_f6ebb8bc5061068e4dd97df3c77"`);
        await queryRunner.query(`ALTER TABLE "job_application" DROP CONSTRAINT "FK_933f3da688aef38f6ea2a0361b1"`);
        await queryRunner.query(`DROP TABLE "applications"`);
        await queryRunner.query(`DROP TABLE "job_application"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "applicant"`);
    }

}
