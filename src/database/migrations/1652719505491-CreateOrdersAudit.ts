import {
    MigrationInterface,
    QueryRunner,
    Table
} from "typeorm";


export class CreateOrdersAudit1652719505491 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "orders_audit",
            columns: [
              {
                name: "id",
                type: "uuid",
                isPrimary: true,
              },
              {
                name: "id_user",
                type: "uuid",
                isNullable: true,
              },
              {
                name: 'user',
                type: 'varchar',
              },
              {
                name: 'order',
                type: 'varchar',
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
    
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("orders_audit");
      }
}
