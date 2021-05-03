import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

import { hash } from 'bcryptjs';

interface IUsersCreateDTO{
  email: string;
  name: string;
  password: string;
}

class UsersService {
  private usersRepository: Repository<User>

  constructor(){
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create({ email, name, password}: IUsersCreateDTO){

    const userAlreadyExists = await this.usersRepository.findOne({
      email
    })

    if(userAlreadyExists){
      return userAlreadyExists
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
     email,
     name,
     password: hashedPassword
    });
    
    await this.usersRepository.save(user);

    return user;

  }

  async findByEmail(email: string){
    const user = await this.usersRepository.findOne({
      email
    })

    return user

  }
  
}

export default UsersService 