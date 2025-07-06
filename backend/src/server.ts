import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import portfolioRoutes from './routes/portfolioRoutes';
import { authMiddleware } from './middleware/authMiddleware';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any);

app.use('/api', portfolioRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});