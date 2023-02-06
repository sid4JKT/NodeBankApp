const SavingAccountTxnService = require("../../services/SavingAccountTxn_Service");
const { logger } = require("../../Util/logeer");
const documentService = require("../../services/Document_Communication_Services");

exports.withDrawInAccount = async (req, res) => {
  try {
    logger.info(`get data in the withdraw ${req.body}`);
    const withDrawJson = req.body;
    const getData = await SavingAccountTxnService.withDrawByAccountNum(
      withDrawJson
    );

    logger.info(`get data in the withdraw ${getData.statusvalue}`);
    logger.info(`get data in the Deposite ${JSON.stringify(getData)}`);
   
    let value = getData.value
    
    return res.status(200).json({
      ststusCode:200,
      statusvalue:true,
      statustype:"success",
      statusmessage:"recordsaved",
      statusseverity:"information",
      value
    })
    
  } catch (err) {
    logger.error("err in the controller", err);
    
    return res.status(500).json({
        StatusCode: 500,
        statusvalue:false,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "Information",
    });
  }
};

exports.depositInAccount = async (req, res) => {
  let getData;
  try {
    logger.info(`get data in the Deposite ${req.body}`);
    const depositeJson = req.body;
    getData = await SavingAccountTxnService.depositeInAccountByAccNum(
      depositeJson
    );
    let value = getData.value
    
    return res.status(200).json({
      ststusCode:200,
      statusvalue:true,
      statustype:"success",
      statusmessage:"recordsaved",
      statusseverity:"information",
      value
    })
  } catch (err) {
    logger.error("err in the controller", err);
    return res.status(500).json({
        StatusCode: 500,
        statusvalue:false,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "Information",
    });
  }
};

exports.getTransactionHistory = async (req, res) => {
  try {
    logger.info(`get the data send to service `, req.body);
    const getData = await SavingAccountTxnService.getTransactionHistory(req.body);

    logger.info(`controller the data is `, getData);

    logger.info(`Server started at http://localhost:3100}`);
    let value = getData.customerTXnHistory
    
    return res.status(200).json({
      ststusCode:200,
      statusvalue:true,
      statustype:"success",
      statusmessage:"recordsaved",
      statusseverity:"information",
      value
    });
  } catch (err) {
    logger.error("err in the controller getTransactionHistory", err);
    
    return res.status(500).json({
        StatusCode: 500,
        statusvalue:false,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "Information",
    });
  }
};

exports.getAllAccountType = async (req, res) => {
  logger.info(`get loan data by using customer id ${req.body}`);
  try {
  const allAccountTypes = await SavingAccountTxnService.getAllAccountType();
    
      let value = allAccountTypes.value.rows
      
      return res.status(200).json({
        ststusCode:200,
        statusvalue:true,
        statustype:"success",
        statusmessage:"recordsaved",
        statusseverity:"information",
        value
      })
    
  } catch (err) {
    logger.error("err in the controller", err);
   
    return res.status(500).json({
        StatusCode: 500,
        statusvalue:false,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "Information",
    });
  }
};

exports.createSavingAccountController = async (req, res) => {
  try {
    logger.info(`controller createSavingAccountController  ${req.body}`);
    const savingAccountData =
      await SavingAccountTxnService.createSavingAccountService(req.body);
      let value = savingAccountData.value
      
      return res.status(200).json({
        ststusCode:200,
        statusvalue:true,
        statustype:"success",
        statusmessage:"recordsaved",
        statusseverity:"information",
        value
      })
  } catch (err) {
    logger.error("err in the controller", err);
    
    return res.status(500).json({
      
        StatusCode: 500,
        statusvalue:false,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "Information",
   
    });
  }
};

exports.deleteSavingAccountController = async (req, res) => {
  try {
    logger.info(`controller deleteSavingAccountController  ${req.body}`);
    const deleteSavingAccountControllerData =
      await SavingAccountTxnService.deleteSavingAccountService(req.body.acctnum);
    
    
    return res.status(200).json({
      ststusCode:200,
      statusvalue:true,
      statustype:"success",
      statusmessage:"Deleted Successfully",
      statusseverity:"information",
      
    })
  } catch (err) {
    logger.error("err in the controller", err);
    
    return res.status(500).json({
      
        StatusCode: 500,
        statusvalue:false,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "Information",
   
    });
  }
};
exports.getSaving_Transactionhistory = async (req, res) => {
  try{
    logger.info(`get the data send to service `,req.body);
  
    const getData = await SavingAccountTxnService.getSaving_Transactionhistory(req.body);
    
      let value = getData.value
      return res.status(200).json({
        ststusCode:200,
        statusvalue:true,
        statustype:"success",
        statusmessage:"recordsaved",
        statusseverity:"information",
        value,
      })
  }catch(err)
  {
    logger.error("err in the controller", err);
    
    return res.status(500).json({
        StatusCode: 500,
        statusvalue:false,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "Information",
   
    });
  } 
};
exports.getSavingaccountTransactionByfilter = async (req, res) => {
  try{
    logger.info(`get the data send to service `,req.body);
    const getData = await SavingAccountTxnService.getTransactionByfilter(req.body);
    console.log("statusvalue:",getData.statusvalue)
    let value = getData.value
    
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
  logger.error("err in the controller",err)
  
    return res.status(500).json({
      
        StatusCode: 500,
        statusvalue:false,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "Information",
    });
  }
  };
  exports.getLoanaccountTransactionByfilter = async (req, res) => {
    try{
      logger.info(`get the data send to service `,req.body);
    
      const getData = await SavingAccountTxnService.getloanaccountTransactionByfilter(req.body);
      let value = getData.value
      
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
    logger.error("err in the controller",err)
    
    return res.status(500).json({
       
        StatusCode: 500,
        statusvalue:false,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "Information",
      
    });
    }
};