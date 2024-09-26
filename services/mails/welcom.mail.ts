import Mailjet from 'node-mailjet';

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY,
  apiSecret: process.env.MAILJET_API_SECRET
});

export const sendWelcomeEmail = async (to: string, name: string): Promise<boolean> => {
  try {
    const result = await mailjet
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
            TemplateID: parseInt(process.env.TEMPLATE_ID as string),
            TemplateLanguage: true,
            Subject: "Bienvenue chez Prodor Drive",
            Variables: {
              firstname: name || 'Client',
            },
          },
        ],
      });

    console.log('Réponse de Mailjet:', JSON.stringify(result.body, null, 2));
    return true;
  } catch (error) {
    console.error('Erreur Mailjet:', error);
    return false;
  }
};
