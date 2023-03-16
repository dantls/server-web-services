import { Response ,Request} from "express";
import SamplesResumeService from "../services/SamplesResumeService";

class SamplesResumeController {
  async list(request: Request,response: Response): Promise<Response> {
    
    const samplesResumeService = new SamplesResumeService();

    try {

      const services = await samplesResumeService.execute();

      return response.json(services);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default SamplesResumeController ;










