import { getCustomRepository, In, Not, Repository } from "typeorm";
import { SituationsRepository } from "../repositories/SituationsRepository";
import { Situation } from "entities/Situation";

class ListSituationsService {
  private situationsRepository: Repository<Situation>
  constructor(){
    this.situationsRepository = getCustomRepository(SituationsRepository);
  }

  async execute(){

    const situations = await this.situationsRepository.find({
      where: {
        description: Not(In(['Identificado', 'Iniciado','Ativo']))    
      },
    })    
      


 
    return situations;

  }

}

export default ListSituationsService 