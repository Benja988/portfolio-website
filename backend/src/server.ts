// server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import portfolioRoutes from './routes/portfolioRoutes';
import authRoutes from './routes/authRoutes';
import { seedUser } from './seedUser'; // Adjust path if needed

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', portfolioRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  
  // if (process.env.SEED_USER === 'true') {
  //   await seedUser();
  // }
});
