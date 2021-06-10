import { Column,  Entity, PrimaryColumn ,UpdateDateColumn,CreateDateColumn} from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity("situations")
class Situation {

  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}

export {Situation}
