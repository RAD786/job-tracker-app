export default function ProjectCard({ project, onDelete, onEdit }) {
  return (
    <article
      className="card"
      style={{ position: 'relative', cursor: 'pointer' }}
      onClick={() => onEdit(project)}
    >
      {project.highlight && (
        <span
          className="badge"
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          Highlight
        </span>
      )}
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          style={{ width: '100%', borderRadius: 12, marginBottom: 8 }}
        />
      ) : null}
      <h3 style={{ marginTop: 0 }}>{project.title}</h3>
      <p style={{ marginTop: 4, color: '#cbd5e1' }}>
        {project.summary || '—'}
      </p>
      <div
        style={{
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          margin: '8px 0',
        }}
      >
        {project.tech?.map(t => (
          <span key={t} className="badge">
            {t}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {project.liveUrl ? (
          <a
            className="badge"
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
          >
            Live
          </a>
        ) : null}
        {project.repoUrl ? (
          <a
            className="badge"
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
          >
            Repo
          </a>
        ) : null}

        <button
        onClick={e => {
            e.stopPropagation();
            onDelete(project._id);
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
