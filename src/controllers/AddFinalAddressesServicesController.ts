import { Response ,Request} from "express";
import AddFinalAddressesServicesService from "../services/AddFinalAddressesServicesService";

class AddFinalAddressesServicesController {
  async update(request: Request,response: Response): Promise<Response> {
    // const user_id = request.user.id;

    const {
      order,
      final_address
    } = request.body;
    
    const addFinalAddressesServicesService = new AddFinalAddressesServicesService();

    try {

      const serviceModified = await addFinalAddressesServicesService.execute({
        order,
        final_address
       });

      return response.json(serviceModified);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default AddFinalAddressesServicesController ;










