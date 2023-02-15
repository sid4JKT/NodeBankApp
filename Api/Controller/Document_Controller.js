const documentservice=require('../../services/Document_service')

const { logger } =require( '../../Util/logeer')

exports.getalldocuments= async (req,res)=>{
  try{
  console.log("get the data send to service", req.body)
  const getdata= await documentservice.getDocument(req.body)
  //console.log("controller",data)
  logger.info(`Server started at http://localhost:3100}`);
  let value = getdata.value
    return res.status(200).json({
      ststusCode:200,
      statusvalue:true,
      statustype:"success",
      statusmessage:"recordsaved",
      statusseverity:"information",
      value
    })
  }
  catch(err){
    logger.error("err in the controller getalldocuments",err)
    
    return res.status(500).json({
        StatusCode: 500,
        statusvalue:false,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "something went wrong",
    
    });  }
}
exports.getdocumentMasterbyId= async (req,res)=>{

  try{
  let documentId=req.body
  
  const data= await documentservice.getdocumentbyId(documentId)
  console.log("controller",data)
  logger.info(`Server started at http://localhost:3100}`);
  
  let value = data.value
  
  return res.status(200).json({
    ststusCode:200,
    statusvalue:true,
    statustype:"success",
    statusmessage:"recordsaved",
    statusseverity:"information",
    value
  })
  
}
catch(err){
  logger.error("err in the controller getdocumentMasterbyId",err)
  
    return res.status(500).json({
      
        StatusCode: 500,
        statusvalue:false,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "something went wrong",
    
    });
}
}
exports.getDocumentbyfilter= async (req,res)=>{
  try{
    let filterjson = req.body
    const getData = await documentservice.getDocumentMasterbyfilter(filterjson)
    console.log("controller",getData)
    //console.log("statusvalue",getData.statusvalue)
    let value = getData.value
    
    return res.status(200).json({
      ststusCode:200,
      statusvalue:true,
      statustype:"success",
      statusmessage:"recordsaved",
      statusseverity:"information",
      value
    })
    }
    catch(err){
      logger.error("err in the controller getDocumentbyfilter",err)
      
    return res.status(500).json({
        StatusCode: 500,
        statusvalue:false,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "something went wrong",
    });  
    }
    /*logger.info(`Server started at http://localhost:8080}`);
    return res.status(200).send(data)*/
}
exports.addDocumentMaster= async (req,res)=>{
  try{
    const addJson = req.body
    const getData = await documentservice.Add_DocumentMaster(addJson)
    //console.log("controller",getData)
    console.log("statusvalue",getData.statusvalue)
    
    
    return res.status(200).json({
      ststusCode:200,
      statusvalue:true,
      statustype:"success",
      statusmessage:"Record added successfully",
      statusseverity:"information"
    
    })   
  }
  catch(err){
    logger.error("err in the controller addDocumentMaster",err)
    
    return res.status(500).json({
      StatusCode: 500,
      statusvalue:false,
      StatusType: "error",
      StatusMessage: `${err}`,
      StatusSeverity: "something went wrong",
  });
  } 
}
exports.Update_DocumentMaster= async (req,res)=>{
  try{
    const addJson = req.body
    const getData = await documentservice.updateDocument_master(addJson)
    console.log("controller",getData)
    console.log("statusvalue",getData.statusvalue)
      let value = getData.Newvalue
      
      return res.status(200).json({
        ststusCode:200,
        statusvalue:true,
        statustype:"success",
        statusmessage:"Record updated successfully",
        statusseverity:"information",
        value
      })
         
  }
  catch(err){
    logger.error("err in the controller Update_DocumentMaster",err)
    
    return res.status(500).json({
      StatusCode: 500,
      statusvalue:false,
      StatusType: "error",
      StatusMessage: `${err}`,
      StatusSeverity: "something went wrong",
  }); 
  } 
};

exports.DeleteDocument_Master_byId= async (req,res)=>{
  try{
    const addJson = req.body
    const getData = await documentservice.Delete_Document_Master_Document(addJson)
    //console.log("controller",getData)
    //console.log("statusvalue",getData.statusvalue)
    
      return res.status(200).json({
        ststusCode:200,
        statusvalue:true,
        statustype:"success",
        statusmessage:"Deleted Successfully",
        statusseverity:"information",
        id:req.body.doc_id,
        })
      
    }
    catch(err){
      logger.error("err in the controller DeleteDocument_Master_byId",err)
      return res.status(500).json({
        StatusCode: 500,
        statusvalue:false,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "something went wrong",
    }); 
    }  
}


exports.getDocumentMasterbyRapidfilter= async (req,res)=>{
  try{
    let filterjson = req.body
    const getData = await documentservice.getDocumentMasterbyRapidfilter(filterjson)
    logger.info("Document_Controller -> getDocumentMasterbyRapidfilter -> Final Data : " + JSON.stringify(getData))
    if (getData.statusvalue) { 
        let value = getData.value
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
         
            StatusCode: 500,
            StatusType: "error",
            StatusMessage: getData.message,
            StatusSeverity: "Information",
       
        });
      }
    }
    catch(err){
      logger.error("err in the controller getDocumentMasterbyRapidfilter",err)
      return res.status(500).json({
        
          StatusCode: 500,
          StatusType: "error",
          StatusMessage: `${err}`,
          StatusSeverity: "something went wrong",
    
      });    
    }
} 

exports.getDocumentCustomerMasterbyfilter= async (req,res)=>{
  try{
    let filterjson = req.body
    logger.info("Document_Controller -> getDocumentCustomerMasterbyfilter -> Input Data : " + JSON.stringify(filterjson))
    const getData = await documentservice.getDocumentCustomerMasterbyfilter(filterjson)
    logger.info("Document_Controller -> getDocumentCustomerMasterbyfilter -> Final Data : " + JSON.stringify(getData))
    if (getData.statusvalue) { 
        let value = getData.value
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
         
            StatusCode: 500,
            StatusType: "error",
            StatusMessage: getData.message,
            StatusSeverity: "Information",
     
        });
      }
    }
    catch(err){
      logger.error("err in the controller getDocumentCustomerMasterbyfilter",err)
      return res.status(500).json({
       
          StatusCode: 500,
          StatusType: "error",
          StatusMessage: `${err}`,
          StatusSeverity: "something went wrong",
   
      });    
    }
}

exports.getDocumentCustomerMasterbyRapidfilter= async (req,res)=>{
  try{
    let filterjson = req.body
    const getData = await documentservice.getDocumentCustomerMasterbyRapidfilter(filterjson)
    logger.info("Document_Controller -> getDocumentCustomerMasterbyRapidfilter -> Final Data : " + JSON.stringify(getData))
    if (getData.statusvalue) { 
        let value = getData.value
        return res.status(200).json({
          ststusCode:200,
          statusvalue:true,
          statustype:"success",
          statusmessage:"recordsaved",
          statusseverity:"information",
          value
        });
      } else {
        return res.status(500).json({
         
            StatusCode: 500,
            StatusType: "error",
            StatusMessage: getData.message,
            StatusSeverity: "Information",
     
        });
      }
    }
    catch(err){
      logger.error("err in the controller getDocumentCustomerMasterbyRapidfilter",err)
      return res.status(500).json({
       
          StatusCode: 500,
          StatusType: "error",
          StatusMessage: `${err}`,
          StatusSeverity: "something went wrong",
     
      });    
    }
}

