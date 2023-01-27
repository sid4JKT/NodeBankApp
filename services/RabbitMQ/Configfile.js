const config = [ 
    {
    connectionname:"amqps://iyiioucf:skNHiZ9FU2rHtr53ZKRaJnN6yRbpAGjB@campbell.lmq.cloudamqp.com/iyiioucf",
    queuename:"DocGenQueue",
    Redirecturl :"https://dummy.restapiexample.com/api/v1/create",
    programname :"Consumer.js"
    },
    {
    connectionname:"amqps://iyiioucf:skNHiZ9FU2rHtr53ZKRaJnN6yRbpAGjB@campbell.lmq.cloudamqp.com/iyiioucf",
    queuename:"create_Saving_Document" ,
    Redirecturl :"",
    programname :"saving_Account_Consumer.js"
    },
    {
    connectionname:"",
    queuename:" ",
    Redirecturl :"",
    programname :" consumeQueue6.js"
    
    },
    {
    connectionname:"",
    queuename:" ",
    Redirecturl :"",
    programname :" consumeQueue7.js"
    
    }]

    module.exports = config
