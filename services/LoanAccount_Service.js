const loanData = require("../Database/Repository/GetLoanAccount_Repo");
const accountTypeData = require("../Database/Repository/AccountType_Repo");
const customerAccountData = require("../Database/Repository/CustomerAccount_Repo");
const { logger } = require("../Util/logeer");

exports.getLoanAccountByDateRange = async (loanDataRequest) => {
  try {
    if (
      loanDataRequest.hasOwnProperty("FromDate") &&
      loanDataRequest.hasOwnProperty("ToDate")
    ) {
      console.log(
        "We have from and to dates : " + loanDataRequest.FromDate.toString()
      );
      const loanDataforDateRange = await loanData.getLoanAccountByDateRange(
        loanDataRequest.FromDate,
        loanDataRequest.ToDate
      );
      return loanDataforDateRange;
    } else {
      logger.info(
        "LoanAccount_Service -> getLoanAccountByDateRange -> From Date and To Date cannot be null"
      );
      throw new Error(" From Date and To Date cannot be null ");
    }
  } catch (err) {
    logger.error(
      "LoanAccount_Service -> getLoanAccountByDateRange -> Error : ",
      err
    );
    throw err;
  }
};

exports.getLoanAccountByCustomerId = async (loanDataRequest) => {
  try {
    logger.info(
      "the request body from controller(This is from service) ",
      loanDataRequest
    );
    let requestBody = {};
    requestBody = loanDataRequest;
    let responseWithData = {};
    let customerAccount;

    if (
      requestBody.hasOwnProperty("CustID") &&
      requestBody.hasOwnProperty("AccountNumber")
    ) {
      logger.info("We have elemets in LoanAccountService ");
      let customerAccounts = await customerAccountData.getCustomerAccounts(
        requestBody
      );
      console.log(
        "Customer Account Info : " + JSON.stringify(customerAccounts)
      );
      customerAccount = customerAccounts.value.rows[0];
      logger.info(
        "LoanAccount_Service-GetLoanAccountByCustomerID - getAccountType Payload : " +
          JSON.stringify(customerAccount)
      );
      let accountTypesData = await accountTypeData.getAccountType(
        customerAccount
      );
      logger.info(
        "LoanAccount_Service-GetLoanAccountByCustomerID - accounttype response : " +
          JSON.stringify(accountTypesData)
      );
      let accountType = accountTypesData.value.rows[0].accounttype;
      if (accountType == "Loan" || accountType == "loan") {
        logger.info("accounttype is loan : ");
        responseWithData = loanData.getloanAccountByAccountNumber(
          requestBody.AccountNumber
        );
      } else {
        console.log("Current Accounts or Validation should be add");
      }
      return responseWithData;
    } else {
      logger.info(
        "LoanAccount_Service -> getLoanAccountByCustomerId -> Cust Id and Account Number cannot be null"
      );
      throw new Error(" Cust Id and Account Number cannot be null ");
    }
  } catch (err) {
    logger.error(
      "LoanAccount_Service -> getLoanAccountByCustomerId -> Error : ",
      err
    );
    throw err;
  }
};

exports.createLoanAccount = async (loanDataRequest) => {
  try {
    let responseWithData = {};
    let resultdata = {};
    let accountNum = 0;
    let accountTypeId;
    logger.info(
      "LoanAccount_Service-createLoanAccount - getAccountType Payload : " +
        JSON.stringify(loanDataRequest)
    );
    let getAccountTypeData = await accountTypeData.getAccountType(
      loanDataRequest
    );
    accountTypeId = getAccountTypeData.value.rows[0].accounttypeID;
    logger.info(
      "LoanAccount_Service-createLoanAccount - getAccountType Response : " +
        JSON.stringify(getAccountTypeData) +
        " <--> " +
        accountTypeId
    );
    let customerAccounts = await customerAccountData.createCustomerAccount(
      loanDataRequest,
      accountTypeId
    );
    if (customerAccounts.statusvalue) {
      logger.info(
        "LoanAccount_Service -> createLoanAccount -> LoanDataRequest(This is same as input)"
      );
      accountNum = customerAccounts.value.AcctNum;
      let accountType;
      if (loanDataRequest.hasOwnProperty("AccountType")) {
        accountType = loanDataRequest.AccountType;
      } else if (loanDataRequest.hasOwnProperty("accountType")) {
        accountType = loanDataRequest.accountType;
      } else {
        throw new Error(" Please pass AccountType and AccSubType");
      }
      logger.info(
        "calling createLoanAccount repo program : " +
          accountNum +
          " <===> " +
          accountType
      );
      if (accountType == "Loan" || accountType == "loan") {
        responseWithData = await loanData.createloanAccount(
          loanDataRequest,
          accountNum,
          accountTypeId
        );
        resultdata.statusvalue = true;
        resultdata.value = responseWithData;
        return resultdata;
      } else {
        logger.info("Current Accounts or Validation should be add");
      }
    } else {
      logger.info(
        "LoanAccount_Service -> createLoanAccount -> Unable to create customer account records"
      );
      throw new Error(" Unable to create customer account records ");
    }
  } catch (err) {
    logger.error("LoanAccount_Service -> createLoanAccount -> Error : ", err);
    throw err;
  }
};

exports.deactivateLoanAccount = async (accountNum) => {
  try {
    logger.info(
      "LoanAccount_Service -> deactivateLoanAccount -> Updating LoanAccount Records to Inactive -> Initial Inputs : ",
      accountNum
    );
    let responseWithData = await loanData.deactivateLoanAccount(accountNum);
    logger.info(
      "LoanAccount_Service -> deactivateLoanAccount -> Updating LoanAccount Records to Inactive -> Response From deactivateLoanAccount : ",
      responseWithData
    );
    return responseWithData;
  } catch (err) {
    logger.error(
      "LoanAccount_Service -> deactivateLoanAccount -> Updating LoanAccount Records to Inactive -> Error : ",
      err
    );
    throw err;
  }
};
