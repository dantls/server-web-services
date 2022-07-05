import { Address } from "entities/Address";
import { Situation } from "entities/Situation";

import { getCustomRepository, Repository } from "typeorm";
import { AddressRepository } from "../repositories/AddressRepository";
import { SituationsRepository } from "../repositories/SituationsRepository";

interface IAddressCreateDTO{
  description: string;
  site: string;
}

class AddressesService {
  private addressesRepository: Repository<Address>
  private situationsRepository: Repository<Situation>


  constructor(){
    this.addressesRepository = getCustomRepository(AddressRepository);
    this.situationsRepository = getCustomRepository(SituationsRepository);
  }

  async create({ description, site}: IAddressCreateDTO){

    const addressAlreadyExists = await this.addressesRepository.findOne({
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

    const address = this.addressesRepository.create({
      description,
      site,
      situation: addressSituation
    });
    
    await this.addressesRepository.save(address);

    return address;

  }

}

export default AddressesService 