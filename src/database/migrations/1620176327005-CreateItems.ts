import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePointItems1620176327005 implements MigrationInterface {
        public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({ 
                    name: 'items',
                    columns: [
                        { 
                            name: 'id',
                            type: "uuid",
                            isPrimary: true,
                        },                          
                        { 
                            name: 'image',
                            type: "varchar",
                        },                          
                        { 
                            name: 'title',
                            type: "varchar",
                        },                                            
                        {
                            name: "updated_at",
                            type: "timestamp",
                            default: "now()",
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()",
                        },
                    ],
                })
            )
        }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("items");
    }

}
