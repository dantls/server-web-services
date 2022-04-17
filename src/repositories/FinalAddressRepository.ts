import { EntityRepository, Repository } from "typeorm";
import { FinalAddress } from "../entities/FinalAddress";

@EntityRepository(FinalAddress)
class FinalAddressRepository extends Repository<FinalAddress>{

}

export { FinalAddressRepository }