const DB = require("../dbconnection");

const logger = require("../../Util/logeer");

exports.getAllListDetail = async () => {
  const client = await DB.dbConnection();
  let getdata = {};
  try {
    let resultdata = await DB.ExtractQuerry(
      client,
      `select * from listdatadetail`
    );
    if (resultdata.rows.length > 0) {
      getdata.statusvalue = true;
      getdata.result = resultdata.rows[0];
      return getdata;
    } else {
      getdata.statusvalue = false;
      getdata.value = "no data match";
      throw new Error("Error in the getAllListdatadetail");
    }
  } catch (err) {
    logger.error("get the error in getAllListdatadetail", err);
    throw err;
  } finally {
    client.release();
  }
};
exports.getlistDataDetailBycode = async (data) => {
  const client = await DB.dbConnection();
  let getdata = {};
  try {
    let resultdata = await DB.ExtractQuerry(
      client,
      `select * from listdatadetail where listdatadetail.listmstid = '${data}' `
    );
    if (resultdata.rows.length > 0) {
      getdata.value = resultdata.rows;
      getdata.statusvalue = true;
      return getdata;
    } else {
      throw new Error("no data match in list data with this listmstid");
    }
  } catch (err) {
    throw err;
  }
};

exports.updatelistDataDetail = async (data) => {
  const client = await DB.dbConnection();
  let getdata = {};
  try {
    let resultdata = await DB.ExtractQuerry(
      client,
      `select * from listdatadetail where listdatadetail.listdtlid = '${data.listdtlid}' `
    );
    if (resultdata.rows.length > 0) {
    //   let update = await updatelistvalue(data);
      await DB.ExtractQuerry(client, 
        `UPDATE listdatadetail SET listdtlvalue = '${data.listdtlvalue}', listdetldesc = '${data.listdetldesc}', listdtlcomment = '${data.listdtlcomment}' WHERE listdtlid = '${data.listdtlid}'`
        );
      getdata.statusvalue = true;
      getdata.Newvalue ={
        listdtlid:data.listdtlid,
        listdtlvalue:data.listdtlvalue,
        listdetldesc:data.listdetldesc,
        listdtlcomment:data.listdtlcomment
      }
      return getdata;
    } else {
      getdata.statusvalue = false;
      getdata.value = "no data match";
      throw new Error("Error in the updatelistdatadetail");
    }
  } catch (err) { 
    throw err;
  } finally {
    client.release();
  }
};

exports.deleteListDataDetail = async (data) => {
    const client = await DB.dbConnection();
    let getdata = {};
    try {
      let resultdata = await DB.ExtractQuerry(
        client,
        `select * from listdatadetail where listdatadetail.listdtlid = '${data}' `
      );
      if (resultdata.rows.length > 0) {
       await DB.ExtractQuerry(client,
            `DELETE FROM listdatadetail WHERE listdatadetail.listdtlid = '${data}'`)
        getdata.value = resultdata.rows;
        getdata.statusvalue = true;
        return getdata;
      } else {
        throw new Error("no data match in list data with this listdtlid");
      }
    } catch (err) {
      throw err;
    }
  };
