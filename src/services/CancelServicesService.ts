import { createQueryBuilder, getCustomRepository, Repository , In, IsNull} from "typeorm";
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
import { FinalAddress } from "../entities/FinalAddress";
import { FinalAddressRepository } from "../repositories/FinalAddressRepository";

interface IServicesCreateDTO{
  order: string;
  user: string;
}

class CancelServicesService {
  private servicesRepository: Repository<Service>
  private ordersRepository: Repository<Order>
  private situationsRepository: Repository<Situation>
  private addressRepository: Repository<Address>
  private finalAddressRepository: Repository<FinalAddress>
  private usersRepository: Repository<User>



  constructor(){
    this.servicesRepository = getCustomRepository(ServicesRepository);
    this.ordersRepository = getCustomRepository(OrdersRepository);
    this.situationsRepository = getCustomRepository(SituationsRepository);
    this.addressRepository = getCustomRepository(AddressRepository);
    this.usersRepository = getCustomRepository(UsersRepository);
    this.finalAddressRepository = getCustomRepository(FinalAddressRepository);

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

    const serviceSituationCancel = await this.situationsRepository.findOne({
      where: {
        description: 'Cancelado'
      }
    })

  
    const serviceCancel = await this.servicesRepository.findOne(
      {
        where: {
          id_order: orderAlreadyExists.id,
          id_situation: serviceSituationCancel.id
        }
      }
    )
    
    if(serviceCancel){
      return serviceCancel
    }


    const serviceSituationBilled = await this.situationsRepository.findOne({
      where: {
        description: 'Faturado'
      }
    })
    const serviceSituationInit = await this.situationsRepository.findOne({
      where: {
        description: 'Iniciado'
      }
    })
    const serviceSituationPendency = await this.situationsRepository.findOne({
      where: {
        description: 'Pendência Comercial/Vendas/Financeiro'
      }
    })

    const serviceAlreadyExists = await this.servicesRepository.findOne(
      {
        where: {
          id_order: orderAlreadyExists.id,
          final_date: IsNull(),
          id_situation: In([
            serviceSituationBilled.id,
            serviceSituationPendency.id,
            serviceSituationInit.id
          ])
        }
      }
    )
    
    if(!serviceAlreadyExists){
      throw new Error('Serviço não identificado.')
    }

    serviceAlreadyExists.final_date = new Date(Date.now());
    await this.servicesRepository.save(serviceAlreadyExists);


    const serviceSituation = await this.situationsRepository.findOne({
      where: {
        description: 'Cancelado'
      }
    })

    const serviceAddress = await this.addressRepository.findOne({
      where: {
        id: serviceAlreadyExists.id_address
      }
    });

    const serviceFinalAddress = await this.finalAddressRepository.findOne({
      where: {
        id: serviceAlreadyExists.id_final_addresses
      }
    })

    const service = this.servicesRepository.create({
      situation:serviceSituation ,
      order: orderAlreadyExists,
      initial_date: new Date(Date.now()),
      address: serviceAddress,
      final_address: serviceFinalAddress,
      user: userExists
    });
    

    await this.servicesRepository.save(service);


    return service;

  }

}

export default CancelServicesService 