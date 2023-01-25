<<<<<<< HEAD
const CommunicationService=require('../../services/Communication_Service')
const { logger } =require( '../../Util/logeer');

exports.getCommunicationDataById= async (req,res)=>{

try{
  logger.info("the getCommunicationDataById ",req.body)
  let getData=await CommunicationService.getCommunicationDataByIdService(req.body)
    if (getData.statusvalue) {
        delete getData.statusvalue;

        return res.status(200).send(getData.commnicationData);
      } else {
        return res.status(500).json({
          Status: {
            StatusCode: 500,
            StatusType: "error",
            StatusMessage: "Record not Found",
            StatusSeverity: "Information",
          },
        });
      }
}
catch(err)
{
logger.error("err in the controller getCommunicationDataById",err)
  return res.status(500).json({
    Status: {
      StatusCode: 500,
      StatusType: "error",
      StatusMessage: "Record not Saved",
      StatusSeverity: "something went wrong",
    },
  });
}
}

exports.getAllCommunicationData= async (req,res)=>{
    
 try{

    let getData=await CommunicationService.getAllCommunicationDataService()
    if (getData.statusvalue) {
        delete getData.statusvalue;

        return res.status(200).send(getData.commnicationData);
      } else {
        return res.status(500).json({
          Status: {
            StatusCode: 500,
            StatusType: "error",
            StatusMessage: "Record not Found",
            StatusSeverity: "Information",
          },
        });
      }
 }catch(err)
 {
    logger.error("err in the controller getAllCommunicationData",err)
   
  return res.status(500).json({
    Status: {
      StatusCode: 500,
      StatusType: "error",
      StatusMessage: "Record not Saved",
      StatusSeverity: "something went wrong",
    },
  });
 }
}


exports.InsertIntoDocument= async (req,res)=>{
    

   try{
    let getData=await CommunicationService.insertAllCommunctionDataService(req.body)
    if (getData.statusvalue) {
        delete getData.statusvalue;

        return res.status(200).send(getData.commnicationData);
      } else {
        return res.status(500).json({
          Status: {
            StatusCode: 500,
            StatusType: "error",
            StatusMessage: "Record not Found",
            StatusSeverity: "Information",
          },
        });
      }
   }catch(err)
   {logger.error("err in the controller InsertIntoDocument",err)
  
  return res.status(500).json({
    Status: {
      StatusCode: 500,
      StatusType: "error",
      StatusMessage: "Record not Saved",
      StatusSeverity: "something went wrong",
    },
  });

   }
}


exports.getAllDocumentCustomerMasterTableController = async (req, res) => {
  try{
    logger.info(`get the data send to service `,req.body);
  
  
    const getFilterDataForDocument= await CommunicationService.getAllDocumentCustomerMasterTableService(req.body);
  
     logger.info(`controller the data is `,getFilterDataForDocument);
  
    logger.info(`Server started at http://localhost:8080}`);
  
  
      return res.status(200).send(getFilterDataForDocument.value)
    
  
  }catch(err)
  {
  logger.error("err in the controller getAllDocumentCustomerMasterTableController",err)
  
  return res.status(500).json({
    Status: {
      StatusCode: 500,
      StatusType: "error",
      StatusMessage:`${err}`,
      StatusSeverity: "something went wrong",
    },
  });
  }
  
  
  };
=======
const CommunicationService=require('../../services/Communication_Service')
const { logger } =require( '../../Util/logeer');

exports.getCommunicationDataById= async (req,res)=>{

try{
  logger.info("the getCommunicationDataById ",req.body)
  let getData=await CommunicationService.getCommunicationDataByIdService(req.body)
    if (getData.statusvalue) {
        delete getData.statusvalue;

        return res.status(200).send(getData.commnicationData);
      } else {
        return res.status(500).json({
          Status: {
            StatusCode: 500,
            StatusType: "error",
            StatusMessage: "Record not Found",
            StatusSeverity: "Information",
          },
        });
      }
}
catch(err)
{
logger.error("err in the controller getCommunicationDataById",err)
  return res.status(500).json({
    Status: {
      StatusCode: 500,
      StatusType: "error",
      StatusMessage: "Record not Saved",
      StatusSeverity: "something went wrong",
    },
  });
}
}

exports.getAllCommunicationData= async (req,res)=>{
    
 try{

    let getData=await CommunicationService.getAllCommunicationDataService()
    if (getData.statusvalue) {
        delete getData.statusvalue;

        return res.status(200).send(getData.commnicationData);
      } else {
        return res.status(500).json({
          Status: {
            StatusCode: 500,
            StatusType: "error",
            StatusMessage: "Record not Found",
            StatusSeverity: "Information",
          },
        });
      }
 }catch(err)
 {
    logger.error("err in the controller getAllCommunicationData",err)
   
  return res.status(500).json({
    Status: {
      StatusCode: 500,
      StatusType: "error",
      StatusMessage: "Record not Saved",
      StatusSeverity: "something went wrong",
    },
  });
 }
}


exports.InsertIntoDocument= async (req,res)=>{
    

   try{
    let getData=await CommunicationService.insertAllCommunctionDataService(req.body)
    if (getData.statusvalue) {
        delete getData.statusvalue;

        return res.status(200).send(getData.commnicationData);
      } else {
        return res.status(500).json({
          Status: {
            StatusCode: 500,
            StatusType: "error",
            StatusMessage: "Record not Found",
            StatusSeverity: "Information",
          },
        });
      }
   }catch(err)
   {logger.error("err in the controller InsertIntoDocument",err)
  
  return res.status(500).json({
    Status: {
      StatusCode: 500,
      StatusType: "error",
      StatusMessage: "Record not Saved",
      StatusSeverity: "something went wrong",
    },
  });

   }
}


exports.getAllDocumentCustomerMasterTableController = async (req, res) => {
  try{
    logger.info(`get the data send to service `,req.body);
  
  
    const getFilterDataForDocument= await CommunicationService.getAllDocumentCustomerMasterTableService(req.body);
  
     logger.info(`controller the data is `,getFilterDataForDocument);
  
    logger.info(`Server started at http://localhost:8080}`);
  
  
      return res.status(200).send(getFilterDataForDocument.value)
    
  
  }catch(err)
  {
  logger.error("err in the controller getAllDocumentCustomerMasterTableController",err)
  
  return res.status(500).json({
    Status: {
      StatusCode: 500,
      StatusType: "error",
      StatusMessage:`${err}`,
      StatusSeverity: "something went wrong",
    },
  });
  }
  
  
  };
>>>>>>> 4245e5ca8949567eebfb153fca4dd0a367009d09
  