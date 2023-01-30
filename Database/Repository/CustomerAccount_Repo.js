const DB = require("../dbconnection");
const { logger } = require("../../Util/logeer");
const { getdate, randomNumberInt } = require("../../Util/util");

exports.createCustomerAccount = async (loanDataRequest, accountTypeId) => {
  const client = await DB.dbConnection();
  try {
    logger.info(
      "CustomerAccount_Repo -> createCustomerAccount -> Inputs : " +
        JSON.stringify(loanDataRequest) +
        " <--> " +
        accountTypeId
    );
    let queryString;
    let resultdata = {};
    let accountStatus = "Active";
    let newAccountId = 1;
    let today = new Date();
    if (loanDataRequest.hasOwnProperty("CustId")) {
      queryString = `INSERT INTO CustomerAccounts(cust_id, accounttypeid, status, date) VALUES('${
        loanDataRequest.CustId
      }', '${accountTypeId}', '${accountStatus}', '${new Date()}')`;
      await DB.ExtractQuerry(client, queryString);
      queryString =
        "SELECT CustomerAccounts.max(AcctNum) FROM CustomerAccounts";
      queryString = "SELECT max(AcctNum) FROM CustomerAccounts";
      let AccountNumber = await DB.ExtractQuerry(client, queryString);
      newAccountId = AccountNumber.rows[0].max;

      resultdata.statusvalue = true;
      resultdata.message = "CustomerAccounts Records Created";
      resultdata.value = {
        cust_id: loanDataRequest.CustId,
        AcctNum: newAccountId,
        accounttypeid: loanDataRequest.AccounttypeId,
        Status: accountStatus,
      };
    } else {
      logger.info(
        "CustomerAccount_Repo -> createCustomerAccount -> Request should get Customer Id or Account Number"
      );
      throw new Error(" Request should get Customer Id or Account Number");
    }
    return resultdata;
  } catch (err) {
    logger.info(
      "CustomerAccount_Repo -> createCustomerAccount -> Customer account Repo Error : " +
        err
    );
    throw err;
    return resultdata;
  } finally {
    client.release();
  }
};

exports.getCustomerAccounts = async (accountDataRequest) => {
  const client = await DB.dbConnection();
  try {
    let queryString;
    let resultdata = {};
    let custId;
    if (
      (accountDataRequest.hasOwnProperty("CustID") ||
        accountDataRequest.hasOwnProperty("cust_id")) &&
      accountDataRequest.hasOwnProperty("AccountNumber")
    ) {
      if (accountDataRequest.hasOwnProperty("CustID")) {
        custId = accountDataRequest.CustID;
      } else {
        custId = accountDataRequest.cust_id;
      }
      let accNumber = accountDataRequest.AccountNumber;
      queryString = `SELECT CustomerAccounts.* FROM CustomerAccounts WHERE CustomerAccounts.cust_id = '${custId}' AND CustomerAccounts.AcctNum = '${accNumber}'`;
    } else if (
      accountDataRequest.hasOwnProperty("CustID") ||
      accountDataRequest.hasOwnProperty("cust_id")
    ) {
      if (accountDataRequest.hasOwnProperty("CustID")) {
        custId = accountDataRequest.CustID;
      } else {
        custId = accountDataRequest.cust_id;
      }
      queryString = `SELECT CustomerAccounts.* FROM CustomerAccounts WHERE CustomerAccounts.cust_id = '${custId}'`;
    } else if (accountDataRequest.hasOwnProperty("AccountNumber")) {
      let accNumber = accountDataRequest.AccountNumber;
      queryString = `SELECT CustomerAccounts.* FROM CustomerAccounts WHERE CustomerAccounts.AcctNum = '${accNumber}'`;
    } else {
      logger.info(
        "CustomerAccount_Repo -> getCustomerAccounts -> Request should get Customer Id or Account Number"
      );
      throw new Error(" Request should get Customer Id or Account Number");
    }
    logger.info(
      "CustomerAccount_Repo -> getCustomerAccounts -> Query String is : " +
        queryString
    );
    let customerAccountData = await DB.ExtractQuerry(client, queryString);

    if (customerAccountData.rows.length <= 0) {
      throw new Error(" CustomerAccounts Data not Found ");
    }

    resultdata.statusvalue = true;
    resultdata.value = customerAccountData;
    return resultdata;
  } catch (err) {
    logger.info(
      "CustomerAccount_Repo -> getCustomerAccounts -> Customer account Repo Error : " +
        err
    );
    throw err;
  } finally {
    client.release();
  }
};

exports.diactivateCustomerAccounts = async (accountDataRequest) => {
  const client = await DB.dbConnection();
  try {
    let queryString;
    let resultdata = {};
    let accountStatus = "InActive";
    let custId;

    logger.info(
      "CustomerAccount_Repo -> diactivateCustomerAccounts -> Inputs  : " +
        JSON.stringify(accountDataRequest)
    );

    if (
      accountDataRequest.hasOwnProperty("CustID") ||
      accountDataRequest.hasOwnProperty("cust_id")
    ) {
      if (accountDataRequest.hasOwnProperty("CustID")) {
        custId = accountDataRequest.CustID;
      } else {
        custId = accountDataRequest.cust_id;
      }
      queryString = `UPDATE public.customeraccounts SET status = '${accountStatus}' WHERE customeraccounts.cust_id = '${custId}'`;
    } else {
      logger.info(
        "CustomerAccount_Repo -> diactivateCustomerAccounts -> Request should get Customer Id "
      );
      throw new Error(" Request should get Customer Id");
    }
    logger.info(
      "CustomerAccount_Repo -> diactivateCustomerAccounts -> Query String is : " +
        queryString
    );
    let customerAccountData = await DB.ExtractQuerry(client, queryString);

    resultdata.statusvalue = true;
    resultdata.value = customerAccountData;
    return resultdata;
  } catch (err) {
    logger.info(
      "CustomerAccount_Repo -> diactivateCustomerAccounts -> Customer account Repo Error : " +
        err
    );
    throw err;
  } finally {
    client.release();
  }
};
