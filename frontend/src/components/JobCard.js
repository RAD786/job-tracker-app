export default function JobCard({
  job,
  statuses,
  onUpdateStatus,
  onDelete,
  onEdit,
}) {
  return (
    <article
      className="card"
      onClick={() => onEdit(job)}
      style={{ cursor: 'pointer' }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ fontWeight: 600 }}>{job.title}</div>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>
            {job.company} • {job.location || '—'}
          </div>
        </div>
        <select
          className="select"
          value={job.status}
          style={{ maxWidth: 140 }}
          onClick={e => e.stopPropagation()}
          onChange={e => onUpdateStatus(job._id, e.target.value)}
        >
          {statuses.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {job.tags?.length ? (
        <div
          style={{
            marginTop: 8,
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
          }}
        >
          {job.tags.map(t => (
            <span className="badge" key={t}>
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {job.notes ? (
        <p style={{ fontSize: 13, color: '#cbd5e1' }}>{job.notes}</p>
      ) : null}

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        {job.link ? (
          <a
            className="badge"
            href={job.link}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
          >
            Job Link
          </a>
        ) : null}
        <button
        onClick={e => {
            e.stopPropagation();
            onDelete(job._id);
        }}
        style={{
            display: 'inline-block',
            padding: '2px 8px',
            borderRadius: '999px',
            fontSize: '12px',
            cursor: 'pointer',
            background: '#dc2626',
            color: 'white',
            border: '1px solid #7f1d1d'
        }}
        >
        Delete
        </button>

      </div>
    </article>
  );
}
