import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Address } from "./Address";
import { FinalAddress } from "./FinalAddress";
import { Order } from "./Order";
import { Situation } from "./Situation";
import { User } from "./User";


@Entity("services")
class Service {

  @PrimaryColumn()
  id: string;  
  
  @JoinColumn({name: "id_order"})
  @ManyToOne(()=> Order , {
    cascade: true
  })
  order: Order;

  @Column()
  id_order: string;

  @JoinColumn({name: "id_address"})
  @ManyToOne(()=> Address)
  address: Address;

  @Column()
  id_address: string;

  @JoinColumn({name: "id_final_addresses"})
  @ManyToOne(()=> FinalAddress)
  final_address: Address;

  @Column()
  id_final_addresses: string;

  @JoinColumn({name: "id_situation"})
  @ManyToOne(()=> Situation)
  situation: Situation;

  @Column()
  id_user: string;

  
  @JoinColumn({name: "id_user"})
  @ManyToOne(()=> User)
  user: User;

  @Column()
  id_situation: string;

  @Column()
  initial_date: Date;

  @Column()
  final_date: Date;
  
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

export {Service}