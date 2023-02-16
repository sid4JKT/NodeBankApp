const custRepo = require("../Database/Repository/Customer_Repo");
const { logger } = require("../Util/logeer");
const SavingAccountTxn_Service = require("./SavingAccountTxn_Service");
const loanAccountDetail = require("./LoanAccount_Service");
const loanDataRepo = require("../Database/Repository/GetLoanAccount_Repo");
const customerAccountRepo = require("../Database/Repository/CustomerAccount_Repo");
const accountTypeRepo = require("../Database/Repository/AccountType_Repo");
const SavingAccountRepo = require("../Database/Repository/SavingAccount_Repo");

//Getting customer by id
exports.getCustomerById = async (data) => {
  try {
    logger.info("My customer id is ", data);
    const getCustomer = await custRepo.getCustomerById(data);
    logger.info("service", getCustomer);
    return getCustomer;
  } catch (err) {
    logger.error("err in the service getCustomerById", err);
    throw err;
  }
};

//Getting All customers
exports.getCustomers = async () => {
  try {
    const getAllCustomers = await custRepo.getCustomers();
    logger.info("service", getAllCustomers);
    return getAllCustomers;
  } catch (err) {
    logger.error("err in the service getCustomers", err);
    throw err;
  }
};

exports.addCustomer = async (data) => {
  try {
    let getdata = await custRepo.addCustomer(data.customerdetails);
    if (data.customerdetails.ActionType == "ADD") {
      if (getdata.statusvalue) {
        if (data.Account.accountType == "loan" || data.Account.accountType == "Loan") {
          let createLoanAccountPayload = {
            CustId: getdata.value.Customerid.cust_id,
            AccountType: data.Account.accountType,
            AccSubType: data.Account.AccSubType,
            BranchCode: data.Account.BranchCode,
            RateOfInterest: data.Account.RateOfInterest,
            LoanDuration: data.Account.LoanDuration,
            TotalLoanAmount: data.Account.TotalLoanAmount,
          };
          logger.info(
            "Customer_Service -> addCustomer -> Going to create LoanAccount " +
              JSON.stringify(createLoanAccountPayload)
          );
          let responseFormLoan = await loanAccountDetail.createLoanAccount(
            createLoanAccountPayload
          );
          if (responseFormLoan.statusvalue) {
            
          delete responseFormLoan.statusvalue
          delete responseFormLoan.message
          delete responseFormLoan.value.Status
         
            getdata.accountDetail = responseFormLoan.value;
          } else {
            getdata.accountDetail = responseFormLoan.message;
          }
        }
       else if (data.Account.accountType == "saving") {
          let createSavingAccountpayload = {
            custId: getdata.value.Customerid.cust_id,
            accountType: data.Account.accountType,
            accsubtype: data.Account.accsubtype,
            branch_code: data.Account.branch_code,
            transfer_limit: data.Account.transfer_limit,
          };
          let responseFormSavingAccount =
            await SavingAccountTxn_Service.createSavingAccountService(
              createSavingAccountpayload
            );
          if (responseFormSavingAccount.statusvalue) {
            getdata.accountDetail = responseFormSavingAccount.value;
          } else {
            getdata.accountDetail = responseFormSavingAccount.message;
          }
        } else {
          //need to write to code here
        }
      }
    } else {
      return getdata;
    }
    // return getdata; // need to change  here
    logger.info("get the data from addCustomer api in Service ", getdata);
    console.log("***************");
    console.log(getdata);
    return getdata;
  } catch (err) {
    logger.error("err in the service addCustomer", err);
    throw err;
  }
};

exports.deleteCustomer = async (data) => {
  try {
    logger.info(
      "Customer_Service -> deleteCustomer -> Initial Inputs : " +
        JSON.stringify(data)
    );
    let customerAccounts = await customerAccountRepo.getCustomerAccounts(data);
    console.log("Customer Account Info : " + JSON.stringify(customerAccounts));

    let diactivateAccounts =
      await customerAccountRepo.diactivateCustomerAccounts(data);

    logger.info(
      "Customer_Service -> deleteCustomer -> Diactivated the accounttype table  : ",
      JSON.stringify(diactivateAccounts)
    );

    customerAccounts.value.rows.forEach(async (custAccount) => {
      let getAccountTypeData = await accountTypeRepo.getAccountType(
        custAccount
      );
      logger.info(
        "Customer_Service -> deleteCustomer -> Loop of customeraccounts  : " +
          JSON.stringify(custAccount) +
          " ====Account type data :  " +
          JSON.stringify(getAccountTypeData)
      );

      let accType = getAccountTypeData.value.rows[0].accounttype;
      logger.info(
        "Customer_Service -> deleteCustomer -> Accounttype is  : " +
          accType +
          " ---  " +
          JSON.stringify(getAccountTypeData.value.rows[0])
      );
      if (accType == "saving" || accType == "Saving") {
        logger.info(
          "Customer_Service -> deleteCustomer -> Going to delete savingaccount  : " +
            custAccount.acctnum
        );
        responseWithData = await SavingAccountRepo.deleteSavingAccount(
          custAccount.acctnum
        );
      } else if (accType == "loan" || accType == "Loan") {
        logger.info(
          "Customer_Service -> deleteCustomer -> Going to delete loanaccount  : " +
            custAccount.acctnum
        );
        responseWithData = await loanDataRepo.deactivateLoanAccount(
          custAccount.acctnum
        );
      }
    });

    const deletecustomer = await custRepo.deleteCustomer(data);
    logger.info("service", deletecustomer);
    return deletecustomer;
  } catch (err) {
    logger.info("error from deleteCustomer Service", err);
    throw err;
  }
};
