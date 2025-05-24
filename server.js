import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/clerkWebhooks.js';

// 1. Configuration initiale
dotenv.config({ path: '.env' });

// 2. Validation des variables critiques
const requiredEnvVars = ['MONGODB_URL', 'CLERK_SECRET_KEY'];
requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.error(`❌ ${envVar} is not defined in environment variables`);
    process.exit(1);
  }
});

// 3. Initialisation Express
const app = express();

// 4. Middlewares
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*'
}));
app.use(express.json({ limit: '10mb' }));
app.use(clerkMiddleware());

// 5. Connexion DB (avec gestion d'erreur améliorée)
let dbConnected = false;
const connectWithRetry = async () => {
  try {
    await connectDB();
    dbConnected = true;
    console.log('✅ Database connection established');
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    setTimeout(connectWithRetry, 5000);
  }
};
await connectWithRetry();

// 6. Routes
app.use("/api/clerk", clerkWebhooks);
app.get('/',(req,res)=>res.send("Api work"))

app.get('/health', (req, res) => {
  res.status(dbConnected ? 200 : 503).json({
    status: dbConnected ? 'healthy' : 'unhealthy',
    db: dbConnected ? 'connected' : 'disconnected'
  });
});

app.get('/', (req, res) => {
  res.json({
    status: 'API running',
    environment: process.env.NODE_ENV || 'development'
  });
});

// 7. Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('⚠️ Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 8. Export pour Vercel (CRUCIAL)
export default app;

// 9. Développement local (uniquement si NODE_ENV=development)
if (process.env.NODE_ENV === 'development') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Local server running on port ${PORT}`);
  });
}