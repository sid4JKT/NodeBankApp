<<<<<<< HEAD
const LoanAccount = require("../Controller/LoanAccount_Controller");

const express = require("express");
const Router = express.Router();

Router.post("/loanByCustomerID", LoanAccount.getLoanAccountByCustomerId);
Router.post("/loanByDateRange", LoanAccount.getLoanAccountByDateRange);
Router.post("/createLoanAccount", LoanAccount.createLoanAccount);

module.exports = Router;
=======
const LoanAccount = require("../Controller/LoanAccount_Controller");

const express = require("express");
const Router = express.Router();

Router.post("/loanByCustomerID", LoanAccount.getLoanAccountByCustomerId);
Router.post("/loanByDateRange", LoanAccount.getLoanAccountByDateRange);
Router.post("/createLoanAccount", LoanAccount.createLoanAccount);

module.exports = Router;
>>>>>>> 4245e5ca8949567eebfb153fca4dd0a367009d09
