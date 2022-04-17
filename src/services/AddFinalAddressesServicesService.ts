import { getCustomRepository, IsNull, Repository } from "typeorm";
import { OrdersRepository } from "../repositories/OrdersRepository";
import { Order } from "entities/Order";
import { Service } from "entities/Service";
import { FinalAddress } from "entities/FinalAddress";
import { FinalAddressRepository } from "../repositories/FinalAddressRepository";
import { ServicesRepository } from "../repositories/ServicesRepository";

interface IServicesCreateDTO{
  order: string;
  final_address: string;
}

class AddFinalAddressesServicesService {
  private ordersRepository: Repository<Order>
  private finalAddressesRepository: Repository<FinalAddress>
  private servicesRepository: Repository<Service>


  constructor(){
    this.ordersRepository = getCustomRepository(OrdersRepository);
    this.finalAddressesRepository = getCustomRepository(FinalAddressRepository);
    this.servicesRepository = getCustomRepository(ServicesRepository);
    
  }

  async execute({
    order,
    final_address
   }: IServicesCreateDTO){
      
    const orderAlreadyExists = await this.ordersRepository.findOne({
      where: {
        description: order
      }
    })
   
    if(!orderAlreadyExists){
      throw new Error('Order is not Found')
    }

    const final_addressAlreadyExists = await this.finalAddressesRepository.findOne({
      where: {
        description: final_address
      }
    })

    if(!final_addressAlreadyExists){
      throw new Error('Final Address is not Found')
    }

    const serviceAlreadyExists = await this.servicesRepository.findOne({
      where: {
        order: orderAlreadyExists,
        final_date: IsNull()
      }
    })
    if(!serviceAlreadyExists){
      throw new Error('Service is not Found')
    }

    serviceAlreadyExists.id_final_addresses = final_addressAlreadyExists.id;

    await this.servicesRepository.save(serviceAlreadyExists);


    return serviceAlreadyExists;

  }

}

export default AddFinalAddressesServicesService 