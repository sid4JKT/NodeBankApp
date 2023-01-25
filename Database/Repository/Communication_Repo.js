<<<<<<< HEAD
const DB = require("../dbconnection");
const { logger } = require("../../Util/logeer");
const { getdate, randomNumberInt } = require("../../Util/util");

exports.getCommunctionById = async (req) => {
  const client = await DB.dbConnection();
  try {
    let sqlQuerry = `select * from public."document_cutomer_master _table" where cust_id=${req.custId}`;
    logger.info("querry ", sqlQuerry);
    let getCommunicationInfoData = await DB.ExtractQuerry(client, sqlQuerry);
    let getData = {};
    getData.commnicationData = getCommunicationInfoData.rows[0];
    getData.statusvalue = true;
    return getData;
  } catch (err) {
    
    logger.error("something went wrong in the getCommunicationbyID" )
    throw err;
  } finally {
    client.release();
  }
};

exports.getAllCommunctionData = async () => {
  const client = await DB.dbConnection();
  try {
    let sqlQuerry = `SELECT * FROM "public"."document_master" LIMIT 100`;
    let getCommunicationInfoData = await DB.ExtractQuerry(client, sqlQuerry);
    let getData = {};
    getData.commnicationData = getCommunicationInfoData.rows[0];
    getData.statusvalue = true;
    return getData;
  } catch (err) {
    let resultdata;
    logger.error("get the error in the getAllCommunctionData ", err);
    resultdata.statusvalue = false;
    resultData.message = "something went wrong " + err;
    return resultdata;
  } finally {
    client.release();
  }
};

exports.insertAllCommunctionData = async (req) => {
  const client = await DB.dbConnection();
  try {
    let doc_id = await randomNumberInt(3);
    let sqlQuerry = `INSERT INTO public.document_master(
            doc_id, "DocDesc", "Doctype")
            VALUES (${doc_id}, '${req.DocDesc}', '${req.Doctype}');`;
    await DB.ExtractQuerry(client, sqlQuerry);
    let getData = {};
    getData.commnicationData = {
      doc_id: doc_id,
      DocDesc: req.DocDesc,
      Doctype: req.Doctype,
    };
    getData.statusvalue = true;
    return getData;
  } catch (err) {
    let resultdata;
    logger.error("get the error in the getAllCommunctionData ", err);
    resultdata.statusvalue = false;
    resultData.message = "something went wrong " + err;
    return resultdata;
  } finally {
    client.release();
  }
};

exports.getAllDocumentCustomerMasterTable = async (filterData) => {
  const client = await DB.dbConnection();
  try {
    let req = {};
    for (const key in filterData) {
      if (filterData[key] != "") {
        console.log(filterData[key]);
        req[key] = filterData[key];
      }
    }
    let getCustInfoQuerry = `select * from public."document_cutomer_master _table" where `;

    let v = 0;
    let finaldata = "";
    for (const key in req) {
      let appenddata = "";
      console.log("the key=", key);
      if (key == "DocDate" || key == "Docname") {
        appenddata = appenddata + `"${key}"`;
        appenddata = appenddata + "=" + "" + `'${req[key]}'` + "";
        v++;
      } else if (key == "Docid") {
        appenddata = appenddata + `"${key}"`;
        appenddata = appenddata + "=" + "" + `'${req[key]}'` + "";
        v++;
      }

      if (Object.keys(req).length != v) {
        finaldata = finaldata + appenddata + " AND ";
        //    console.log(appenddata,Object.keys(req).length,v)
      } else {
        finaldata = finaldata + appenddata + "  ";
      }
    }
    console.log("final extract querry is ", getCustInfoQuerry + finaldata);

    let finalextractquerry = getCustInfoQuerry + finaldata;
    let getDocInfoData = await DB.ExtractQuerry(client, finalextractquerry);
    let getDocInfoFinalData = {};
    if (getDocInfoData.rows) {
      throw new Error("no datta dound");
    }
    getDocInfoFinalData.value = getDocInfoData.rows[0];

    logger.info("get the data from database=", getDocInfoFinalData.value);
    return getDocInfoFinalData;
  } catch (err) {
    logger.error(
      "get the error in the getAllDocumentCustomerMasterTable ",
      err
    );

    throw err;
  } finally {
    client.release();
  }
};

