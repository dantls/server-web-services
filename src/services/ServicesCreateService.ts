import { getCustomRepository, Repository } from "typeorm";
import { ServicesRepository } from "../repositories/ServicesRepository";
import { SituationsRepository } from "../repositories/SituationsRepository";
import { OrdersRepository } from "../repositories/OrdersRepository";
import { AddressRepository } from "../repositories/AddressRepository";
import { Situation } from "entities/Situation";
import { Order } from "entities/Order";
import { Address } from "entities/Address";
import { Service } from "entities/Service";

interface IServicesCreateDTO{
  order: string;
  address: string;
}

class ServicesCreateService {
  private servicesRepository: Repository<Service>
  private ordersRepository: Repository<Order>
  private situationsRepository: Repository<Situation>
  private addressRepository: Repository<Address>

  constructor(){
    this.servicesRepository = getCustomRepository(ServicesRepository);
    this.ordersRepository = getCustomRepository(OrdersRepository);
    this.situationsRepository = getCustomRepository(SituationsRepository);
    this.addressRepository = getCustomRepository(AddressRepository);
  }

  async create({
    order,
    address,
   }: IServicesCreateDTO){

  
    const serviceAlreadyExists = await this.servicesRepository.findOne({
      where: {
        order
      }
    })

    if(serviceAlreadyExists){
      return serviceAlreadyExists
    }

    const serviceSituation = await this.situationsRepository.findOne({
      where: {
        description: 'Identificado'
      }
    })

    const newOrder = this.ordersRepository.create({
      description: order,
      situation: serviceSituation
    })

  
    const serviceAddress = await this.addressRepository.findOne({
      where: {
        description: address
      }
    })

    const service = this.servicesRepository.create({
      situation:serviceSituation ,
      order: newOrder,
      initial_date: new Date(Date.now()),
      address: serviceAddress
    });
    

    await this.servicesRepository.save(service);


    return service;

  }

}

export default ServicesCreateService 