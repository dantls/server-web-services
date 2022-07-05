import {MigrationInterface, QueryRunner,TableForeignKey,TableColumn} from "typeorm";

export class CreateAddFieldAddressType1656543055314 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.addColumn("addresses", new TableColumn({
            name: 'site',
            type: 'varchar',
            isNullable: true, 
        }));


    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropColumn('addresses', 'site');
    }

}
