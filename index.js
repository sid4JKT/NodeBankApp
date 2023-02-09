const express= require('express');
const app=express();
const router= express.Router();
const bodyparser=require('body-parser')
const {dbConnection}=require('./Database/dbconnection')
const routerAccount=require('./Api/RouteManager/DepositeWithdrawRoute')
const CustomertxnRoute =require('./Api/RouteManager/CustomertxnRoute')
const Customerinfo=require('./Api/RouteManager/CustomerinfoRoute')
const LoanRoute=require('./Api/RouteManager/LaonRoute')
const Communication=require('./Api/RouteManager/CommunicationRoute')
const Documentroute=require('./Api/RouteManager/Documentroute')
const ListDataRoute = require('./Api/RouteManager/ListDataDetailRoute')
const randomfile = require('./pdf/Randomfile')

if(process.argv[2] == 'RabbitMQ'){
    const readconfig=require("./RabbitMQ/readConfig")
} 
const cors= require('cors')

app.use(bodyparser.urlencoded({
extended:true,
}))
app.use(bodyparser.json())
app.use(express.json())
app.use(cors('*'))
app.use("/TXN",routerAccount)
app.use("/doc",Documentroute)
app.use("/customer",CustomertxnRoute)
app.use("/customerinfo",Customerinfo)
app.use("/loan",LoanRoute)
app.use("/communication",Communication)
app.use('/listData',ListDataRoute)

app.listen(3100
    ,()=>{
    console.log("listen  3100")
})


module.exports=router