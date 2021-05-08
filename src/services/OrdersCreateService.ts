import { getCustomRepository, Repository } from "typeorm";
import { SituationsRepository } from "../repositories/SituationsRepository";
import { OrdersRepository } from "../repositories/OrdersRepository";
import { Situation } from "entities/Situation";
import { Order } from "entities/Order";

interface IOrdersCreateDTO{
  id_situation: string;
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
    id_situation,
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
    const situation = await this.situationsRepository.findOne({
      where: {
        id:id_situation
      }
    })
    
    const order = this.ordersRepository.create({
      description,  
      situation,
    });

    console.log(order)
    
    await this.ordersRepository.save(order);

    return order;

  }

}

export default OrdersCreateService 