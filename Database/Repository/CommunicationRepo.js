
const DB = require("../dbconnection");
const { logger } = require("../../Util/logeer");
const {getdate,randomNumberInt}=require("./../../Util/util")

exports.getCommunctionById = async (req) => {
const client = await DB.dbConnection();
try{

let sqlQuerry=`select * from public."document_cutomer_master _table" where cust_id=${req.custId}`
let getCommunicationInfoData= await DB.ExtractQuerry(client, sqlQuerry);
let getData={}
getData.commnicationData=getCommunicationInfoData.rows[0]
getData.statusvalue=true
return getData;


}catch(err)
{   let resultdata;
    logger.error("get the error in the getCustomerById ",err)
    resultdata.statusvalue = false;
    resultdata.message = "something Went Wrong ";
    return resultdata;
}finally{
    client.release();

}
}



exports.getAllCommunctionData = async () => {
    const client = await DB.dbConnection();
    try{
    
    let sqlQuerry=`SELECT * FROM "public"."document_master" LIMIT 100`
    let getCommunicationInfoData= await DB.ExtractQuerry(client, sqlQuerry);
    let getData={}
    getData.commnicationData=getCommunicationInfoData.rows[0]
    getData.statusvalue=true
    return getData;
    
    
    }catch(err)
    {   let resultdata;
        logger.error("get the error in the getAllCommunctionData ",err)
        resultdata.statusvalue = false;
        resultdata.message = "something Went Wrong ";
        return resultdata;
    }finally{
        client.release();
    
    }
    }


 exports.insertAllCommunctionData = async (req) => {
        const client = await DB.dbConnection();
        try{
            let doc_id = await randomNumberInt(3);
        let sqlQuerry=`INSERT INTO public.document_master(
            doc_id, "DocDesc", "Doctype")
            VALUES (${doc_id}, '${req.DocDesc}', '${req.Doctype}');`
         await DB.ExtractQuerry(client, sqlQuerry);
        let getData={}
        getData.commnicationData={
            doc_id:doc_id,
            DocDesc:req.DocDesc,
            Doctype:req.Doctype
        }
        getData.statusvalue=true
        return getData;
        
        
        }catch(err)
        {   let resultdata;
            logger.error("get the error in the getAllCommunctionData ",err)
            resultdata.statusvalue = false;
            resultdata.message = "something Went Wrong ";
            return resultdata;
        }finally{
            client.release();
        
        }
        }