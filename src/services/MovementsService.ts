process.env.ORA_SDTZ = 'UTC';

import fs from 'fs';
import oracledb from 'oracledb';
import dbConfig from '../database/oracle';


let libPath = 'C:\\instantclient_11_2';

if (libPath && fs.existsSync(libPath)) {
  oracledb.initOracleClient({ libDir: libPath });
}



type Row = {
  LOTE: String,
  PEDIDO: String,
  ENDERECO: String,
  UMA: String,
  SITUACAO: String,
  POSTO: String
}

class MovementsService {
 
  async execute(){

        let connection, result;

        try {
      
          let sql, options;
      
          connection = await oracledb.getConnection(dbConfig);
      
          //
          // Query the data
          //
      
          sql =  `SELECT SVC.IDCLOT AS LOTE,
          ORD.NROORD AS PEDIDO,
          SUBSTR(UMA.CODUMA,11,16)AS UMA,
          SIT.NOMSITATV AS SITUACAO,
          SUBSTR(ENDE.ENDBYIDC,0,12) AS ENDERECO,
          PST.NOMPST AS POSTO,
          LOT.DATGERLOT AS DATE_LOTE,
          USR.NOMUSR AS USR
                FROM   WMS_ORDSVC SVC
                        INNER JOIN WMS_ORDENTSAI ORD
                                ON SVC.IDCLOT = ORD.IDCLOT
                        INNER JOIN WMS_CADLOT LOT
                                ON LOT.IDCLOT = ORD.IDCLOT
                        INNER JOIN WMS_CADUMA UMA
                                ON UMA.IDCLOTEXP = ORD.IDCLOT
                                AND IDCUMADST = UMA.IDCUMA
                        INNER JOIN WMS_CADSITATV SIT
                                ON SIT.IDCSITATV = SVC.IDCSITATV
                        INNER JOIN VW_WMS_CADEND ENDE
                                ON ENDE.IDCEND = SVC.IDCENDORI     
                        INNER JOIN WMS_RELPSTEND RELPST
                                ON RELPST.IDCEND = ENDE.IDCEND
                        INNER JOIN WMS_CADPST PST
                                ON PST.IDCPST = RELPST.IDCPST
                        LEFT JOIN SAG_CADUSR USR
                                ON USR.IDCUSR = SVC.IDCUSREXE
                WHERE  SVC.IDCATV = 2
                        AND LOT.IDCSITEXE = 2
                        AND ORD.IDCTIPORD = 5
                        --and idcsitatv = 3 
                        AND IDCNVLENDDST = 6
                        AND SVC.IDCEND = 1074
                        AND  ORD.IDCLOT NOT IN (SELECT DISTINCT SVC.IDCLOT
                                                FROM   WMS_ORDSVC SVC
                                                        INNER JOIN WMS_ORDENTSAI ORD
                                                                ON SVC.IDCLOT = ORD.IDCLOT
                                                        INNER JOIN WMS_CADLOT LOT
                                                                ON LOT.IDCLOT = ORD.IDCLOT
                                                        INNER JOIN WMS_CADUMA UMA
                                                                ON UMA.IDCLOTEXP = ORD.IDCLOT
                                                                AND IDCUMADST = UMA.IDCUMA
                                                WHERE  SVC.IDCATV IN ( 8, 20, 21 )
                                                        AND LOT.IDCSITEXE = 2
                                                        AND ORD.IDCTIPORD = 5
                                                        AND IDCSITATV <> 6)
                                AND ORD.IDCLOT  IN (SELECT SVC.IDCLOT
                                                FROM   WMS_ORDSVC SVC
                                                        INNER JOIN WMS_ORDENTSAI ORD
                                                                ON SVC.IDCLOT = ORD.IDCLOT
                                                        INNER JOIN WMS_CADLOT LOT
                                                                ON LOT.IDCLOT = ORD.IDCLOT
                                                        INNER JOIN WMS_CADUMA UMA
                                                                ON UMA.IDCLOTEXP = ORD.IDCLOT
                                                                AND IDCUMADST = UMA.IDCUMA
                                                WHERE  SVC.IDCATV = 2
                                                        AND LOT.IDCSITEXE = 2
                                                        AND ORD.IDCTIPORD = 5
                                                        AND IDCSITATV IN ( 2, 3, 4, 5, 7 )
                                                        AND IDCNVLENDDST = 6
                                                        AND SVC.IDCEND = 1074) 
                                AND ORD.IDCLOT NOT IN (SELECT DISTINCT IDCLOT FROM OCO_MOVOCO
                WHERE 
                IDCSITOCO IN (1,3,5) AND IDCOCO = 14)
                ORDER BY DATE_LOTE, LOTE, SITUACAO,POSTO, ENDERECO
                
          `;
                    
      
          options ={
            outFormat: oracledb.OUT_FORMAT_OBJECT 
          }
      
          result = await connection.execute<Row[]>(sql,[] ,options);
      
        } catch (err) {
          console.error(err);
        } finally {
          if (connection) {
            try {
              await connection.close();
            } catch (err) {
              console.error(err);
            }
          }
        }

        let formmatedLists = result.rows.reduce((acc:any ,service: any) => {
                if(!(acc.find((item:any) => item.LOTE == `${service.LOTE}`)))
                  acc.push({
                    LOTE: service.LOTE,
                    PEDIDO: service.PEDIDO,
                    DATE_LOTE: service.DATE_LOTE,
                    CARDS: [{
                        
                        UMA: service.UMA,
                        SITUACAO: service.SITUACAO,
                        POSTO: service.POSTO,
                        ENDERECO: service.ENDERECO,
                        USER: service.USR
                    }]
                  })   
                else {
                  const obj = acc.find((item:any) => item.LOTE == `${service.LOTE}`)
                  obj['CARDS'].push({
                        UMA: service.UMA,
                        SITUACAO: service.SITUACAO,
                        POSTO: service.POSTO,
                        ENDERECO: service.ENDERECO,
                        USER: service.USR
                    })
          
                }  
                return acc
                   
              },[]);
        
        return formmatedLists;

  }

}

export default MovementsService 
