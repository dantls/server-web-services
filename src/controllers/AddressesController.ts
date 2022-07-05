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

<<<<<<< HEAD
      const address = await addressesService.create({ description , site });
=======
      const situation = await addressesService.create({ description, site });
>>>>>>> 4d882af031014284961917c954d14107399b5409

      return response.json(address);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default AddressesController ;