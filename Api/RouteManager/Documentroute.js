<<<<<<< HEAD
const documentcontroller=require('../Controller/Document_Controller')
const Communication=require('../Controller/Communication_Controller')
const express= require('express');
const Router= express.Router();
  
  Router.post('/DocId',documentcontroller.getdocumentMasterbyId)

  Router.post('/docfilter',documentcontroller.getDocumentbyfilter)



  Router.post('/addDoc',documentcontroller.addDocumentMaster)



  Router.post('/updateDoc',documentcontroller.Update_DocumentMaster)



  Router.post('/Deletedoc',documentcontroller.DeleteDocument_Master_byId)
  //Router.post('/Docname',documentcontroller.getDocumentbyName) 

  Router.post('/createdocument',Communication.InsertIntoDocument)
  Router.get('/document',documentcontroller.getalldocuments)

=======
const documentcontroller=require('../Controller/Document_Controller')
const Communication=require('../Controller/Communication_Controller')
const express= require('express');
const Router= express.Router();
  
  Router.post('/DocId',documentcontroller.getdocumentMasterbyId)

  Router.post('/docfilter',documentcontroller.getDocumentbyfilter)



  Router.post('/addDoc',documentcontroller.addDocumentMaster)



  Router.post('/updateDoc',documentcontroller.Update_DocumentMaster)



  Router.post('/Deletedoc',documentcontroller.DeleteDocument_Master_byId)
  //Router.post('/Docname',documentcontroller.getDocumentbyName) 

  Router.post('/createdocument',Communication.InsertIntoDocument)
  Router.get('/document',documentcontroller.getalldocuments)

>>>>>>> 4245e5ca8949567eebfb153fca4dd0a367009d09
module.exports = Router;