const DB = require("../dbconnection");
const { logger } = require("../../Util/logeer");

exports.getAllCustomerTxn = async () => {
  const client = await DB.dbConnection();
  try {
    let getCustInfoQuerry = `select public.customerdetail.cust_id ,
     public.customerdetail.firstname,
    public.customerdetail.lastname,
   public.customerdetail.address1,
    public.customerdetail.address2,
    public.customerdetail.emailid,
    public.customerdetail.phone,
    public.customerdetail.mobile,
    public.customerdetail.dob,
    public.customerdetail.maritalstatus,
    public.customerdetail.zipcode,
  public.customerdetail.city,
    public.customerdetail.state,
    public.customerdetail.country,
    public.accounttype.accounttype,
    public.accounttype.accsubtype,
    public.customeraccounts.acctnum,
    public.customeraccounts.status
    from public.customerdetail
    Join public.customeraccounts on customerdetail.cust_id=customeraccounts.cust_id
    join public.accounttype on accounttype."accounttypeID"=(customeraccounts.accounttypeid)::integer`;

    logger.info("the getCustInfoQuerry ", getCustInfoQuerry);

    let getCustInfoData = await DB.ExtractQuerry(client, getCustInfoQuerry);

    let getData = {};
    if (getCustInfoData.rows.length > 0) {
      getData.customerdetails = getCustInfoData.rows;
    } else {
     throw new Error('no data found')
    }

logger.info("get the data from database===", getData.customerdetails);

    // getData.Accounts=Account
    getData.statusvalue = true;
    return getData;
  } catch (err) {

    logger.error("get the error in the getAllCustomerTxn ", err);
    throw err
  
  } finally {
    client.release();
  }
};

exports.getAllCustomerTxnFilter = async (req) => {
  const client = await DB.dbConnection();
  try {
    let getCustInfoQuerry = `select public.customerdetail.cust_id ,
    public.customerdetail.firstname,
    public.customerdetail.lastname,
    public.customerdetail.address1,
    public.customerdetail.address2,
    public.customerdetail.emailid,
    public.customerdetail.phone,
    public.customerdetail.mobile,
    public.customerdetail.dob,
    public.customerdetail.maritalstatus,
    public.customerdetail.zipcode,
    public.customerdetail.city,
    public.customerdetail.state,
    public.customerdetail.country,
    public.accounttype.accounttype,
    public.accounttype.accsubtype,
    public.customeraccounts.acctnum,
    public.savingaccountdetail.balance as savingbalance
    from public.customerdetail Join public.customeraccounts on customerdetail.cust_id=customeraccounts.cust_id
    join public.accounttype on accounttype."accounttypeID"=(customeraccounts.accounttypeid)::integer
    join public.savingaccountdetail on savingaccountdetail.acctnum=customeraccounts."acctnum"
   where `;
    let finaldata = "";
    let v = 1;
    for (const key in req) {
      let appenddata = "";

      let customerdetail = "customerdetail";
      let accounttype = "accounttype";
      console.log("the key=", key);
      if (key == "cust_id") {
        if (req[key] != "") {
          appenddata = customerdetail + "." + appenddata + key;
          appenddata = appenddata + "=" + "" + req[key] + "";
          v++;
        }
      } else if (key == "firstname") {
        if (req[key] != "") {
          appenddata = customerdetail + "." + appenddata + `${key}`;
          appenddata = appenddata + "=" + "" + `'${req[key]}'` + "";
          v++;
        }
      } else {
        if (req[key] != "") {
          appenddata = accounttype + "." + appenddata + key;
          appenddata = appenddata + "=" + "" + req[key] + "";
          v++;
        }
      }

      if (Object.keys(req).length == v) {
        finaldata = finaldata + appenddata + " AND ";
        console.log(appenddata, Object.keys(req).length, v);
      } else {
        finaldata = finaldata + appenddata + "  ";
      }
    }

    logger.info("final extract querry is ", getCustInfoQuerry + finaldata);
    let finalextractquerry = getCustInfoQuerry + finaldata;

    let getCustInfoData = await DB.ExtractQuerry(client, finalextractquerry);
    if(getCustInfoData.rows.length<0)
    {
    throw new Error(" not data found")
    }
    let getData = {};

    getData.value = getCustInfoData.rows;
  

    logger.info("get the data from database==", getData.value);
    return getData;
  } catch (err) {
   
    logger.error("get the error in the getAllCustomerTxn ", err);
    throw err
   
  } finally {
    client.release();
  }
};

