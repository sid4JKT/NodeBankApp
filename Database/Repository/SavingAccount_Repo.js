const DB = require("../dbconnection");
const { logger } = require("../../Util/logeer");
const { getdate, randomNumberInt } = require("../../Util/util");
const { v4: uuidv4 } = require("uuid");

exports.withDrawFromAccountByAccountNumber = async (data) => {
  const client = await DB.dbConnection();
  try {
    if (data.txndetail == "withdraw") {
      let resultdata = {};
      logger.info(`the DB is Connected `);
      let txnid = uuidv4();
      let withdrawamount = data.withdrawamount;
      let querygetbalance = `select balance from public.savingaccountdetail where acctnum='${data.acctnum}'`;
      logger.info(`querry for getting balance ${querygetbalance}`);

      let balance = await DB.ExtractQuerry(client, querygetbalance);
      if (balance.rows.length < 0) {
        throw new Error(
          "balance not found with accnum: ",
          accnum.rows[0].acctnum
        );
      }
      logger.info(` got the  balance ${balance.rows[0]}`);

      if (withdrawamount > balance.rows[0].balance) {
        throw new Error("insufficent balance ");
      }
      balance = parseInt(balance.rows[0].balance) - data.withdrawamount;
      logger.info(` updated  balance ${balance}`);
      await client.query('BEGIN')
      let TXNquery = `INSERT INTO public.savingaccounttxnhistory(
        txnid, acctnum, txndetail, withdrawamount, depositamount, balance,txndate)
        VALUES ('${txnid}',${data.acctnum},'${data.txndetail}',${
        data.withdrawamount
      },0,${balance},'${new Date()}');`;

      logger.info(` updated  TXN History querry`, TXNquery);
      await DB.ExtractQuerry(client, TXNquery);
      logger.info(` updated  TXN History `);

      let Savingquerry = `UPDATE public.savingaccountdetail
	  SET balance=${balance}
	  WHERE acctnum='${data.acctnum}';`;

      await DB.ExtractQuerry(client, Savingquerry);

      logger.info(` updated  balance in Db `);
      await client.query('COMMIT')
      resultdata.value = {
        txnid: txnid,
        acctnum: data.acctnum,
        txndetail: data.txndetail,
        withdrawamount: data.withdrawamount,
        depositamount: data.depositamount,
        balance: balance,
      };

      logger.info(`the data is save ${resultdata}`);

      return resultdata;
    } else {
      throw new Error("please fill txndetail carefully");
    }
  } catch (err) {
    await client.query('ROLLBACK')
    logger.error(` the withdraw  get the error ${err}`);
    throw err
  } finally {
    client.release();
  }
};

exports.depositInAccountByAccountNumber = async (data) => {
  const client = await DB.dbConnection();
  try {
    if (data.txndetail == "deposite") {
      logger.info(`get the data in the repo= ${data}`);

      let resultdata = {};
      logger.info(`the DB is Connected `);
      let txnid = uuidv4();
      let txndate = await getdate();
      let querygetbalance = `select balance from public.savingaccountdetail where acctnum=${data.acctnum}`;
      logger.info(`querry for getting balance ${querygetbalance}`);
      let balance = await DB.ExtractQuerry(client, querygetbalance);
      if (balance.rows.length < 0) {
        throw new Error(
          "savingaccountdetail not found with accnum: ",
          data.acctnum
        );
      }
      logger.info(` got the  balance ${balance.rows[0]}`);
      balance = parseInt(balance.rows[0].balance) + data.depositamount;
      logger.info(` updated  balance ${balance}`);
      await client.query('BEGIN')
      let TXNquery = `INSERT INTO public.savingaccounttxnhistory(
          txnid, acctnum, txndetail, withdrawamount, depositamount, balance,txndate)
          VALUES ('${txnid}',${data.acctnum},'${data.txndetail}',0,${
        data.depositamount
      },${balance},'${new Date()}');`;
      logger.info("txn history insert table querry ", TXNquery);
      await DB.ExtractQuerry(client, TXNquery);
      logger.info(` updated  TXN History `);

      let Savingquerry = `UPDATE public.savingaccountdetail
      SET balance=${balance}
      WHERE acctnum=${data.acctnum};`;

      await DB.ExtractQuerry(client, Savingquerry);

      logger.info(` updated  balance in Db `);
      await client.query('COMMIT')
      resultdata.value = {
        txnid: txnid,
        acctnum: data.acctnum,
        txndetail: data.txndetail,
        withdrawamount: data.withdrawamount,
        depositamount: data.depositamount,
        balance: balance,
      };

      logger.info(`the data is save ${resultdata}`);

      return resultdata;
    } else {
      throw new Error("please fill the txndetail carefully");
    }
  } catch (err) {
    await client.query('ROLLBACK')
    logger.error(`in the saving account get the error ${err}`);
    throw err;
  } finally {
    client.release();
  }
};

