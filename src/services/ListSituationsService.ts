import { getCustomRepository, Repository } from "typeorm";
import { SituationsRepository } from "../repositories/SituationsRepository";
import { Situation } from "entities/Situation";

class ListSituationsService {
  private situationsRepository: Repository<Situation>
  constructor(){
    this.situationsRepository = getCustomRepository(SituationsRepository);
  }

  async execute(){

    const situations = await this.situationsRepository.find()    
      
    return situations;

  }

}

export default ListSituationsService 