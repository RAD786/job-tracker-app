import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import jobsRouter from './routes/jobs.js';
import projectsRouter from './routes/projects.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/jobs', jobsRouter);
app.use('/api/projects', projectsRouter);
app.get('/health', (_req, res) => res.json({ ok: true }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Mongo connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`API running on :${process.env.PORT || 5000}`)
    );
  })
  .catch(console.error);
