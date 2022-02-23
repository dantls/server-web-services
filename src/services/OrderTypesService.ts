import { OrderTypes } from "entities/OrderTypes";
import { getCustomRepository, Repository } from "typeorm";
import { OrderTypesRepository } from "../repositories/OrderTypesRepository";

interface IOrderTypesCreateDTO{
  description: string;
}

class OrderTypesService {
  private orderTypesRepository: Repository<OrderTypes>

  constructor(){
    this.orderTypesRepository = getCustomRepository(OrderTypesRepository);
  }

  async create({ description}: IOrderTypesCreateDTO){

    const orderTypesAlreadyExists = await this.orderTypesRepository.findOne({
      description
    })

    if(orderTypesAlreadyExists){
      return orderTypesAlreadyExists
    }

    const orderTypes = this.orderTypesRepository.create({
     description
    });
    
    await this.orderTypesRepository.save(orderTypes);

    return orderTypes;

  }

}

export default OrderTypesService 