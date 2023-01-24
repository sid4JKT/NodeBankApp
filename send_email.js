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
        subject: "Welcome to Azure Communication Service Email.",
        plainText:
          "<This email message is sent from Azure Communication Service Email using JS SDK.>",
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