exports.getTransactionHistory = async (data) => {
  const client = await DB.dbConnection();
  try {
    let custId = data.custId;
    let Savingdetail = {};
    let LoanDetail = {};
    let BothSavingAndLoan = {};

    if (data.accountType == "Saving") {
      let Accnumber = `select acctnum from  public.customeraccounts where cust_id=${data.custId}`;
      let accnum = await DB.ExtractQuerry(client, Accnumber);
      if (accnum.rows.length < 0) {
        throw new Error("acctnum not found with custid: ", data.custId);
      }
      logger.info(`the acctnum  ${accnum.rows[0].acctnum}`);

      let Savingdetailquerry = `select * from  public.savingaccounttxnhistory where acctnum='${accnum.rows[0].acctnum}'`;
      logger.info("Savingdetailquerry===", Savingdetailquerry);
      Savingdetail = await DB.ExtractQuerry(client, Savingdetailquerry);
      if (Savingdetail.rows.length < 0) {
        throw new Error(
          "savingaccounttxnhistory not found with acctnum: ",
          accnum.rows[0].acctnum
        );
      }
      logger.info("Saving detail==", Savingdetail);

      return Savingdetail.rows[0];
    } else if (data.accountType == "Loan") {
      let Accnumber = `select acctnum from  public.customeraccounts where cust_id=${data.custId}`;
      let accnum = await DB.ExtractQuerry(client, Accnumber);
      if (accnum.rows.length < 0) {
        throw new Error("acctnum not found with custid: ", data.custId);
      }
      logger.info("acctnum===", accnum.rows[0].acctnum);

      let LoanDetailQuery = `select emiid from  public.loanaccountdetail where acctnum=${accnum.rows[0].acctnum}`;
      let Emiid = await DB.ExtractQuerry(client, LoanDetailQuery);
      if (Emiid.rows.length < 0) {
        throw new Error(
          "emiid not found with acctnum: ",
          accnum.rows[0].acctnum
        );
      }
      logger.info("emiid===", Emiid);

      let EMiDetailquerry2 = `select * from  public.loanemidetail where emiid='${Emiid.rows[0].emiid}'`;
      let getrecord = await DB.ExtractQuerry(client, EMiDetailquerry2);
      logger.info("loandetail===", LoanDetail);

      LoanDetail.statusvalue = true;
      LoanDetail.Loandetail = getrecord.rows[0];
      return LoanDetail;
    } else {
      let Accnumber = `select acctnum from  public.customeraccounts where cust_id=${data.custId}`;
      let accnum = await DB.ExtractQuerry(client, Accnumber);
      if (accnum.rows.length < 0) {
        throw new Error("acctnum not found with custid: ", data.custId);
      }
      logger.info("acctnum===", accnum.rows[0].acctnum);

      let Savingdetailquerry = `select * from  public.savingaccounttxnhistory where acctnum='${accnum.rows[0].acctnum}'`;
      Savingdetail = await DB.ExtractQuerry(client, Savingdetailquerry);
      if (Savingdetail.rows.length < 0) {
        throw new Error(
          "savingaccounttxnhistory not found with accnum: ",
          accnum.rows[0].acctnum
        );
      }
      logger.info("Saving detail both ==", Savingdetail.rows[0]);

      let LoanDetailQuery = `select emiid from  public.loanaccountdetail where acctnum=${accnum.rows[0].acctnum}`;
      let Emiid = await DB.ExtractQuerry(client, LoanDetailQuery);
      if (Emiid.rows.length < 0) {
        throw new Error(
          "Emiid not found with accnum: ",
          accnum.rows[0].acctnum
        );
      }
      logger.info("emiid detail both ==", Savingdetail.rows[0]);

      let LoanDetailsquerry = `select * from  public.loanemidetail where emiid='${Emiid.rows[0].emiid}'`;
      let Alldataloan = await DB.ExtractQuerry(client, LoanDetailsquerry);
      if (Alldataloan.rows.length < 0) {
        throw new Error(
          "loanemidetail not found with emiid: ",
          Emiid.rows[0].emiid
        );
      }
      logger.info("emiid detail both ==", Alldataloan.rows[0]);

      BothSavingAndLoan.saving = Savingdetail.rows[0];
      BothSavingAndLoan.loan = Alldataloan.rows[0];
      return BothSavingAndLoan;
    }
  } catch (err) {
    logger.error(err, "in the TXN history account", err);
    return err;
  } finally {
    client.release();
  }
};

