import OracleDB from '../database/oracle';


class CheckOrderService {

  async execute(UMA : any){
        await OracleDB.instance();

        const result = await OracleDB.execute(`
        SELECT DISTINCT ORD.NROORD                      AS PEDIDO
                FROM   WMS_ORDENTSAI ORD
                INNER JOIN WMS_ORDSVC SVC
                        ON SVC.IDCLOT = ORD.IDCLOT
                INNER JOIN WMS_CADUMA UMA
                        ON UMA.IDCUMA = SVC.IDCUMAORI
                
                WHERE  ORD.NROORD = (SELECT DISTINCT ORD.NROORD
                                FROM   WMS_ORDENTSAI ORD
                                        INNER JOIN WMS_ORDSVC SVC
                                                ON SVC.IDCLOT = ORD.IDCLOT AND IDCTIPORD = 5
                                        INNER JOIN WMS_CADUMA UMA
                                                ON UMA.IDCUMA = SVC.IDCUMAORI
                                                AND IDCSITUMA = 11
                                WHERE  UMA.CODUMA = :UMA )
         
         `, {UMA: UMA}
        )
        return result?.rows; 

  }

}

export default CheckOrderService 
