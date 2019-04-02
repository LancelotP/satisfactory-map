import {MigrationInterface, QueryRunner} from "typeorm";

export class addDropPodsRequirements1554225644813 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "drop_pod" ADD "itemName" character varying`);
        await queryRunner.query(`ALTER TABLE "drop_pod" ADD "itemQuantity" integer`);
        await queryRunner.query(`ALTER TABLE "drop_pod" ADD "powerNeeded" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "drop_pod" DROP COLUMN "powerNeeded"`);
        await queryRunner.query(`ALTER TABLE "drop_pod" DROP COLUMN "itemQuantity"`);
        await queryRunner.query(`ALTER TABLE "drop_pod" DROP COLUMN "itemName"`);
    }

}
