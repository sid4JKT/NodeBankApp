var express = require('express');
var router = express.Router();
var amqp = require('amqplib'); // importing amqplib 
var fs = require('fs');
var execFile = require("child_process").fork;  //importing child_process to execute another file simultaneously
var terminate = require('terminate');  //to terminate a process with process id
const baseClass = require('./baseClass');
const { axios } = require('axios');


var processids = [];
var processid;
var fileRead = __dirname + '\\' + 'config.json';

var data1=[];
var result1;
let i=0;

async function readConfig(consumerfile ='') {

    try {

        var result = fs.readFileSync(fileRead, 'utf-8')  //read config file
        var data = JSON.parse(result);
        
        console.log(consumerfile)
        if (consumerfile.length < 2 ) {
            var i=0;
            for (let key in data) {
                var  logfileName;
                connectionName = data[key].connectionname; //get the amqp connection string from config file
                redirectUrl = data[key].redirecturl; //get the redirectUrl from config file
                queueName = data[key].queuename; //get the  queueName from config file
                programName = data[key].programname; //get the consumer program name from config file 
                if(data[key].logfileName) // get the log file name of particular file;
                {
                    logfileName = data[key].logfileName;
                }
                else  logfileName = programName.split('.')[0]+'.log';

                result1= {connectionName:connectionName, redirectUrl:redirectUrl, queueName:queueName, programName:programName,logfileName:logfileName};
                let myqueue = [connectionName,redirectUrl,queueName,programName,logfileName]
                data1[i] = result1;
               
                fileExecute(programName, myqueue,i) //calling fileExecute function to execute file from 
                //each object of config file
               i++;

            }
            return data1;
        }
        else {

            for (let key in data) {
                
                if (data[key].programName == consumerfile) {
                    
                    connectionName = data[key].connectionname; //get the amqp connection string from config file
                    redirectUrl = data[key].redirecturl; //get the redirectUrl from config file
                    queueName = data[key].queuename; //get the  queueName from config file
                    programName = data[key].programname; //get the consumer program name from config file 
                    if(data[key].hasOwnProperty(logfileName)) // get the log file name of particular file;
                    {
                        logfileName = data[key].logfileName;
                    }
                    else  logfileName = programName+'.log';

                    console.log(queueName,"queue name");
                    
                    result1= {connectionName:connectionName, redirectUrl:redirectUrl, queueName:queueName, programName:programName,logfileName:logfileName};
                    let myqueue = [connectionName, redirectUrl, queueName, programName,logfileName];

                    data1[0] = result1;
                    

                    fileExecute(programName, myqueue,i) //calling fileExecute function to execute file from 
                    //each object of config file 
                // i++;
                }
                
            }
            return data1
        }

    }
    catch (error) {
        console.log(error);
        return error;
    }

}

  readConfig();


async function fileExecute(executefile, myqueue,i) {

    var fileloc = __dirname + '\\' + executefile; // adding the directory path for file name
    console.log(fileloc, "file location to be executed");

    
    var child = execFile(fileloc, [myqueue]);
    
    child.on('message',async(msg)=>{
        console.log(msg,"message from "+executefile);
        processid = msg  //message from child process
            // Reflect.setPrototypeOf(pid,baseClass.prcossIdClass); // converting as a class structure
            
                processids[i] = processid; //inserting into array
            
           console.log(processid,"pid from child process");
        
    });
    
};


router.get('/pids',async(req,res) => { //to get pids of child processess
    
        console.log(processids,"process ids");
        res.status(200).json({data:processids});

})

router.post('/exit',async (req, res) => {  //to terminate a process with pid as parameter
    var stoppid = req.body.pid;
 
    try {
        
        terminate(stoppid, function (err) {
            if (err) { // you will get an error if you did not supply a valid process.pid 
                console.log("Oopsy: " + err); // handle errors in your preferred way. 
                
                res.status(200).json({err:err,status:"error",Message:"something went wrong while terminating"})
            }
            else {
                console.log("done");  
                res.status(200).json({pid:stoppid,status:"terminated"});
            }
        });

    }
    catch (err) {
        res.status(500).json({err:err,status:" error"})
    }
})

router.get('/all',async(req,res)=>{ // start all consumer files
    var queues={};
    console.log("from get metthod")
    queues.data =await readConfig("")
    res.status(200).json(queues);
})

router.post('/start', async (req, res) => {   //to start a particular file with filename as parameter
    var filename = req.body.filename;
    console.log(filename,"from re-start api");
    try {
       var datavar;
       datavar = readConfig(filename) //start a particular consumer file with filename
    //    .then(async(res)=>{
    //     datavar = await axios('http://localhost:3000/readConfig/pids');
    // datavar = processids;
    //     console.log("process is started",datavar)
        res.status(200).json({datavar,status:"started",filename:filename});
    //    })
      
       
    }
    catch (err) {
        res.status(500).json(err);
    }
})

i=0
module.exports = router;





























// var express = require('express');
// var router = express.Router();
// var amqp = require('amqplib'); // importing amqplib 
// var fs = require('fs');
// var execFile = require("child_process").fork;  //importing child_process to execute another file simultaneously



// function readConfig ()  {

//     try {
//         let fileRead = __dirname+'\\'+'config.json';
//         let result = fs.readFileSync(fileRead,'utf-8')  //read config file
//         let data = JSON.parse(result);

//         for (let key in data) {
            
//             connectionName = data[key].connectionname; //get the amqp connection string from config file
//             redirectUrl = data[key].Redirecturl; //get the redirectUrl from config file
//             queueName = data[key].queuename; //get the  queueName from config file
//             programName = data[key].programname; //get the consumer program name from config file 

//             let myqueue = [connectionName,redirectUrl,queueName,programName];

//             fileExecute(programName,myqueue) //calling fileExecute function to execute file from 
//                                                  //each object of config file 

//         }

//     }
//     catch (error) {
//         console.log(error);
        
//     }

// };


// readConfig();

// async function fileExecute  (executefile,myqueue) {

//     var fileloc = __dirname+ '\\'+ executefile ; // adding the directory path for file name
//     console.log(fileloc,"file location to be executed");

//     var child =  execFile( fileloc,[myqueue]);
    
// };

// router.get('exit',(req,res)=>{
//     var pid = req.pid;
//     baseClass.processExit(pid);
// })


