const ListDataDetailService = require("../../services/ListDataDetail_Service");
const { logger } = require("../../Util/logeer");
exports.getlistDataDetail = async (req, res) => {
  try {
    const data = await ListDataDetailService.getlistDataDetail();
    logger.info(`Server started at http://localhost:8080}`);
    if (data.statusvalue == true) {
      let value = data.result;
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
    return res.status(500).json({
      StatusCode: 500,
      statusvalue:false,
      StatusType: "error",
      StatusMessage: `${err}`,
      StatusSeverity: "Information",
    });
  }
};
exports.getListDataDetailByCode = async (req, res) => {
  try {
    const ListCode = req.params.masterid;
    // console.log(ListCode)
    const data = await ListDataDetailService.getlistDataDetailBycode(ListCode);
    logger.info(`Server started at http://localhost:8080}`);
    if (data.statusvalue == true) {
      let value = data.result;
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
    return res.status(500).json({
      StatusCode: 500,
      statusvalue:false,
      StatusType: "error",
      StatusMessage: `${err}`,
      StatusSeverity: "Information",
    });
  }
};
exports.updateListDataDetail = async (req, res) => {
  try {
    const ListMstID = req.body;
    // console.log(ListCode)
    const data = await ListDataDetailService.updatelistDataDetail(ListMstID);
    logger.info(`Server started at http://localhost:8080}`);
    if (data.statusvalue == true) {
      let value =  data.Newvalue;
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
    return res.status(500).json({
      StatusCode: 500,
      statusvalue:false,
      StatusType: "error",
      StatusMessage: `${err}`,
      StatusSeverity: "Information",
    });
  }
};

exports.deletelistDataDetail = async (req, res) => {
    try {
      const masterId = req.params.masterId;
      // console.log(ListCode)
      const data = await ListDataDetailService.deletelistDataDetail(masterId);
      logger.info(`Server started at http://localhost:8080}`);
      if (data.statusvalue == true) {
        let value = data.result;
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
      return res.status(500).json({
        StatusCode: 500,
        statusvalue:false,
        StatusType: "error",
        StatusMessage: `${err}`,
        StatusSeverity: "Information",
      });
    }
  };
