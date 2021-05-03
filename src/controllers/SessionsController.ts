import { Response ,Request} from "express";

import AuthenticateUserService from "../services/AuthenticateUserService"

class SessionsController {
  async create(request: Request,response: Response): Promise<Response> {
    const {
      email,
      password,  
    } = request.body;

    const authenticatedUserService = new AuthenticateUserService();

    try {
      const {user, token} = await authenticatedUserService.execute({ email,password });

      delete user.password;

      return response.json({
        user,
        token
      });

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export default SessionsController;