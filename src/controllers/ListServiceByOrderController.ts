import { Response ,Request} from "express";
import ListServiceByOrderService from "../services/ListServiceByOrderService";


class ListServiceByOrderController {
   async index(request: Request,response: Response): Promise<Response> {
    
 
    const listServiceByOrderService = new ListServiceByOrderService();

    try {

      const services = await listServiceByOrderService.execute({order:request.params.order});

      return response.json(services);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
  }
 
}

export default ListServiceByOrderController ;










