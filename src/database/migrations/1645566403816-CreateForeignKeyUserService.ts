import {
    MigrationInterface, 
    QueryRunner,
    TableForeignKey,
    TableColumn
} from "typeorm";

export class CreateForeignKeyOrdersType1645566403816 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.addColumn("services", new TableColumn({
            name: 'id_user',
            type: 'uuid',
            isNullable: true, 
        }));

        await queryRunner.createForeignKey(
            "services",
            new TableForeignKey({
              name: "FKServiceUser",
              referencedTableName: "users",
              referencedColumnNames: ["id"],
              columnNames: ["id_user"],
              onDelete: "SET NULL",
              onUpdate: "SET NULL",
            })
        );
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('services', 'FKServiceUser');
        await queryRunner.dropColumn('services', 'id_type');
    }
}