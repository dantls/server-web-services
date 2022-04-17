import { Response ,Request} from "express";
import FinalAddressesListService from "../services/FinalAddressesListService";

class FinalAddressesListController {
   async index(request: Request,response: Response): Promise<Response> {
     // const user_id = request.user.id;
 
    const finalAddressesListService = new FinalAddressesListService();

    try {

      const addresses = await finalAddressesListService.execute();

      return response.json(addresses);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
  }
 
}

export default FinalAddressesListController ;