exports.getAllAccountTypes = async () => {
  const client = await DB.dbConnection();
  try {
    let resultdata = {};

    let queryString = `SELECT AccountType.* FROM AccountType`;

    let accountTypeData = await DB.ExtractQuerry(client, queryString);

    resultdata.statusvalue = true;
    resultdata.value = accountTypeData;

    return resultdata;
  } catch (err) {    
    logger.error("something Went Wrong : ")
    throw err
  } finally {
    client.release();
  }
};

exports.createSavingAccount = async (savingData, client) => {
  try {
    if (savingData.accountType == "saving") {
      let accounttypequerry = `SELECT "accounttypeID" FROM "public"."accounttype"  where accounttype='${savingData.accountType}' and accsubtype='${savingData.accsubtype}'`;
      logger.info("the accounttypequerry: ", accounttypequerry);
      let accounttype = await DB.ExtractQuerry(client, accounttypequerry);
      if (accounttype.rows.length < 1) {
        throw new Error("unable to get accounttypeid form accounttype");
      }
      logger.info("the accounttype: ", accounttype.rows);
      await client.query('BEGIN')
      let customeraccountsquerry = `INSERT INTO "public"."customeraccounts" (cust_id, accounttypeid,"status",date) values (${
        savingData.custId
      },'${accounttype.rows[0].accounttypeID}','active','${new Date()}')`;
      logger.info(
        "the customeraccountsquerry for inserting customeraccounts : ",
        customeraccountsquerry
      );
      await DB.ExtractQuerry(client, customeraccountsquerry);
      logger.info("the data is  inserting customer accounts  ");

      let accnumberquerry = `SELECT "acctnum" FROM "public"."customeraccounts"  where cust_id=${savingData.custId}  and accounttypeid=${accounttype.rows[0].accounttypeID}`;
      logger.info("the accounttypequerry: ", accnumberquerry);
      let accnumberdata = await DB.ExtractQuerry(client, accnumberquerry);
      if (accnumberdata.rows.length < 1) {
        throw new Error("unable to get acctnum form customer accounts");
      }
      logger.info("the accounttype: ", accnumberdata.rows[0].acctnum);

      let queryString = `INSERT INTO public.savingaccountdetail(
      acctnum, balance, transfer_limit, branch_code, "SavingacctypeId", status,date)
      VALUES (${accnumberdata.rows[0].acctnum}, 0,${
        savingData.transfer_limit
      },'${savingData.branch_code}',
      ${accounttype.rows[0].accounttypeID},'Active','${new Date()}')`;
      logger.info("the queryString for inserting saving : ", queryString);
      await DB.ExtractQuerry(client, queryString);
      logger.info("the data is  inserting saving  ");
      await client.query('COMMIT')
      let resultdata = {};
      let value = {
        acctnum: accnumberdata.rows[0].acctnum,
        branch_code: savingData.branch_code,
        balance: savingData.balance,
        accounttype:savingData.accountType
      };
      resultdata.value = value;
      logger.info("the data is  inserting saving  2=", resultdata);
      resultdata.statusvalue = true;

      return resultdata;
    } else {
      logger.info("this is not loan account ");
      throw new Error("please fill txndetail carefully");
    }
  } catch (err) {
    logger.error("Error in the saving acount_repo");
    await client.query('ROLLBACK')
    throw err;
  } finally {
    // client.release();
  }
};

