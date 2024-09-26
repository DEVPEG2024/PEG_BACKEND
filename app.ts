import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import connectDB from './config/db';
import path from 'path';

// Routes
import AUTH_ROUTES from './routes/auth';
import CUSTOMERS_ROUTES from './routes/customers';
import UPLOAD_ROUTES from './routes/upload';
import MAILS_ROUTES from './routes/mails';
import PRODUCERS_ROUTES from './routes/producers';
import PROJECTS_ROUTES from './routes/projects';
import PRODUCTS_ROUTES from './routes/products';
import WALLETS_ROUTES from './routes/wallets';
import FORMS_ROUTES from './routes/forms';
import OFFERS_ROUTES from './routes/offers';
import TEAMS_ROUTES from './routes/teams';
import INVOICES_ROUTES from './routes/invoices';
import AUTH_USER_ROUTES from './routes/auth/user';
import TICKETS_ROUTES from './routes/tickets';
import BANNERS_ROUTES from './routes/banners';

const app = express();

// Connect to database
connectDB();
// app.set('trust proxy', true); // Ajoutez cette ligne

// Middleware
// app.use(helmet({
//   crossOriginResourcePolicy: false,
// }));
// app.use(cors({
//   origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
//   credentials: true,
// }));
app.use(cors({
    origin: '*', // Permet toutes les origines
    credentials: true,
  }));
  
app.use(morgan('combined'));
app.use(express.json({ limit: '1000kb' }));
app.use(express.urlencoded({ extended: true, limit: '1000kb' }));
app.use(compression());

// Configuration du dossier statique pour public/upload
app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')));
// Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 100, // 15 minutes
//   max: 2000, // limite chaque IP à 100 requêtes par fenêtre de 15 minutes
//   standardHeaders: true, // Retourne les infos de limite dans les headers `RateLimit-*`
//   legacyHeaders: false, // Désactive les headers `X-RateLimit-*`
// });
// app.use(limiter);
// app.use('/', (req, res, next) => {
//   res.send('Serveur OK');
//   });
// Routes
app.use('/auth', AUTH_ROUTES);
app.use('/auth/user', AUTH_USER_ROUTES);
app.use('/customers', CUSTOMERS_ROUTES);
app.use('/producers', PRODUCERS_ROUTES);
app.use('/teams', TEAMS_ROUTES);
app.use('/projects', PROJECTS_ROUTES);
app.use('/products', PRODUCTS_ROUTES);
app.use('/upload', UPLOAD_ROUTES);
app.use('/mails', MAILS_ROUTES);
app.use('/wallets', WALLETS_ROUTES);
app.use('/forms', FORMS_ROUTES);
app.use('/offers', OFFERS_ROUTES);
app.use('/invoices', INVOICES_ROUTES);
app.use('/tickets', TICKETS_ROUTES);
app.use('/banners', BANNERS_ROUTES);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send('🔥 ❌ ===> Something broke! =====> ');
});

export default app;
