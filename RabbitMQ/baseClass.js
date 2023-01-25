<<<<<<< HEAD
const amqp = require('amqplib');
const fs = require('fs');



// connecting  to amqp and creates channel
module.exports.connect = async (connectionString) => {

    //connecting to amqp
    const connection = await amqp.connect(
        `${connectionString}`
    );

    // creates channel
    const channel = await connection.createChannel();
    return channel;
}


// append data into given filename
module.exports.filewrite = (filename, data) => {
    fs.appendFileSync(filename, data, 'utf8', function (err) {
        if (err) {
            console.log(err, "from " + filename);
        }
    });
}


// convertion data into array
module.exports.extractValues = (data) => {

    var temp = data.slice(2); //to remove unnecessary values from arguments received

    var result = temp[0].split(','); //spliting string value into array with ',' as delimiter

    return result;
=======
const amqp = require('amqplib');
const fs = require('fs');



// connecting  to amqp and creates channel
module.exports.connect = async (connectionString) => {

    //connecting to amqp
    const connection = await amqp.connect(
        `${connectionString}`
    );

    // creates channel
    const channel = await connection.createChannel();
    return channel;
}


// append data into given filename
module.exports.filewrite = (filename, data) => {
    fs.appendFileSync(filename, data, 'utf8', function (err) {
        if (err) {
            console.log(err, "from " + filename);
        }
    });
}


// convertion data into array
module.exports.extractValues = (data) => {

    var temp = data.slice(2); //to remove unnecessary values from arguments received

    var result = temp[0].split(','); //spliting string value into array with ',' as delimiter

    return result;
>>>>>>> 4245e5ca8949567eebfb153fca4dd0a367009d09
}