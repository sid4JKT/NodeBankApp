const DB = require("../dbconnection");

const { logger } = require("../../Util/logeer");

const { randomNumberInt } = require("./../../Util/util");

const xlsxj = require("xlsx-to-json");

const fs = require("fs");

const SavingAccountTxn_Service = require("../../services/SavingAccountTxn_Service")

const loanAccountDetail = require("../../services/LoanAccount_Service")

//const { addCustomer } = require("../../services/CustomerService");

//Getting customer by id

exports.getCustomerById = async (data) => {
  const client = await DB.dbConnection();
  try {
    let finaldata = {};
    let resultdata = await DB.ExtractQuerry(
      client,
      "select * from customerdetail where cust_id=" + data
    );
    if (resultdata.rows.length > 0) {
      finaldata.statusvalue = true;
      finaldata = resultdata.rows[0];
      return finaldata;
    } else {
      finaldata.statusvalue = false;
      finaldata.value = "no data match";
      throw new Error(
        "no data match in saving account with this cust_id",
        data
      );
    }
  } catch (err) {
    logger.error("get the error in the getcustomerbyID ", err);
    throw err;
  } finally {
    client.release();
  }
};

//Getting customers

exports.getCustomers = async () => {
  try {
    let resultfinaldata = {};
    const client = await DB.dbConnection();
    resultdata = await DB.ExtractQuerry(
      client,
      " SELECT * FROM public.customerdetail ORDER BY cust_id DESC "
    );

    resultfinaldata = resultdata.rows[0];
    resultfinaldata.statusvalue = true;
    return resultfinaldata;
  } catch (err) {
    logger.error("Error occured during get Customers repo");
    throw err;
  }
};

//Adding customer

