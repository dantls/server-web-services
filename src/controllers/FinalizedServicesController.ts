import { Response ,Request} from "express";
import FinalizedServicesService from "../services/FinalizedServicesService";

class FinalizedServicesController {
  async create(request: Request,response: Response): Promise<Response> {
    // const user_id = request.user.id;

    const {
      order,
      user

    } = request.body;

    
    const finalizedServicesService = new FinalizedServicesService();

    try {

      const service = await finalizedServicesService.execute({
        order,
        user
       });

      return response.json(service);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default FinalizedServicesController ;










