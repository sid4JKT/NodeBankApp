const PDFDocument = require('pdfkit');
const fs = require('fs');
const { addListener } = require('pdfkit');
const { ClientRequest } = require('http');
const path = require('path');
const doc_name = path.join(__dirname, '..','pdfdocuments','savingaccount.pdf');


 // Create a document
 exports.SavingsPDF = async(payload) =>{

const date = payload.Documents.doc_date;
const firstname = payload.customerdetail.firstname;
const address1 = payload.customerdetail.address1;
const zipcode = payload.customerdetail.zipcode;
const state = payload.customerdetail.state;
const accountnum = payload.customerdetail.accountnum;
const accounttype = payload.customerdetail.AccountType;
const doc = new PDFDocument();

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage

doc.pipe(fs.createWriteStream(doc_name));

  doc.image('pdf\\images\\JKTech.png',50,50,{scale:0.10})
  doc.text(`Date:${date}`,70,70,{align:'right',scale:0.10})
  //doc.text("To,",100,150,{align:'left'})
  doc.text(`First Name: ${firstname}`,100,170,{align:'up-left',scale:0.5});
  doc.text(`Address:${address1}`,100,190,{align:'up-left',scale:0.5});
  doc.text(`State:${state},Zipcode:${zipcode}`,100,210,{align:'up-left',scale:0.5});
  doc.text(`Accountnum:${accountnum},Accounttype:${accounttype}`,100,230,{align:'up-left',scale:0.5});
  doc.text("Subject: Thanks for choosing JKT Bank",100,260,{align:'up-left',scale:0.5});
  doc.text(`Dear: ${firstname},`,100,290,{align:'up-left',scale:0.5});
  doc.text(`Thank you for choosing (JKTech Bank). We value the trust and confidence you have placed in us and offer you a host of financial service, privileges and benefits.`,100,320,{align:'up-left',scale:0.5});
  doc.text(`It has always been our endeavor to ensure a rewarding experience by providing superior services. Bank accounts provide the convenience of banking on the internet and enjoy 24 hrs easy accesses to your accounts through the largest ATM network located in all major cities of (Country Name).`,100,360,{align:'up-left',scale:0.5});
  doc.text(`Once again we thank you for your patronage and look forward to mutually beneficial relationship.`,100,430,{align:'up-left',scale:0.5});
  doc.text("Thank you",100,500,{align:'up-left',scale:0.5});
  //doc.text(`Accountnum:${accountnum}`,100,520,{align:'up-left',scale:0.5});
  //doc.text(`Accounttype:${accounttype}`,100,550,{align:'up-left',scale:0.5});  

  doc
  .fontSize(20).text("Welcome to Savings Account", 90, 90,{align:'center'});
 
doc.end();
// doc.text("Date:19-01-23",70,70,{align:'right',scale:0.10})
let getdata = {}
getdata.statusvalue = true
return getdata
 } 