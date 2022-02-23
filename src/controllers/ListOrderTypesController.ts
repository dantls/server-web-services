import { Response ,Request} from "express";
import ListOrderTypesService from "../services/ListOrderTypesService";

class ListOrderTypesController {
  async index(request: Request,response: Response): Promise<Response> {
    // const user_id = request.user.id;

   const listOrderTypesService = new ListOrderTypesService();

   try {

     const listOrderTypes = await listOrderTypesService.execute();

     return response.json(listOrderTypes);

   }catch(err){
     return response.status(400).json({message:err.message});
   }
 }

}

export default ListOrderTypesController ;