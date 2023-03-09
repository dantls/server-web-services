import { Response ,Request} from "express";
import CheckOrderService from "../services/CheckOrderService";

class CheckOrderController {
  async index(request: Request,response: Response): Promise<Response> {
    
    const { UMA } = request.query;

    const checkOrderService = new CheckOrderService();

    try {
      
        const order = await checkOrderService.execute(UMA);
        
        return response.json(order);     

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default CheckOrderController ;










