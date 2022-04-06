import { Response ,Request} from "express";
import CancelServicesService from "../services/CancelServicesService";

class CancelServicesController {
  async create(request: Request,response: Response): Promise<Response> {
    // const user_id = request.user.id;

    const {
      order,
      user

    } = request.body;

    
    const cancelServicesService = new CancelServicesService();

    try {

      const service = await cancelServicesService.execute({
        order,
        user

       });

      return response.json(service);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default CancelServicesController;










