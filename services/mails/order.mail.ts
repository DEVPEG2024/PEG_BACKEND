import Mailjet from 'node-mailjet';
import dayjs from 'dayjs';
const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY,
  apiSecret: process.env.MAILJET_API_SECRET
});

export const sendMailNewOrder = async (to: string, name: string, orderNumber: string, qrCode: string, total: string, pickupDate: string, pickupTime: string): Promise<boolean> => {
  console.log(to, name, orderNumber, qrCode, total, pickupDate, pickupTime);
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(
    qrCode
  )}`;
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
            TemplateID: parseInt(process.env.TEMPLATE_ID_NEW_ORDER as string),
            TemplateLanguage: true,
            Variables: {
              firstname: name || 'Client',
              orderNumber : orderNumber,
              qrcode : qrCodeImageUrl,
              total : total,
              dateOrder : dayjs().format('DD/MM/YYYY'),
              pickupDate : dayjs(pickupDate).format('DD/MM/YYYY'),
              pickupTime : pickupTime,

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
