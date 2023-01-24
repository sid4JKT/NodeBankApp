const Customertxn_Service = require("../../services/Customertxn_Service");
const { logger } = require("../../Util/logeer");

exports.Customertxn = async (req, res) => {
  try {
    let getData = await Customertxn_Service.Customertxn(req.body);

    return res.status(200).send(getData.customerdetails);
  } catch (err) {
    logger.error("err in the controller", err);
    return res.status(500).json({
      Status: {
        StatusCode: 500,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "Information",
      },
    });
  }
};

exports.CustomerTxnHistoryByFilter = async (req, res) => {
  try {
    let getData = await Customertxn_Service.CustomerTxnHistoryByFilter(
      req.body
    );
    logger.info("controller", getData);

    return res.status(200).send(getData.value);
  } catch (err) {
    logger.error("err in the controller", err);
    return res.status(500).json({
      Status: {
        StatusCode: 500,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "something went wrong",
      },
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

    return res.status(200).send(getData.value);
  } catch (err) {
    logger.error("err in the controller", err);
    return res.status(500).json({
      Status: {
        StatusCode: 500,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "something went wrong",
      },
    });
  }
};

exports.getcCustomerTxnByNameController = async (req, res) => {
  try {
    let getData = await Customertxn_Service.getcCustomerTxnByNameService(
      req.body
    );
    logger.info("controller", getData);

    return res.status(200).send(getData.value);
  } catch (err) {
    logger.error("err in the controller", err);
    return res.status(500).json({
      Status: {
        StatusCode: 500,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "something went wrong",
      },
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
      return res.status(200).send(getData.value);
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
      Status: {
        StatusCode: 500,
        StatusType: "error",
        StatusMessage: "Record not Saved",
        StatusSeverity: "something went wrong",
      },
    });
  }
};
