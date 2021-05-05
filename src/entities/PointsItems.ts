import {  Column, CreateDateColumn, Entity ,JoinColumn,ManyToOne,PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Item } from "./item";
import { Point } from "./Point";


@Entity("point_items")
class PointsItems {

  @PrimaryColumn()
  id: string;

  @ManyToOne(type => Point, point => point.point_items)
  @JoinColumn({ name: 'point_id' })
  point: Point;

  @Column()
  point_id: string;

  @ManyToOne(type => Item, item => item.point_items)
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @Column()
  item_id: string;



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

export {PointsItems}