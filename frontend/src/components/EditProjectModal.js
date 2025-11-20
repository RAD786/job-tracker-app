import { useEffect, useState } from 'react';

export default function EditProjectModal({ project, onClose, onSave }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (project) {
      setForm({
        ...project,
        tech: project.tech?.join(', ') || '',
        highlight: !!project.highlight
      });
    }
  }, [project]);

  if (!project || !form) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { _id, createdAt, updatedAt, ...rest } = form;
    const payload = {
      ...rest,
      tech: form.tech
        ? form.tech.split(',').map(s => s.trim()).filter(Boolean)
        : [],
      highlight: !!form.highlight
    };
    await onSave(project._id, payload);
  }

  return (
    <div 
      className="modal-backdrop" 
      style={{
        position:'fixed',
        inset:0,
        background:'rgba(15,23,42,0.75)',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        zIndex:50
      }}
      onClick={onClose}
    >
      <div 
        className="card" 
        style={{
          maxWidth:700,
          width:'100%',
          maxHeight:'90vh',
          overflowY:'auto'
        }}
        onClick={e => e.stopPropagation()}
      >
        <h2 style={{marginTop:0}}>Edit Project</h2>
        <form 
          onSubmit={handleSubmit} 
          className="grid" 
          style={{gridTemplateColumns:'repeat(2,1fr)', gap:12}}
        >
          <input
            className="input"
            name="title"
            placeholder="Title"
            value={form.title || ''}
            onChange={handleChange}
          />
          <input
            className="input"
            name="tech"
            placeholder="Tech (comma: React,Node,…)"
            value={form.tech || ''}
            onChange={handleChange}
          />
          <label style={{display:'flex', alignItems:'center', gap:8}}>
            <input
              type="checkbox"
              name="highlight"
              checked={!!form.highlight}
              onChange={handleChange}
            />
            Highlight
          </label>
          <input
            className="input"
            name="repoUrl"
            placeholder="Repo URL"
            value={form.repoUrl || ''}
            onChange={handleChange}
          />
          <input
            className="input"
            name="liveUrl"
            placeholder="Live URL"
            value={form.liveUrl || ''}
            onChange={handleChange}
          />
          <input
            className="input"
            name="image"
            placeholder="Image URL (optional)"
            value={form.image || ''}
            onChange={handleChange}
          />
          <textarea
            className="textarea"
            name="summary"
            placeholder="Summary"
            rows={3}
            style={{gridColumn:'span 2'}}
            value={form.summary || ''}
            onChange={handleChange}
          />
          <div 
            style={{
              gridColumn:'span 2',
              display:'flex',
              justifyContent:'flex-end',
              gap:8
            }}
          >
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
