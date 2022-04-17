import { FinalAddress } from "entities/FinalAddress";
import { Situation } from "entities/Situation";

import { getCustomRepository, Repository } from "typeorm";
import { FinalAddressRepository } from "../repositories/FinalAddressRepository";
import { SituationsRepository } from "../repositories/SituationsRepository";

interface IAddressCreateDTO{
  description: string;

}

class FinalAddressesService {
  private finalAddressesRepository: Repository<FinalAddress>
  private situationsRepository: Repository<Situation>


  constructor(){
    this.finalAddressesRepository = getCustomRepository(FinalAddressRepository);
    this.situationsRepository = getCustomRepository(SituationsRepository);
  }

  async create({ description}: IAddressCreateDTO){

    const addressAlreadyExists = await this.finalAddressesRepository.findOne({
      description
    })

    if(addressAlreadyExists){
      return addressAlreadyExists
    }

    const addressSituation = await this.situationsRepository.findOne({
      where: {
        description: 'Ativo'
      }
    })

    const address = this.finalAddressesRepository.create({
      description,
      situation: addressSituation
    });
    
    await this.finalAddressesRepository.save(address);

    return address;

  }

}

export default FinalAddressesService 