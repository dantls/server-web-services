import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddPointIdToPointsItems1620181552143 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'points_items',
            new TableColumn({
                name: 'point_id',
                type: 'uuid',
                isNullable: true
            })
        )
        await queryRunner.createForeignKey(
            'points_items',
            new TableForeignKey({
                name: 'PointsItemsPoint',
                columnNames: ['point_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'points',
                onUpdate: `CASCADE`,
                onDelete: `SET NULL`
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('points_items', 'PointsItemsPoint' )
        await queryRunner.dropColumn('points_items', 'point_id' )
    }

}
