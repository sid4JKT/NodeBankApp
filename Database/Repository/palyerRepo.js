<<<<<<< HEAD
const DB = require("../dbconnection");
exports.getPalyerById = async (data) => {
  console.log("get the data in the repo==");
  const client = await DB.dbConnection();
  console.log("repooo=",client)
  let resultdata = await DB.ExtractQuerry(client, "SELECT * from players");

  console.log("the data is ", resultdata);

  return resultdata.rows;
};
=======
const DB = require("../dbconnection");
exports.getPalyerById = async (data) => {
  console.log("get the data in the repo==");
  const client = await DB.dbConnection();
  console.log("repooo=",client)
  let resultdata = await DB.ExtractQuerry(client, "SELECT * from players");

  console.log("the data is ", resultdata);

  return resultdata.rows;
};
>>>>>>> 4245e5ca8949567eebfb153fca4dd0a367009d09
