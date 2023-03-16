import OracleDB from '../database/oracle';

class SamplesService {
 
  async execute(){

        await OracleDB.instance();

        // const result = await OracleDB.execute(
        //         `SELECT          SVC.IDCLOT AS LOTE,
        //         ORD.NROORD AS PEDIDO,
        //         SIT.NOMSITATV AS SITUACAO,
        //         ENDE.ENDBYIDC AS ENDERECO,
        //         PST.NOMPST AS POSTO,
        //         MER.CODMER AS MERCADORIA,
        //         SVC.QTDMER AS QUANTIDADE,
        //         LOT.DATGERLOT AS DATE_LOTE,
        //         USR.NOMUSR AS USR,
        //         ATV.NOMABRATV AS ATV
        //  FROM   WMS_ORDSVC SVC
        //         INNER JOIN WMS_ORDENTSAI ORD
        //                 ON SVC.IDCLOT = ORD.IDCLOT
        //                 AND ORD.IDCTIPORD = 16
        //                 AND ORD.IDCPSSPRP = 1
        //         INNER JOIN WMS_CADATV ATV
        //                 ON ATV.IDCATV = SVC.IDCATV
        //         INNER JOIN WMS_CADLOT LOT
        //                 ON LOT.IDCLOT = ORD.IDCLOT  
        //                 AND LOT.IDCSITEXE = 2
        //         INNER JOIN WMS_CADSITATV SIT
        //                 ON SIT.IDCSITATV = SVC.IDCSITATV
        //         INNER JOIN VW_WMS_CADEND ENDE
        //                 ON ENDE.IDCEND = SVC.IDCENDORI     
        //         INNER JOIN WMS_RELPSTEND RELPST
        //                 ON RELPST.IDCEND = ENDE.IDCEND
        //         INNER JOIN WMS_CADPST PST
        //                 ON PST.IDCPST = RELPST.IDCPST
        //         INNER JOIN WMS_CADSKU SKU
        //                 ON SKU.IDCSKU = SVC.IDCSKU
        //         INNER JOIN WMS_CADMER MER
        //                 ON SKU.IDCMER = MER.IDCMER               
        //         LEFT JOIN SAG_CADUSR USR
        //                 ON USR.IDCUSR = SVC.IDCUSREXE
                
        //  WHERE  SVC.IDCATV IN (8)
        //         AND  ORD.IDCLOT  IN (SELECT SVC.IDCLOT
        //                                  FROM   WMS_ORDSVC SVC
        //                                         INNER JOIN WMS_ORDENTSAI ORD
        //                                                 ON SVC.IDCLOT = ORD.IDCLOT
        //                                         INNER JOIN WMS_CADLOT LOT
        //                                                 ON LOT.IDCLOT = ORD.IDCLOT
        //                                         LEFT JOIN WMS_CADUMA UMA
        //                                                 ON UMA.IDCLOTEXP = ORD.IDCLOT
        //                                                    AND IDCUMADST = UMA.IDCUMA
                                                 
        //                                  WHERE  SVC.IDCATV IN (8)
        //                                         AND SVC.IDCMODOPR = 9
        //                                         AND LOT.IDCSITEXE = 2
        //                                         AND ORD.IDCTIPORD = 16
        //                                         AND IDCSITATV IN ( 2, 3, 4, 5, 7 )
        //                                        )                                                           
        //   ORDER BY DATE_LOTE, LOTE,SITUACAO,POSTO, ENDERECO
        //  `
        // )
        const result = await OracleDB.execute(
                `SELECT          SVC.IDCLOT AS LOTE,
                ORD.NROORD AS PEDIDO,
                SIT.NOMSITATV AS SITUACAO,
                ENDE.ENDBYIDC AS ENDERECO,
                PST.NOMPST AS POSTO,
                MER.CODMER AS MERCADORIA,
                SVC.QTDMER AS QUANTIDADE,
                LOT.DATGERLOT AS DATE_LOTE,
                USR.NOMUSR AS USR,
                ATV.NOMABRATV AS ATV
         FROM   WMS_ORDSVC SVC
                INNER JOIN WMS_ORDENTSAI ORD
                        ON SVC.IDCLOT = ORD.IDCLOT
                        AND ORD.IDCTIPORD = 16
                        AND ORD.IDCPSSPRP = 1
                INNER JOIN WMS_CADATV ATV
                        ON ATV.IDCATV = SVC.IDCATV
                INNER JOIN WMS_CADLOT LOT
                        ON LOT.IDCLOT = ORD.IDCLOT  
                       
                INNER JOIN WMS_CADSITATV SIT
                        ON SIT.IDCSITATV = SVC.IDCSITATV
                INNER JOIN VW_WMS_CADEND ENDE
                        ON ENDE.IDCEND = SVC.IDCENDORI     
                INNER JOIN WMS_RELPSTEND RELPST
                        ON RELPST.IDCEND = ENDE.IDCEND
                INNER JOIN WMS_CADPST PST
                        ON PST.IDCPST = RELPST.IDCPST
                INNER JOIN WMS_CADSKU SKU
                        ON SKU.IDCSKU = SVC.IDCSKU
                INNER JOIN WMS_CADMER MER
                        ON SKU.IDCMER = MER.IDCMER               
                LEFT JOIN SAG_CADUSR USR
                        ON USR.IDCUSR = SVC.IDCUSREXE
                
         WHERE  SVC.IDCATV IN (8) AND NROEXT IS NULL
                AND  ORD.IDCLOT  IN (SELECT SVC.IDCLOT
                                         FROM   WMS_ORDSVC SVC
                                                INNER JOIN WMS_ORDENTSAI ORD
                                                        ON SVC.IDCLOT = ORD.IDCLOT
                                                INNER JOIN WMS_CADLOT LOT
                                                        ON LOT.IDCLOT = ORD.IDCLOT
                                                LEFT JOIN WMS_CADUMA UMA
                                                        ON UMA.IDCLOTEXP = ORD.IDCLOT
                                                           AND IDCUMADST = UMA.IDCUMA
                                                 
                                         WHERE  SVC.IDCATV IN (8)
                                                AND SVC.IDCMODOPR = 9
                                               
                                                AND ORD.IDCTIPORD = 16
                                                AND IDCSITATV IN ( 6 )
                                               )                                                           
          ORDER BY DATE_LOTE, LOTE, SITUACAO,POSTO, ENDERECO
         `
        )


        let formmatedLists = result.rows.reduce((acc:any ,service: any) => {
                if(!(acc.find((item:any) => item.LOTE == `${service.LOTE}`)))
                  acc.push({
                    LOTE: service.LOTE,
                    PEDIDO: service.PEDIDO,
                    DATE_LOTE: service.DATE_LOTE,
                    [service.SITUACAO]: Number((acc[service.SITUACAO] || 0)) + 1,
                    CARDS: [{        
                        SITUACAO: service.SITUACAO,
                        POSTO: service.POSTO,
                        ENDERECO: service.ENDERECO,
                        USER: service.USR,
                        MERCADORIA: service.MERCADORIA,
                        QUANTIDADE: service.QUANTIDADE
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
                        MERCADORIA: service.MERCADORIA,
                        QUANTIDADE: service.QUANTIDADE
                    })
          
                }  
                return acc
                   
        },[]);
      
        
        return formmatedLists;

        

  }

}

export default SamplesService 
