import { Response ,Request} from "express";
import AddressesService from "../services/AddressesService";

class AddressesController {
  async create(request: Request,response: Response): Promise<Response> {
    const {
      description ,
      site
    } = request.body;
    
    const addressesService = new AddressesService();

    try {

      const address = await addressesService.create({ description , site });

      return response.json(address);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default AddressesController ;