// 
exports.addCustomer = async (data) => {
  let custidDoc;
  return new Promise  (async (resolve,reject) => {
  const client = await DB.dbConnection();
  try {
    let getdata = {};
    let resultdata = {};
   
    logger.info(`the DB is Connected `, data);

    if (data.customerdetails.ActionType == "ADD") {
      let addCustomer = await Add(data.customerdetails);
      await DB.ExtractQuerry(client, addCustomer);
      let Custid = `select cust_id from customerdetail where firstname='${data.customerdetails.FirstName}' and lastname='${data.customerdetails.LastName}' and address1='${data.customerdetails.Address1}' and address2='${data.customerdetails.Address2}' and emailid='${data.customerdetails.EmailId}' and phone=${data.customerdetails.Phone} and mobile=${data.customerdetails.Mobile} and dob='${data.customerdetails.DateOfBirth}' and maritalstatus='${data.customerdetails.MaritalStatus}' and zipcode='${data.customerdetails.ZIPCode}' and city='${data.customerdetails.City}' and state='${data.customerdetails.State}' and country='${data.customerdetails.Country}'`;

      logger.info("querry for customer id", Custid);
      let val = await DB.ExtractQuerry(client, Custid);
      console.log("db return" , val.rows[0]);

      if (data.customerdetails.ActionType == "ADD") {
       
          if (data.Account.accountType == "loan" || data.Account.accountType == "Loan") {
           
            let createLoanAccountPayload = {
              CustId: val.rows[0].cust_id,
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
            logger.info("Customer_Service -> addCustomer -> loan account created  "+ JSON.stringify(responseFormLoan ))
            if (responseFormLoan.statusvalue) {
            delete responseFormLoan.statusvalue
           // delete responseFormLoan.message
            //delete responseFormLoan.value.Status
            logger.info("Customer_Service -> addCustomer -> loan account created 2 "+ JSON.stringify(responseFormLoan ))
            
            getdata = val.rows[0];
              getdata.accountDetail = responseFormLoan.value;

              console.log("response body ----------" , getdata)
               custidDoc = {
                custId: val.rows[0].cust_id,
                listCode: "newcustDoc",
                acctnum: getdata.accountDetail.AcctNum,
                accType: getdata.accountDetail.Accounttype
              };
              getdata.custidDoc = custidDoc;
              resultdata = getdata;
             
            } else {
              getdata.accountDetail = responseFormLoan.message;
            }
          }
         else if (data.Account.accountType == "saving") {
            let createSavingAccountpayload = {
              custId: val.rows[0].cust_id,
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
            // } 
            
            getdata = val.rows[0];
              getdata.accountDetail = responseFormSavingAccount.value;

              console.log("response body ----------" , getdata)
               custidDoc = {
                custId: val.rows[0].cust_id,
                listCode: "newcustDoc",
                acctnum: getdata.accountDetail.acctnum,
                accType: getdata.accountDetail.accounttype
              };
              getdata.custidDoc = custidDoc;
              resultdata = getdata;
             
            } else {
              getdata.accountDetail = responseFormSavingAccount.message;
            }
          } else {
            //need to write to code here
          }
        
      } else {
        return getdata;
      }

      resultdata.statusvalue = true;
      // resultdata.value = {
      //   Customerid: val.rows[0],
      // };
      
      resolve(resultdata);
      
      return resultdata;
      
    }
    if (data.ActionType === "UPDATE") {
      let selectQuery = `Select * from customerdetail where cust_id=${data.Cust_id}`;
      let beforeUpdate = await DB.ExtractQuerry(client, selectQuery);
      let update = await updateCustomer(data);
      await DB.ExtractQuerry(client, update);
      resultdata.statusvalue = true;

      resultdata.Newvalue = {
        FirstName: data.FirstName,
        LastName: data.LastName,
        Address1: data.Address1,
        Address2: data.Address2,
        EmailId: data.EmailId,
        Phone: data.Phone,
        Mobile: data.Mobile,
        DOB: data.DateOfBirth,
        MaritalStatus: data.MaritalStatus,
        ZIPCode: data.ZIPCode,
        City: data.City,
        State: data.State,
        Country: data.Country,
      };

      resultdata.Oldvalue = beforeUpdate.rows;

      // await client.release();

      return resultdata;
      
    }
    
  } 
  catch (err) {
    logger.error("Something went wrong in the add customers repo");

    throw err;
  } finally {
    client.release();
  }
    //resolve();
    });
};

function readFile() {
  xlsxj(
    {
      input: "C:/Users/Shivamurti/Downloads/Demo.xlsx",

      output: "output.json"
    },
    async function (err, result) {
      if (err) {
        console.error(err);
      } else {
        var output;

        const client = await DB.dbConnection();

        let count = 0;

        for (let item of result) {
          if (
            typeof item.FirstName === "string" &&
            typeof item.LastName === "string" &&
            typeof item.Address1 === "string" &&
            typeof item.Address2 === "string" &&
            typeof item.EmailId === "string" &&
            typeof item.Phone === "BigInt" &&
            typeof item.Mobile === "bigint" &&
            typeof item.DateOfBirth === "string" &&
            typeof item.MaritalStatus === "string" &&
            typeof item.ZIPCode === "string" &&
            typeof item.City === "string" &&
            typeof item.State === "string" &&
            typeof item.Country === "string"
          ) {
            let add = await Add(item);
            let output = await DB.ExtractQuerry(client, add);
            cust_id = await DB.ExtractQuerry(
              client,
              `select cust_id from customerdetail where FirstName=${item.FirstName} && LastName=${item.LastName} && Address1=${item.Address1} && Address2=${item.Address2} && EmailId=${item.EmailId} && Phone=${item.Phone} && Mobile=${item.Mobile} && DateOfBirth=${item.DateOfBirth} && MaritalStatus=${item.MaritalStatus} && ZIPCode=${item.ZIPCode} && City=${item.City} && State=${item.State} && Country=${item.Country}`
            );
            count++;
            //output = await addcustomer(item);

            console.log(output);
          } else {
            console.log("Datatype doesnot match", item);
          }
        }

        console.log("Number of records inserted = ", count);

        client.release();
      }
    }
  );
}

//readFile();

async function Add(data) {
  if (data.Mobile.length > 0) {
    data.Mobile = 0;
  }
  let AddCust = `INSERT INTO public.customerdetail( firstname, lastname, address1, address2, emailid, phone, mobile, dob, maritalstatus, zipcode, city, state, country)

  values('${data.FirstName}', '${data.LastName}', '${data.Address1}', '${data.Address2}', '${data.EmailId}', ${data.Phone}, ${data.Mobile}, '${data.DateOfBirth}', '${data.MaritalStatus}', '${data.ZIPCode}', '${data.City}', '${data.State}', '${data.Country}')`;

  console.log("Just getting the query : " + AddCust);

  return AddCust;
}

async function Update(data) {
  let UpdateCust = `UPDATE public.customerdetail

  SET  firstname='${data.FirstName}', lastname='${data.LastName}', address1='${data.Address1}', address2='${data.Address2}', emailid='${data.EmailId}', phone=${data.Phone}, mobile=${data.Mobile}, dob='${data.DateOfBirth}', maritalstatus='${data.MaritalStatus}', zipcode='${data.ZIPCode}', city='${data.City}', state='${data.State}', country='${data.Country}'

  WHERE  cust_id=${data.Cust_id}`;

  console.log("Just getting the query : " + UpdateCust);

  return UpdateCust;
}

//Deleting customer
exports.deleteCustomer = async (data) => {
  const client = await DB.dbConnection();
  try {
    let resultfinaldata = {};
    logger.info(`the DB is Connected`, data);
    let Status = "inactive";
    let queryString1 = `DELETE FROM public.customerdetail WHERE cust_id=${data.cust_id}`;
    let resultdata1 = await DB.ExtractQuerry(client, queryString1);
    resultfinaldata.statusvalue = true;
    resultfinaldata.values =
      " customer account status is updated  and customer account deleted for custId ";
    return resultfinaldata;
  } catch (err) {
    logger.error("get the error in the deleteCustomer ", err);
    throw err;
  } finally {
    client.release();
  }
};
