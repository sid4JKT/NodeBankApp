<<<<<<< HEAD

const Customertxn_Controller=require('../Controller/Customertxn_Controller');
const savingaccounttxn=require('../Controller/SavingAccountTxn_Controller');
const express= require('express');
const Router= express.Router();



//
Router.get('/customertxnhistory', Customertxn_Controller.Customertxn)
Router.post('/customertxnhistoryfilter', Customertxn_Controller.CustomerTxnHistoryByFilter)
Router.post('/getcustomerdetailbalanceinfo', Customertxn_Controller.getBalanceAndLoanAmountByFilterController)
Router.post('/createsavingaccount', savingaccounttxn.createSavingAccountController)
Router.post('/getcustomertxnbyname', Customertxn_Controller.getcCustomerTxnByNameController)

Router.post('/getcustomerloandetail', Customertxn_Controller.getLoanAmountByFilterController)


=======

const Customertxn_Controller=require('../Controller/Customertxn_Controller');
const savingaccounttxn=require('../Controller/SavingAccountTxn_Controller');
const express= require('express');
const Router= express.Router();



//
Router.get('/customertxnhistory', Customertxn_Controller.Customertxn)
Router.post('/customertxnhistoryfilter', Customertxn_Controller.CustomerTxnHistoryByFilter)
Router.post('/getcustomerdetailbalanceinfo', Customertxn_Controller.getBalanceAndLoanAmountByFilterController)
Router.post('/createsavingaccount', savingaccounttxn.createSavingAccountController)
Router.post('/getcustomertxnbyname', Customertxn_Controller.getcCustomerTxnByNameController)

Router.post('/getcustomerloandetail', Customertxn_Controller.getLoanAmountByFilterController)


>>>>>>> 4245e5ca8949567eebfb153fca4dd0a367009d09
module.exports=Router