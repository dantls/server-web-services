import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePoint1620008643582 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({ 
                name: 'points',
                columns: [
                    { 
                        name: 'id',
                        type: "uuid",
                        isPrimary: true,
                    },
                    { 
                        name: 'image',
                        type: "varchar",
                        isNullable: true,
                    },
                    { 
                        name: 'name',
                        type: "varchar",
                    },
                    { 
                        name: 'email',
                        type: "varchar",
                    },
                    { 
                        name: 'phone',
                        type: "varchar",
                    },
                    { 
                        name: 'whatsapp',
                        type: "varchar",
                    },
                    {
                        name: 'uf',
                        type: 'varchar',
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                    },
                    {
                        name: 'latitude',
                        type: 'decimal',
                    },
                    {
                        name: 'longitude',
                        type: 'decimal',
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                      name: "FKUser",
                      referencedTableName: "users",
                      referencedColumnNames: ["id"],
                      columnNames: ["user_id"],
                      onDelete: "SET NULL",
                      onUpdate: "SET NULL",
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("points");
    }

}
