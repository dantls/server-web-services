import pool from '../database/dbconnector';

type Row = {
  id: string;
  address: string;
  situation: string;
  ordertype: string;
  order: string;
  initial_date: Date;
  final_date: Date;
}

interface IServiceDTO{
  order: string;
}

class ListServiceByOrderService {
 
  async execute({order}:IServiceDTO){

    const client = await pool.connect();

      const sql = `select distinct 
      s.id as id,
      o.description as order,
      s.initial_date as initial_date,
      s.final_date as final_date,
      a.description as address , 
      s2.description as situation,
      o2.description as ordertype 
      from services as s
        left join orders o  
          on o.id = s.id_order
        left join addresses as a
          on a.id = s.id_address	
        left join situations s2 
          on s2.id = s.id_situation		
        left join ordertypes o2 
          on o2.id = o.id_type 
      where o.description = $1
      order by final_date asc`;
         
    const {rows} = await client.query<Row>(sql,[order]);

    client.release();

    return rows
  }

}

export default ListServiceByOrderService 
