import { Response ,Request} from "express";
import PickingsResumeService from "../services/PickingsResumeService";

class PickingsResumeController {
  async list(request: Request,response: Response): Promise<Response> {
    
    const pickingsResumeService = new PickingsResumeService();

    try {

      const services = await pickingsResumeService.execute();

      return response.json(services);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default PickingsResumeController ;










