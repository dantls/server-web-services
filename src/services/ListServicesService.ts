import { Any, getCustomRepository, IsNull, Repository } from "typeorm";
import { ServicesRepository } from "../repositories/ServicesRepository";
import { Service } from "entities/Service";

class ServicesCreateService {
  private servicesRepository: Repository<Service>
  constructor(){
    this.servicesRepository = getCustomRepository(ServicesRepository);
  }

  async execute(){

    const services = await this.servicesRepository.find({
      relations: ["order","address","situation","order.ordertypes"],
      where: {
        final_date: IsNull()
      },
    }) 

    const formmatedLists = services.reduce((acc,service) => {
      if(!(acc.find(item => item.title === service.address.description )))
        acc.push({
          title: service.address.description,
          cards: [{
            id: service.id,
            content: service.order.description,
            label: service.situation.description === 'Faturado'? 'blue' : 'green',
            order_create: service.order.created_at,
            order_type: service.order?.ordertypes?.description,
          }]
        })   
      else {
        const obj = acc.find(item => item.title === service.address.description)
        obj['cards'].push({
          id: service.id,
          content: service.order.description,
          label: service.situation.description === 'Faturado'? 'blue' : 'green',
          order_create: service.order.created_at,
          order_type: service.order?.ordertypes?.description ,
        })

      }  
      return acc
         
    },[]);
    

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

  }

}

export default ServicesCreateService 
