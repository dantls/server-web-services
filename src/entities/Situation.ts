import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid'


@Entity("situation")
class Situation {

  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  // @UpdateDateColumn()
  // updated_at: Date;

  // @CreateDateColumn()
  // created_at: Date;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}

export {Situation}
