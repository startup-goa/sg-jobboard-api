import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMuser1604584332715 implements MigrationInterface {
    name = "CreateMuser1604584332715"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE \"admin_user\" (\"userId\" SERIAL NOT NULL, \"userName\" character varying(200) NOT NULL, \"userDispName\" character varying(200) NOT NULL, \"phoneNumber\" character varying(15), \"password\" character varying(500) NOT NULL, \"active\" boolean NOT NULL DEFAULT true, \"passwordPpdate_time\" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, \"createdDate\" TIMESTAMP NOT NULL DEFAULT now(), \"updatedDate\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"UQ_875801b7f5a40a55ec996cc2691\" UNIQUE (\"userName\"), CONSTRAINT \"UQ_e8687ff238e88a25bcded0eedf0\" UNIQUE (\"userDispName\"), CONSTRAINT \"PK_a93ad905a72b85605fb28b26198\" PRIMARY KEY (\"userId\"))");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE \"admin_user\"");
    }

}
