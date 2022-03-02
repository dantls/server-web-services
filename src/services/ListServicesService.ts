// import { Any, getCustomRepository, IsNull, Repository } from "typeorm";
// import { ServicesRepository } from "../repositories/ServicesRepository";
import pool from '../database/dbconnector';
// import { Service } from "entities/Service";

type Row = {
  id: string;
  address: string;
  situation: string;
  ordertype: string;
  order: string;
  created_at: Date;
}

class ServicesCreateService {
  // private servicesRepository: Repository<Service>
  // constructor(){
  //   this.servicesRepository = getCustomRepository(ServicesRepository);
  // }

  async execute(){

    // const services = await this.servicesRepository.find({
    //   relations: ["order","address","situation","order.ordertypes"],
    //   where: {
    //     final_date: IsNull()
    //   },
    // });

    const client = await pool.connect();

      const sql = `select distinct 
       s.id as id,
       o.description as order,
       o.created_at as created_at,
       a.description as address , 
       s2.description as situation,
       o2.description as ordertype 
      from services as s
        left join orders o  
          on o.id = s.id_order
        left join addresses as a
          on a.id = s.id_address	
        left join situations s2 
          on s2.id = s.id_situation		
        left join ordertypes o2 
          on o2.id = o.id_type 
      where s.final_date isnull`;
    

     
    const {rows} = await client.query<Row>(sql);

    client.release();

    const formmatedLists = rows.reduce((acc,service) => {
      if(!(acc.find(item => item.address === service.address )))
        acc.push({
          title: service.address,
          cards: [{
            id: service.id,
            content: service.order,
            label: service.situation === 'Faturado'? 'blue' : 'green',
            order_created: service.created_at,
            order_type: service.ordertype,
          }]
        })   
      else {
        const obj = acc.find(item => item.address === service.address)
        obj['cards'].push({
          id: service.id,
          content: service.order,
          label: service.situation === 'Faturado'? 'blue' : 'green',
          order_created: service.created_at,
          order_type: service.ordertype,
        })

      }  
      return acc
         
    },[]);

    // const formmatedLists = rows.reduce((acc,service) => {
    //   if(!(acc.find(item => item.title === service.address.description )))
    //     acc.push({
    //       title: service.address.description,
    //       cards: [{
    //         id: service.id,
    //         content: service.order.description,
    //         label: service.situation.description === 'Faturado'? 'blue' : 'green',
    //         order_create: service.order.created_at,
    //         order_type: service.order?.ordertypes?.description,
    //       }]
    //     })   
    //   else {
    //     const obj = acc.find(item => item.title === service.address.description)
    //     obj['cards'].push({
    //       id: service.id,
    //       content: service.order.description,
    //       label: service.situation.description === 'Faturado'? 'blue' : 'green',
    //       order_create: service.order.created_at,
    //       order_type: service.order?.ordertypes?.description ,
    //     })

    //   }  
    //   return acc
         
    // },[]);
    

    (function orderListByOrderCreate(array: any){
      array.reduce((acc:any, item:any) => {
        item.cards.sort(function(a: any, b:any) {
            let x:any = new Date(a.order_create),
                y:any = new Date(b.order_create);
            return x - y;
        });
      },[]
      )
    })(formmatedLists);

     return formmatedLists;
    //return rows
  }

}

export default ServicesCreateService 
