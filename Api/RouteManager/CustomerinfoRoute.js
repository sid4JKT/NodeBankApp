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

module.exports=Router