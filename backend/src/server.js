import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { getSuggestedFrontendUrl } from './lib/network.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const LAN_APP_URL = getSuggestedFrontendUrl(Number(process.env.FRONTEND_PORT) || 5173);

const corsOrigins = new Set([
  FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]);
if (LAN_APP_URL) corsOrigins.add(LAN_APP_URL);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (corsOrigins.has(origin)) return callback(null, true);
      if (/^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+)(:\d+)?$/i.test(origin)) {
        return callback(null, true);
      }
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, HOST, () => {
  console.log(`GoalDesk API en http://localhost:${PORT}`);
  const publicUrl = process.env.PUBLIC_APP_URL?.trim();
  if (publicUrl) {
    console.log(`URL pública (QR / internet): ${publicUrl}`);
  } else if (LAN_APP_URL) {
    console.log(`Red local (misma WiFi): ${LAN_APP_URL}`);
  }
  console.log(`Health: http://localhost:${PORT}/api/health`);
  console.log(`Para internet: docs/PUBLICAR-EN-INTERNET.md`);
});
