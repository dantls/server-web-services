import { Response ,Request} from "express";
import AddressesListService from "../services/AddressesListService";

class AddressesListController {
   async index(request: Request,response: Response): Promise<Response> {
     // const user_id = request.user.id;
 
    const addressesListService = new AddressesListService();

    try {

      const addresses = await addressesListService.execute();

      return response.json(addresses);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
  }
 
}

export default AddressesListController ;