exports.getBalanceAndLoanAmountByFilter = async (filterReq) => {
  const client = await DB.dbConnection();
  try {
    let req = {};
    for (const key in filterReq) {
      if (filterReq[key] != "") {
        console.log(filterReq[key]);
        req[key] = filterReq[key];
      }
    }

    let getCustInfoQuerry = `select  public.savingaccountdetail.balance, 
    public.customerdetail.firstname,public.customerdetail.lastname,public.customerdetail.address1,
    public.customerdetail.emailid,public.customerdetail.phone,public.customerdetail.mobile,
    public.customerdetail.dob,public.customerdetail.maritalstatus,public.customerdetail.zipcode,
    public.customerdetail.city,public.customerdetail.state,public.customerdetail.country,public.customeraccounts.status,
    public.customeraccounts.acctnum
   from public.customerdetail
       join public.customeraccounts on customeraccounts.cust_id = customerdetail.cust_id
       join public.savingaccountdetail on savingaccountdetail.acctnum = customeraccounts.acctnum
       where `;

    let v = 0;
    let finaldata = "";
    for (const key in req) {
      let appenddata = "";
      let customerdetail = "customerdetail";

      if (key == "phone" || key == "cust_id") {
        if (req[key] != "") {
          appenddata = customerdetail + "." + appenddata + key;
          appenddata = appenddata + "=" + "" + `${req[key]}` + "";
          v++;
        }
      }

      if (Object.keys(req).length != v) {
        finaldata = finaldata + appenddata + " AND ";
      } else {
        finaldata = finaldata + appenddata + "  ";
      }
    }
    console.log("final extract querry is ", getCustInfoQuerry + finaldata);
    let finalextractquerry = getCustInfoQuerry + finaldata;
    let getCustInfoData = await DB.ExtractQuerry(client, finalextractquerry);

    let getCustInfoFinalData = {};

    if (getCustInfoData.rows.length > 0) {
      getCustInfoFinalData.value = getCustInfoData.rows;
    } else {
      throw new Error('no data found')
    }
    

    logger.info("get the data from database==", getCustInfoFinalData.value);
    return getCustInfoFinalData;
  } catch (err) {
    
    logger.error("get the error in the getBalanceAndLoanAmountByFilter ", err);
   throw err
  } finally {
    client.release();
  }
};

