import { Item } from "../entities/Item";
import { getCustomRepository, Repository } from "typeorm";
import { Point } from "../entities/Point";
import { PointsRepository } from "../repositories/PointsRepository";

interface IPointsCreateDTO{
  name: string;
  email: string;
  image: string;
  phone: string;
  whatsapp: string;
  uf: string;
  city: string;
  latitude: number;
  longitude: number;
  user_id: string;
  points_items: Item[]
}

class PointsService {
  private pointsRepository: Repository<Point>

  constructor(){
    this.pointsRepository = getCustomRepository(PointsRepository);
  }

  async create({
    name,
    email,
    image,
    phone,
    whatsapp,
    uf,
    city,
    latitude,
    longitude,
    user_id,
    points_items
  }: IPointsCreateDTO){

    const pointAlreadyExists = await this.pointsRepository.findOne({
      name
    })

    if(pointAlreadyExists){
      return pointAlreadyExists
    }

    const point = this.pointsRepository.create({
      name,
      email,
      image,
      phone,
      whatsapp,
      uf,
      city,
      latitude,
      longitude,
      user_id,
      points_items
    });
    
    await this.pointsRepository.save(point);

    return point;

  }

}

export default PointsService 