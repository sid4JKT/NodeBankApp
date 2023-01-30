const DB = require("../dbconnection");
const { logger } = require("../../Util/logeer");
const { getdate, randomNumberInt } = require("../../Util/util");

exports.getAccountType = async (accountTypeInfo) => {
  const client = await DB.dbConnection();
  try {
    let queryString;
    let resultdata = {};
    let accountTypeData = {};
    if (accountTypeInfo.hasOwnProperty("accounttypeid")) {
      queryString = `SELECT accounttype.* FROM public.accounttype WHERE accounttype."accounttypeID" = ${accountTypeInfo.accounttypeid}`;
      logger.info(
        "AccountType_Repo -> getAccountType -> Query : " + queryString
      );
      accountTypeData = await DB.ExtractQuerry(client, queryString);
      logger.info(
        "AccountType_Repo -> getAccountType -> Results : " +
          JSON.stringify(accountTypeData)
      );
      resultdata.statusvalue = true;
      resultdata.value = accountTypeData;
      return resultdata;
    } else if (
      (accountTypeInfo.hasOwnProperty("AccountType") ||
        accountTypeInfo.hasOwnProperty("accountType")) &&
      (accountTypeInfo.hasOwnProperty("AccSubType") ||
        accountTypeInfo.hasOwnProperty("accSubType"))
    ) {
      let accType;
      let accSubType;

      if (accountTypeInfo.hasOwnProperty("AccountType")) {
        accType = accountTypeInfo.AccountType;
      } else {
        accType = accountTypeInfo.accountType;
      }

      if (accountTypeInfo.hasOwnProperty("AccSubType")) {
        accSubType = accountTypeInfo.AccSubType;
      } else {
        accSubType = accountTypeInfo.accSubType;
      }

      queryString = `SELECT accounttype.* FROM public.accounttype WHERE accounttype.accounttype = '${accType}' AND accounttype.accsubtype = '${accSubType}'  `;
      logger.info(
        "AccountType_Repo -> getAccountType -> Get the accounttype with Account Type and Acount Sub Type : " +
          queryString
      );
      accountTypeData = await DB.ExtractQuerry(client, queryString);

      if (accountTypeData.rows.length <= 0) {
        throw new Error(" accounttype Data not Found ");
      }

      resultdata.statusvalue = true;
      resultdata.value = accountTypeData;
      return resultdata;
    } else {
      logger.info(
        "AccountType_Repo -> getAccountType -> Account Type ID cannot be blank"
      );
      throw new Error(" Account Type ID or Account Type and Sub Type cannot be blank ");
    }
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};
