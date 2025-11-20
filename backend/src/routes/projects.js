// routes/projects.js
import { Router } from 'express';
import Project from '../models/Project.js';

const router = Router();

// GET all projects
router.get('/', async (_req, res) => {
  try {
    const projects = await Project.find().sort({
      highlight: -1,
      createdAt: -1
    });
    res.json(projects);
  } catch (err) {
    console.error('GET projects error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// CREATE project
router.post('/', async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    console.error('POST project error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE project
router.patch('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(project);
  } catch (err) {
    console.error('PATCH project error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error('DELETE project error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
