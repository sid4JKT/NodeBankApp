// const { Router } = require("express");
const playercontroller=require('../Controller/playercontroller')
const SavingAccountTxn=require('../Controller/SavingAccountTxn_Controller');

const express= require('express');
const Router= express.Router();


// module.exports=(Router)=>{
    // console.log("hello",playercontroller.getplayer)
  Router.get('/player',playercontroller.getplayer)
  Router.get('/history',SavingAccountTxn.getTransactionHistory)


  //Saving & Register
  Router.post('/Accountwithdraw',SavingAccountTxn.withDrawInAccount)
  Router.post('/Accountdeposite',SavingAccountTxn.depositInAccount)
  Router.get("/getAllAccountType", SavingAccountTxn.getAllAccountType);
  
  module.exports=Router
// }