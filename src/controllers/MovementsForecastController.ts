import { Response ,Request} from "express";
import MovementsForecastService from "../services/MovementsForecastService";

class MovementsForecastController {
  async list(request: Request,response: Response): Promise<Response> {
    
    const movementsForecastService = new MovementsForecastService();

    try {

      const services = await movementsForecastService.execute();

      return response.json(services);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default MovementsForecastController ;










