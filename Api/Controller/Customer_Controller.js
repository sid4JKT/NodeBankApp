const customerservice = require("../../services/Customer_Service.js");
const { logger } = require("../../Util/logeer");
const documentService = require("../../services/Document_Communication_Services");
const Communication_Repo = require("../../Database/Repository/Communication_Repo");
const doc = require("../../RabbitMQ/Publisher");
const pdfGenerate = require("../../pdf/pdfgenerate");
//importing send_email
const email = require("../../send_email");

exports.getCustomerById = async (req, res) => {
  try {
    logger.info("get the data send to service", req.body);
    let customerId = req.params.custId;
    const customerData = await customerservice.getCustomerById(customerId);
    logger.info(`Server started at http://localhost:8080}`);
    return res.status(200).send(customerData);
  } catch (err) {
    logger.error("err in the getCustomerById  controller", err);
    return res.status(500).json({
      Status: {
        StatusCode: 500,
        StatusType: "error",
        ErrorMessage: `${err}`,
        StatusSeverity: "fatal",
      },
    });
  }
};

exports.addCustomer = async (req, res) => {
  try {
    logger.info(`get the data in the Add customer ${req.body}`);
    let addJson = req.body;
    let getData = await customerservice.addCustomer(addJson);
    logger.info("Add customer Data:", getData);
    if (getData.statusvalue) {
      console.log(getData, req.body);
      delete getData.statusvalue;
      if (req.body.customerdetails.ActionType == "UPDATE") {
        logger.info("update of controller is call=", getData);
        return res.status(200).send(getData);
      } else {
        let custidDoc = {
          custId: getData.value.Customerid.cust_id,
          listCode: "newcustDoc",
          acctnum:getData.accountDetail.acctnum,
          accType:getData.accountDetail.accounttype
        };
        // console.log(custidDoc);
        const payload = await documentService.documentCustomer(custidDoc);
        logger.info("document payload", payload);

        //sending payload to publisher
        let documentData = await doc.newpubdoc(payload)
        logger.info("get the document data", documentData);


        //emi part
       // doc.EmiDocumentPublisher(payload,"Emi_account_que");

        //inserting records into document_customer_master_table
        await Communication_Repo.insert_Document_Customer(payload);

        //creating pdf
        let pdfData = await pdfGenerate.pdfgenernate(payload);
        logger.info("Generatepdf", pdfData);

        ///sending emails
        let data = payload.customerdetail.emailid;
         const Emails = await email.main(data);
         logger.info("get the document data", Emails);

        return res.status(200).send(getData);
      }
    } else {
      return res.status(500).json({
        Status: {
          StatusCode: 500,
          StatusType: "error",
          ErrorMessage: `${err}`,
          StatusSeverity: "Information",
        },
      });
    }
  } catch (err) {
    logger.error("error from addCustomer controller", err);
    return res.status(500).json({
      Status: {
        StatusCode: 500,
        StatusType: "error",
        ErrorMessage: `${err}`,
        StatusSeverity: "fatal",
      },
    });
  }
};

//Getting all customers
exports.getCustomers = async (req, res) => {
  try {
    const customersData = await customerservice.getCustomers();
    logger.info(`Server started at http://localhost:8080}`);
    return res.status(200).send(customersData);
  } catch (err) {
    logger.error("Error from getCustomers controller", err);
    return res.status(500).json({
      Status: {
        StatusCode: 500,
        StatusType: "error",
        ErrorMessage: `${err}`,
        StatusSeverity: "fatal",
      },
    });
  }
};

//Deleting customer
exports.deleteCustomer = async (req, res) => {
  try {
    logger.info(`get the data in the Add customer  ${req.body}`);
    const details = req.body;
    const deletecustomer = await customerservice.deleteCustomer(details);
    logger.info(`Server started at http://localhost:3100}`);
    console.log(deletecustomer);
    return res.status(200).send(deletecustomer);
  } catch (err) {
    logger.error("Error from deleteCustomer controller", err);
    return res.status(500).json({
      Status: {
        StatusCode: 500,
        StatusType: "error",
        ErrorMessage: `${err}`,
        StatusSeverity: "fatal",
      },
    });
  }
};