exports.insert_Document_Customer = async (data) => {
  const client = await DB.dbConnection();
  let id = await randomNumberInt(4)
  let timestamp = new Date();
  let getData = {};
  try {
    // console.log(`INSERT INTO public."document_cutomer_master _table"(id,
    //   "Docid", "DocDate", "DocType", cust_id, statuscode, timstamp, "DocDesc","Docname")
    //   VALUES (${id},'${data.Documents.doc_id}', '${data.Documents.doc_date}', '${data.Documents.Doctype}', ${data.customerdetail.cust_id}, '${data.Documents.doc_statuscode}',${timestamp}, '${data.Documents.Doc_Desc}', ${data.Documents.doc_name})`);
    let resultdata = await DB.ExtractQuerry(
      client,
      `INSERT INTO public."document_cutomer_master _table"(id,
        "Docid", "DocDate", "DocType", cust_id, statuscode, timstamp, "DocDesc","Docname")
        VALUES (${id},'${data.Documents.doc_id}', '${data.Documents.doc_date}', '${data.Documents.Doctype}', ${data.customerdetail.cust_id}, '${data.Documents.doc_statuscode}','${timestamp}', '${data.Documents.Doc_Desc}', '${data.Documents.doc_name}')`
    );    
    getData.value = resultdata.rows;
    getData.statusvalue = true;
    return getData;
  } catch (err) {
    throw new Error(
      "Error occured during insertion of data in document_customer_master _table"
    );
  } finally {
    client.release();
  }
};

exports.insertDocCustomerData = async (data) => {
  const client = await DB.dbConnection();
  try {
    let doc_id = data.doc_id;
    let cust_id = data.cust_id;
    let ref_id = data.ref_id;
    let sqlQuerry = `SELECT  "Docid",cust_id
	FROM public.document_customer_master where "Docid" = '${doc_id}' and cust_id = '${cust_id}'`;
    let val = await DB.ExtractQuerry(client, sqlQuerry);
    let getData = {};
    // console.log(val.rows);
    if (val.rows.length != 0) {
      let sqlQuerry = `UPDATE public.document_customer_master
        SET referid='${ref_id}'
        WHERE cust_id = ${cust_id};`;
      await DB.ExtractQuerry(client, sqlQuerry);
      getData.commnicationData = {
        Docid: doc_id,
      };
      getData.statusvalue = true;
      return getData;
    } else {
      throw new Error("There is no Data for this cust_id");
    }
  } catch (err) {
    throw new Error("Error occured during insertion of ref_id");
  }
};
=======
const DB = require("../dbconnection");
const { logger } = require("../../Util/logeer");
const { getdate, randomNumberInt } = require("../../Util/util");

exports.getCommunctionById = async (req) => {
  const client = await DB.dbConnection();
  try {
    let sqlQuerry = `select * from public."document_cutomer_master _table" where cust_id=${req.custId}`;
    logger.info("querry ", sqlQuerry);
    let getCommunicationInfoData = await DB.ExtractQuerry(client, sqlQuerry);
    let getData = {};
    getData.commnicationData = getCommunicationInfoData.rows[0];
    getData.statusvalue = true;
    return getData;
  } catch (err) {
    
    logger.error("something went wrong in the getCommunicationbyID" )
    throw err;
  } finally {
    client.release();
  }
};

exports.getAllCommunctionData = async () => {
  const client = await DB.dbConnection();
  try {
    let sqlQuerry = `SELECT * FROM "public"."document_master" LIMIT 100`;
    let getCommunicationInfoData = await DB.ExtractQuerry(client, sqlQuerry);
    let getData = {};
    getData.commnicationData = getCommunicationInfoData.rows[0];
    getData.statusvalue = true;
    return getData;
  } catch (err) {
    let resultdata;
    logger.error("get the error in the getAllCommunctionData ", err);
    resultdata.statusvalue = false;
    resultData.message = "something went wrong " + err;
    return resultdata;
  } finally {
    client.release();
  }
};

exports.insertAllCommunctionData = async (req) => {
  const client = await DB.dbConnection();
  try {
    let doc_id = await randomNumberInt(3);
    let sqlQuerry = `INSERT INTO public.document_master(
            doc_id, "DocDesc", "Doctype")
            VALUES (${doc_id}, '${req.DocDesc}', '${req.Doctype}');`;
    await DB.ExtractQuerry(client, sqlQuerry);
    let getData = {};
    getData.commnicationData = {
      doc_id: doc_id,
      DocDesc: req.DocDesc,
      Doctype: req.Doctype,
    };
    getData.statusvalue = true;
    return getData;
  } catch (err) {
    let resultdata;
    logger.error("get the error in the getAllCommunctionData ", err);
    resultdata.statusvalue = false;
    resultData.message = "something went wrong " + err;
    return resultdata;
  } finally {
    client.release();
  }
};

