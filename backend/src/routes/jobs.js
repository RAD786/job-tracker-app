import { Router } from 'express';
import Job from '../models/Job.js';
const router = Router();

router.get('/', async (req, res) => {
  const { status, q, tag } = req.query;
  const where = {};
  if (status) where.status = status;
  if (tag) where.tags = tag;
  if (q?.trim()) {
    const text = q.trim();
    where.$or = [
      { title: new RegExp(text, 'i') },
      { company: new RegExp(text, 'i') },
      { notes: new RegExp(text, 'i') }
    ];
  }
  const jobs = await Job.find(where).sort({ createdAt: -1 });
  res.json(jobs);
});

router.post('/', async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json(job);
});

router.patch('/:id', async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!job) return res.status(404).json({ error: 'Not found' });
  res.json(job);
});

router.delete('/:id', async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