exports.getcCustomerTxnByName = async (req) => {
  const client = await DB.dbConnection();
  try {
    let resultData = {};
    let customertxnquerry = `select public.customerdetail.cust_id ,
    public.customerdetail.firstname,
       public.customerdetail.lastname,
       public.customerdetail.address1,
       public.customerdetail.address2,
       public.customerdetail.emailid,
       public.customerdetail.phone,
       public.customerdetail.mobile,
       public.customerdetail.dob,
       public.customerdetail.maritalstatus,
       public.customerdetail.zipcode,
       public.customerdetail.city,
       public.customerdetail.state,
       public.customerdetail.country,
           public.accounttype.accounttype,
           public.accounttype.accsubtype,
           public.customeraccounts.acctnum,
           public.customeraccounts.status
              from public.customerdetail
              Join public.customeraccounts on customerdetail.cust_id=customeraccounts.cust_id
              join public.accounttype on accounttype."accounttypeID"=(customeraccounts.accounttypeid)::integer 
              where customerdetail.firstname='${req.firstname}'`;
    logger.info("the customertxnquerry ", customertxnquerry);
    let getCustInfoData = await DB.ExtractQuerry(client, customertxnquerry);

    if (getCustInfoData.rows.length > 0) {
      resultData.statusvalue = true;
      resultData.value = getCustInfoData.rows;
    } else {
       throw new Error("no data found")
    }

    return resultData;
  } catch (err) {
    let resultdata = {};
    logger.error("get the error in the getAllCustomerTxn ", err);
    throw err
  } finally {
    client.release();
  }
};
// select * from public."document_cutomer_master _table"
exports.getCustomerSavingAccountbyCustId = async (req,client) => {
  // const client = await DB.dbConnection();
  try {
    let resultData = {};
    let getCustomerSavingAccountbyCustIdQueery = `SELECT  * FROM "public"."customerdetail" join public.customeraccounts on customeraccounts.cust_id=customerdetail.cust_id join public.savingaccountdetail on 
    savingaccountdetail.acctnum= customeraccounts.acctnum where customerdetail.cust_id=${req.cust_id}`;
    logger.info(
      "the getCustomerSavingAccountbyCustIdQueery ",
      getCustomerSavingAccountbyCustIdQueery
    );
    let getCustInfoData = await DB.ExtractQuerry(
      client,
      getCustomerSavingAccountbyCustIdQueery
    );

    if (getCustInfoData.rows.length > 0) {
      resultData.statusvalue = true;
      resultData.value = getCustInfoData.rows[0];
      return resultData
    } else {
      resultData.statusvalue = true;
      resultData.value = "no data match";
      throw new Error("no data match in saving account with this cust_id",req.cust_id)
    }

  } catch (err) {
    logger.error("get the error in the getCustomerSavingAccountbyCustId ", err);
    throw err
  } finally {
    // client.release();
  }
};

exports.getLoanAmountByFilter = async (filterReq) => {
  const client = await DB.dbConnection();
  try {
    let req = {};
    for (const key in filterReq) {
      if (filterReq[key] != "") {
        console.log(filterReq[key]);
        req[key] = filterReq[key];
      }
    }
    let getCustInfoQuerry = `select  public.customerdetail.*, public.loanaccountdetail.*,public.AccountType.accounttype,
  public.AccountType.accsubtype
 from public.customerdetail
     join public.customeraccounts on customeraccounts.cust_id = customerdetail.cust_id
     join public.AccountType on AccountType."accounttypeID" = customeraccounts.AccountTypeId
     join public.LoanAccountDetail on LoanAccountDetail.acctnum = customeraccounts.acctnum
     where public.AccountType.accounttype = 'Loan' AND `;
    let v = 0;
    let finaldata = "";
    for (const key in req) {
      let appenddata = "";
      let customerdetail = "customerdetail";
      if (key == "phone" || key == "cust_id") {
        if (req[key] != "") {
          appenddata = customerdetail + "." + appenddata + key;
          appenddata = appenddata + "=" + "" + `${req[key]}` + "";
          v++;
        }
      }
      if (Object.keys(req).length != v) {
        finaldata = finaldata + appenddata + " AND ";
      } else {
        finaldata = finaldata + appenddata + "  ";
      }
    }
    logger.info("final extract querry is ", getCustInfoQuerry + finaldata);
    let finalextractquerry = getCustInfoQuerry + finaldata;
    let getCustInfoData = await DB.ExtractQuerry(client, finalextractquerry);
    let getCustInfoFinalData = {};
    if (getCustInfoData.rows.length > 0) {
      getCustInfoFinalData.value = getCustInfoData.rows;
    } else {
      let value = [];
      value[0] = "No data Match";
      getCustInfoFinalData.value = value;
    }
    getCustInfoFinalData.statusvalue = true;
    logger.info("get the data from database==", getCustInfoFinalData.value);
    return getCustInfoFinalData;
  } catch (err) {
    logger.error("get the error in the getBalanceAndLoanAmountByFilter ", err);
    throw err;
  } finally {
    client.release();
  }
};
