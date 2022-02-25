import { Response ,Request} from "express";
import AddOrderTypeOrderService from "../services/AddOrderTypeOrderService";

class AddOrderTypeInOrdersController {
  async update(request: Request,response: Response): Promise<Response> {
    // const user_id = request.user.id;

    const {
      order,
      ordertype
    } = request.body;
    
    const addOrderTypeOrdersCreateService = new AddOrderTypeOrderService();

    try {

      const orderModified = await addOrderTypeOrdersCreateService.execute({
        order,
        ordertype
       });

      return response.json(orderModified);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default AddOrderTypeInOrdersController ;










