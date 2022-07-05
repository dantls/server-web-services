import { getCustomRepository, IsNull, Repository } from "typeorm";
import { AddressRepository } from "../repositories/AddressRepository";
import { SituationsRepository } from "../repositories/SituationsRepository";

import { Address } from "entities/Address";
import { Situation } from "entities/Situation";


class AddressesList2Service {
    private addressesRepository: Repository<Address>
    private situationsRepository: Repository<Situation>
  
  
    constructor(){
      this.addressesRepository = getCustomRepository(AddressRepository);
      this.situationsRepository = getCustomRepository(SituationsRepository);
    }
  
  async execute(){

    const activeSituation = await this.situationsRepository.findOne({
      where:{
        description: 'Ativo'
      }
    })

    const addresses = await this.addressesRepository.find({
      where: {
        id_situation: activeSituation,
        site: '2'
      },
    }) 
    
    return addresses;

  }

}

export default AddressesList2Service 