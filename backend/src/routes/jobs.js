// routes/jobs.js
import { Router } from 'express';
import Job from '../models/Job.js';

const router = Router();

// GET all jobs with filters + search
router.get('/', async (req, res) => {
  try {
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
  } catch (err) {
    console.error('GET jobs error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// CREATE job
router.post('/', async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    console.error('POST job error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE job (PATCH = partial update)
router.patch('/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(job);
  } catch (err) {
    console.error('PATCH job error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE job
router.delete('/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error('DELETE job error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
