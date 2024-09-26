import Mailjet from 'node-mailjet';
import dayjs from 'dayjs';
const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY,
  apiSecret: process.env.MAILJET_API_SECRET
});

export const sendMailCancelOrder = async (to: string, name: string, orderNumber: string, amount: string): Promise<boolean> => {
  
  try {
     await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.FROM_EMAIL,
              Name: "Prodor Drive",
            },
            To: [
              {
                Email: to,
                Name: name || '',
              },
            ],
            TemplateID: parseInt(process.env.TEMPLATE_ID_CANCEL_ORDER as string),
            TemplateLanguage: true,
            Variables: {
              firstname: name || 'Client',
              orderNumber : orderNumber,
              amount : amount,
            },
          },
        ],
      });

    return true;
  } catch (error) {
    console.error('Erreur Mailjet:', error);
    return false;
  }
};
