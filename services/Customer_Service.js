const custRepo = require("../Database/Repository/Customer_Repo");
const { logger } = require("../Util/logeer");
const SavingAccountTxn_Service = require("./SavingAccountTxn_Service");
const loanAccountDetail = require("./LoanAccount_Service");

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
        if (data.Account.accountType == "loan") {
          let createLoanAccountPayload = {
            CustId: getdata.value.Customerid.cust_id,
            AccountType: data.Account.accountType,
            AccSubType: data.Account.AccSubType,
            BranchCode: data.Account.BranchCode,
            RateOfInterest: data.Account.RateOfInterest,
            LoanDuration: data.Account.LoanDuration,
            TotalLoanAmount: data.Account.TotalLoanAmount,
          };
          let responseFormLoan = await loanAccountDetail.createLoanAccount(
            createLoanAccountPayload
          );
          if (responseFormLoan.statusvalue) {
            getdata.loandetail = responseFormLoan.value;
          } else {
            getdata.loandetail = responseFormLoan.message;
          }
        }
        if (data.Account.accountType == "saving") {
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
            getdata.savingdetail = responseFormSavingAccount.value;
          } else {
            getdata.savingdetail = responseFormSavingAccount.message;
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
    const deletecustomer = await custRepo.deleteCustomer(data);
    logger.info("service", deletecustomer);
    return deletecustomer;
  } catch (err) {
    logger.info("error from addCustomer Service", err);
    throw err;
  }
};
