import express from 'express';
import Mailjet from 'node-mailjet';
require('dotenv').config();

const router = express.Router();

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY,
  apiSecret: process.env.MAILJET_API_SECRET
});

router.post('/send-email', async (req, res) => {
    const { to, name, orderNumber, amount } = req.body;
    if (!to || typeof to !== 'string' || to.trim() === '') {
        return res.status(400).json({
          result: false,
          message: 'Une adresse e-mail valide est requise'
        });
      }
    try {
      const result = await mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: process.env.FROM_EMAIL,
              Name: "Prodor Drive",
            },
            To: [
              {
                Email: to,
                Name: name,
              },
            ],
            TemplateID: parseInt(process.env.TEMPLATE_ID_CANCEL_ORDER as string),
            TemplateLanguage: true,

            Variables: {
                firstname: name  || '', 
                orderNumber : orderNumber,
                amount : amount
              },
          },
        ],
      });

      console.log(result.body);
      res.status(200).send('Email envoyé avec succès');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de l\'envoi de l\'email');
    }
  });

export default router;
