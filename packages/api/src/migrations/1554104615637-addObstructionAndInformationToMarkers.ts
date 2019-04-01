import {MigrationInterface, QueryRunner} from "typeorm";

export class addObstructionAndInformationToMarkers1554104615637 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "marker" ADD "obstructed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "marker" ADD "information" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "marker" DROP COLUMN "information"`);
        await queryRunner.query(`ALTER TABLE "marker" DROP COLUMN "obstructed"`);
    }

}
