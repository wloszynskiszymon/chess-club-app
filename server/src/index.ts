import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/authRoute';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
