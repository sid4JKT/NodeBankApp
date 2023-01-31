const { EmailClient } = require("@azure/communication-email");
const fs = require("fs");
require("dotenv").config();

const connectionString =
  "<endpoint=https://academycommunicationservice.communication.azure.com/;accesskey=l0U4Y55CbJwk9dmjl3gCXzJP1JL101ok5mbpSHE5GdWk03EMUAu8ObGQBElnp8g9B/q3KvrRwnghcgmfwGV2uw==>";

exports.main = async (data) => {
  try {
    var client = new EmailClient(connectionString);
    const emailMessage = {
      sender: "<DoNotReply@22bbbda0-b834-4959-b9bc-7b7d88aaad76.azurecomm.net>",
      content: {
        subject: "Welcome to JKT Bank",       
        html: "<html><body>Dear Customer, <br> <br> Welcome to JKT Bank and thank you for choosing us. <br><br> We are pleased to inform you that your account has been created and your Account Number is xxxxxxxxx. <br><br> If you require further details on your account, please contact us at any of the telephone numbers given below. Our customer service representatives will be glad to assist you. <br><br> We value your relationship with us and assure you of our best services always. <br><br> Best Regards <br><h4> JKT Bank </h4>This is a computer generated letter hence does not require any signature. </body></html>",        
      },
      recipients: { to: [{ email: `<${data}>` }] },
    };
    var response = await client.send(emailMessage);
    const messageId = response.messageId;
    if (messageId === null) {
      console.log("Message Id not found.");
      return;
    }
  } catch (e) {
    throw new Error('Error occured during sending email')
  }
}




