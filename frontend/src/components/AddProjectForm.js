import { useState } from 'react';

const INITIAL = {
  title: '',
  summary: '',
  tech: '',
  repoUrl: '',
  liveUrl: '',
  image: '',
  highlight: false,
};

export default function AddProjectForm({ onCreate }) {
  const [form, setForm] = useState(INITIAL);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      tech: form.tech
        ? form.tech.split(',').map(s => s.trim()).filter(Boolean)
        : [],
      highlight: !!form.highlight,
    };
    await onCreate(payload);
    setForm(INITIAL);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid"
      style={{ gridTemplateColumns: 'repeat(3,1fr)' }}
    >
      <input
        className="input"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        className="input"
        name="tech"
        placeholder="Tech (comma: React,Node,…)"
        value={form.tech}
        onChange={handleChange}
      />
      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          type="checkbox"
          name="highlight"
          checked={form.highlight}
          onChange={handleChange}
        />
        Highlight
      </label>
      <input
        className="input"
        name="repoUrl"
        placeholder="Repo URL"
        value={form.repoUrl}
        onChange={handleChange}
      />
      <input
        className="input"
        name="liveUrl"
        placeholder="Live URL"
        value={form.liveUrl}
        onChange={handleChange}
      />
      <input
        className="input"
        name="image"
        placeholder="Image URL (optional)"
        value={form.image}
        onChange={handleChange}
      />
      <textarea
        className="textarea"
        name="summary"
        placeholder="Summary"
        rows={2}
        value={form.summary}
        onChange={handleChange}
      />
        <button
        className="btn"
        type="submit"
        style={{
            gridColumn: 'span 5',
            background: 'green',
            color: 'white',
            border: 'solid',
            padding: '8px 12px',
            borderRadius: '8px',
            cursor: 'pointer'
        }}
        >
        Add
        </button>
    </form>
  );
}
