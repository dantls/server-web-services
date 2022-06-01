import { Response ,Request} from "express";
import MovementsService from "../services/MovementsService";

class MovementsController {
  async list(request: Request,response: Response): Promise<Response> {
    
    const movementsService = new MovementsService();

    try {

      const services = await movementsService.execute();

      return response.json(services);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default MovementsController ;










