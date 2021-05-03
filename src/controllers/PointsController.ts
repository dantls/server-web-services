import { Response ,Request} from "express";
import PointsService from "../services/PointsService";

class PointsController {
  async create(request: Request,response: Response): Promise<Response> {
    const user_id = request.user.id;

    const {
      name,
      email,
      image,
      phone,
      whatsapp,
      uf,
      city,
      latitude,
      longitude
    } = request.body;
    
    const pointsService = new PointsService();

    try {

      const point = await pointsService.create({
        name,
        email,
        image,
        phone,
        whatsapp,
        uf,
        city,
        latitude,
        user_id,
        longitude
       });

      return response.json(point);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default PointsController ;










