const customerservice = require("../../services/Customer_Service.js");
const { logger } = require("../../Util/logeer");
const documentService = require("../../services/Document_Communication_Services");
const Communication_Repo = require("../../Database/Repository/Communication_Repo");
const doc = require("../../RabbitMQ/Publisher");
const pdfGenerate = require("../../pdf/pdfgenerate");
//importing send_email
const blob = require("../../BlobUpload/AzureBlobUpload");
const email = require("../../Email_services/send_email");
exports.getCustomerById = async (req, res) => {
  try {
    logger.info("get the data send to service", req.body);
    let customerId = req.params.custId;
    const customerData = await customerservice.getCustomerById(customerId);
    logger.info(`Server started at http://localhost:8080}`);
    return res.status(200).json({
      ststusCode: 200,
      statusvalue: true,
      statustype: "success",
      statusmessage: "recordsaved",
      statusseverity: "information",
      customerData
    });
  } catch (err) {
    logger.error("err in the getCustomerById  controller", err);
    return res.status(500).json({
      StatusCode: 500,
      statusvalue: false,
      StatusType: "error",
      StatusMessage: `${err}`,
      StatusSeverity: "Information"
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
        return res.status(200).json({
          ststusCode: 200,
          statusvalue: true,
          statustype: "success",
          statusmessage: "recordsaved",
          statusseverity: "information",
          getData
        });
      } else {
        let custidDoc = {
          custId: getData.value.Customerid.cust_id,
          listCode: "newcustDoc",
          acctnum: getData.accountDetail.acctnum,
          accType: getData.accountDetail.accounttype
        };
        // console.log(custidDoc);
        const payload = await documentService.documentCustomer(custidDoc);
        logger.info("document payload", payload);

        //sending payload to publisher
        let documentData = await doc.newpubdoc(payload);
        logger.info("get the document data", documentData);

        //inserting records into document_customer_master_table
        await Communication_Repo.insert_Document_Customer(payload);

        //creating pdf
        let pdfData = await pdfGenerate.pdfgenernate(payload);
        logger.info("Generatepdf", pdfData);

//         let blobURL = blob.datafinal.url;
// console.log(blobURL,"873523489y5782349yr7823")
//         let doc_id = payload.Documents.doc_id;
//         let cust_id = payload.customerdetail.cust_id;

//         await Communication_Repo.insertDocCustomerData(
//           cust_id,
//           doc_id,
//           blobURL
//         );

        // sending emails
        let data = payload.customerdetail;
        const Emails = await email.main(data);
        logger.info("get the document data", Emails);

        return res.status(200).json({
          ststusCode: 200,
          statusvalue: true,
          statustype: "success",
          statusmessage: "recordsaved",
          statusseverity: "information",
          getData
        });
      }
    } else {
      return res.status(500).json({
        Status: {
          StatusCode: 500,
          StatusType: "error",
          ErrorMessage: `${err}`,
          StatusSeverity: "Information"
        }
      });
    }
  } catch (err) {
    logger.error("error from addCustomer controller", err);
    return res.status(500).json({
      StatusCode: 500,
      statusvalue: false,
      StatusType: "error",
      StatusMessage: `${err}`,
      StatusSeverity: "Information"
    });
  }
};

//Getting all customers
exports.getCustomers = async (req, res) => {
  try {
    const customersData = await customerservice.getCustomers();
    logger.info(`Server started at http://localhost:8080}`);

    return res.status(200).json({
      ststusCode: 200,
      statusvalue: true,
      statustype: "success",
      statusmessage: "recordsaved",
      statusseverity: "information",
      customersData
    });
  } catch (err) {
    logger.error("Error from getCustomers controller", err);
    return res.status(500).json({
      StatusCode: 500,
      statusvalue: false,
      StatusType: "error",
      StatusMessage: `${err}`,
      StatusSeverity: "Information"
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

    return res.status(200).json({
      ststusCode: 200,
      statusvalue: true,
      statustype: "success",
      statusmessage: "Customer deleted successfully",
      statusseverity: "information",
      deletecustomer
    });
  } catch (err) {
    logger.error("Error from deleteCustomer controller", err);
    return res.status(500).json({
      StatusCode: 500,
      statusvalue: false,
      StatusType: "error",
      StatusMessage: `${err}`,
      StatusSeverity: "Information"
    });
  }
};
