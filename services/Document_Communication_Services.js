const custRepo = require("../Database/Repository/Customer_Repo");
const custxnRepo = require("../Database/Repository/CustomerTxn_Repo");
const Communication_Repo = require("../Database/Repository/Communication_Repo");
const GetLoanAccount_Repo=require("../Database/Repository/GetLoanAccount_Repo")
const Document_Repo = require("../Database/Repository/Document_Repo");
const { logger } = require("../Util/logeer");
const DB = require("../Database/dbconnection");

exports.documentCustomer = async (custidDoc) => { 
  const client = await DB.dbConnection();
  try {
    // console.log(custidDoc,"************")
    let customerDetail = await custRepo.getCustomerById(custidDoc.custId);

    // if(customerDetail.statusvalue) {
    logger.info("data got from getCustomerbyID", customerDetail);

    let val = custidDoc.listCode;
    let doc_id = await Document_Repo.getDetailIdbydesc(val, client);
   
    let Document_Details = await Document_Repo.getdocumentbyId(doc_id,client);

    console.log(Document_Details.value[0].doc_id)
    let payloadDetail = {
      customerdetail: {
        accountnum:custidDoc.acctnum,
        accounttype:custidDoc.accType,
        cust_id: customerDetail.cust_id,
        firstname: customerDetail.firstname,
        lastname: customerDetail.lastname,
        address1: customerDetail.address1,
        address2: customerDetail.address2,
        emailid: customerDetail.emailid,
        phone: customerDetail.phone,
        mobile: customerDetail.mobile,
        dob: customerDetail.dob,
        maritalstatus: customerDetail.maritalstatus,
        zipcode: customerDetail.zipcode,
        city: customerDetail.city,
        state: customerDetail.state,
        country: customerDetail.country,
      },
      Documents: {
        doc_id: Document_Details.value[0].doc_id,
        Doc_Desc: Document_Details.value[0].Doc_Desc,
        Doctype: Document_Details.value[0].Doctype,
        doc_date: Document_Details.value[0].doc_date,
        doc_name: Document_Details.value[0].doc_name,
        doc_statuscode: Document_Details.value[0].doc_statuscode,
        doc_template: Document_Details.value[0].doc_template,
      },
      statusvalue : true
    };
    logger.info("document data", payloadDetail);
    console.log(payloadDetail)
    return payloadDetail;
    
  } catch (err) {
    logger.error("Error is : " + err);
    throw new Error("Error occured during payload");
  }
};

exports.documentCustomerForSaving = async (custidDoc, client) => {
  // const client = await DB.dbConnection();

  try {
    let customerDetail = await custxnRepo.getCustomerSavingAccountbyCustId(
      custidDoc,
      client
    );
    if (customerDetail.statusvalue) {
      logger.info("data got from getcCustomerTxnByCustId", customerDetail);
      customerDetail = customerDetail.value;
      let val = custidDoc.listCode;
      let docid_array = await Document_Repo.getDetailIdbydesc(val, client);

      let Document_Details = await Document_Repo.getdocumentbyId(
        docid_array,
        client
      );    

      let payloadDetail = {
        customerdetail: {
          AccountType:custidDoc.AccountType,
          accountnum:custidDoc.accountnum,
          cust_id: customerDetail.cust_id,
          firstname: customerDetail.firstname,
          lastname: customerDetail.lastname,
          address1: customerDetail.address1,
          address2: customerDetail.address2,
          emailid: customerDetail.emailid,
          phone: customerDetail.phone,
          mobile: customerDetail.mobile,
          dob: customerDetail.dob,
          maritalstatus: customerDetail.maritalstatus,
          zipcode: customerDetail.zipcode,
          city: customerDetail.city,
          state: customerDetail.state,
          country: customerDetail.country,
          country: customerDetail.country,
          status: customerDetail.acctnum,
          balance: customerDetail.balance,
          transfer_limit: customerDetail.transfer_limit,
          branch_code: customerDetail.branch_code,
        },
        Documents: {
          doc_id: Document_Details.value[0].doc_id,
          Doc_Desc: Document_Details.value[0].Doc_Desc,
          Doctype: Document_Details.value[0].Doctype,
          doc_date: Document_Details.value[0].doc_date,
          doc_name: Document_Details.value[0].doc_name,
          doc_statuscode: Document_Details.value[0].doc_statuscode,
          doc_template: Document_Details.value[0].doc_template,
        },
      };
      logger.info("document data", payloadDetail);
      return payloadDetail;
    } else {
      logger.error("err in the service documentCustomerForSaving", err);
      throw new Error("err while getting data from customer details");
    }
  } catch (err) {
    logger.error("err in the service addCustomer", err);
    throw err;
  } finally {
    // client.release()
  }
};

exports.documentCustomerForLoan = async (custidDoc, client) => {
  // const client = await DB.dbConnection();
  try {
    
    logger.info(custidDoc)
    let customerDetail = await GetLoanAccount_Repo.getCustomerLoanAccountbyCustId(
      custidDoc,
      client
    );
    
    if (customerDetail.statusvalue) {
      logger.info("data got from getcCustomerTxnByCustId", customerDetail);
      customerDetail = customerDetail.value;
      let val = custidDoc.listCode;
      let docid_array = await Document_Repo.getDetailIdbydesc(val, client);
      
      let Document_Details = await Document_Repo.getdocumentbyId(
        docid_array,
        client
      );    

      let payloadDetail = {
        customerdetail: {
          AccountType:custidDoc.AccountType,
          accountnum:custidDoc.accountnum,
          cust_id: customerDetail.cust_id,
          firstname: customerDetail.firstname,
          lastname: customerDetail.lastname,
          address1: customerDetail.address1,
          address2: customerDetail.address2,
          emailid: customerDetail.emailid,
          phone: customerDetail.phone,
          mobile: customerDetail.mobile,
          dob: customerDetail.dob,
          maritalstatus: customerDetail.maritalstatus,
          zipcode: customerDetail.zipcode,
          city: customerDetail.city,
          state: customerDetail.state,
          country: customerDetail.country,
       
        },
        Documents: {
          doc_id: Document_Details.value[0].doc_id,
          Doc_Desc: Document_Details.value[0].Doc_Desc,
          Doctype: Document_Details.value[0].Doctype,
          doc_date: Document_Details.value[0].doc_date,
          doc_name: Document_Details.value[0].doc_name,
          doc_statuscode: Document_Details.value[0].doc_statuscode,
          doc_template: Document_Details.value[0].doc_template,
        },
      };
      logger.info("document data", payloadDetail);
      return payloadDetail;
    } else {
      logger.error("err in the service documentCustomerForSaving", err);
      throw new Error("err while getting data from customer details");
    }
  } catch (err) {
    logger.error("err in the service addCustomer", err);
    throw err;
  } finally {
    // client.release()
  }
};
