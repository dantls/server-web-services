import {
    MigrationInterface, 
    QueryRunner,
    TableForeignKey,
    TableColumn
} from "typeorm";

export class CreateForeignKeyOrdersType1645566401816 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.addColumn("orders", new TableColumn({
            name: 'id_type',
            type: 'uuid',
            isNullable: true, 
        }));

        await queryRunner.createForeignKey(
        'orders',
        new TableForeignKey({
            name: 'OrdersType',
            columnNames: ['id_type'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ordertypes',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }),
        );
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders', 'OrdersType');
        await queryRunner.dropColumn('orders', 'id_type');
    }


}


