var pg = require('pg');
const { Pool } = require("pg");
const { logger } =require( '../Util/logeer');

var conString = process.env.ELEPHANTSQL_URL || "postgres://uzamvvin:WenZEI1JAkkAkrSJKmGTl2AD4LXDEy6U@hansken.db.elephantsql.com/uzamvvin"
let client
exports.dbConnection = async () => {
  try {
    const pool = new Pool({
      connectionString: conString,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
     client = pool.connect();
    return client;
  } catch (err) {
    logger.error(`got the err while connecting database:${err}`);
    client.release();
  }
};

exports.ExtractQuerry = async (con, queryString) => {
  try {
    console.log("querrry string=",queryString)
    let data = await con.query(queryString);
    /*logger.info(`Get the data for Querry:${queryString}}`);
    logger.info(`the Data got :${data}}`);*/
    return data;
  } catch (err) {
    logger.error(`got the err while Extracting the data from Database:${err}`);
    con.release();
    return err;
  }
};