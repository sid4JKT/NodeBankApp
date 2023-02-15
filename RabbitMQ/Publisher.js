const amqpconn = require("./baseClass");
const fs = require("fs");

let fileRead = __dirname + "\\" + "config.json";
let result = fs.readFileSync(fileRead, "utf-8"); //read config filelet 
data = JSON.parse(result);
let i=0;
var queu1 = [] 
for (let key in data) {
  connectionName = data[key].connectionname; //get the amqp connection string from config file
  redirectUrl = data[key].Redirecturl; //get the redirectUrl from config file
  queu1[i] = data[key].queuename; //get the  queueName from config file
  programName = data[key].programname; //get the consumer program name from config file
  i++
}
var Url = connectionName;
console.log(Url)
var queName = queu1[0];
// console.log(queName);

//create connection
module.exports.newpubdoc = async (payloadDetail) => {
  //  function  newpubdoc(payloadDetail){
    amqpconn.connect(Url).then(async (channel) => {
      try {
        channel.assertQueue(queName);
        channel.sendToQueue(queName, Buffer.from(JSON.stringify(payloadDetail)));
        console.log("message Published:", payloadDetail);
      } catch (err) {
        console.log(err);
      }
    });
  };
  // newpubdoc(queName)
  exports.savingDocumentPublisher = async (payloadDetail, queName) => {
    try {
      
      amqpconn.connect(Url).then(async (channel) => {
        try {
          channel.assertQueue(queName);
          channel.sendToQueue(
            queName,
            Buffer.from(JSON.stringify(payloadDetail))
            );
            console.log("message:", payloadDetail);
          } catch (err) {
            console.log(err);
           }
          });
          return "data is publish and consume";
        } catch (err) {
          logger.info("err in savingDcoumnet_publisher");
          throw err;
        }
      };
      //-----------------------------------------------
      // exports.EmiDocumentPublisher = async (payloadDetail, queName) => {
      //   try {
      //     //console.log("AK");
      //    // console.log(payloadDetail);
      //     amqpconn.connect(Url).then(async (channel) => {
      //       try {
      //         channel.assertQueue(queName);
      //         channel.sendToQueue(
      //           queName,
      //           Buffer.from(JSON.stringify(payloadDetail))
      //           );
      //           console.log("message:", payloadDetail);
      //         } catch (err) {
      //           console.log(err);
      //          }
      //         });
      //         return "data is publish and consume";
      //       } catch (err) {
      //         logger.info("err in EmiDcoumnet_publisher");
      //         throw err;
      //       }
      //     };