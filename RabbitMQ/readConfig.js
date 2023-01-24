// var express = require('express');
// var router = express.Router();
// var amqp = require('amqplib'); // importing amqplib 
var fs = require('fs');
var execFile = require("child_process").fork;  //importing child_process to execute another file simultaneously



function readConfig ()  {

    try {
        let fileRead = __dirname+'\\'+'config.json';
        let result = fs.readFileSync(fileRead,'utf-8')  //read config file
        let data = JSON.parse(result);

        for (let key in data) {
            
            connectionName = data[key].connectionname; //get the amqp connection string from config file
            redirectUrl = data[key].Redirecturl; //get the redirectUrl from config file
            queueName = data[key].queuename; //get the  queueName from config file
            programName = data[key].programname; //get the consumer program name from config file 

            let myqueue = [connectionName,redirectUrl,queueName,programName];

            fileExecute(programName,myqueue) //calling fileExecute function to execute file from 
                                                 //each object of config file 

        }

    }
    catch (error) {
        console.log(error);
        
    }

};


readConfig();

async function fileExecute  (executefile,myqueue) {

    var fileloc = __dirname+ '\\'+ executefile ; // adding the directory path for file name
    console.log(fileloc,"file location to be executed");

    var child =  execFile( fileloc,[myqueue]);
    
};

// router.get('exit',(req,res)=>{
//     var pid = req.pid;
//     baseClass.processExit(pid);
// })


