import {MigrationInterface,TableUnique, QueryRunner} from "typeorm";

export class CreateUniqueKey1648222984037 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const orderUniqueConstraint = new TableUnique({
            name: 'orderDescription' ,
            columnNames: ["description"]
        })

        await queryRunner.createUniqueConstraint(
            "orders",
            orderUniqueConstraint,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropUniqueConstraint(
            "orders",
            'orderDescription'   
        )

    }

}
