import { Response ,Request} from "express";
import SamplesService from "../services/SamplesService";

class SamplesController {
  async list(request: Request,response: Response): Promise<Response> {
    
    const samplesService = new SamplesService();

    try {

      const services = await samplesService.execute();

      return response.json(services);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default SamplesController ;










