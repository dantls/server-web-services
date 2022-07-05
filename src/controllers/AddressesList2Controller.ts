import { Response ,Request} from "express";
import AddressesList2Service from "../services/AddressesList2Service";

class AddressesList2Controller {
   async index(request: Request,response: Response): Promise<Response> {
     // const user_id = request.user.id;
 
    const addressesList2Service = new AddressesList2Service();

    try {

      const addresses = await addressesList2Service.execute();

      return response.json(addresses);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
  }
 
}

export default AddressesList2Controller ;










