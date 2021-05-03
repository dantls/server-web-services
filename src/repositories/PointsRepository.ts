import { EntityRepository, Repository } from "typeorm";
import { Point } from "../entities/Point";

@EntityRepository(Point)
class PointsRepository extends Repository<Point>{

}

export { PointsRepository }