exports.deleteSavingAccount = async (acctnum) => {
  const client = DB.dbConnection();
  try {
    let statusInActiveQuerry = `update "public"."savingaccountdetail"  set  status='InActive' where acctnum=${acctnum}`;

    let getDataExtractQuerry = await DB.ExtractQuerry(
      client,
      statusInActiveQuerry
    );
    if (getDataExtractQuerry.rows.length < 0) {
      throw new Error("saving account not be delete ");
    }
  } catch (err) {
    logger.error(`in the saving account get the error ${err}`);
    throw err;
  } finally {
    client.release();
  }
};
exports.getSaving_Transactionhistory = async (data) => {
  const client = await DB.dbConnection();
  try{
      let Savingdetaildata = {};
      let LoanDetail = {};
      
      if (data.accountType == "saving") {
        let Accnumber = `select acctnum from  public.customeraccounts where cust_id=${data.custId}`;
        let accnum = await DB.ExtractQuerry(client, Accnumber);
        if(accnum.rows.length<0)
        {
        throw new Error("acctnum not found with custid: ",data.custId)
        }
        logger.info(`the acctnum  ${accnum.rows[0].acctnum}`); 
          let Savingdetailquerry = `select savingaccounttxnhistory.*,
            accounttype.accounttype,accounttype.accsubtype
            from savingaccounttxnhistory
            join customeraccounts on customeraccounts.acctnum = savingaccounttxnhistory.acctnum
            join accounttype on accounttype."accounttypeID" = customeraccounts.accounttypeid 
            where savingaccounttxnhistory.acctnum='${accnum.rows[0].acctnum}'`;
          logger.info("Savingdetailquerry===", Savingdetailquerry);
          let Savingdetail = await DB.ExtractQuerry(client, Savingdetailquerry);
           
          logger.info("Saving detail==", Savingdetail.rows);
          Savingdetaildata.statusvalue = true;
          Savingdetaildata.value = Savingdetail.rows
          return Savingdetaildata; 
      }else if (data.accountType == "loan") {
        let Accnumber = `select acctnum from  public.customeraccounts where cust_id=${data.custId}`;
        let accnum = await DB.ExtractQuerry(client, Accnumber);
        if(accnum.rows.length<0)
        {
        throw new Error("acctnum not found with custid: ",data.custId)
        }
        logger.info("acctnum==", accnum.rows[0].acctnum);
          console.log("acctype==",data.accountType) 
          let LoanDetailQuery = `select emiid from  public.loanaccountdetail where acctnum=${accnum.rows[0].acctnum}`;
          let Emiid = await DB.ExtractQuerry(client, LoanDetailQuery);
          logger.info("emiid===", Emiid.rows);

          let EMiDetailquerry2 = `select loanaccountdetail.acctnum,loanemidetail.*,accounttype.accounttype,
          accounttype.accsubtype from  public.loanemidetail  
          join loanaccountdetail on loanaccountdetail.emiid = loanemidetail.emiid
          join accounttype on accounttype."accounttypeID" = loanaccountdetail.loanaccounttypeid
          where loanemidetail.emiid='${Emiid.rows[0].emiid}'`;
          let getrecord = await DB.ExtractQuerry(client, EMiDetailquerry2);
          logger.info("loandetail===", LoanDetail.rows);

          LoanDetail.statusvalue = true;  
          LoanDetail.value = getrecord.rows;
          return LoanDetail;
      }
  }
  catch(err){
          logger.error("error in the SavingAcc_txnhistoryrepo getTransactionhistory",err)
          throw err;
  }
  finally{ 
    client.release();
  }
};

