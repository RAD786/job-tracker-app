import 'dotenv/config';
import mongoose from 'mongoose';
import Job from './models/Job.js';
import Project from './models/Project.js';

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await Job.deleteMany({});
  await Project.deleteMany({});
  await Job.insertMany([
    { title: 'Frontend Dev', company: 'Acme', status: 'Saved', location: 'Remote', tags: ['react','junior'], link: 'https://example.com' },
    { title: 'Full-Stack (MERN)', company: 'Beta Labs', status: 'Applied', location: 'Atlanta, GA', dateApplied: new Date(), tags: ['mern'] },
    { title: 'React Engineer', company: 'Gamma', status: 'Interview', location: 'Hybrid' }
  ]);
  await Project.insertMany([
    { title: 'Job Tracker App', summary: 'MERN job tracker', tech: ['Mongo','Express','React','Node'], highlight: true },
    { title: 'Pickle Ladder', summary: 'Ladder league tool', tech: ['React','Node'] }
  ]);
  console.log('Seeded.');
  await mongoose.disconnect();
};
run().catch(err => { console.error(err); process.exit(1); });
