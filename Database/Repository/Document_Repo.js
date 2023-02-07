const DB = require("../dbconnection");
const { logger } = require("../../Util/logeer");

exports.getDocument = async () => {
  const client = await DB.dbConnection();
  try {
    let getdata = {};
    let resultdata = await DB.ExtractQuerry(
      client,
      "SELECT * from document_master"
    );
    if (resultdata.rows.length > 0) {
      getdata.value = resultdata.rows;
    } else {
      throw new Error("no data found");
    }
    console.log("the data is ", resultdata.rows);
    getdata.statusvalue = true;
    return getdata;
  } catch (err) {
    logger.error("get the error in the getDocument ", err);
    throw err;
  } finally {
    client.release();
  }
};
//document_repo
exports.getdocumentbyId = async (data,client) => { 
 
  
  try {
    let getDocumentbyidquery;
    if (data != "") {
      getDocumentbyidquery = `select * from document_master where doc_id = '${data}'`;      
    } else {
      throw (err = "Fill Id");
    }
    let getdata = {};
    let resultdata = await DB.ExtractQuerry(client, getDocumentbyidquery);
    if (resultdata.rows.length > 0) {
      getdata.value = resultdata.rows;
    } else {
      throw new Error("no data found");
    }
    console.log("the data is ", resultdata.rows);
    getdata.statusvalue = true;
    // console.log("pavan");
    // console.log(getdata);
    return getdata;
  } catch (err) {
    logger.error("error in the getdocumentbyId ", err);
    throw err;
  } finally {
    // client.release();
  }
};

