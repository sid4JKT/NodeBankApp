const Customertxn_Service = require("../../services/Customertxn_Service");
const { logger } = require("../../Util/logeer");

exports.Customertxn = async (req, res) => {
  try {
    let getData = await Customertxn_Service.Customertxn(req.body);
    let value = getData.customerdetails
    return res.status(200).json({
      ststusCode:200,
      statusvalue:true,
      statustype:"success",
      statusmessage:"recordsaved",
      statusseverity:"information",
      value
    })
  } catch (err) {
    logger.error("err in the controller", err);
    return res.status(500).json({
      StatusCode: 500,
      statusvalue:false,
      StatusType: "error",
      StatusMessage: `${err}`,
      StatusSeverity: "Information",
    });
  }
};

exports.CustomerTxnHistoryByFilter = async (req, res) => {
  try {
    let getData = await Customertxn_Service.CustomerTxnHistoryByFilter(
      req.body
    );
    logger.info("controller", getData);
    let value = getData.value
    return res.status(200).json({
      ststusCode:200,
      statusvalue:true,
      statustype:"success",
      statusmessage:"recordsaved",
      statusseverity:"information",
      value
    })
  } catch (err) {
    logger.error("err in the controller", err);
    return res.status(500).json({
      StatusCode: 500,
      statusvalue:false,
      StatusType: "error",
      StatusMessage: `${err}`,
      StatusSeverity: "Information",
    });
  }
};

exports.getBalanceAndLoanAmountByFilterController = async (req, res) => {
  try {
    let getData =
      await Customertxn_Service.getBalanceAndLoanAmountByFilterService(
        req.body
      );
    logger.info("controller", getData);

    let value = getData.value
    return res.status(200).json({
      ststusCode:200,
      statusvalue:true,
      statustype:"success",
      statusmessage:"recordsaved",
      statusseverity:"information",
      value
    })
  } catch (err) {
    logger.error("err in the controller", err);
    return res.status(500).json({
      StatusCode: 500,
      statusvalue:false,
      StatusType: "error",
      StatusMessage: `${err}`,
      StatusSeverity: "Information",
    });
  }
};

exports.getcCustomerTxnByNameController = async (req, res) => {
  try {
    let getData = await Customertxn_Service.getcCustomerTxnByNameService(
      req.body
    );
    logger.info("controller", getData);

    let value = getData.value
    return res.status(200).json({
      ststusCode:200,
      statusvalue:true,
      statustype:"success",
      statusmessage:"recordsaved",
      statusseverity:"information",
      value
    })
  } catch (err) {
    logger.error("err in the controller", err);
    return res.status(500).json({
      StatusCode: 500,
      statusvalue:false,
      StatusType: "error",
      StatusMessage: `${err}`,
      StatusSeverity: "Information",
    });
  }
};

exports.getLoanAmountByFilterController = async (req, res) => {
  try {
    let getData = await Customertxn_Service.getLoanAmountByFilterService(
      req.body
    );
    logger.info("controller", getData);
    if (getData.statusvalue) {
      delete getData.statusvalue;
      let value = getData.value
      return res.status(200).json({
        ststusCode:200,
        statusvalue:true,
        statustype:"success",
        statusmessage:"recordsaved",
        statusseverity:"information",
        value
      });
    } else {
      return res.status(500).json({
        Status: {
          StatusCode: 500,
          StatusType: "error",
          StatusMessage: "Record not Found",
          StatusSeverity: "Information",
        },
      });
    }
  } catch (err) {
    logger.error("err in the controller", err);
    return res.status(500).json({
      StatusCode: 500,
      statusvalue:false,
      StatusType: "error",
      StatusMessage: `${err}`,
      StatusSeverity: "Information",
    });
  }
};

exports.getSavingDetailsByFilterController = async (req, res) => {
  try {
    let getData = await Customertxn_Service.getSavingDetailsByFilterService(
      req.body
    );
    logger.info("controller", getData);
    if (getData.statusvalue) {
      delete getData.statusvalue;
      let value = getData.value
      return res.status(200).json({
        ststusCode:200,
        statusvalue:true,
        statustype:"success",
        statusmessage:"recordsaved",
        statusseverity:"information",
        value
      })
    }
  } catch (err) {
    logger.error("err in the controller", err);
    return res.status(500).json({
      StatusCode: 500,
      statusvalue:false,
      StatusType: "error",
      StatusMessage: `${err}`,
      StatusSeverity: "Information",
    });
  }
};
