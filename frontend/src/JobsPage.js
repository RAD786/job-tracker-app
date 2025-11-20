import { useEffect, useState } from 'react';
import AddJobForm from './components/AddJobForm';
import JobsFilterBar from './components/JobsFilterBar';
import JobColumns from './components/JobColumns';
import EditJobModal from './components/EditJobModal';

const API = process.env.REACT_APP_API_URL;
const STATUSES = ['Saved','Applied','Interview','Offer','Rejected'];

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ q: '', status: '' });
  const [editingJob, setEditingJob] = useState(null);

  async function load() {
    setLoading(true);
    const qs = new URLSearchParams();
    if (filters.q) qs.set('q', filters.q);
    if (filters.status) qs.set('status', filters.status);
    const res = await fetch(`${API}/jobs?${qs.toString()}`);
    const data = await res.json();
    setJobs(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [filters.q, filters.status]);

  async function handleCreateJob(payload) {
    const res = await fetch(`${API}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      await load();
    } else {
      alert('Failed to create job');
    }
  }

  async function handleUpdateStatus(id, status) {
    await fetch(`${API}/jobs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    load();
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this job?')) return;
    await fetch(`${API}/jobs/${id}`, { method: 'DELETE' });
    load();
  }

  function handleEdit(job) {
    setEditingJob(job);
  }

  function handleCloseModal() {
    setEditingJob(null);
  }

  async function handleSaveEdit(id, payload) {
    const res = await fetch(`${API}/jobs/${id}`, {
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

  return (
    <div className="grid" style={{ gridTemplateColumns: '1fr' }}>
      <section className="card">
        <h2 style={{ marginTop: 0 }}>Add Job</h2>
        <AddJobForm onCreate={handleCreateJob} />
      </section>

      <section className="card">
        <div className="header">
          <h2 style={{ margin: 0 }}>Your Applications</h2>
          <JobsFilterBar
            filters={filters}
            onChange={setFilters}
            statuses={STATUSES}
          />
        </div>

        <JobColumns
          jobs={jobs}
          statuses={STATUSES}
          loading={loading}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </section>

      <EditJobModal
        job={editingJob}
        onClose={handleCloseModal}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
