import { useEffect, useMemo, useState } from 'react';
import AddProjectForm from './components/AddProjectForm';
import ProjectsFilterBar from './components/ProjectsFilterBar';
import ProjectGrid from './components/ProjectGrid';
import EditProjectModal from './components/EditProjectModal';

const API = process.env.REACT_APP_API_URL;

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [q, setQ] = useState('');
  const [techFilter, setTechFilter] = useState('');
  const [editingProject, setEditingProject] = useState(null);

  async function load() {
    const res = await fetch(`${API}/projects`);
    setProjects(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreateProject(payload) {
    const res = await fetch(`${API}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      alert('Failed to create project');
      return;
    }
    load();
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this project?')) return;
    await fetch(`${API}/projects/${id}`, { method: 'DELETE' });
    load();
  }

  function handleEdit(project) {
    setEditingProject(project);
  }

  function handleCloseModal() {
    setEditingProject(null);
  }

  async function handleSaveEdit(id, payload) {
    const res = await fetch(`${API}/projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      alert('Failed to save changes. Please try again.');
      return;
    }
    handleCloseModal();
    load();
  }

  const filtered = useMemo(
    () =>
      projects.filter(p => {
        const matchesQ = q
          ? p.title?.toLowerCase().includes(q.toLowerCase()) ||
            p.summary?.toLowerCase().includes(q.toLowerCase())
          : true;
        const matchesTech = techFilter
          ? p.tech?.map(t => t.toLowerCase()).includes(techFilter.toLowerCase())
          : true;
        return matchesQ && matchesTech;
      }),
    [projects, q, techFilter]
  );

  const allTech = useMemo(() => {
    const set = new Set();
    projects.forEach(p => p.tech?.forEach(t => set.add(t)));
    return Array.from(set);
  }, [projects]);

  return (
    <div className="grid" style={{ gridTemplateColumns: '1fr' }}>
      <section className="card">
        <h2 style={{ marginTop: 0 }}>Add Project</h2>
        <AddProjectForm onCreate={handleCreateProject} />
      </section>

      <section className="card">
        <div className="header">
          <h2 style={{ margin: 0 }}>Projects</h2>
          <ProjectsFilterBar
            q={q}
            techFilter={techFilter}
            allTech={allTech}
            onChangeQuery={setQ}
            onChangeTechFilter={setTechFilter}
          />
        </div>

        <ProjectGrid
          projects={filtered}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </section>

      <EditProjectModal
        project={editingProject}
        onClose={handleCloseModal}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
