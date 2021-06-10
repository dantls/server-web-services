import { Situation } from "entities/Situation";
import { getCustomRepository, Repository } from "typeorm";
import { SituationsRepository } from "../repositories/SituationsRepository";

interface ISituationsCreateDTO{
  description: string;

}

class SituationsService {
  private situationsRepository: Repository<Situation>

  constructor(){
    this.situationsRepository = getCustomRepository(SituationsRepository);
  }

  async create({ description}: ISituationsCreateDTO){

    const situationAlreadyExists = await this.situationsRepository.findOne({
      description
    })

    if(situationAlreadyExists){
      return situationAlreadyExists
    }

    const situation = this.situationsRepository.create({
     description
    });
    
    await this.situationsRepository.save(situation);

    return situation;

  }

}

export default SituationsService 