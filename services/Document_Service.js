const repodocument = require("../Database/Repository/Document_repo");
const { logger } = require("../Util/logeer");
const DB = require("../Database/dbconnection");

exports.getDocument = async () => {
  try {
    const getdata = await repodocument.getDocument();
    console.log("service", getdata);
    return getdata;
  } catch (err) {
    logger.error("Error in documentservice by getDocument", err);
    throw err;
  }
};

exports.getdocumentbyId = async (data) => {
  try {
    console.log("My document id is ", data);
    const client = await DB.dbConnection();
    const getdata = await repodocument.getdocumentbyId(data.doc_id, client);
    console.log("service", getdata);
    return getdata;
  } catch (err) {
    logger.error(err, "in the documentservice by getdocumentId");
    throw err;
  }
};

exports.getDocumentMasterbyfilter = async (data) => {
  try {
    console.log("My document data is ", data);
    const getdata = await repodocument.getDocumentMasterbyfilter(data);
    console.log("service", getdata);
    return getdata;
  } catch (err) {
    logger.error(err, "in the documentservice by getDocumentMasterbyfilter");
    throw err;
  }
};

exports.Add_DocumentMaster = async (data) => {
  try {
    console.log("My document data is ", data);
    const getdata = await repodocument.addDocument(data);
    console.log("service", getdata);
    return getdata;
  } catch (err) {
    logger.error(err, "in the documentservice by Add_DocumentMaster");
    throw err;
  }
};
exports.updateDocument_master = async (data) => {
  try {
    console.log("My document data is ", data);
    const getdata = await repodocument.updateDocument_master(data);
    console.log("service", getdata);
    return getdata;
  } catch (err) {
    logger.error(err, "in the documentservice by updateDocument_master");
    throw err;
  }
};
exports.Delete_Document_Master_Document = async (data) => {
  try {
    console.log("My document data is ", data);
    const getdata = await repodocument.delete_DocumentBy_Id(data);
    //console.log("service", getdata);
    return getdata;
  } catch (err) {
    logger.error(
      err,
      "in the documentservice by Delete_Document_Master_Document"
    );
    throw err;
  }
};