exports.getTransactionsByfilter = async(filterData) =>{
  const client = await DB.dbConnection();
try {
  let req = {};
  for (const key in filterData) {
    if (filterData[key] != "") {
      console.log("key",filterData[key]);
      req[key] = filterData[key];
    }
  }
  let filterQuery = `select savingaccounttxnhistory.*,
  accounttype.accounttype,accounttype.accsubtype
  from savingaccounttxnhistory
  join customeraccounts on customeraccounts.acctnum = savingaccounttxnhistory.acctnum
  join accounttype on accounttype."accounttypeID" = customeraccounts.accounttypeid 
  where `; 

  let v = 0;
  let finaldata = "";
  for (const key in req){
      let appenddata = "";
      let customeraccounts = "customeraccounts"
      let accounttype = "accounttype"
      if(key == 'acctnum'){
          if(req[key]!=""){
              appenddata = customeraccounts + "." + appenddata + key;
              appenddata = appenddata + "=" + "" + `${req[key]}` + "";
              v++;
          }
      }else if(key == "cust_id" ){
        if (req[key]!=""){
              appenddata = customeraccounts + "." + appenddata + key;
              appenddata = appenddata + "=" + "" + `${req[key]}` + "";
              v++;
        }
      }else if(key == "accounttype" ){
        if(req[key]!=""){
              appenddata = accounttype + "." + appenddata + key;
              appenddata = appenddata + " like " + "" + `'${req[key]}%'` + "";
              v++;

        }
      }else{
        if(req[key]!=""){
          appenddata = accounttype + "." + appenddata + key;
          appenddata = appenddata + "=" + "" + `'${req[key]}'` + "";
          v++;

        }
      }
      if (Object.keys(req).length != v) {
          finaldata = finaldata + appenddata + " AND ";
        } else {
          finaldata = finaldata + appenddata + "  ";
        }
  }
  console.log("final extract querry is ", filterQuery + finaldata);
  let finalextractquerry = filterQuery + finaldata;
  let gettransactionfilter = await DB.ExtractQuerry(client, finalextractquerry);

  let getfilterfinaldata = {};

  if (gettransactionfilter.rows.length > 0) {
      getfilterfinaldata.value = gettransactionfilter.rows;
  } else {
    throw new Error('no data found in getTransactionsByfilter')
  }
  

  logger.info("get the data from database==", getfilterfinaldata.value);
  return getfilterfinaldata;
  
  
} catch (err) {
  logger.error("error in the gettransactionfilter ", err);
  throw err
}
finally{
  client.release();
} 
};

exports.getLoan_TransactionsByfilter = async(filterData) =>{
    const client = await DB.dbConnection();
  try {
    let req = {};
    for (const key in filterData) {
      if (filterData[key] != "") {
        console.log("key",filterData[key]);
        req[key] = filterData[key];
      }
    }
    let filterQuery = `select loanaccountdetail.acctnum,loanemidetail.*,
    accounttype.accounttype,accounttype.accsubtype,loanaccountdetail.balanceamount
    from loanemidetail
    join loanaccountdetail on loanaccountdetail.emiid = loanemidetail.emiid
    join accounttype on accounttype."accounttypeID" = loanaccountdetail.loanaccounttypeid
    join customeraccounts on customeraccounts.acctnum = loanaccountdetail.acctnum
    where `; 

    let v = 0;
    let finaldata = "";
    for (const key in req){
        let appenddata = "";
        let customeraccounts = "customeraccounts"
        let accounttype = "accounttype"
        if(key == 'acctnum'){
            if(req[key]!=""){
                appenddata = customeraccounts + "." + appenddata + key;
                appenddata = appenddata + "=" + "" + `${req[key]}` + "";
                v++;
            }
        }else if(key == "cust_id" ){
          if (req[key]!=""){
                appenddata = customeraccounts + "." + appenddata + key;
                appenddata = appenddata + "=" + "" + `${req[key]}` + "";
                v++;
          }
        }else if(key == "accounttype" ){
          if(req[key]!=""){
                appenddata = accounttype + "." + appenddata + key;
                appenddata = appenddata + " like " + "" + `'${req[key]}%'` + "";
                v++;

          }
        }else{
          if(req[key]!=""){
            appenddata = accounttype + "." + appenddata + key;
            appenddata = appenddata + " like " + "" + `'${req[key]}%'` + "";
            v++;

          }
        }
        if (Object.keys(req).length != v) {
            finaldata = finaldata + appenddata + " AND ";
          } else {
            finaldata = finaldata + appenddata + "  ";
          }
    }
    console.log("final extract querry is ", filterQuery + finaldata);
    let finalextractquerry = filterQuery + finaldata;
    let gettransactionfilter = await DB.ExtractQuerry(client, finalextractquerry);

    let getfilterfinaldata = {};

    if (gettransactionfilter.rows.length > 0) {
        getfilterfinaldata.value = gettransactionfilter.rows;
    } else {
      throw new Error('no data found in getLoan_TransactionsByfilter')
    }
    
    logger.info("get the data from database==", getfilterfinaldata.value);
    return getfilterfinaldata;
    
  } catch (err) {
    logger.error("error in the getLoan_TransactionsByfilter ", err);
    throw err
  }
  finally{
    client.release();
  } 
};
