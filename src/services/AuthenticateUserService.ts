import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";
import {compare} from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

type Request = {
  email: string;
  password: string;
}

type Response = {
  user: User,
  token: string;
}


class AuthenticateUserService {
  private usersRepository: Repository<User>

  constructor(){
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  public async execute({email, password}:Request):Promise<Response>{
    const user = await this.usersRepository.findOne({where: {email}});

    if(!user){
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password , user.password);

    if(!passwordMatched){
      throw new Error('Incorrect email/password combination.');
    }

    const token = sign({}, authConfig.jwt.secret,{
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    })

    return {
      user,
      token 
    }

  }
}

export default AuthenticateUserService