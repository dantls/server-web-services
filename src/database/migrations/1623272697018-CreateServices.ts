import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey
} from "typeorm";

export class CreateServices1623272697018 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "services",
            columns: [
              {
                name: "id",
                type: "uuid",
                isPrimary: true,
              },
              {
                name: "id_order",
                type: "uuid",
                isNullable: true,
              },
              {
                name: "id_address",
                type: "uuid",
                isNullable: true,
              },
              {
                name: "id_situation",
                type: "uuid",
                isNullable: true,
              },
              {
                name: 'initial_date',
                type: 'timestamp with time zone',
                isNullable: true,
              },
              {
                name: 'final_date',
                type: 'timestamp with time zone',
                isNullable: true,
              },
              {
                name: "created_at",
                type: "timestamp",
                default: "now()",
              },
              {
                name: "updated_at",
                type: "timestamp",
                default: "now()",
              },
            ],
          })
        );
    
        await queryRunner.createForeignKey(
          "services",
          new TableForeignKey({
            name: "FKServiceOrder",
            referencedTableName: "orders",
            referencedColumnNames: ["id"],
            columnNames: ["id_order"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          })
        );
        await queryRunner.createForeignKey(
          "services",
          new TableForeignKey({
            name: "FKServiceAddress",
            referencedTableName: "addresses",
            referencedColumnNames: ["id"],
            columnNames: ["id_address"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          })
        );
        await queryRunner.createForeignKey(
          "services",
          new TableForeignKey({
            name: "FKServiceSituation",
            referencedTableName: "situations",
            referencedColumnNames: ["id"],
            columnNames: ["id_situation"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("services", "FKServiceOrder");
        await queryRunner.dropForeignKey("services", "FKServiceAddress");
        await queryRunner.dropForeignKey("services", "FKServiceSituation");
        await queryRunner.dropTable("services");
      }

}
