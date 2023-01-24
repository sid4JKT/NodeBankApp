const DB = require("../dbconnection");
const { logger } = require("../../Util/logeer");

exports.getLoanAccountByDateRange = async (FromDate, ToDate) => {
  const client = await DB.dbConnection();
  try {
    let resultdata = {};
    if (FromDate != "" && ToDate != "") {
      let date1 = new Date(FromDate);
      let date2 = new Date(ToDate);
      let fromDate = FromDate.toString();
      let toDate = ToDate.toString();
      logger.info(
        "GetLoanAccount_Repo -> getLoanAccountByDateRange -> checking with date range : " +
          fromDate +
          "Data type " +
          typeof fromDate +
          " -- " +
          toDate +
          " -- " +
          date1 +
          " -- " +
          date2
      );

      let queryString = `SELECT loanaccountdetail.* FROM loanaccountdetail WHERE loanaccountdetail.loancreatedate >= '${fromDate} 'AND loanaccountdetail.loancreatedate <= '${toDate}'`;
      logger.info(
        "GetLoanAccount_Repo -> getLoanAccountByDateRange -> Get loan account by date range query : " +
          queryString
      );

      let getLoanAccountData = await DB.ExtractQuerry(client, queryString);
      logger.info(
        "GetLoanAccount_Repo -> getLoanAccountByDateRange -> Got Loan Account Data  : " +
          JSON.stringify(getLoanAccountData.rows)
      );

      if (getLoanAccountData.rows.length <= 0) {
        throw new Error(" loanaccountdetail Data not Found ");
      }

      resultdata.statusvalue = true;
      resultdata.value = getLoanAccountData;
      return resultdata;
    } else {
      logger.info(
        err,
        "GetLoanAccount_Repo -> getLoanAccountByDateRange -> FromDate and ToDate cannot be blank"
      );
      throw new Error(" FromDate and ToDate cannot be blank ");
    }
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};

exports.getCustomerAccounts = async (accountDataRequest) => {
  const client = await DB.dbConnection();
  try {
    let queryString;
    let resultdata = {};
    if (
      accountDataRequest.hasOwnProperty("CustID") &&
      accountDataRequest.hasOwnProperty("AccountNumber")
    ) {
      let custId = accountDataRequest.CustID;
      let accNumber = accountDataRequest.AccountNumber;
      queryString = `SELECT CustomerAccounts.* FROM CustomerAccounts WHERE CustomerAccounts.cust_id = '${custId}' AND CustomerAccounts.AcctNum = '${accNumber}'`;
    } else if (accountDataRequest.hasOwnProperty("CustID")) {
      let custId = accountDataRequest.CustID;
      queryString = `SELECT CustomerAccounts.* FROM CustomerAccounts WHERE CustomerAccounts.CustId = '${custId}'`;
    } else if (accountDataRequest.hasOwnProperty("AccountNumber")) {
      let accNumber = accountDataRequest.AccountNumber;
      queryString = `SELECT CustomerAccounts.* FROM CustomerAccounts WHERE CustomerAccounts.AcctNum = '${accNumber}'`;
    } else {
      logger.info(
        err,
        "GetLoanAccount_Repo -> getCustomerAccounts -> Request should get Customer Id or Account Number"
      );
      throw new Error(" Request should get Customer Id or Account Number ");
    }

    let customerAccountData = await DB.ExtractQuerry(client, queryString);

    if (customerAccountData.rows.length <= 0) {
      throw new Error(" loanaccountdetail Data not Found ");
    }

    resultdata.statusvalue = true;
    resultdata.value = customerAccountData;
    return resultdata;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};

exports.getloanAccountByAccountNumber = async (loanAccountNumber) => {
  const client = await DB.dbConnection();
  try {
    let resultdata = {};
    if (loanAccountNumber !== "") {
      let queryString = `SELECT LoanAccountDetail.* FROM LoanAccountDetail WHERE LoanAccountDetail.AcctNum = ${loanAccountNumber}`;
      logger.info(
        "GetLoanAccount_Repo -> getloanAccountByAccountNumber -> gel loanaccount query : " +
          queryString
      );

      let getLoanAccountData = await DB.ExtractQuerry(client, queryString);
      logger.info(
        "GetLoanAccount_Repo -> getloanAccountByAccountNumber -> Got Loan Account Data from Repo : " +
          JSON.stringify(getLoanAccountData)
      );

      if (getLoanAccountData.rows.length <= 0) {
        throw new Error(" loanaccountdetail Data not Found ");
      }

      resultdata.statusvalue = true;
      resultdata.value = getLoanAccountData;
      return resultdata;
    } else {
      logger.info(
        err,
        "GetLoanAccount_Repo -> getloanAccountByAccountNumber -> Account number cannot be blank"
      );
      throw new Error(" Account number cannot be blank ");
    }
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};

exports.createloanAccount = async (
  loanDataRequest,
  accountNum,
  accountTypeId
) => {
  const client = await DB.dbConnection();
  try {
    logger.info(
      "GetLoanAccount_Repo -> createloanAccount -> Create LoanAccount Records -> Initial Inputs : " +
        JSON.stringify(loanDataRequest) +
        " --> " +
        accountNum +
        " --> " +
        accountTypeId
    );
    let queryString;
    let resultdata = {};
    let accountStatus = "Active";
    let balanceaAmount = 0;

    if (accountNum !== "") {
      let accountNumberInt = parseInt(accountNum);
      logger.info(
        "GetLoanAccount_Repo -> createloanAccount -> Create LoanAccount Records -> account number is not null(Valid) : " +
          accountNumberInt +
          " -- " +
          accountNum
      );

      let rateOfIntrest = loanDataRequest.RateOfInterest;
      let loanDuration = loanDataRequest.LoanDuration;
      let borrowAmount = loanDataRequest.TotalLoanAmount;

      if (rateOfIntrest != "" && loanDuration != "" && borrowAmount != "") {
        let monthlyIntrestAmount = (borrowAmount * rateOfIntrest) / 100;
        let totalIntrestAmount = monthlyIntrestAmount * loanDuration;
        let totalPaybleAmount = totalIntrestAmount + borrowAmount;
        let emiAmmount = totalPaybleAmount / loanDuration;

        logger.info(
          "GetLoanAccount_Repo -> createloanAccount -> calculations : " +
            monthlyIntrestAmount +
            " --> " +
            totalIntrestAmount +
            " --> " +
            totalPaybleAmount +
            " --> " +
            emiAmmount +
            " --> " +
            emiAmmount.toFixed(2)
        );

        queryString = `INSERT INTO LoanAccountDetail(acctnum, balanceamount, branchcode, rateofinterest, loanduration, totalloanamount, loanaccounttypeid, loancreatedate, status, emiamount) VALUES('${accountNumberInt}', '${balanceaAmount}', '${
          loanDataRequest.BranchCode
        }', '${rateOfIntrest}', '${loanDuration}', '${borrowAmount}', '${accountTypeId}', '${new Date().toString()}', '${accountStatus}', '${emiAmmount.toFixed(
          2
        )}')`;
        logger.info(
          "GetLoanAccount_Repo -> createloanAccount -> Create LoanAccount Records -> Loanaccount create query : " +
            queryString
        );

        await DB.ExtractQuerry(client, queryString);

        resultdata.statusvalue = true;
        resultdata.message = "LoanAccountDetail Records Created";
        resultdata.value = {
          AcctNum: accountNum,
          branchcode: loanDataRequest.BranchCode,
          Status: accountStatus,
        };
        logger.info(
          "GetLoanAccount_Repo -> createloanAccount -> Loan Account detail from Repo  : " +
            JSON.stringify(resultdata)
        );
        return resultdata;
      } else {
        logger.info(
          "GetLoanAccount_Repo -> createloanAccount -> Rate of Interst , Loan Duration and Total Ammount cannotbe null "
        );

        throw new Error(
          " Rate of Interst , Loan Duration and Total Ammount cannotbe null "
        );
      }
    } else {
      logger.info(
        "GetLoanAccount_Repo -> createloanAccount -> Request should get Customer Id and Account Type and Account Number Combination"
      );

      throw new Error(
        " Request should get Customer Id and Account Type and Account Number Combination "
      );
    }
  } catch (err) {
    logger.info(err, "in the saving account");
    throw err;
  } finally {
    client.release();
  }
};

exports.deactivateLoanAccount = async (accountNum) => {
  const client = await DB.dbConnection();
  try {
    logger.info(
      "GetLoanAccount_Repo -> deactivateLoanAccount -> Initial Inputs : ",
      accountNum
    );
    let queryString;
    let resultdata = {};
    let accountStatus = "InActive";

    if (accountNum !== "") {
      queryString = `UPDATE LoanAccountDetail SET LoanAccountDetail.status = '${accountStatus}' WHERE LoanAccountDetail.AcctNum = '${accountNum}' `;
      logger.info(
        "GetLoanAccount_Repo -> deactivateLoanAccount -> Query : " + queryString
      );
      await DB.ExtractQuerry(client, queryString);
      resultdata.statusvalue = true;
      resultdata.message = "LoanAccountDetail Records Set to Inactive";
      resultdata.value = {
        AcctNum: accountNum,
        Status: accountStatus,
      };
      logger.info(
        "GetLoanAccount_Repo -> deactivateLoanAccount -> Output Results : ",
        resultdata
      );
      return resultdata;
    } else {
      logger.info(
        "GetLoanAccount_Repo -> deactivateLoanAccount -> Account Nuber Cannot be null "
      );

      throw new Error(" Account Nuber Cannot be null ");
    }
  } catch (err) {
    logger.error(
      "GetLoanAccount_Repo -> deactivateLoanAccount -> -> Error : " + err
    );
    throw err;
  } finally {
    client.release();
  }
};

