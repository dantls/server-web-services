import {MigrationInterface, QueryRunner,TableForeignKey,TableColumn} from "typeorm";

export class CreateForeignServiceFinalAddress1650140795248 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.addColumn("services", new TableColumn({
            name: 'id_final_addresses',
            type: 'uuid',
            isNullable: true, 
        }));

        await queryRunner.createForeignKey(
        'services',
        new TableForeignKey({
            name: 'ServicesFinalAddresses',
            columnNames: ['id_final_addresses'],
            referencedColumnNames: ['id'],
            referencedTableName: 'final_addresses',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }),
        );
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('services', 'ServicesFinalAddresses');
        await queryRunner.dropColumn('services', 'id_final_addresses');
    }

}
