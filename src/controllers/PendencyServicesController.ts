import { Response ,Request} from "express";
import PendencyServicesService from "../services/PendencyServicesService";

class PendencyServicesController {
  async create(request: Request,response: Response): Promise<Response> {
    // const user_id = request.user.id;

    const {
      order,
      user

    } = request.body;

    
    const pendencyServicesService = new PendencyServicesService();

    try {

      const service = await pendencyServicesService.execute({
        order,
        user

       });

      return response.json(service);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default PendencyServicesController ;










