import ProjectCard from './ProjectCard';

export default function ProjectGrid({ projects, onDelete, onEdit }) {
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))' }}
    >
      {projects.map(p => (
        <ProjectCard
          key={p._id}
          project={p}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
