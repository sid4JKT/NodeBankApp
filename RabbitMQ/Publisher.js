
const amqpconn = require("./baseClass");

const fs = require("fs");

var Url =
  "amqps://dbjdlrml:VMXe89uO9hMIoUSPcGibJ6XirnbUFxNg@campbell.lmq.cloudamqp.com/dbjdlrml";
var queName = "DocGenQueue";

//create connection
module.exports.newpubdoc = async (payloadDetail) => {
  //  function  newpubdoc(payloadDetail){
    console.log("Anand*********************")
  console.log(payloadDetail);
  amqpconn.connect(Url).then(async (channel) => {
    try {
      channel.assertQueue(queName);
      channel.sendToQueue(queName, Buffer.from(JSON.stringify(payloadDetail)));
      console.log("message:", payloadDetail);
    } catch (err) {
      console.log(err);
    }
  });
};

// newpubdoc(queName)

exports.savingDocumentPublisher = async (payloadDetail, queName) => {
  try {
    console.log("AK");
    console.log(payloadDetail);

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

// const connectionfun = async (URL, queName, payloadDetail) => {
//  try{
//   amqp.connect(URL, (connError, connection) => {
//     if (connError) {
//       throw connError;
//     }
//     const payloadString = JSON.stringify(payloadDetail);

//     //create channel
//     connection.createChannel((channelError, channel) => {
//       if (channelError) {
//         throw channelError;
//       }

//       channel.assertQueue(queName);

//       //send message to queue
//       console.log("Que : " + queName);

//       //channel.sendToQueue(queName, Buffer.from(QueConsumer));
//       channel.sendToQueue(queName, Buffer.from(payloadString));

//       console.log(`Message published :  ${payloadString}`);
//     });
//   });
//  }catch(err)
//  {
//   logger.error("err in the amqp connection ",err)
//   throw err
//  }
// };
