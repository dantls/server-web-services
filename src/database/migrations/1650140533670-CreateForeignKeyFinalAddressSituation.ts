import {MigrationInterface, QueryRunner,TableForeignKey} from "typeorm";

export class CreateForeignKeyFinalAddressSituation1650140533670 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.createForeignKey(
        'final_addresses',
        new TableForeignKey({
            name: 'FinalAddressSituation',
            columnNames: ['id_situation'],
            referencedColumnNames: ['id'],
            referencedTableName: 'situations',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }),
        );
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('final_addresses', 'FinalAddressSituation');
    }

}
