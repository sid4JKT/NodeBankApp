const PDFDocument = require('pdfkit');
const fs = require('fs');
const { addListener } = require('pdfkit');
const { ClientRequest } = require('http');
const path = require('path');
const doc_name = path.join(__dirname, '..','pdfdocuments','Welcome.pdf');
// const doc_desc = {
//     name:"Malliakarjun",
//     doc

// }
 // Create a document
 exports.pdfgenernate = async(payload) =>{
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
  doc.text("Subject: Welcome to JK Tech Bank",100,240,{align:'up-left',scale:0.5});
  doc.text(`Dear: ${firstname},`,100,270,{align:'up-left',scale:0.5});
  doc.text(`Welcome to a whole new world of convenience! We are glad that you have chosen to open a credit account with Floyd Consumer Club. With a Floyd Consumer Card, you are opening yourself up to a world of convenient shopping. You also get discounts, exclusive offers and rewards.,`,100,300,{align:'up-left',scale:0.5});
  doc.text(`To give you a first taste of this exciting world, we have enclosed a gift certificate worth $50. You can use at any Floyd store and affiliated shops. You can also find attached the terms and conditions of your Floyd Consumer account. If you have questions, just call us at 3334455.,`,100,370,{align:'up-left',scale:0.5});
  doc.text(`Again, thank you and welcome. It is a pleasure to have you in the Floyd Consumer family.,`,100,440,{align:'up-left',scale:0.5});
  doc.text("Thank you",100,600,{align:'up-left',scale:0.5});

 
  

  doc
  .fontSize(25).text("Welcome to Bank", 90, 90,{align:'center'});
 

 
doc.end();
// doc.text("Date:19-01-23",70,70,{align:'right',scale:0.10})
 } 