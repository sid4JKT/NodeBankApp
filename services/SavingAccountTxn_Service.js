const SavingAccountTxn_Repo = require("../Database/Repository/SavingAccount_Repo");
const custRepo = require("../Database/Repository/Customer_Repo");
const documentService = require("./Document_Communication_Services");
const { logger } = require("../Util/logeer");
const doc = require("../RabbitMQ/Publisher");
const { Client } = require("pg");
const DB = require("../Database/dbconnection");
const pdf = require("../pdf/savingsPdf");
exports.withDrawByAccountNum = async (withdrawJson) => {
  try {
    let getData =
      await SavingAccountTxn_Repo.withDrawFromAccountByAccountNumber(
        withdrawJson
      );
    logger.info(`get the data form Repo  of Withdraw  ${getData} `);
    return getData;
  } catch (err) {
    logger.error("err in the service withDrawByAccountNum", err);
    throw err;
  }
};

exports.depositeInAccountByAccNum = async (depositeJson) => {
  try {
    const getdata = await SavingAccountTxn_Repo.depositInAccountByAccountNumber(
      depositeJson
    );
    logger.info(
      `get the data form Repo  of DepositInAccountByAccountNumber ${getdata} `
    );
    return getdata;
  } catch (err) {
    logger.error("err in the service depositeInAccountByAccNum", err);
    throw err;
  }
};

exports.getTransactionHistory = async (depositeJson) => {
  try {
    let getData = {};
    const getDataTxnHistory = await SavingAccountTxn_Repo.getTransactionHistory(
      depositeJson
    );
    logger.info(
      `get the data form Repo  of getTransactionHistory ${getDataTxnHistory} in the service`
    );
    const getDataforcustomer = await custRepo.getCustomerById(
      depositeJson.custId
    );
    getData.customerTXnHistory = getDataTxnHistory;
    getData.customerdetail = getDataforcustomer[0];
    return getData;
  } catch (error) {
    logger.error("err in the service getTransactionHistory", error);
    throw error;
  }
};

exports.getAllAccountType = async () => {
  try {
    const allAccountTypes = await SavingAccountTxn_Repo.getAllAccountTypes();
    return allAccountTypes;
  } catch (err) {
    logger.error("err in the Service getAllAccountType", err);
  }
};

exports.createSavingAccountService = async (savingData) => {
  const client = await DB.dbConnection();
  try {
    logger.info("the service ", savingData);
    const savingAccountCreatedData =
      await SavingAccountTxn_Repo.createSavingAccount(savingData, client);
    logger.info("saving account created Data:", savingAccountCreatedData);
    if (savingAccountCreatedData.statusvalue == true) {
      let custidDoc = {
        cust_id: savingData.custId,
        listDtlId: 1,
      };

      const payload = await documentService.documentCustomerForSaving(
        custidDoc,
        client
      );
      logger.info("document payload", payload);

      pdf.SavingsPDF(payload);
      logger.info("pdf savings acount");

      let documentData = await doc.savingDocumentPublisher(
        payload,
        "Saving_account_que"
      );
      logger.info("get the document data", documentData);

      return savingAccountCreatedData;
    }
    return savingAccountCreatedData;
  } catch (err) {
    logger.error("err in the Service createSavingAccountService", err);
    throw err;
  } finally {
    client.release();
  }
};

exports.deleteSavingAccountService = async (acctnum) => {
  try {
    logger.info("the service ", savingData);
    const deleteSavingAccountService =
      await SavingAccountTxn_Repo.deleteSavingAccount(acctnum);
    logger.info("saving account created Data:", deleteSavingAccountService);
    return deleteSavingAccountService;
  } catch (err) {
    logger.error("err in the Service deleteSavingAccountService", err);
    throw err;
  }
};
exports.getSaving_Transactionhistory = async (depositeJson) => {
  try {
    let getData = {};
    const getDataTxnHistory =
      await SavingAccountTxn_Repo.getSaving_Transactionhistory(depositeJson);
    logger.info(
      `get the data from Repo  of getTransactionHistory ${getDataTxnHistory} in the service`
    );
    getData.customerTXnHistory = getDataTxnHistory;
    return getData;
  } catch (err) {
    logger.error("err in the service getTransactionHistory", err);
    throw err;
  }
};
