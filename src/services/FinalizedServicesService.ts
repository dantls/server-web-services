import { createQueryBuilder, getCustomRepository, Repository } from "typeorm";
import { ServicesRepository } from "../repositories/ServicesRepository";
import { SituationsRepository } from "../repositories/SituationsRepository";
import { OrdersRepository } from "../repositories/OrdersRepository";
import { Situation } from "entities/Situation";
import { Order } from "entities/Order";
import { Service } from "entities/Service";
import { Address } from "entities/Address";
import { AddressRepository } from "../repositories/AddressRepository";
import { User } from "entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IServicesCreateDTO{
  order: string;
  user: string;
}

class FinalizedServicesService {
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

  async execute({
    order,
    user
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


    if(!orderAlreadyExists){
      throw new Error('Order is not Found')
    }

    const serviceSituationBilled = await this.situationsRepository.findOne({
      where: {
        description: 'Faturado'
      }
    })

    const serviceAlreadyExists = await this.servicesRepository.findOne(
      {
        where: {
          id_order: orderAlreadyExists.id,
          situation: serviceSituationBilled
        }
      }
    )

    
    if(!serviceAlreadyExists){
      throw new Error('Serviço não identificado.')
    }

    serviceAlreadyExists.final_date = new Date(Date.now())

    await this.servicesRepository.save(serviceAlreadyExists);


    const serviceSituation = await this.situationsRepository.findOne({
      where: {
        description: 'Finalizado'
      }
    })

    const serviceAddress = await this.addressRepository.findOne({
      where: {
        id: serviceAlreadyExists.id_address
      }
    })

    const service = this.servicesRepository.create({
      situation:serviceSituation ,
      order: orderAlreadyExists,
      initial_date: new Date(Date.now()),
      final_date: new Date(Date.now()),
      address: serviceAddress,
      user: userExists

    });
    

    await this.servicesRepository.save(service);


    return service;

  }

}

export default FinalizedServicesService 