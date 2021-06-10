import { Response ,Request} from "express";
import AddressesService from "../services/AddressesService";

class AddressesController {
  async create(request: Request,response: Response): Promise<Response> {
    const {
      description 
    } = request.body;
    
    const addressesService = new AddressesService();

    try {

      const situation = await addressesService.create({ description });

      return response.json(situation);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default AddressesController ;