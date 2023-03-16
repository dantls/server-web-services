
import { Any } from 'typeorm';
import OracleDB from '../database/oracle';

class MovementsForecastService {
 
  async execute(){

        await OracleDB.instance();

        const result = await OracleDB.execute(
                `SELECT

                'Movimentação com Separação Pendente' as name
                
                    , COUNT(DISTINCT SVC.IDCUMAORI) as data
                
                FROM WMS_ORDSVC SVC
                
                WHERE SVC.IDCATV = 2
                
                    AND SVC.IDCSITATV IN (3,5)
                
                    AND SVC.IDCNVLENDORI = 4
                
                    AND SVC.IDCLOT IN (SELECT SVC1.IDCLOT
                
                                       FROM WMS_ORDSVC SVC1
                                       
                                          INNER JOIN VW_WMS_CADEND ENDE 
                                             ON ENDE.IDCEND = SVC1.IDCENDORI AND ENDE.CODDEP != 3
                                       
                                       WHERE SVC1.IDCATV IN(8, 20, 21)
                
                                        AND SVC1.IDCSITATV IN (3,5,7))
                
                UNION ALL
                
                SELECT
                
                'Separação Pendente e Mov/exps' as ATIVIDADE
                
                , COUNT(DISTINCT SVC.IDCUMADST) as TOTAL
                
                FROM WMS_ORDSVC SVC
                       INNER JOIN VW_WMS_CADEND ENDE 
                         ON ENDE.IDCEND = SVC.IDCENDORI AND ENDE.CODDEP != 3
                
                WHERE SVC.IDCATV IN(8,20,21)
                
                    AND SVC.IDCMODOPR NOT IN (9)
                
                    AND SVC.IDCSITATV IN (3,5,7)
                
                UNION ALL
                
                SELECT DISTINCT
                
                'Rede Pendente' as ATIVIDADE
                
                    , COUNT(DISTINCT SVC.IDCUMAORI) as TOTAL
                
                FROM WMS_ORDSVC SVC
                
                WHERE SVC.IDCATV = 2
                
                    AND SVC.IDCSITATV IN (3,5)
                
                    AND SVC.IDCNVLENDORI = 4
                
                    AND NOT EXISTS (SELECT 1
                
                                    FROM WMS_ORDSVC SVC1
                                    
                                      INNER JOIN VW_WMS_CADEND ENDE 
                                             ON ENDE.IDCEND = SVC1.IDCENDORI AND ENDE.CODDEP != 3
                
                                     INNER JOIN OCO_MOVOCO OCO
                
                                       ON OCO.IDCLOT = SVC1.IDCLOT
                
                                    WHERE SVC.IDCLOT = SVC1.IDCLOT
                
                                        AND SVC1.IDCATV IN(8, 20, 21)
                
                                        AND SVC1.IDCSITATV <> 6
                
                                        AND SVC1.IDCATV <> 2
                
                                        AND OCO.IDCSITOCO = 5)
                
                    AND EXISTS (SELECT 1
                
                                    FROM WMS_ORDSVC SVC1
                                    
                                      INNER JOIN VW_WMS_CADEND ENDE 
                                        ON ENDE.IDCEND = SVC1.IDCENDORI AND ENDE.CODDEP != 3
                
                                     INNER JOIN OCO_MOVOCO OCO
                
                                       ON OCO.IDCLOT = SVC1.IDCLOT
                
                                    WHERE SVC.IDCLOT = SVC1.IDCLOT
                
                                        AND SVC1.IDCATV IN(8, 20, 21)
                
                                        AND SVC1.IDCATV <> 2
                
                                        AND OCO.IDCSITOCO = 5)                                   
                
         `
        )

        let formmatedList = result.rows?.map( (item: { DATA: string; NAME:string }) => {
                return ({
                        data: [item.DATA],
                        name: item.NAME
                })
        });

        return formmatedList;

  }

}

export default MovementsForecastService 
