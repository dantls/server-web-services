import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Situation } from "./Situation";


@Entity("addresses")
class Address {

  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @JoinColumn({name: "id_situation"})
  @ManyToOne(()=> Situation)
  situation: Situation;

  @Column()
  id_situation: string;

  @Column()
  site: string;

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