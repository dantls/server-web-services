import { getCustomRepository, Repository } from "typeorm";
import { OrderTypesRepository } from "../repositories/OrderTypesRepository";
import { Situation } from "entities/Situation";

class ListOrderTypesService {
  private orderTypesRepository: Repository<Situation>
  constructor(){
    this.orderTypesRepository = getCustomRepository(OrderTypesRepository);
  }

  async execute(){

    const orderTypes = await this.orderTypesRepository.find()    
      
    return orderTypes;

  }

}

export default ListOrderTypesService 