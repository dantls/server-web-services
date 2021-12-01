import { Response ,Request} from "express";
import ListSituationsService from "../services/ListSituationsService";

class ListSituationsController {
  async index(request: Request,response: Response): Promise<Response> {
    // const user_id = request.user.id;

   const listSituationsService = new ListSituationsService();

   try {

     const situations = await listSituationsService.execute();

     return response.json(situations);

   }catch(err){
     return response.status(400).json({message:err.message});
   }
 }

}

export default ListSituationsController ;