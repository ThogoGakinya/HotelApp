import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

//Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req : Request, res : Response) => {
  res.send('Server is Live');
});
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});