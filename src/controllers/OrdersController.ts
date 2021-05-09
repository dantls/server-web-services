import { Response ,Request} from "express";
import OrdersCreateService from "../services/OrdersCreateService";

class OrdersController {
  async create(request: Request,response: Response): Promise<Response> {
    // const user_id = request.user.id;

    const {
      description,
    } = request.body;
    
    const ordersCreateService = new OrdersCreateService();

    try {

      const order = await ordersCreateService.create({
        description,
       });

      return response.json(order);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default OrdersController ;










