
const Customertxn_Repo=require('../Database/Repository/CustomerTxn_Repo');
const { logger } = require("../Util/logeer");


exports.Customertxn=async()=>{

try{

    let getData=await Customertxn_Repo.getAllCustomerTxn();
logger.info(`get the data form Repo  of Customertxn ${getData} `)

return getData;

}catch(err)
{
    logger.error("err in the service Customertxn",err)
throw err
}

}




exports.CustomerTxnHistoryByFilter=async(req)=>{
try{
    let getData=await Customertxn_Repo.getAllCustomerTxnFilter(req);
    logger.info(`get the data form Repo  of CustomerTxnHistoryByFilter ${getData} `)
    
    return getData;

}catch(err)
{
    logger.error("err in the service CustomerTxnHistoryByFilter",err)
   throw err
}
    
}


exports.getBalanceAndLoanAmountByFilterService=async(req)=>{
    try{
        let getDataformGetBalanceAndLoanAmountByFilter=await Customertxn_Repo.getBalanceAndLoanAmountByFilter(req);
        logger.info(`get the data form Repo  of getBalanceAndLoanAmountByFilter ${getDataformGetBalanceAndLoanAmountByFilter} `)
        
        return getDataformGetBalanceAndLoanAmountByFilter;
    
    }catch(err)
    {
        logger.error("err in the service getBalanceAndLoanAmountByFilterService",err)
       throw err
    }
}

exports.getcCustomerTxnByNameService=async(req)=>{
    try{
        let getcCustomerTxnByCustIdServiceData=await Customertxn_Repo.getcCustomerTxnByName(req);
        logger.info(`get the data form Repo  of getcCustomerTxnByCustIdServiceData ${getcCustomerTxnByCustIdServiceData} `)
        
        return getcCustomerTxnByCustIdServiceData;
    
    }catch(err)
    {
        logger.error("err in the service getcCustomerTxnByCustIdService",err)
        throw err
    }
}

exports.getLoanAmountByFilterService = async (req) => {
    try {
      let getLoanAmountByFilterData =
        await Customertxn_Repo.getLoanAmountByFilter(req);
      logger.info(
        `get the data form Repo  of getLoanAmountByFilter ${getLoanAmountByFilterData} `
      );
      return getLoanAmountByFilterData;
    } catch (err) {
      logger.error("err in the service getLoanAmountByFilterService", err);
      throw err;
    }
  };