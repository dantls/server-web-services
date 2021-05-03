import { Response ,Request} from "express";
import UsersService from "../services/UsersService";

class UsersController {
  async create(request: Request,response: Response): Promise<Response> {
    const {
      email,
      name,
      password,  
    } = request.body;
    
    console.log(request.user)

    const usersService = new UsersService();

    try {

      const user = await usersService.create({ email,name, password });

      delete user.password;

      return response.json(user);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default UsersController ;