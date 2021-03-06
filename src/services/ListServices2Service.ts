// import { Any, getCustomRepository, IsNull, Repository } from "typeorm";
// import { ServicesRepository } from "../repositories/ServicesRepository";
import pool from '../database/pgconnector';
// import { Service } from "entities/Service";

type Row = {
  id: string;
  address: string;
  situation: string;
  ordertype: string;
  final_address: string;
  order: string;
  created_at: Date;
}

class ListServices2Service {
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
       o2.description as ordertype,
       fa.description as final_address
      from services as s
        left join orders o  
          on o.id = s.id_order
        left join addresses as a
          on a.id = s.id_address	
        left join situations s2 
          on s2.id = s.id_situation		
        left join ordertypes o2 
          on o2.id = o.id_type
        left join final_addresses fa 
          on fa.id = s.id_final_addresses 
      where s.final_date isnull and a.site = '2'`;
    

     
    const {rows} = await client.query<Row>(sql);

    client.release();

    let formmatedLists = rows.reduce((acc,service) => {
      if(!(acc.find(item => item.title === service.address )))
        acc.push({
          title: service.address,
          cards: [{
            id: service.id,
            content: service.order,
            label: (service.situation === 'Faturado' ) ? '#6699CC' 
            : (service.situation === 'Iniciado' ) ? '#37C871'
            : (service.situation === 'Cancelado' ) ? '#7E7E7E'
            : '#CD5C5C',
            order_created: service.created_at,
            order_type: service.ordertype,
            final_address: service.final_address
          }]
        })   
      else {
        const obj = acc.find(item => item.title === service.address)
        obj['cards'].push({
          id: service.id,
          content: service.order,
          label: (service.situation === 'Faturado' ) ? '#6699CC' 
          : (service.situation === 'Iniciado' ) ? '#37C871'
          : (service.situation === 'Cancelado' ) ? '#7E7E7E'
          : '#CD5C5C',
          order_created: service.created_at,
          order_type: service.ordertype,
          final_address: service.final_address
        })

      }  
      return acc
         
    },[]).map((item:any) => {
      return {
        ...item,
        'total': item.cards.length
      }
    });


    (function orderListByOrderCreate(array: any){
      array.reduce((acc:any, item:any) => {
        item.cards.sort(function(a: any, b:any) {
            let x:any = new Date(a.order_created),
                y:any = new Date(b.order_created);
            return x - y;
        });
      },[]
      )
    })(formmatedLists);



    return formmatedLists;
    //return rows
  }

}

export default ListServices2Service 
