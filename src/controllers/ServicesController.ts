import { Response ,Request} from "express";
import ServicesService from "../services/ServicesCreateService";

class ServicesController {
  async create(request: Request,response: Response): Promise<Response> {
    // const user_id = request.user.id;

    const {
      order,
      address,
    } = request.body;
    
    const servicesService = new ServicesService();

    try {

      const service = await servicesService.create({
        order,
        address,
       });

      return response.json(service);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default ServicesController ;










