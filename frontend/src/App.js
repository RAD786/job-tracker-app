import { useState } from 'react';
import JobsPage from './JobsPage';
import ProjectsPage from './ProjectsPage';
import './index.css';

export default function App() {
  const [tab, setTab] = useState('jobs');

  return (
    <div className="container">
      <header className="header">
        <h1>Hire-Me Hub</h1>
        <nav className="tabs" role="tablist" aria-label="Pages">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'jobs'}
            className={`tab ${tab === 'jobs' ? 'active' : ''}`}
            onClick={() => { console.log('tab → jobs'); setTab('jobs'); }}
          >
            Jobs
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'projects'}
            className={`tab ${tab === 'projects' ? 'active' : ''}`}
            onClick={() => { console.log('tab → projects'); setTab('projects'); }}
          >
            Projects
          </button>
        </nav>
      </header>

      {tab === 'jobs' ? <JobsPage /> : <ProjectsPage />}
    </div>
  );
}
