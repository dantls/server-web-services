import { Response ,Request} from "express";
import SituationsService from "../services/SituationsService";

class SituationsController {
  async create(request: Request,response: Response): Promise<Response> {
    const {
      description 
    } = request.body;
    
    const situationsService = new SituationsService();

    try {

      const situation = await situationsService.create({ description });

      return response.json(situation);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default SituationsController ;