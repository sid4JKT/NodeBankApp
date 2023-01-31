const PDFDocument = require('pdfkit');
const fs = require('fs');
const { addListener } = require('pdfkit');
const { ClientRequest } = require('http');
const path = require('path');
const doc_name = path.join(__dirname, '..','pdfdocuments','Thank You.pdf');


 // Create a document
 exports.SavingsPDF = async(payload) =>{
console.log('line 13')
const date = payload.Documents.doc_date;
const firstname = payload.customerdetail.firstname;
const lastname = payload.customerdetail.lastname ;
const address1 = payload.customerdetail.address1;
const address2 = payload.customerdetail.address2;
const phone = payload.customerdetail.phone;
const dob = payload.customerdetail.dob;
const maritalstatus = payload.customerdetail.maritalstatus;
const zipcode = payload.customerdetail.zipcode;
const city = payload.customerdetail.city;
const state = payload.customerdetail.state;
const country = payload.customerdetail.country;
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
  doc.text("Subject: Thanks for choosing JKT Bank",100,240,{align:'up-left',scale:0.5});
  doc.text(`Dear: ${firstname},`,100,270,{align:'up-left',scale:0.5});
  doc.text(`Thank you for choosing (Bank Name). We value the trust and confidence you have placed in us and offer you a host of financial service, privileges and benefits.`,100,290,{align:'up-left',scale:0.5});
  doc.text(`It has always been our endeavor to ensure a rewarding experience by providing superior services. Bank accounts provide the convenience of banking on the internet and enjoy 24 hrs easy accesses to your accounts through the largest ATM network located in all major cities of (Country Name).`,100,330,{align:'up-left',scale:0.5});
  doc.text(`Once again we thank you for your patronage and look forward to mutually beneficial relationship.`,100,400,{align:'up-left',scale:0.5});
  doc.text("Thank you",100,500,{align:'up-left',scale:0.5});

 
  

  doc
  .fontSize(25).text("Welcome to savings acount", 90, 90,{align:'center'});
 

 
doc.end();
// doc.text("Date:19-01-23",70,70,{align:'right',scale:0.10})
 } 