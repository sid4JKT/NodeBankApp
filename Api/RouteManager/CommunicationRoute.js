<<<<<<< HEAD
const express= require('express');
const Router= express.Router();
const Communication=require('../Controller/Communication_Controller')



Router.post('/getdocumentbyid',Communication.getCommunicationDataById)

Router.post('/getalldocumentbyfilter',Communication.getAllDocumentCustomerMasterTableController)

Router.get('/getalldocument',Communication.getAllCommunicationData)


=======
const express= require('express');
const Router= express.Router();
const Communication=require('../Controller/Communication_Controller')



Router.post('/getdocumentbyid',Communication.getCommunicationDataById)

Router.post('/getalldocumentbyfilter',Communication.getAllDocumentCustomerMasterTableController)

Router.get('/getalldocument',Communication.getAllCommunicationData)


>>>>>>> 4245e5ca8949567eebfb153fca4dd0a367009d09
module.exports=Router