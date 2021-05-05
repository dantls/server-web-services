import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePointItems1620179966940 implements MigrationInterface {

            public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.createTable(
                    new Table({ 
                        name: 'points_items',
                        columns: [
                            { 
                                name: 'id',
                                type: "uuid",
                                isPrimary: true,
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
            await queryRunner.dropTable("points_items");
        }
    
    
}
