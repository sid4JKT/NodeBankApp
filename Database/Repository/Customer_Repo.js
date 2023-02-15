const DB = require("../dbconnection");

const { logger } = require("../../Util/logeer");

const { randomNumberInt } = require("./../../Util/util");

const xlsxj = require("xlsx-to-json");

const fs = require("fs");

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
      " select * from customerdetail"
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

exports.addCustomer = async (data) => {
  const client = await DB.dbConnection();
  try {
    let resultdata = {};
    logger.info(`the DB is Connected `, data);

    if (data.ActionType == "ADD") {
      let add = await Add(data);
      await DB.ExtractQuerry(client, add);
      let Custid = `select cust_id from customerdetail where firstname='${data.FirstName}' and lastname='${data.LastName}' and address1='${data.Address1}' and address2='${data.Address2}' and emailid='${data.EmailId}' and phone=${data.Phone} and mobile=${data.Mobile} and dob='${data.DateOfBirth}' and maritalstatus='${data.MaritalStatus}' and zipcode='${data.ZIPCode}' and city='${data.City}' and state='${data.State}' and country='${data.Country}'`;

      logger.info("querry for customer id", Custid);
      let val = await DB.ExtractQuerry(client, Custid);
      resultdata.statusvalue = true;
      resultdata.value = {
        Customerid: val.rows[0]
      };
      console.log("inthe  ADD ", resultdata);
      return resultdata;
    }
    if (data.ActionType === "UPDATE") {
      let selectQuery = `Select * from customerdetail where cust_id=${data.Cust_id}`;
      let beforeUpdate = await DB.ExtractQuerry(client, selectQuery);
      let update = await Update(data);
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

        Country: data.Country
      };

      resultdata.Oldvalue = beforeUpdate.rows;

      // await client.release();

      return resultdata;
    }
  } catch (err) {
    logger.error("Something went wrong in the add customers repo");

    throw err;
  } finally {
    client.release();
  }
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
