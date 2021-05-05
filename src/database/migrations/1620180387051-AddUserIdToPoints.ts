import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserIdToPoints1620180387051 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'points',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: true
            })
        )
        await queryRunner.createForeignKey(
            'points',
            new TableForeignKey({
                name: 'PointsUser',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onUpdate: `CASCADE`,
                onDelete: `SET NULL`
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('points', 'PointsUser' )
        await queryRunner.dropColumn('points', 'user_id' )

    }

}
