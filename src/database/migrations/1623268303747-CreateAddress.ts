import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAddress1623268303747 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'addresses',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'description',
                    type: 'varchar',
                },           
                {
                    name: 'id_situation',
                    type: 'uuid',
                    isNullable: true, 
                    }, 
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('addresses');
      }

}
