const express= require('express');
const Router= express.Router();
const Communication=require('../Controller/Communication_Controller')



Router.post('/getdocumentbyid',Communication.getCommunicationDataById)

Router.post('/getalldocumentbyfilter',Communication.getAllDocumentCustomerMasterTableController)

Router.get('/getalldocument',Communication.getAllCommunicationData)


module.exports=Router