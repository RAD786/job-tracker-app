import { useMemo } from 'react';
import JobCard from './JobCard';

export default function JobColumns({
  jobs,
  statuses,
  loading,
  onUpdateStatus,
  onDelete,
  onEdit,
}) {
  const columns = useMemo(() => {
    const map = Object.fromEntries(statuses.map(s => [s, []]));
    for (const j of jobs) {
      if (map[j.status]) {
        map[j.status].push(j);
      }
    }
    return map;
  }, [jobs, statuses]);

  if (loading) {
    return <p>Loading…</p>;
  }

  return (
    <div className="grid" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
      {statuses.map(status => (
        <div className="col" key={status}>
          <h3 style={{ marginTop: 0 }}>{status}</h3>
          <div className="grid">
            {columns[status].map(job => (
              <JobCard
                key={job._id}
                job={job}
                statuses={statuses}
                onUpdateStatus={onUpdateStatus}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
