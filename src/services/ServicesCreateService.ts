import { getCustomRepository, Repository } from "typeorm";
import { ServicesRepository } from "../repositories/ServicesRepository";
import { SituationsRepository } from "../repositories/SituationsRepository";
import { OrdersRepository } from "../repositories/OrdersRepository";
import { Situation } from "entities/Situation";
import { Order } from "entities/Order";
import { Address } from "entities/Address";
import { Service } from "entities/Service";

interface IServicesCreateDTO{
  situation: Situation;
  order: Order;
  address: Address;
  initial_date: Date;
}

class ServicesCreateService {
  private servicesRepository: Repository<Service>
  private situationsRepository: Repository<Situation>
  private ordersRepository: Repository<Order>

  constructor(){
    this.servicesRepository = getCustomRepository(ServicesRepository);
    this.situationsRepository = getCustomRepository(SituationsRepository);
    this.ordersRepository = getCustomRepository(OrdersRepository);
  }

  async create({
    situation,
    order,
    address,
    initial_date
   }: IServicesCreateDTO){

    const pointAlreadyExists = await this.servicesRepository.findOne({
      where: {
        order
      }
    })

    if(pointAlreadyExists){
      return pointAlreadyExists
    }

    const service = this.servicesRepository.create({
      situation,
      order,
      initial_date,
      address
    });
    
    await this.servicesRepository.save(service);

    return service;

  }

}

export default ServicesCreateService 