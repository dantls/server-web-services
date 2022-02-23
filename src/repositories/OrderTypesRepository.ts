import { EntityRepository, Repository } from "typeorm";
import { OrderTypes } from "../entities/OrderTypes";

@EntityRepository(OrderTypes)
class OrderTypesRepository extends Repository<OrderTypes>{

}

export { OrderTypesRepository }