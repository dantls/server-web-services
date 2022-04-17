import { Response ,Request} from "express";
import FinalAddressesService from "../services/FinalAddressesService";

class FinalAddressesController {
  async create(request: Request,response: Response): Promise<Response> {
    const {
      description 
    } = request.body;
    
    const finalAddressesService = new FinalAddressesService();

    try {

      const situation = await finalAddressesService.create({ description });

      return response.json(situation);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default FinalAddressesController ;