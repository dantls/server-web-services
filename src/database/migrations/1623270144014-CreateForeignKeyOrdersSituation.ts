import {
    MigrationInterface, 
    QueryRunner,
    TableForeignKey
} from "typeorm";

export class CreateForeignKeyOrdersSituation1623270144014 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.createForeignKey(
        'orders',
        new TableForeignKey({
            name: 'OrdersSituation',
            columnNames: ['id_situation'],
            referencedColumnNames: ['id'],
            referencedTableName: 'situations',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }),
        );
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders', 'OrdersSituation');
    }

}
