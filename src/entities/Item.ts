import { Column, CreateDateColumn, Entity , OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { PointsItems } from "./PointsItems";


@Entity("items")
class Item {

  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @OneToMany(type => PointsItems, point_items => point_items.item , {
    eager: true,
    cascade: true,
  })
  point_items: PointsItems[];


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

export {Item}