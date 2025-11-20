export default function JobsFilterBar({ filters, onChange, statuses }) {
  function handleSearchChange(e) {
    onChange(prev => ({ ...prev, q: e.target.value }));
  }

  function handleStatusChange(e) {
    onChange(prev => ({ ...prev, status: e.target.value }));
  }

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <input
        className="input"
        placeholder="Search…"
        value={filters.q}
        onChange={handleSearchChange}
      />
      <select
        className="select"
        value={filters.status}
        onChange={handleStatusChange}
      >
        <option value="">All Statuses</option>
        {statuses.map(s => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
