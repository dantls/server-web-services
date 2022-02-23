import { Response ,Request} from "express";
import OrderTypesService from "../services/OrderTypesService";

class OrderTypesController {
  
  async create(request: Request,response: Response): Promise<Response> {
    const {
      description 
    } = request.body;
    
    const orderTypesService = new OrderTypesService();

    try {

      const orderTypes = await orderTypesService.create({ description });

      return response.json(orderTypes);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default OrderTypesController ;