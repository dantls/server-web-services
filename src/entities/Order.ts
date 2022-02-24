import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
// import { Service } from "./Service";
import { Situation } from "./Situation";
import { OrderTypes } from "./OrderTypes";


@Entity("orders")
class Order {

  @PrimaryColumn()
  id: string;

  @Column()
  description: string; 

  @JoinColumn({name: "id_situation"})
  @ManyToOne(()=> Situation)
  situation: Situation;

  @Column()
  id_situation: string;

  @JoinColumn({name: "id_type"})
  @ManyToOne(()=> OrderTypes)
  ordertypes: OrderTypes;

  @Column()
  id_type: string;

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

export {Order}