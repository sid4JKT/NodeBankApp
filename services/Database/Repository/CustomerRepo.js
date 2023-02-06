const DB = require("../dbconnection");
const { logger } = require("../../Util/logeer");
exports.getCustomerById = async (data) => {
  console.log("get the data in the repo==");
  const client = await DB.dbConnection();
  let resultdata = await DB.ExtractQuerry(
    client,
    " select * from customerdetail where cust_id=" + data
  );
  console.log("the data is ", resultdata);
  return resultdata.rows;
};

exports.getCustomers = async () => {
  console.log("get the data in the repo==");
  const client = await DB.dbConnection(); // console.log("repooo=",client)
  let resultdata = await DB.ExtractQuerry(
    client,
    " select * from customerdetail"
  );
  console.log("the data is ", resultdata);
  return resultdata.rows;
};

exports.addCustomerById = async (data) => {
  const client = await DB.dbConnection();
  try {
    console.log("get the data in the repo==", data);
    let resultdata = await DB.ExtractQuerry(client, AddCust);
    logger.info(`the DB is Connected `);
    console.log("Just getting the customer details ==> ", data.CustomerDetail);
    let actType = data.CustomerDetail.ActionType;
    if (actType == "ÄDD") {
      let add = await Add();
    } else {
      let update = await Update();
    }
    resultdata.statusvalue = true;
    return resultdata;
  } catch (err) {
    let resultdata;
    console.log(err, "in the saving account");
    resultdata.statusvalue = false;
    resultdata.message = "something Went Wrong ";
    return resultdata;
  } finally {
    client.release();
  }
};

async function Add() {
  let AddCust = `INSERT INTO public.customerdetail(cust_id, firstname, lastname, address1, address2, emailid, phone, mobile, dob, maritalstatus, zipcode, city, state, country)
  values(${cust_id}, ${firstname}, ${lastname}, ${address1}, ${address2}, ${emailid}, ${phone}, ${mobile}, ${dob}, ${maritalstatus}, ${zipcode}, ${city}, ${state}, country)`;
}

exports.addCustomer = async (data) => {
  try {
    console.log("get the data in the repo==", data);

    let resultdata = {};
    let accType;

    // let Acc_Type

    logger.info(`the DB is Connected `);
    console.log("Just getting the customer details ==> ", data);

    if (data.ActionType === "ADD") {
      const client = await DB.dbConnection();
      let add = await Add(data);

      await DB.ExtractQuerry(client, add);
      resultdata.statusvalue = true;

      resultdata.value = {
        custid: data.CustID,
        AccType: data.AcctType,
      };

      return resultdata;
    } else {
      const client = await DB.dbConnection();

      let update = await Update(data);
      await DB.ExtractQuerry(client, update);

      resultdata.statusvalue = true;
      resultdata.value = {
        FirstName: data.FirstName,
        LastName: data.LastName,
        Address1: data.Address1,
        Address2: data.Address2,
        EmailId: data.EmailId,
        Phone: data.Phone,
        Mobile: data.Mobile,
        DOB: data.DOB,
        MaritalStatus: data.MaritalStatus,
        ZIPCode: data.ZIPCode,
        City: data.City,
        State: data.State,
        Country: data.Country,
      };

      return resultdata;
    }
  } catch (err) {
    let resultdata = {};
    resultdata.statusvalue = false;
    console.log("Error is : " + err);
    resultdata.message = "Something went wrong";

    return resultdata;
  } finally {
    // client.release();
  }
};
