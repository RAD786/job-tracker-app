import { useEffect, useState } from 'react';

export default function EditJobModal({ job, onClose, onSave }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (job) {
      setForm({
        ...job,
        tags: job.tags?.join(', ') || ''
      });
    }
  }, [job]);

  if (!job || !form) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { _id, createdAt, updatedAt, ...rest } = form;
    const payload = {
      ...rest,
      tags: form.tags
        ? form.tags.split(',').map(s => s.trim()).filter(Boolean)
        : []
    };
    await onSave(job._id, payload);
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
        <h2 style={{marginTop:0}}>Edit Job</h2>
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
            name="company"
            placeholder="Company"
            value={form.company || ''}
            onChange={handleChange}
          />
          <input
            className="input"
            name="link"
            placeholder="Link"
            value={form.link || ''}
            onChange={handleChange}
          />
          <input
            className="input"
            name="location"
            placeholder="Location"
            value={form.location || ''}
            onChange={handleChange}
          />
          <select
            className="select"
            name="status"
            value={form.status || 'Saved'}
            onChange={handleChange}
          >
            {['Saved','Applied','Interview','Offer','Rejected'].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <input
            className="input"
            name="tags"
            placeholder="Tags (comma separated)"
            value={form.tags || ''}
            onChange={handleChange}
          />
          <textarea
            className="textarea"
            name="notes"
            placeholder="Notes"
            rows={3}
            style={{gridColumn:'span 2'}}
            value={form.notes || ''}
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
