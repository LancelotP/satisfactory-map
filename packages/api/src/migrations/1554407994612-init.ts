import {MigrationInterface, QueryRunner} from "typeorm";

export class init1554407994612 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "drop_pod" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "originId" character varying NOT NULL, "itemName" character varying, "itemQuantity" integer, "powerNeeded" integer, CONSTRAINT "PK_3352ad0cd310e9df5da986cba9b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marker" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "targetType" text NOT NULL, "targetId" integer NOT NULL, "x" double precision NOT NULL, "y" double precision NOT NULL, "z" double precision NOT NULL, "obstructed" boolean NOT NULL DEFAULT false, "information" character varying, CONSTRAINT "PK_4fcc1745db9d8f74d18c84f15a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resource_node" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "quality" text NOT NULL, "type" text NOT NULL, "originId" character varying NOT NULL, CONSTRAINT "PK_bd55832db9b27a72692cbc617dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "slug" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "type" text NOT NULL, "originId" character varying NOT NULL, CONSTRAINT "PK_f972f08642fd0b16191e5a4fdb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying, "lastName" character varying, "email" character varying NOT NULL, "sub" character varying NOT NULL, "userName" character varying, CONSTRAINT "UQ_3641ff83ff7c23b2760b3df56d4" UNIQUE ("sub"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "slug"`);
        await queryRunner.query(`DROP TABLE "resource_node"`);
        await queryRunner.query(`DROP TABLE "marker"`);
        await queryRunner.query(`DROP TABLE "drop_pod"`);
    }

}
