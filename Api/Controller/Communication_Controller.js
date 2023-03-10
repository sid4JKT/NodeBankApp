const CommunicationService=require('../../services/Communication_Service')
const { logger } =require( '../../Util/logeer');

exports.getCommunicationDataById= async (req,res)=>{

try{
  logger.info("the getCommunicationDataById ",req.body)
  let getData=await CommunicationService.getCommunicationDataByIdService(req.body)
    if (getData.statusvalue) {
        let value = getData.commnicationData
        return res.status(200).json({
          ststusCode:200,
          statusvalue:true,
          statustype:"success",
          statusmessage:"recordsaved",
          statusseverity:"information",
          value
        })
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
  StatusCode: 500,
  statusvalue:false,
  StatusType: "error",
  StatusMessage: `${err}`,
  StatusSeverity: "Information",
});
}
}

exports.getAllCommunicationData= async (req,res)=>{
    
 try{

    let getData=await CommunicationService.getAllCommunicationDataService()
    if (getData.statusvalue) {
        let value = getData.commnicationData

        return res.status(200).json({
          ststusCode:200,
          statusvalue:true,
          statustype:"success",
          statusmessage:"recordsaved",
          statusseverity:"information",
          value
        })
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
      StatusCode: 500,
      statusvalue:false,
      StatusType: "error",
      StatusMessage: `${err}`,
      StatusSeverity: "Information",
    });
 }
}


exports.InsertIntoDocument= async (req,res)=>{
    

   try{
    let getData=await CommunicationService.insertAllCommunctionDataService(req.body)
    if (getData.statusvalue) {
        let value = getData.commnicationData

        return res.status(200).json({
          ststusCode:200,
          statusvalue:true,
          statustype:"success",
          statusmessage:"recordsaved",
          statusseverity:"information",
          value
        })
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
    StatusCode: 500,
    statusvalue:false,
    StatusType: "error",
    StatusMessage: `${err}`,
    StatusSeverity: "Information",
  });

   }
}


exports.getAllDocumentCustomerMasterTableController = async (req, res) => {
  try{
    logger.info(`get the data send to service `,req.body);
  
  
    const getFilterDataForDocument= await CommunicationService.getAllDocumentCustomerMasterTableService(req.body);
  
     logger.info(`controller the data is `,getFilterDataForDocument);
  
    logger.info(`Server started at http://localhost:8080}`);
  
  
      let value = getFilterDataForDocument.value
      return res.status(200).json({
        ststusCode:200,
        statusvalue:true,
        statustype:"success",
        statusmessage:"recordsaved",
        statusseverity:"information",
        value
      })
  
  }catch(err)
  {
  logger.error("err in the controller getAllDocumentCustomerMasterTableController",err)
  
  return res.status(500).json({
    StatusCode: 500,
    statusvalue:false,
    StatusType: "error",
    StatusMessage: `${err}`,
    StatusSeverity: "Information",
  });
  }
  
  
  };
  