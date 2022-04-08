import { createQueryBuilder, getCustomRepository, In, IsNull, Not, Repository } from "typeorm";
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

class BilledServicesService {
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
      throw new Error('Order is not Found');
    }


  

    // const serviceFinalizedSituation = await this.situationsRepository.findOne({
    //   where: {
    //     description: 'Finalizado'
    //   }
    // })
    // serviceAlreadyExists.situation = serviceIdentifierSituation

   

    const serviceStartedSituation = await this.situationsRepository.findOne({
      where: {
        description: 'Iniciado'
      }
    })

    const servicePendencySituation = await this.situationsRepository.findOne({
      where: {
        description: 'Pendência Comercial/Vendas/Financeiro'
      }
    })

    const startedORpendencyService = await this.servicesRepository.findOne(
      {
        where: {
          id_order: orderAlreadyExists.id,
          final_date: IsNull(),
          id_situation: In([serviceStartedSituation.id, servicePendencySituation.id])
        }
      }
    )

    if(startedORpendencyService){
      startedORpendencyService.final_date = new Date(Date.now())
      await this.servicesRepository.save(startedORpendencyService);

    }

    // if(pendencyService){
    //   pendencyService.final_date = new Date(Date.now())
    //   await this.servicesRepository.save(pendencyService);

    // }

    // serviceAlreadyExists.final_date = new Date(Date.now())
    // await this.servicesRepository.save(serviceAlreadyExists);


    // const servicePendencySituation = await this.situationsRepository.findOne({
    //   where: {
    //     description: 'Pendência Comercial/Vendas/Financeiro'
    //   }
    // })

    // const pendencyService = await this.servicesRepository.findOne(
    //   {
    //     where: {
    //       id_order: orderAlreadyExists.id,
    //       final_date: IsNull(),
    //       id_situation: servicePendencySituation.id
    //     }
    //   }
    // )
   
    const serviceBilledSituation = await this.situationsRepository.findOne({
      where: {
        description: 'Faturado'
      }
    })

    const serviceAlreadyExists = await this.servicesRepository.findOne(
      {
        where: {
          id_order: startedORpendencyService.id_order
        }
      }
    )


    if(!serviceAlreadyExists){
      throw new Error('Service is not Found');
    }

    const serviceCancelSituation = await this.situationsRepository.findOne({
      where: {
        description: 'Cancelado'
      }
    })

    const cancelService = await this.servicesRepository.findOne(
      {
        where: {
          id_order: orderAlreadyExists.id,
          final_date: IsNull(),
          id_situation: serviceCancelSituation.id
        }
      }
    )

    if(cancelService){
      return cancelService
    }

    const serviceAddress = await this.addressRepository.findOne({
      where: {
        id: startedORpendencyService.id_address
      }
    })

    const service = this.servicesRepository.create({
      situation: serviceBilledSituation,
      order: orderAlreadyExists,
      initial_date: new Date(Date.now()),
      address: serviceAddress,
      user: userExists
    });

    const billedService = await this.servicesRepository.findOne(
      {
        where: {
          order: orderAlreadyExists,
          initial_date: Not(IsNull()),  
          final_date: IsNull(),
          situation: serviceBilledSituation
        }
      }
    )

    if(billedService){
       throw new Error('Service already exists.');
    }
    
    await this.servicesRepository.save(service);

    return service


  }

}

export default BilledServicesService 