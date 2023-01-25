<<<<<<< HEAD
const documentservice=require('../../services/Document_service')

const { logger } =require( '../../Util/logeer')



exports.getalldocuments= async (req,res)=>{
  try{
  console.log("get the data send to service", req.body)
  const data= await documentservice.getDocument(req.body)
  //console.log("controller",data)
  logger.info(`Server started at http://localhost:3100}`);
  return res.status(200).send(data)
  }
  catch(err){
    logger.error("err in the controller getalldocuments",err)
    return res.status(500).json({
      Status: {
        StatusCode: 500,
        StatusType: "error",
        StatusMessage: "Record not Saved",
        StatusSeverity: "something went wrong",
      },
    });  }
}



exports.getdocumentMasterbyId= async (req,res)=>{

  try{
  let documentId=req.body
  
  const data= await documentservice.getdocumentbyId(documentId)
  console.log("controller",data)
  logger.info(`Server started at http://localhost:3100}`);
  
  if (data.statusvalue) {
    delete data.statusvalue;
    return res.status(200).send(data.value)
  } else {
    return res.status(500).json({
      Status: {
        StatusCode: 500,
        StatusType: "error",
        StatusMessage: data.message,
        StatusSeverity: "Information",
      },
    });
  }
}
catch(err){
  logger.error("err in the controller getdocumentMasterbyId",err)
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
 
exports.getDocumentbyfilter= async (req,res)=>{
  try{
    let filterjson = req.body
    const getData = await documentservice.getDocumentMasterbyfilter(filterjson)
    console.log("controller",getData)
    //console.log("statusvalue",getData.statusvalue)
    if (getData.statusvalue) { 
        return res.status(200).send(getData.value);
      } else {
        return res.status(500).json({
          Status: {
            StatusCode: 500,
            StatusType: "error",
            StatusMessage: getData.message,
            StatusSeverity: "Information",
          },
        });
      }
    }
    catch(err){
      logger.error("err in the controller getDocumentbyfilter",err)
      return res.status(500).json({
        Status: {
          StatusCode: 500,
          StatusType: "error",
          StatusMessage: `${err}`,
          StatusSeverity: "something went wrong",
        },
      });    }
    /*logger.info(`Server started at http://localhost:8080}`);
    return res.status(200).send(data)*/
}

 
exports.addDocumentMaster= async (req,res)=>{
  try{
    const addJson = req.body
    const getData = await documentservice.Add_DocumentMaster(addJson)
    //console.log("controller",getData)
    console.log("statusvalue",getData.statusvalue)
    if (getData.statusvalue) {
        return res.status(200).send("Document added successfully")
      } else {
        return res.status(500).json({
          Status: {
            StatusCode: 500, 
            StatusType: "error",
            StatusMessage: "Record not Saved",
            StatusSeverity: "Information",
          },
        });
      }   
  }
  catch(err){
    logger.error("err in the controller addDocumentMaster",err)
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
exports.Update_DocumentMaster= async (req,res)=>{
  try{
    const addJson = req.body
    const getData = await documentservice.updateDocument_master(addJson)
    console.log("controller",getData)
    console.log("statusvalue",getData.statusvalue)
    if (getData.statusvalue) {
        return res.status(200).send(getData.value)
      } else {
        return res.status(500).json({
          Status: {
            StatusCode: 500,
            StatusType: "error",
            StatusMessage: "Record not Saved",
            StatusSeverity: "Information",
          },
        });
      }   
  }
  catch(err){
    logger.error("err in the controller Update_DocumentMaster",err)
    return res.status(500).json({
      Status: {
        StatusCode: 500,
        StatusType: "error",
        StatusMessage: "Record not Saved",
        StatusSeverity: "something went wrong",
      },
    }); 
  } 
};

exports.DeleteDocument_Master_byId= async (req,res)=>{
  try{
    const addJson = req.body
    const getData = await documentservice.Delete_Document_Master_Document(addJson)
    //console.log("controller",getData)
    //console.log("statusvalue",getData.statusvalue)
    if (getData.statusvalue) {
        return res.status(200).send({
          id:req.body.doc_id,
          message:"Deleted Successfully"
        })
      } else {
        return res.status(500).json({
          Status: {
            StatusCode: 500,
            StatusType: "error",
            StatusMessage: "Record not Saved",
            StatusSeverity: "Information",
          },
        });
      }  
    }
    catch(err){
      logger.error("err in the controller DeleteDocument_Master_byId",err)
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

 

=======
const documentservice=require('../../services/Document_service')

const { logger } =require( '../../Util/logeer')



exports.getalldocuments= async (req,res)=>{
  try{
  console.log("get the data send to service", req.body)
  const data= await documentservice.getDocument(req.body)
  //console.log("controller",data)
  logger.info(`Server started at http://localhost:3100}`);
  return res.status(200).send(data)
  }
  catch(err){
    logger.error("err in the controller getalldocuments",err)
    return res.status(500).json({
      Status: {
        StatusCode: 500,
        StatusType: "error",
        StatusMessage: "Record not Saved",
        StatusSeverity: "something went wrong",
      },
    });  }
}



exports.getdocumentMasterbyId= async (req,res)=>{

  try{
  let documentId=req.body
  
  const data= await documentservice.getdocumentbyId(documentId)
  console.log("controller",data)
  logger.info(`Server started at http://localhost:3100}`);
  
  if (data.statusvalue) {
    delete data.statusvalue;
    return res.status(200).send(data.value)
  } else {
    return res.status(500).json({
      Status: {
        StatusCode: 500,
        StatusType: "error",
        StatusMessage: data.message,
        StatusSeverity: "Information",
      },
    });
  }
}
catch(err){
  logger.error("err in the controller getdocumentMasterbyId",err)
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
 
exports.getDocumentbyfilter= async (req,res)=>{
  try{
    let filterjson = req.body
    const getData = await documentservice.getDocumentMasterbyfilter(filterjson)
    console.log("controller",getData)
    //console.log("statusvalue",getData.statusvalue)
    if (getData.statusvalue) { 
        return res.status(200).send(getData.value);
      } else {
        return res.status(500).json({
          Status: {
            StatusCode: 500,
            StatusType: "error",
            StatusMessage: getData.message,
            StatusSeverity: "Information",
          },
        });
      }
    }
    catch(err){
      logger.error("err in the controller getDocumentbyfilter",err)
      return res.status(500).json({
        Status: {
          StatusCode: 500,
          StatusType: "error",
          StatusMessage: `${err}`,
          StatusSeverity: "something went wrong",
        },
      });    }
    /*logger.info(`Server started at http://localhost:8080}`);
    return res.status(200).send(data)*/
}

 
exports.addDocumentMaster= async (req,res)=>{
  try{
    const addJson = req.body
    const getData = await documentservice.Add_DocumentMaster(addJson)
    //console.log("controller",getData)
    console.log("statusvalue",getData.statusvalue)
    if (getData.statusvalue) {
        return res.status(200).send("Document added successfully")
      } else {
        return res.status(500).json({
          Status: {
            StatusCode: 500, 
            StatusType: "error",
            StatusMessage: "Record not Saved",
            StatusSeverity: "Information",
          },
        });
      }   
  }
  catch(err){
    logger.error("err in the controller addDocumentMaster",err)
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
exports.Update_DocumentMaster= async (req,res)=>{
  try{
    const addJson = req.body
    const getData = await documentservice.updateDocument_master(addJson)
    console.log("controller",getData)
    console.log("statusvalue",getData.statusvalue)
    if (getData.statusvalue) {
        return res.status(200).send(getData.value)
      } else {
        return res.status(500).json({
          Status: {
            StatusCode: 500,
            StatusType: "error",
            StatusMessage: "Record not Saved",
            StatusSeverity: "Information",
          },
        });
      }   
  }
  catch(err){
    logger.error("err in the controller Update_DocumentMaster",err)
    return res.status(500).json({
      Status: {
        StatusCode: 500,
        StatusType: "error",
        StatusMessage: "Record not Saved",
        StatusSeverity: "something went wrong",
      },
    }); 
  } 
};

exports.DeleteDocument_Master_byId= async (req,res)=>{
  try{
    const addJson = req.body
    const getData = await documentservice.Delete_Document_Master_Document(addJson)
    //console.log("controller",getData)
    //console.log("statusvalue",getData.statusvalue)
    if (getData.statusvalue) {
        return res.status(200).send({
          id:req.body.doc_id,
          message:"Deleted Successfully"
        })
      } else {
        return res.status(500).json({
          Status: {
            StatusCode: 500,
            StatusType: "error",
            StatusMessage: "Record not Saved",
            StatusSeverity: "Information",
          },
        });
      }  
    }
    catch(err){
      logger.error("err in the controller DeleteDocument_Master_byId",err)
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

 

>>>>>>> 4245e5ca8949567eebfb153fca4dd0a367009d09
