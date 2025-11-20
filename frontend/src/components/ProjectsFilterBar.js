export default function ProjectsFilterBar({
  q,
  techFilter,
  allTech,
  onChangeQuery,
  onChangeTechFilter,
}) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <input
        className="input"
        placeholder="Search…"
        value={q}
        onChange={e => onChangeQuery(e.target.value)}
      />
      <select
        className="select"
        value={techFilter}
        onChange={e => onChangeTechFilter(e.target.value)}
      >
        <option value="">All Tech</option>
        {allTech.map(t => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
