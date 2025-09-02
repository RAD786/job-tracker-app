import { Router } from 'express';
import Project from '../models/Project.js';
const router = Router();

router.get('/', async (_req, res) => {
  const projects = await Project.find().sort({ highlight: -1, createdAt: -1 });
  res.json(projects);
});

router.post('/', async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
});

router.patch('/:id', async (req, res) => {
  const p = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
