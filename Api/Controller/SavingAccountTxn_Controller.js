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
   
      return res.status(200).send(getData.value);
    
  } catch (err) {
    logger.error("err in the controller", err);
    return res.status(500).json({
      Status: {
        StatusCode: 500,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "something went wrong",
      },
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

    return res.status(200).send(getData.value);
  } catch (err) {
    logger.error("err in the controller", err);
    return res.status(500).json({
      Status: {
        StatusCode: 500,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "something went wrong",
      },
    });
  }
};

exports.getTransactionHistory = async (req, res) => {
  try {
    logger.info(`get the data send to service `, req.body);
    const getData = await SavingAccountTxnService.getTransactionHistory(
      req.body
    );

    logger.info(`controller the data is `, getData);

    logger.info(`Server started at http://localhost:8080}`);

    return res.status(200).send(getData.customerTXnHistory);
  } catch (err) {
    logger.error("err in the controller getTransactionHistory", err);
    return res.status(500).json({
      Status: {
        StatusCode: 500,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "something went wrong",
      },
    });
  }
};

exports.getAllAccountType = async (req, res) => {
  logger.info(`get loan data by using customer id ${req.body}`);

  const allAccountTypes = await SavingAccountTxnService.getAllAccountType();

  try {
    if (allAccountTypes.statusvalue) {
      return res.status(200).send(allAccountTypes.value.rows);
    } else {
      return res.status(500).json({
        Status: {
          StatusCode: 500,
          StatusType: "error",
          StatusMessage: "Record not Retrieved",
          StatusSeverity: "Information",
        },
      });
    }
  } catch (err) {
    logger.error("err in the controller", err);
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

exports.createSavingAccountController = async (req, res) => {
  try {
    logger.info(`controller createSavingAccountController  ${req.body}`);
    const savingAccountData =
      await SavingAccountTxnService.createSavingAccountService(req.body);
    return res.status(200).send(savingAccountData.value);
  } catch (err) {
    logger.error("err in the controller", err);
    return res.status(500).json({
      Status: {
        StatusCode: 500,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "something went wrong",
        errmessage: err,
      },
    });
  }
};

exports.deleteSavingAccountController = async (req, res) => {
  try {
    logger.info(`controller deleteSavingAccountController  ${req.body}`);
    const deleteSavingAccountControllerData =
      await SavingAccountTxnService.deleteSavingAccountService(
        req.body.acctnum
      );
    return res.status(200).send(deleteSavingAccountControllerData.value);
  } catch (err) {
    logger.error("err in the controller", err);
    return res.status(500).json({
      Status: {
        StatusCode: 500,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "something went wrong",
      },
    });
  }
};
exports.getSaving_Transactionhistory = async (req, res) => {
  try{
    logger.info(`get the data send to service `,req.body);
  
    const getData = await SavingAccountTxnService.getSaving_Transactionhistory(req.body);
    if (getData.customerTXnHistory.statusvalue) {
      delete getData.customerTXnHistory.statusvalue;
      return res.status(200).send(getData.customerTXnHistory.value)
    } else {
      return res.status(500).json({
        Status: { 
          StatusCode: 500,
          StatusType: "error",
          StatusMessage: `${err}`,
          StatusSeverity: "Information",
        },
      });
    }
  
  }catch(err)
  {
    logger.error("err in the controller", err);
    return res.status(500).json({
      Status: {
        StatusCode: 500,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "something went wrong",
      },
    });  
  } 
};
exports.getSavingaccountTransactionByfilter = async (req, res) => {
  try{
    logger.info(`get the data send to service `,req.body);
  
    const getData = await SavingAccountTxnService.getTransactionByfilter(req.body);
    return res.status(200).send(getData.value)
    
  }catch(err)
  {
  logger.error("err in the controller",err)
  return res.status(500).json({
    Status: { 
      StatusCode: 500,
      StatusType: "error",
      StatusMessage: `${err}`,
      StatusSeverity: "Information",
    },
  });
  }
  };
  exports.getLoanaccountTransactionByfilter = async (req, res) => {
    try{
      logger.info(`get the data send to service `,req.body);
    
      const getData = await SavingAccountTxnService.getloanaccountTransactionByfilter(req.body);
      return res.status(200).send(getData.value)
       
    }catch(err)
    {
    logger.error("err in the controller",err)
    return res.status(500).json({
      Status: { 
        StatusCode: 500,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "Information",
      },
    });
    }
};