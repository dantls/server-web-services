import { Response ,Request} from "express";
import MovementsResumeService from "../services/MovementsResumeService";

class MovementsResumeController {
  async list(request: Request,response: Response): Promise<Response> {
    
    const movementsResumeService = new MovementsResumeService();

    try {

      const services = await movementsResumeService.execute();

      return response.json(services);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default MovementsResumeController ;










