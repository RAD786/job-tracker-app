import { useState } from 'react';

const INITIAL = {
  title: '',
  company: '',
  link: '',
  location: '',
  status: 'Saved',
  notes: '',
  tags: '',
};

const STATUSES = ['Saved','Applied','Interview','Offer','Rejected'];

export default function AddJobForm({ onCreate }) {
  const [form, setForm] = useState(INITIAL);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags
        ? form.tags.split(',').map(s => s.trim()).filter(Boolean)
        : [],
    };
    await onCreate(payload);
    setForm(INITIAL);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid"
      style={{ gridTemplateColumns: 'repeat(5,1fr)' }}
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
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
      />
      <input
        className="input"
        name="link"
        placeholder="Link"
        value={form.link}
        onChange={handleChange}
      />
      <input
        className="input"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
      />
      <select
        className="select"
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        {STATUSES.map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <input
        className="input"
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
      />
      <textarea
        className="textarea"
        name="notes"
        placeholder="Notes"
        rows={2}
        value={form.notes}
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
