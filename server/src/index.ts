import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/authRoute';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute';
import clubRouter from './routes/clubRoute';
import tournamentRouter from './routes/tournamentRoute';

const app = express();
const port = 3000;

const frontendUrl = process.env.FRONTEND_URL;

if (!frontendUrl) {
  console.warn('Warning: FRONTEND_URL is not set. Using default local URLs.');
}

const corsOptions = {
  origin:
    process.env.production === 'true'
      ? frontendUrl
      : ['http://localhost:4173', 'http://127.0.0.1:4173', `${frontendUrl}`],
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  preflightContinue: false,
  exposedHeaders: ['X-Auth-Token'],
  maxAge: 86400,
};

app.use(cors(corsOptions));
app.use(express.json());
app.set('trust proxy', true);
app.use(cookieParser());

// Routes
app.use('/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/club', clubRouter);
app.use('/api/tournament', tournamentRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