exports.getDocumentMasterbyfilter = async (filterData) => {
  const client = await DB.dbConnection();
  try {
    let req = {};
    for (const key in filterData) {
      if (filterData[key] != "") {
        console.log("key", filterData[key]);
        req[key] = filterData[key];
      }
    }
    let getDocumentinfoquery = `select * from document_master where `;

    let v = 0;
    let finaldata = "";
    for (const key in req) {
      let appenddata = "";
      console.log("the key=", key);
      if (key == "doc_date" || key == "doc_name") {
        appenddata = appenddata + `"${key}"`;
        appenddata = appenddata + "=" + "" + `'${req[key]}'` + "";
        v++;
      } else if (key == "doc_id") {
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
    console.log("final extract querry is ", getDocumentinfoquery + finaldata);

    let finalextractquerry = getDocumentinfoquery + finaldata;
    let getDocInfoData = await DB.ExtractQuerry(client, finalextractquerry);
    let getDocInfoFinalData = {};
    if (getDocInfoData.rows.length > 0) {
      getDocInfoFinalData.value = getDocInfoData.rows;
    } else {
      throw new Error("no data found");
    }
    getDocInfoFinalData.statusvalue = true;

    logger.info("get the data from database=", getDocInfoFinalData.value);
    return getDocInfoFinalData;
  } catch (err) {
    logger.error("error in the getDocumentMasterbyfilter ", err);
    throw err;
  } finally {
    client.release();
  }
};

exports.addDocument = async (data) => {
  console.log("the data type is", typeof data);
  const client = await DB.dbConnection();
  try {
    let resultdata = {};
    let add = await Add_Document_Master(data);
    let val = await DB.ExtractQuerry(client, add);
    // if (val.rows.length < 1) {
    //   throw new Error("no data found");
    // }
    resultdata.value = resultdata.rows;
    resultdata.statusvalue = true;
    return resultdata;
  } catch (err) {
    logger.error("error in the addDocument ", err);
    throw err;
  } finally {
    client.release();
  }
};

async function getdate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + dd + "-" + mm;
  return today;
}

async function Add_Document_Master(data) {
  try {
    let doc_date = await getdate();
    let addDoc = `INSERT INTO public.document_master( doc_id, doc_name,  "Doc_Desc", doc_date, "Doctype", doc_statuscode, doc_template)
  values('${data.doc_id}', '${data.doc_name}', '${data.Doc_Desc}', '${doc_date}', '${data.Doctype}', '${data.doc_statuscode}', '${data.doc_template}')`;
    //console.log('Just getting the query : ' + addDoc)
    return addDoc;
  } catch (err) {
    logger.info("error while adding document", err);
  }
}

exports.updateDocument_master = async (data) => {
  console.log("the data type is", typeof data);
  const client = await DB.dbConnection();
  try {
    let resultdata = {};
    let selectQuery = `Select * from document_master where doc_id='${data.doc_id}'`;
    let beforeUpdate = await DB.ExtractQuerry(client, selectQuery);
    let update = await updateDocument_master_Data(data);
    await DB.ExtractQuerry(client, update);
    resultdata.statusvalue = true;
    resultdata.Newvalue = {
      doc_name: data.doc_name,
      Doc_Desc: data.Doc_Desc,
      doc_date: data.doc_date,
      Doctype: data.Doctype,
      doc_statuscode: data.doc_statuscode,
      doc_template: data.doc_template,
    };
    resultdata.Oldvalue = beforeUpdate.rows;
    return resultdata;
  } catch (err) {
    logger.error("error in the addDocument ", err);
    throw err;
  } finally {
    client.release();
  }
};

async function updateDocument_master_Data(data) {
  try {
    let UpdateDoc = `UPDATE public.document_master
  SET  doc_name='${data.doc_name}', "Doc_Desc"='${data.Doc_Desc}', doc_date='${data.doc_date}', "Doctype"='${data.Doctype}', doc_statuscode='${data.doc_statuscode}', doc_template='${data.doc_template}'
  WHERE  doc_id='${data.doc_id}'`;
    console.log("Just getting the query : " + UpdateDoc);
    return UpdateDoc;
  } catch (err) {
    logger.error("error while updating document", err);
  }
}

exports.delete_DocumentBy_Id = async (data) => {
  const client = await DB.dbConnection();
  try {
    let DeleteDocumentbyidquery = `Delete from document_master where doc_id = '${data.doc_id}'`;
    let selectQuery = `select * from document_master`;
    let resultdata = await DB.ExtractQuerry(client, DeleteDocumentbyidquery);
    let afterDelete = await DB.ExtractQuerry(client, selectQuery);
    //console.log("the data is ", resultdata.rows);
    let getdata = {};
    getdata.statusvalue = true;
    getdata.deleted = afterDelete.rows;
    return getdata;
  } catch (err) {
    logger.error("error in the addDocument ", err);
    throw err;
  } finally {
    client.release();
  }
};

exports.getDetailIdbydesc = async (val, client) => {
  console.log("AKKK");
  console.log(val);
  // const client = await DB.dbConnection();
  try {
    let getDocumentbyidquery;
    {
      getDocumentbyidquery = `SELECT listdtlvalue FROM listdatadetail where "listCode" = '${val}'`;
    }
    let resultdata = await DB.ExtractQuerry(client, getDocumentbyidquery);

    console.log("the data is ", resultdata.rows);
    if (resultdata.rows < 0) {
      return new Error("not getting data from listdatadetail with id ", val);
    }
    let getdata = {};
    getdata.value = resultdata.rows;
    getdata.statusvalue = true;
    
    return getdata.value[2].listdtlvalue;
  } catch (err) {
    let resultdata = {};
    // logger.error("in the documentrepo by Id",err);

    resultdata.statusvalue = false;
    resultdata.message = "something Went Wrong ";
    throw err;
  } finally {
    // client.release();
  }
};
// exports.getDetailIdbydescription = async (val) => {
//   const client = await DB.dbConnection();
//   try {
//     let getDocumentbyidquery;
//     {
//       getDocumentbyidquery = `select doc_id from document_master where Doc_Desc = '${val}'`;
//     }
//     let resultdata = await DB.ExtractQuerry(client, getDocumentbyidquery);
//     console.log("the data is ", resultdata.rows);
//     let getdata = {};
//     getdata.value = resultdata.rows;
//     getdata.statusvalue = true;
//     return getdata;
//   } catch (err) {
//     let resultdata = {};
//     console.log(err, "in the documentrepo by Id");
//     resultdata.statusvalue = false;
//     resultdata.message = "something Went Wrong ";
//     return resultdata;
//   } finally {
//     client.release();
//   }
// };

exports.getDocumentMasterbyRapidfilter = async (filterData) => {
  const client = await DB.dbConnection();
  try {
    let req = {};
    for (const key in filterData) {
      if (filterData[key] != "") {
        console.log("key", filterData[key]);
        req[key] = filterData[key];
      }
    }
    let getDocumentinfoquery = `select * from document_master where `;

    let v = 0;
    let finaldata = "";
    for (const key in req) {
      let appenddata = "";
      console.log("the key=", key);
      if (key == "doc_date") {
        appenddata = appenddata + `"${key}"`;
        appenddata = appenddata + "=" + "" + `'${req[key]}'` + "";
        v++;
      } else if (key == "doc_id") {
        appenddata = appenddata + `"${key}"`;
        appenddata = appenddata + "=" + "" + `'${req[key]}'` + "";
        v++;
      } else if(key == "doc_name") {
        appenddata = appenddata + `"${key}"`;
        appenddata = appenddata + " ILIKE" + " " + `'${req[key]}%'` + "";
        v++;
      }

      logger.info("Document_Repo -> getDocumentMasterbyRapidfilter -> appenddata Value : " + appenddata)

      if (Object.keys(req).length != v) {
        finaldata = finaldata + appenddata + " AND ";
        //    console.log(appenddata,Object.keys(req).length,v)
      } else {
        finaldata = finaldata + appenddata + "  ";
      }
    }
    logger.info("Document_Repo -> getDocumentMasterbyRapidfilter -> final extract querry is ", getDocumentinfoquery + finaldata);

    let finalextractquerry = getDocumentinfoquery + finaldata;
    let getDocInfoData = await DB.ExtractQuerry(client, finalextractquerry);
    let getDocInfoFinalData = {};
    if (getDocInfoData.rows.length > 0) {
      getDocInfoFinalData.value = getDocInfoData.rows;
    } else {
      throw new Error("no data found");
    }
    getDocInfoFinalData.statusvalue = true;

    logger.info("get the data from database=", getDocInfoFinalData.value);
    return getDocInfoFinalData;
  } catch (err) {
    logger.error("error in the getDocumentMasterbyfilter ", err);
    throw err;
  } finally {
    client.release();
  }
};

exports.getDocumentCustomerMasterbyfilter = async (filterData) => {
  const client = await DB.dbConnection();
  try {
    let req = {};
    for (const key in filterData) {
      if (filterData[key] != "") {
        console.log("key", filterData[key]);
        req[key] = filterData[key];
      }
    }
    let getDocumentinfoquery = `select * from public."document_cutomer_master _table" where `;

    let v = 0;
    let finaldata = "";
    for (const key in req) {
      let appenddata = "";
      console.log("the key=", key);
      if (key == "cust_id" || key == "Docname") {
        appenddata = appenddata + `"${key}"`;
        appenddata = appenddata + "=" + "" + `'${req[key]}'` + "";
        v++;
      }

      logger.info("Document_Repo -> getDocumentCustomerMasterbyfilter -> appenddata Value : " + appenddata)

      if (Object.keys(req).length != v) {
        finaldata = finaldata + appenddata + " AND ";
      } else {
        finaldata = finaldata + appenddata + "  ";
      }
    }
    logger.info("Document_Repo -> getDocumentCustomerMasterbyfilter -> final extract querry is ", getDocumentinfoquery + finaldata);

    let finalextractquerry = getDocumentinfoquery + finaldata;
    let getDocInfoData = await DB.ExtractQuerry(client, finalextractquerry);
    let getDocInfoFinalData = {};
    if (getDocInfoData.rows.length > 0) {
      getDocInfoFinalData.value = getDocInfoData.rows;
    } else {
      throw new Error("no data found");
    }
    getDocInfoFinalData.statusvalue = true;

    logger.info("get the data from database=", getDocInfoFinalData.value);
    return getDocInfoFinalData;
  } catch (err) {
    logger.error("error in the getDocumentMasterbyfilter ", err);
    throw err;
  } finally {
    client.release();
  }
};

exports.getDocumentCustomerMasterbyRapidfilter = async (filterData) => {
  const client = await DB.dbConnection();
  try {
    let req = {};
    for (const key in filterData) {
      if (filterData[key] != "") {
        console.log("key", filterData[key]);
        req[key] = filterData[key];
      }
    }
    let getDocumentinfoquery = `select * from public."document_cutomer_master _table" where `;

    let v = 0;
    let finaldata = "";
    for (const key in req) {
      let appenddata = "";
      console.log("the key=", key);
      if (key == "cust_id") {
        appenddata = appenddata + `"${key}"`;
        appenddata = appenddata + "=" + "" + `'${req[key]}'` + "";
        v++;
      } else if(key == "Docname") {
        appenddata = appenddata + `"${key}"`;
        appenddata = appenddata + " ILIKE" + " " + `'${req[key]}%'` + "";
        v++;
      }

      logger.info("Document_Repo -> getDocumentCustomerMasterbyRapidfilter -> appenddata Value : " + appenddata)

      if (Object.keys(req).length != v) {
        finaldata = finaldata + appenddata + " AND ";
      } else {
        finaldata = finaldata + appenddata + "  ";
      }
    }
    logger.info("Document_Repo -> getDocumentCustomerMasterbyRapidfilter -> final extract querry is ", getDocumentinfoquery + finaldata);

    let finalextractquerry = getDocumentinfoquery + finaldata;
    let getDocInfoData = await DB.ExtractQuerry(client, finalextractquerry);
    let getDocInfoFinalData = {};
    if (getDocInfoData.rows.length > 0) {
      getDocInfoFinalData.value = getDocInfoData.rows;
    } else {
      throw new Error("no data found");
    }
    getDocInfoFinalData.statusvalue = true;

    logger.info("get the data from database=", getDocInfoFinalData.value);
    return getDocInfoFinalData;
  } catch (err) {
    logger.error("error in the getDocumentMasterbyfilter ", err);
    throw err;
  } finally {
    client.release();
  }
};
