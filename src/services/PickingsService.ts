import OracleDB from '../database/oracle';

class PickingsService {
 
  async execute(){

        await OracleDB.instance();

        const result = await OracleDB.execute(
                `SELECT SVC.IDCLOT AS LOTE,
                ORD.NROORD AS PEDIDO,
                SIT.NOMSITATV AS SITUACAO,
                ENDE.ENDBYIDC AS ENDERECO,
                PST.NOMPST AS POSTO,
                LOT.DATGERLOT AS DATE_LOTE,
                USR.NOMUSR AS USR,
                ATV.NOMABRATV AS ATV,
                OCO AS OCO
         FROM   WMS_ORDSVC SVC
                INNER JOIN WMS_ORDENTSAI ORD
                        ON SVC.IDCLOT = ORD.IDCLOT
                        AND ORD.IDCTIPORD = 5
                        AND ORD.IDCPSSPRP = 1
                INNER JOIN WMS_CADATV ATV
                        ON ATV.IDCATV = SVC.IDCATV
                INNER JOIN WMS_CADLOT LOT
                        ON LOT.IDCLOT = ORD.IDCLOT
                        AND LOT.IDCSITEXE = 2
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
                LEFT JOIN (SELECT DISTINCT IDCLOT AS LOTE , 1 AS OCO FROM OCO_MOVOCO
                                                             WHERE  IDCSITOCO IN (1,3,5) AND IDCOCO = 14)OCO
                                                             ON OCO.LOTE = LOT.IDCLOT    
                
         WHERE  SVC.IDCATV IN (8,20,21)
                AND ( ORD.IDCLOT  IN (SELECT SVC.IDCLOT
                                         FROM   WMS_ORDSVC SVC
                                                INNER JOIN WMS_ORDENTSAI ORD
                                                        ON SVC.IDCLOT = ORD.IDCLOT
                                                INNER JOIN WMS_CADLOT LOT
                                                        ON LOT.IDCLOT = ORD.IDCLOT
                                                INNER JOIN WMS_CADUMA UMA
                                                        ON UMA.IDCLOTEXP = ORD.IDCLOT
                                                           AND IDCUMADST = UMA.IDCUMA
                                                 
                                         WHERE  SVC.IDCATV IN (8,20,21)
                                                AND LOT.IDCSITEXE = 2
                                                AND ORD.IDCTIPORD = 5
                                                AND IDCSITATV IN ( 2, 3, 4, 5, 7 )
                                               ) OR ORD.IDCLOT IN (SELECT DISTINCT IDCLOT FROM OCO_MOVOCO
                                                             WHERE  IDCSITOCO IN (1,3,5) AND IDCOCO = 14))
                                                               
          ORDER BY DATE_LOTE, LOTE, SITUACAO,POSTO, ENDERECO
         
         
         `
        )


        let formmatedLists = result.rows.reduce((acc:any ,service: any) => {
                if(!(acc.find((item:any) => item.LOTE == `${service.LOTE}`)))
                  acc.push({
                    LOTE: service.LOTE,
                    PEDIDO: service.PEDIDO,
                    DATE_LOTE: service.DATE_LOTE,
                    OCO: service.OCO,
                    [service.SITUACAO]: Number((acc[service.SITUACAO] || 0)) + 1,
                    CARDS: [{        
                        SITUACAO: service.SITUACAO,
                        POSTO: service.POSTO,
                        ENDERECO: service.ENDERECO,
                        USER: service.USR,
                        ATV: service.ATV
                    }]
                  })   
                else {
                  const obj = acc.find((item:any) => item.LOTE == `${service.LOTE}`)
                  obj[service.SITUACAO] = Number((obj[service.SITUACAO] || 0)) + 1
                  obj['CARDS'].push({
                        SITUACAO: service.SITUACAO,
                        POSTO: service.POSTO,
                        ENDERECO: service.ENDERECO,
                        USER: service.USR,
                        ATV: service.ATV
                    })
          
                }  
                return acc
                   
        },[]);
      
        
        return formmatedLists;

        

  }

}

export default PickingsService 
