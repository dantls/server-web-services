import {
     MigrationInterface,
     QueryRunner,
     TableForeignKey
    } from "typeorm";

export class CreateForeignKeyAddressSituation1623268820971 implements MigrationInterface {      
    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.createForeignKey(
        'addresses',
        new TableForeignKey({
            name: 'AddressSituation',
            columnNames: ['id_situation'],
            referencedColumnNames: ['id'],
            referencedTableName: 'situations',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }),
        );
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('addresses', 'AddressSituation');
    }
}
