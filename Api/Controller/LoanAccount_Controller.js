const loanService = require("../../services/LoanAccount_Service");

const { logger } = require("../../Util/logeer");

exports.getLoanAccountByDateRange = async (req, res) => {
  try {
    const loanDataRequest = req.body;

    console.log("Request body : " + JSON.stringify(loanDataRequest));

    const loanData = await loanService.getLoanAccountByDateRange(
      loanDataRequest
    );

    logger.info(`Server started at http://localhost:3100}`);

    if (loanData.statusvalue) {
      return res.status(200).json({
          StatusCode: 200,
          StatusType: "Success",
          StatusMessage: "Record Recieved",
          StatusSeverity: "Information",
        loanData,
      });
    } else {
      return res.status(500).json({
        Status: {
          StatusCode: 500,
          StatusType: "Error",
          StatusMessage: "Record Not Recieved",
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

exports.getLoanAccountByCustomerId = async (req, res) => {
  try {
    logger.info(
      `get loan data by using customer id ${req.body}` +
        JSON.stringify(req.body)
    );

    const loanDataRequest = req.body;

    const loanData = await loanService.getLoanAccountByCustomerId(
      loanDataRequest
    );

    if (loanData.statusvalue) {
      let value = loanData.value.rows[0]
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
          StatusType: "Error",
          StatusMessage: "Record Not Recieved",
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

exports.createLoanAccount = async (req, res) => {
  try {
    const createLoanPayload = req.body;
    const loanData = await loanService.createLoanAccount(createLoanPayload);
    logger.info("the create loan account ", loanData);
    if (loanData.statusvalue) {
      let value = loanData.value.value
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
          StatusType: "Error",
          StatusMessage: "Record Not Saved",
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

exports.deactivateLoanAccount = async (req, res) => {
  try {
    logger.info(
      "LoanAccount_Controller -> deactivateLoanAccount -> Updating LoanAccount Records to Inactive -> Initial Inputs : ",
      req.body
    );
    const loanDiavtivateData = await loanService.deactivateLoanAccount(
      req.body.acctnum
    );
    logger.info(
      "LoanAccount_Controller -> deactivateLoanAccount -> Updating LoanAccount Records to Inactive -> Response From deactivateLoanAccount : ",
      loanDiavtivateData
    );
    if (loanDiavtivateData.statusvalue) {
      let value = loanDiavtivateData.value
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
          StatusType: "Error",
          StatusMessage: "Record Not Saved",
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
