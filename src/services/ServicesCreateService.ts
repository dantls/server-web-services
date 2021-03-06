import { getCustomRepository, Repository } from "typeorm";
import { ServicesRepository } from "../repositories/ServicesRepository";
import { SituationsRepository } from "../repositories/SituationsRepository";
import { OrdersRepository } from "../repositories/OrdersRepository";
import { AddressRepository } from "../repositories/AddressRepository";
import { Situation } from "entities/Situation";
import { Order } from "entities/Order";
import { Address } from "entities/Address";
import { Service } from "entities/Service";
import { User } from "entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IServicesCreateDTO{
  order: string;
  address: string;
  user: string;
}

class ServicesCreateService {
  private servicesRepository: Repository<Service>
  private ordersRepository: Repository<Order>
  private situationsRepository: Repository<Situation>
  private addressRepository: Repository<Address>
  private usersRepository: Repository<User>

  constructor(){
    this.servicesRepository = getCustomRepository(ServicesRepository);
    this.ordersRepository = getCustomRepository(OrdersRepository);
    this.situationsRepository = getCustomRepository(SituationsRepository);
    this.addressRepository = getCustomRepository(AddressRepository);
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create({
    order,
    user,
    address,
   }: IServicesCreateDTO){

    const userExists = await this.usersRepository.findOne({
      where: {
        id: user
      }
    })

    if(!userExists){
      throw new Error('User is not Found.');
    }

    const orderAlreadyExists = await this.ordersRepository.findOne({
      where: {
        description: order
      }
    })

    if(orderAlreadyExists){
      return orderAlreadyExists
    }

    const serviceSituation = await this.situationsRepository.findOne({
      where: {
        description: 'Iniciado'
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

    const serviceAlreadyExists = await this.servicesRepository.findOne({
      where: {
        order: order,
        situation: serviceSituation
      }
    })
  
    if(serviceAlreadyExists){
      return serviceAlreadyExists
    }

    const service = this.servicesRepository.create({
      situation:serviceSituation,
      order: newOrder,
      initial_date: new Date(Date.now()),
      address: serviceAddress,
      user: userExists
    });
    

    await this.servicesRepository.save(service);


    return service;

  }

}

export default ServicesCreateService 