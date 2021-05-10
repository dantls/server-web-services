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
      where: {
        final_date: IsNull()
      },
      relations: ["order","address","situation"] 
    })      
    
    return services;

  }

}

export default ServicesCreateService 