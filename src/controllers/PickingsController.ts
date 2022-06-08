import { Response ,Request} from "express";
import PickingsService from "../services/PickingsService";

class PickingsController {
  async list(request: Request,response: Response): Promise<Response> {
    
    const pickingsService = new PickingsService();

    try {

      const services = await pickingsService.execute();

      return response.json(services);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default PickingsController ;










