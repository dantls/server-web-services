import { getCustomRepository, IsNull, Repository } from "typeorm";
import { FinalAddressRepository } from "../repositories/FinalAddressRepository";
import { SituationsRepository } from "../repositories/SituationsRepository";

import { FinalAddress } from "entities/FinalAddress";
import { Situation } from "entities/Situation";


class FinalAddressesListService {
    private finalAddressesRepository: Repository<FinalAddress>
    private situationsRepository: Repository<Situation>
  
  
    constructor(){
      this.finalAddressesRepository = getCustomRepository(FinalAddressRepository);
      this.situationsRepository = getCustomRepository(SituationsRepository);
    }
  
  async execute(){

    const activeSituation = await this.situationsRepository.findOne({
      where:{
        description: 'Ativo'
      }
    })

    const finalAddresses = await this.finalAddressesRepository.find({
      where: {
        id_situation: activeSituation
      },
    }) 
    
    return finalAddresses;

  }

}

export default FinalAddressesListService 