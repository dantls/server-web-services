import { Response ,Request} from "express";
import TransferServicesService from "../services/TransferServicesService";

class TransferServicesController {
  async create(request: Request,response: Response): Promise<Response> {
    // const user_id = request.user.id;

    const {
      order,
      address
    } = request.body;
    
    const transferServiceService = new TransferServicesService();

    try {

      const service = await transferServiceService.execute({
        order,
        address
       });

      return response.json(service);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default TransferServicesController ;










