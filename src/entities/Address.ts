import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Situation } from "./Situation";


@Entity("address")
class Address {

  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @JoinColumn({name: "id_status"})
  @ManyToOne(()=> Situation)
  situation: Situation;

  @Column()
  id_situation: string;

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

export {Address}