const DB = require("../dbconnection");
exports.getPalyerById = async (data) => {
  console.log("get the data in the repo==");
  const client = await DB.dbConnection();
  console.log("repooo=",client)
  let resultdata = await DB.ExtractQuerry(client, "SELECT * from players");

  console.log("the data is ", resultdata);

  return resultdata.rows;
};
