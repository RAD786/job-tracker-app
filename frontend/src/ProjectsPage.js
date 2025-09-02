import { useEffect, useMemo, useState } from 'react';
const API = process.env.REACT_APP_API_URL;

export default function ProjectsPage(){
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title:'', summary:'', tech:'', repoUrl:'', liveUrl:'', image:'', highlight:false });
  const [q, setQ] = useState('');
  const [techFilter, setTechFilter] = useState('');

  async function load(){
    const res = await fetch(`${API}/projects`);
    setProjects(await res.json());
  }
  useEffect(()=>{ load(); }, []);

  async function createProject(e){
    e.preventDefault();
    const payload = { ...form, tech: form.tech ? form.tech.split(',').map(s=>s.trim()).filter(Boolean) : [] };
    const res = await fetch(`${API}/projects`, {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)
    });
    if (res.ok){ setForm({ title:'', summary:'', tech:'', repoUrl:'', liveUrl:'', image:'', highlight:false }); load(); }
  }

  async function remove(id){
    if (!window.confirm('Delete this project?')) return;
    await fetch(`${API}/projects/${id}`, { method:'DELETE' });
    load();
  }

  const filtered = useMemo(()=> projects.filter(p=>{
    const matchesQ = q ? (p.title?.toLowerCase().includes(q.toLowerCase()) || p.summary?.toLowerCase().includes(q.toLowerCase())) : true;
    const matchesTech = techFilter ? p.tech?.map(t=>t.toLowerCase()).includes(techFilter.toLowerCase()) : true;
    return matchesQ && matchesTech;
  }), [projects, q, techFilter]);

  const allTech = useMemo(()=>{
    const set = new Set(); projects.forEach(p => p.tech?.forEach(t => set.add(t))); return Array.from(set);
  }, [projects]);

  return (
    <div className="grid" style={{gridTemplateColumns:'1fr'}}>
      <section className="card">
        <h2 style={{marginTop:0}}>Add Project</h2>
        <form onSubmit={createProject} className="grid" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
          <input className="input" placeholder="Title" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}/>
          <input className="input" placeholder="Tech (comma: React,Node,…)" value={form.tech} onChange={e=>setForm(f=>({...f,tech:e.target.value}))}/>
          <label style={{display:'flex', alignItems:'center', gap:8}}>
            <input type="checkbox" checked={form.highlight} onChange={e=>setForm(f=>({...f,highlight:e.target.checked}))}/> Highlight
          </label>
          <input className="input" placeholder="Repo URL" value={form.repoUrl} onChange={e=>setForm(f=>({...f,repoUrl:e.target.value}))}/>
          <input className="input" placeholder="Live URL" value={form.liveUrl} onChange={e=>setForm(f=>({...f,liveUrl:e.target.value}))}/>
          <input className="input" placeholder="Image URL (optional)" value={form.image} onChange={e=>setForm(f=>({...f,image:e.target.value}))}/>
          <textarea className="textarea" placeholder="Summary" rows={2} value={form.summary} onChange={e=>setForm(f=>({...f,summary:e.target.value}))}/>
          <button className="btn" type="submit" style={{gridColumn:'span 3'}}>Add</button>
        </form>
      </section>

      <section className="card">
        <div className="header">
          <h2 style={{margin:0}}>Projects</h2>
          <div style={{display:'flex', gap:8}}>
            <input className="input" placeholder="Search…" value={q} onChange={e=>setQ(e.target.value)} />
            <select className="select" value={techFilter} onChange={e=>setTechFilter(e.target.value)}>
              <option value="">All Tech</option>
              {allTech.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))'}}>
          {filtered.map(p=>(
            <article className="card" key={p._id} style={{position:'relative'}}>
              {p.highlight && <span className="badge" style={{position:'absolute', top:10, right:10}}>Highlight</span>}
              {p.image ? <img src={p.image} alt={p.title} style={{width:'100%', borderRadius:12, marginBottom:8}}/> : null}
              <h3 style={{marginTop:0}}>{p.title}</h3>
              <p style={{marginTop:4, color:'#cbd5e1'}}>{p.summary || '—'}</p>
              <div style={{display:'flex', gap:6, flexWrap:'wrap', margin:'8px 0'}}>
                {p.tech?.map(t=><span key={t} className="badge">{t}</span>)}
              </div>
              <div style={{display:'flex', gap:8}}>
                {p.liveUrl ? <a className="badge" href={p.liveUrl} target="_blank" rel="noreferrer">Live</a> : null}
                {p.repoUrl ? <a className="badge" href={p.repoUrl} target="_blank" rel="noreferrer">Repo</a> : null}
                <button className="badge" onClick={()=>remove(p._id)}>Delete</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
