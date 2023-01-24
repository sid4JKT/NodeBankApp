const LoanAccount = require("../Controller/LoanAccount_Controller");

const express = require("express");
const Router = express.Router();

Router.post("/loanByCustomerID", LoanAccount.getLoanAccountByCustomerId);
Router.post("/loanByDateRange", LoanAccount.getLoanAccountByDateRange);
Router.post("/createLoanAccount", LoanAccount.createLoanAccount);

module.exports = Router;
