import { getCustomRepository, IsNull, Repository } from "typeorm";
import { ServicesRepository } from "../repositories/ServicesRepository";
import { Service } from "entities/Service";

class ServicesCreateService {
  private servicesRepository: Repository<Service>
  constructor(){
    this.servicesRepository = getCustomRepository(ServicesRepository);
  }

  async execute(){

    const services = await this.servicesRepository.find({
      relations: ["order","address","situation"],
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
            label: service.situation.description === 'Faturado'? 'blue' : 'green'
          }]
        })   
      else {
        const obj = acc.find(item => item.title === service.address.description)
        obj['cards'].push({
          id: service.id,
          content: service.order.description,
          label: service.situation.description === 'Faturado'? 'blue' : 'green'
        })

      }  
      return acc
         
    },[])
    
      
    return formmatedLists;

  }

}

export default ServicesCreateService 