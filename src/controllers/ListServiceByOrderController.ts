import { Response ,Request} from "express";
import ListServiceByOrderService from "../services/ListServiceByOrderService";


class ListServiceByOrderController {
   async index(request: Request,response: Response): Promise<Response> {
     // const user_id = request.user.id;
    let param;

    if (request.query && request.query.order){
      param = (request.query as any).order; 
    }

 
    const listServiceByOrderService = new ListServiceByOrderService();

    try {

      const services = await listServiceByOrderService.execute({order:param});

      return response.json(services);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
  }
 
}

export default ListServiceByOrderController ;










