const palyerservice=require('../../services/palyerservice')
const { logger } =require( '../../Util/logeer');

exports.getplayer= async (req,res)=>{

    console.log("get the data send to service", req.body)
   const data= await palyerservice.getPlayer(req.body)
   console.log("controller",data)
   logger.info(`Server started at http://localhost:8080}`);
   return res.status(200).send(data)



}
