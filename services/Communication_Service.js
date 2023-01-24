const CommunicationRepo = require("../Database/Repository/Communication_Repo");
const { logger } = require("../Util/logeer");

exports.getCommunicationDataByIdService = async (req) => {
  try {
    let getData = await CommunicationRepo.getCommunctionById(req);
    logger.info(
      `get the data form Repo  of getCommunicationDataByIdService ${getData} `
    );

    return getData;
  } catch (err) {
    logger.error("err in the service getCommunicationDataByIdService", err);
    let resultData={}
    resultData.statusvalue=false
    resultData.message="something went wrong "+err
    return resultData
  }
};

exports.getAllCommunicationDataService = async () => {
  try {
    let getData = await CommunicationRepo.getAllCommunctionData();
    logger.info(
      `get the data form Repo  of getAllCommunicationDataService ${getData} `
    );

    return getData;
  } catch (err) {
    logger.error("err in the service getAllCommunicationDataService", err);
    let resultData={}
    resultData.statusvalue=false
    resultData.message="something went wrong "+err
    return resultData
  }
};

exports.insertAllCommunctionDataService = async (req) => {
  try {
    let getData = await CommunicationRepo.insertAllCommunctionData(req);
    logger.info(
      `get the data form Repo  of insertAllCommunctionDataService ${getData} `
    );

    return getData;
  } catch (err) {
    let resultData={}
    resultData.statusvalue=false
    resultData.message="something went wrong "+err
    logger.error("err in the service insertAllCommunctionDataService", err);
    return resultData
  }
};

exports.getAllDocumentCustomerMasterTableService = async (filterReq) => {
  try {
    const getFilterDataForDcoument =
      await CommunicationRepo.getAllDocumentCustomerMasterTable(filterReq);
    logger.info(
      `get the data form Repo  of getAllDocumentCustomerMasterTableService ${getFilterDataForDcoument} `
    );
    return getFilterDataForDcoument;
  } catch (err) {
    logger.error("err in the service getAllDocumentCustomerMasterTableService", err);
    throw err
  }
};

exports.insertIntoDocumentCustomerDataService= async (req)=>{
  try{
    let getData=await CommunicationRepo.insertDocCustomerData(req);
  logger.info(`get the data form Repo  of insertAllCommunctionDataService ${getData} `)
  // console.log(getData);
  return getData;

  }catch(err){
   logger.error("err in the service getAllDocumentCustomerMasterTableService", err);
   let resultData={}
   resultData.statusvalue=false
   resultData.message="something went wrong "+err
   return resultData
  }

}
