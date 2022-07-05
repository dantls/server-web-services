import { Response ,Request} from "express";
import ListServices2Service from "../services/ListServices2Service";

class ServicesList2Controller {
   async index(request: Request,response: Response): Promise<Response> {
     // const user_id = request.user.id;
 
    const listServices2Service = new ListServices2Service();

    try {

      const services = await listServices2Service.execute();

      return response.json(services);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
  }
 
}

export default ServicesList2Controller ;