exports.getAllDocumentCustomerMasterTable = async (filterData) => {
  const client = await DB.dbConnection();
  try {
    let req = {};
    for (const key in filterData) {
      if (filterData[key] != "") {
        console.log(filterData[key]);
        req[key] = filterData[key];
      }
    }
    let getCustInfoQuerry = `select * from public."document_cutomer_master _table" where `;

    let v = 0;
    let finaldata = "";
    for (const key in req) {
      let appenddata = "";
      console.log("the key=", key);
      if (key == "DocDate" || key == "Docname") {
        appenddata = appenddata + `"${key}"`;
        appenddata = appenddata + "=" + "" + `'${req[key]}'` + "";
        v++;
      } else if (key == "Docid") {
        appenddata = appenddata + `"${key}"`;
        appenddata = appenddata + "=" + "" + `'${req[key]}'` + "";
        v++;
      }

      if (Object.keys(req).length != v) {
        finaldata = finaldata + appenddata + " AND ";
        //    console.log(appenddata,Object.keys(req).length,v)
      } else {
        finaldata = finaldata + appenddata + "  ";
      }
    }
    console.log("final extract querry is ", getCustInfoQuerry + finaldata);

    let finalextractquerry = getCustInfoQuerry + finaldata;
    let getDocInfoData = await DB.ExtractQuerry(client, finalextractquerry);
    let getDocInfoFinalData = {};
    if (getDocInfoData.rows) {
      throw new Error("no datta dound");
    }
    getDocInfoFinalData.value = getDocInfoData.rows[0];

    logger.info("get the data from database=", getDocInfoFinalData.value);
    return getDocInfoFinalData;
  } catch (err) {
    logger.error(
      "get the error in the getAllDocumentCustomerMasterTable ",
      err
    );

    throw err;
  } finally {
    client.release();
  }
};

exports.insert_Document_Customer = async (data) => {
  const client = await DB.dbConnection();
  let id = await randomNumberInt(4)
  let timestamp = new Date();
  let getData = {};
  try {
    // console.log(`INSERT INTO public."document_cutomer_master _table"(id,
    //   "Docid", "DocDate", "DocType", cust_id, statuscode, timstamp, "DocDesc","Docname")
    //   VALUES (${id},'${data.Documents.doc_id}', '${data.Documents.doc_date}', '${data.Documents.Doctype}', ${data.customerdetail.cust_id}, '${data.Documents.doc_statuscode}',${timestamp}, '${data.Documents.Doc_Desc}', ${data.Documents.doc_name})`);
    let resultdata = await DB.ExtractQuerry(
      client,
      `INSERT INTO public."document_cutomer_master _table"(id,
        "Docid", "DocDate", "DocType", cust_id, statuscode, timstamp, "DocDesc","Docname")
        VALUES (${id},'${data.Documents.doc_id}', '${data.Documents.doc_date}', '${data.Documents.Doctype}', ${data.customerdetail.cust_id}, '${data.Documents.doc_statuscode}','${timestamp}', '${data.Documents.Doc_Desc}', '${data.Documents.doc_name}')`
    );    
    getData.value = resultdata.rows;
    getData.statusvalue = true;
    return getData;
  } catch (err) {
    throw new Error(
      "Error occured during insertion of data in document_customer_master _table"
    );
  } finally {
    client.release();
  }
};

exports.insertDocCustomerData = async (data) => {
  const client = await DB.dbConnection();
  try {
    let doc_id = data.doc_id;
    let cust_id = data.cust_id;
    let ref_id = data.ref_id;
    let sqlQuerry = `SELECT  "Docid",cust_id
	FROM public.document_customer_master where "Docid" = '${doc_id}' and cust_id = '${cust_id}'`;
    let val = await DB.ExtractQuerry(client, sqlQuerry);
    let getData = {};
    // console.log(val.rows);
    if (val.rows.length != 0) {
      let sqlQuerry = `UPDATE public.document_customer_master
        SET referid='${ref_id}'
        WHERE cust_id = ${cust_id};`;
      await DB.ExtractQuerry(client, sqlQuerry);
      getData.commnicationData = {
        Docid: doc_id,
      };
      getData.statusvalue = true;
      return getData;
    } else {
      throw new Error("There is no Data for this cust_id");
    }
  } catch (err) {
    throw new Error("Error occured during insertion of ref_id");
  }
};
>>>>>>> 4245e5ca8949567eebfb153fca4dd0a367009d09
