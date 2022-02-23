import { createQueryBuilder, getCustomRepository, Repository } from "typeorm";
import { ServicesRepository } from "../repositories/ServicesRepository";
import { OrdersRepository } from "../repositories/OrdersRepository";
// import { SituationsRepository } from "../repositories/SituationsRepository";
// import { Situation } from "entities/Situation";
import { Order } from "entities/Order";
import { Service } from "entities/Service";
import { Address } from "entities/Address";
import { AddressRepository } from "../repositories/AddressRepository";

interface IServicesTransferDTO{
  order: string;
  address: string;
}

class TransferServicesService {
  private servicesRepository: Repository<Service>
  private ordersRepository: Repository<Order>
  // private situationsRepository: Repository<Situation>
  private addressRepository: Repository<Address>


  constructor(){
    this.servicesRepository = getCustomRepository(ServicesRepository);
    this.ordersRepository = getCustomRepository(OrdersRepository);
    this.addressRepository = getCustomRepository(AddressRepository);
    // this.situationsRepository = getCustomRepository(SituationsRepository);
  }

  async execute({
    order,
    address
   }: IServicesTransferDTO){
      
 
    const orderAlreadyExists = await this.ordersRepository.findOne({
      where: {
        description: order
      }
    })

    if(!orderAlreadyExists){
      throw new Error('Order is not Found')
    }


    const serviceAlreadyExists = await this.servicesRepository.findOne(
      {
        where: {
          id_order: orderAlreadyExists.id
        }
      }
    )

    if(!serviceAlreadyExists){
      throw new Error('Serviço não identificado.')
    }

    const serviceAddress = await this.addressRepository.findOne({
      where: {
        description: address
      }
    })

    serviceAlreadyExists.id_address = serviceAddress.id;

    await this.servicesRepository.save(serviceAlreadyExists);


    return serviceAlreadyExists;

  }

}

export default TransferServicesService 