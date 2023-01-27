const Repoplayer=require('../Database/Repository/palyerRepo');

exports.getPlayer=async (data)=>{
   const getdata= await Repoplayer.getPalyerById(data)
   console.log("service",getdata)
  return (getdata)
}