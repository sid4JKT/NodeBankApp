const { EmailClient } = require("@azure/communication-email");
const { json } = require("body-parser");
const { Console } = require("console");
const fs = require("fs");
//const accountnum = payload.customerdetail.accountnum;
require("dotenv").config();
var email = __dirname + '\\' + 'config.json';
emailContent = fs.readFileSync( email);
var mail =  JSON.parse(emailContent);
var templatedata = fs.readFileSync(__dirname+'\\'+'template.json')
var template = JSON.parse(templatedata);
for(let data in template){
  body =template[data].template;
  //body =  subject[data].subject;

}
for(let key in mail){
  if(key == "welcome")
  {
    connectionstring = mail[key].connectionstring;
    templatefilename= mail[key].templatefilename;
    sender=mail[key].sender;
    subject= mail[key].subject;
  }
}
pdfAttachmentContent = fs.readFileSync(templatefilename).toString("base64");
 exports.main = async (data) =>  {
 //async function main(data){
  try {
    const format = (...args) => args.shift().replace(/%([jsd])/g, x => x === '%j' ? JSON.stringify(args.shift()) : args.shift())
var formatted = format(body, data.firstname,data.accounttype,data.accountnum)
console.log(formatted)
    var client = new EmailClient(connectionstring);
    const emailAttachments = [ {
      contentBytesBase64 : pdfAttachmentContent,
      name: "Welcome.pdf",
      attachmentType: "pdf",
    },];
    const emailMessage = {
      sender:sender,
      content: { 
        subject: subject,       
        html: formatted,        
      },
      recipients: { to: [{ email: `<${data.emailid}>` }] },
      attachments: emailAttachments,
    };
    console.log(sender)
    var response = await client.send(emailMessage);
    const messageId = response.messageId;
    if (messageId === null) {
      console.log("Message Id not found.");
      return;
    }
    let getdata = {}
    getdata.statusvalue = true
    
    return getdata
  } catch (e) {
    console.log('error',e)
    throw new Error('Error occured during sending email')
  }
}
// var data={firstname :"Sam",customerId:123,emailid:"priyanka1@jktech.com"}
// main(data)






































// const { EmailClient } = require("@azure/communication-email");
// const { json } = require("body-parser");
// const { Console } = require("console");
// const fs = require("fs");
// //const accountnum = payload.customerdetail.accountnum;
// require("dotenv").config();
// var email = __dirname + '\\' + 'config.json';
// emailContent = fs.readFileSync( email);
// var mail =  JSON.parse(emailContent);

// var templatedata = fs.readFileSync(__dirname+'\\'+'template.json')
// var template = JSON.parse(templatedata);
// // var connectionstring;
// // var templatefilename;
// // var sender;
// // var subject;
// // var body;
// for(let data in template){
//   //console.log(data);
//   body =template[data].template;
//   console.log(body)
// }
// for(let key in mail){
//   if(key == "welcome")
//   {
//     connectionstring = mail[key].connectionstring;
//     templatefilename= mail[key].templatefilename;
//     sender=mail[key].sender;
//     subject= mail[key].subject;
//   }
// }
// pdfAttachmentContent = fs.readFileSync(templatefilename).toString("base64");
// // exports.main = async (data) =>  {
//  async function main(data){
//   try {
//     console.log(data);
//     console.log(connectionstring);
//     var client = new EmailClient(connectionstring);
//        //body.replace('${firstname}',`${data.firstname}`)
//     const emailAttachments = [ {
//       contentBytesBase64 : pdfAttachmentContent,
//       name: "Welcome.pdf",
//       attachmentType: "pdf",
//     },];
//     const emailMessage = {
//       sender:sender,
//       content: { 
//         subject: subject,       
//         html: `${body}`,        
//       },
//       recipients: { to: [{ email: `<${data.emailid}>` }] },
//       attachments: emailAttachments,
//     };
//     console.log(sender)
//     var response = await client.send(emailMessage);
//     const messageId = response.messageId;
//     if (messageId === null) {
//       console.log("Message Id not found.");
//       return;
//     }
//   } catch (e) {
//     console.log('error',e)
//     throw new Error('Error occured during sending email')
//   }
// }
// var data={firstname :"Sam",customerId:123,emailid:"priyanka1@jktech.com"}
// main(data)

































// // const { EmailClient } = require("@azure/communication-email");
// // const { json } = require("body-parser");
// // const { Console } = require("console");
// // const fs = require("fs");
// // //const accountnum = payload.customerdetail.accountnum;
// // require("dotenv").config();

// // var email = __dirname + '\\' + 'config.json';
// // emailContent = fs.readFileSync(email);
// // var mail =  JSON.parse(emailContent);
// // var connectionstring;
// // var templatefilename;
// // var sender;
// // var subject;
// // var body;
// // for(let key in mail){
// //   connectionstring = mail[key].connectionstring;
// //   templatefilename= mail[key].templatefilename;
// //   sender=mail[key].sender;
// //   subject= mail[key].subject;
// //   body=mail[key].body;


// // }

// // pdfAttachmentContent = fs.readFileSync(templatefilename).toString("base64");

// // exports.main = async (connectionstring) => {
// //   try {
// //     console.log(connectionstring);
// //     var client = new EmailClient(connectionstring);
// //     const emailAttachments = [ {
// //       contentBytesBase64 : pdfAttachmentContent,
// //       name: "Welcome.pdf",
// //       attachmentType: "pdf",
// //     },];
// //     const emailMessage = {
// //       sender:sender,
// //       content: { 
// //         subject: subject,       
// //         html: body,        
// //       },
// //       recipients: { to: [{ email: `<${data}>` }] },
// //       attachments: emailAttachments,
// //     };
// //     console.log(sender)

// //     var response = await client.send(emailMessage);
// //     const messageId = response.messageId;
// //     if (messageId === null) {
// //       console.log("Message Id not found.");
// //       return;
// //     }
// //   } catch (e) {
// //     console.log('error',e)
// //     throw new Error('Error occured during sending email')
// //   }
// // }




