<<<<<<< HEAD
const Repoplayer=require('../Database/Repository/palyerRepo');

exports.getPlayer=async (data)=>{
   const getdata= await Repoplayer.getPalyerById(data)
   console.log("service",getdata)
  return (getdata)
=======
const Repoplayer=require('../Database/Repository/palyerRepo');

exports.getPlayer=async (data)=>{
   const getdata= await Repoplayer.getPalyerById(data)
   console.log("service",getdata)
  return (getdata)
>>>>>>> 4245e5ca8949567eebfb153fca4dd0a367009d09
}