<<<<<<< HEAD
var Customer=require('../Controller/Customer_Controller');
const express= require('express');
const Router= express.Router();

//Getting all customers
Router.get('/GetCustomers' , Customer.getCustomers)

//Getting Customer by id

Router.get('/GetCustomerById/:custId(\\d+)',Customer.getCustomerById)

//Adding and updating customer
Router.post('/CustomerAdd', Customer.addCustomer)

//Deleting customer
Router.post('/DeleteCustomer', Customer.deleteCustomer)

=======
var Customer=require('../Controller/Customer_Controller');
const express= require('express');
const Router= express.Router();

//Getting all customers
Router.get('/GetCustomers' , Customer.getCustomers)

//Getting Customer by id

Router.get('/GetCustomerById/:custId(\\d+)',Customer.getCustomerById)

//Adding and updating customer
Router.post('/CustomerAdd', Customer.addCustomer)

//Deleting customer
Router.post('/DeleteCustomer', Customer.deleteCustomer)

>>>>>>> 4245e5ca8949567eebfb153fca4dd0a367009d09
module.exports=Router