const amqpconn = require('./baseClass')
const axios = require('axios');
const { logger,logfiles } = require("./logger");
var result = amqpconn.extractValues(process.argv);  // arguments coming from readconfig file
//const pdfGenerate = require("../pdf/pdfgenerate")
logfiles(result[4])
//works as console.log into a log file
logger.info( `from ${result[4]} file with process Id ${process.pid} \r\n`);


//console.log(`from Consumer.js file with process Id ${process.pid} \r\n`);
amqpconn.connect(result[0]).then(async (channel) => {
    try {
        // assertQueue checks for given queue name, if it doesn't exist then it will create one.
        const check = await channel.assertQueue(result[2]);
        channel.prefetch(1);    //to get only one message at a time 
        channel.consume(result[2], (message) => {
            var receive = JSON.parse(message.content.toString());
            console.log("received Consumer : ",receive);
            //insert your logic 
            // let pdfData =  pdfGenerate.pdfgenernate(receive);
            // logger.info("Generatepdf", pdfData);
            console.log(` [x] Done  \r\n`);
            channel.ack(message);
            /* An ack(nowledgement) is sent back by the consumer to tell RabbitMQ 
            that a particular message has been received, processed and that RabbitMQ is free to delete it.*/
        })
    }
    catch (err) {
        console.log("Error :",err);
    }
})