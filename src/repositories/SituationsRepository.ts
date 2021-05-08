import { EntityRepository, Repository } from "typeorm";
import { Situation } from "../entities/Situation";

@EntityRepository(Situation )
class SituationsRepository extends Repository<Situation>{

}

export { SituationsRepository }