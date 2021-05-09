import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Service } from "./Service";
import { Situation } from "./Situation";


@Entity("orders")
class Order {

  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }

  @JoinColumn({name: "id_situation"})
  @ManyToOne(()=> Situation)
  situation: Situation;

  @Column()
  id_situation: string;

  // @ManyToOne(()=> Service)
  // service?: Service;

  // @Column()
  // id_service?: string;

  // @UpdateDateColumn()
  // updated_at: Date;


  // @CreateDateColumn()
  // created_at: Date;

 
}

export {Order}