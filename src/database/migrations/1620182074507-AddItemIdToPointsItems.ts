import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddItemIdToPointsItems1620182074507 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'points_items',
            new TableColumn({
                name: 'item_id',
                type: 'uuid',
                isNullable: true
            })
        )
        await queryRunner.createForeignKey(
            'points_items',
            new TableForeignKey({
                name: 'PointsItemsItem',
                columnNames: ['item_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'items',
                onUpdate: `CASCADE`,
                onDelete: `SET NULL`
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('points_items', 'PointsItemsItem' )
        await queryRunner.dropColumn('points_items', 'point_id' )
    }

}
