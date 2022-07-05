import OracleDB from '../database/oracle';

class PickingsResumeService {
 
  async execute(){

        await OracleDB.instance();

        const result = await OracleDB.execute(`
        SELECT  SIT.NOMSITATV AS SITUACAO,
        COUNT(PST.NOMPST)QUANTIDADE 
         FROM  WMS_ORDSVC SVC
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
         WHERE  SVC.IDCATV IN (8,20,21 ) AND SIT.NOMSITATV IN ('LIBERADA', 'EM EXECUCAO', 'OCORRENCIA')
                AND ( ORD.IDCLOT  IN (SELECT SVC.IDCLOT
                                         FROM   WMS_ORDSVC SVC
                                                INNER JOIN WMS_ORDENTSAI ORD
                                                        ON SVC.IDCLOT = ORD.IDCLOT
                                                INNER JOIN WMS_CADLOT LOT
                                                        ON LOT.IDCLOT = ORD.IDCLOT
                                                LEFT JOIN WMS_CADUMA UMA
                                                        ON UMA.IDCLOTEXP = ORD.IDCLOT
                                                           AND IDCUMADST = UMA.IDCUMA
                                                 
                                         WHERE  SVC.IDCATV IN (8,20,21)
                                                AND LOT.IDCSITEXE = 2
                                                AND ORD.IDCTIPORD = 5
                                                AND IDCSITATV IN ( 2, 3, 4, 5, 7 )
                                               ) OR ORD.IDCLOT IN (SELECT DISTINCT IDCLOT FROM OCO_MOVOCO
                                                             WHERE  IDCSITOCO IN (1,3,5) AND IDCOCO = 14))
               
                                                               

           GROUP BY   SIT.NOMSITATV
         
         `
        )
     
        return result.rows; 

  }

}

export default PickingsResumeService 
