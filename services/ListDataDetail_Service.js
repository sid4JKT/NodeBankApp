const listDetailRepo = require('../Database/Repository/ListDataDetail_Repo');
const { logger } = require('../Util/logeer');
exports.getlistDataDetail = async () => {
    try {
      const getdata = await listDetailRepo.getAllListDetail();
      logger.info("service", getdata);
      return getdata;
    } catch (err) {
        logger.error("get the error in getAllListdatadetail", err);
        throw err
      }
  };

exports.getlistDataDetailBycode = async (data) => {
    try {
      const getdata = await listDetailRepo.getlistDataDetailBycode(data);
      logger.info("service", getdata);
      return getdata;
    } catch (err) {
        logger.error("get the error in getAllListdatadetail", err);
        throw err
      }
  };

exports.updatelistDataDetail = async (data) => {
    try {
      const getdata = await listDetailRepo.updatelistDataDetail(data);
      logger.info("service", getdata);
      return getdata;
    } catch (err) {
        logger.error("get the error in getAllListdatadetail", err);
        throw err
      }
  };

  exports.deletelistDataDetail = async (data) => {
    try {
      const getdata = await listDetailRepo.deleteListDataDetail(data);
      logger.info("service", getdata);
      return getdata;
    } catch (err) {
        logger.error("get the error in getAllListdatadetail", err);
        throw err
      }
  };