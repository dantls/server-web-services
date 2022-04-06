import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateFNAndTG1649275742060 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create or replace function FN_CHECK_BILLED()
            returns trigger AS
            $$
            DECLARE
            exist BOOLEAN;
            
            begin 
                
                perform true 
                from services s 
                where id_order = new.id_order 
                and initial_date is not null 
                and final_date is null;
                
                exist = found;
            
                IF exist THEN 
                    RAISE EXCEPTION 'DB-Service already exists.';
                END IF;
            
                return new;
            end;
            $$ 
            LANGUAGE plpgsql;       
            
            create trigger TG_CHECK_BILLED
                before 
                insert 
                on SERVICES 
                    for each row 
                    execute function 
                        FN_CHECK_BILLED();
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP trigger "tg_check_billed" on services;
            DROP FUNCTION public.fn_check_billed();	
        `);
    }

}
