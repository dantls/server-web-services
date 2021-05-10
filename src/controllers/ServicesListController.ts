import { Response ,Request} from "express";
import ListServicesService from "../services/ListServicesService";

class ServicesController {
   async index(request: Request,response: Response): Promise<Response> {
     // const user_id = request.user.id;
 
    const listServicesService = new ListServicesService();

    try {

      const services = await listServicesService.execute();

      return response.json(services);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
  }
 
}

export default ServicesController ;










