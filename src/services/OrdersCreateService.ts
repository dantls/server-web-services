import { getCustomRepository, Repository } from "typeorm";
import { SituationsRepository } from "../repositories/SituationsRepository";
import { OrdersRepository } from "../repositories/OrdersRepository";
import { Situation } from "entities/Situation";
import { Order } from "entities/Order";

interface IOrdersCreateDTO{
  description: string;
}

class OrdersCreateService {
  private situationsRepository: Repository<Situation>
  private ordersRepository: Repository<Order>

  constructor(){
    this.situationsRepository = getCustomRepository(SituationsRepository);
    this.ordersRepository = getCustomRepository(OrdersRepository);
  }

  async create({
    description,
   }: IOrdersCreateDTO){

    const orderAlreadyExists = await this.ordersRepository.findOne({
      where: {
        description
      }
    })

    if(orderAlreadyExists){
      return orderAlreadyExists
    }
    const orderSituation = await this.situationsRepository.findOne({
      where: {
        description: 'Identificado'
      }
    })
    
    const order = this.ordersRepository.create({
      description,  
      situation: orderSituation,
    });

    await this.ordersRepository.save(order);

    return order;

  }

}

export default OrdersCreateService 