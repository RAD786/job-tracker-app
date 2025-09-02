import { useEffect, useMemo, useState } from 'react';
const API = process.env.REACT_APP_API_URL;
const STATUSES = ['Saved','Applied','Interview','Offer','Rejected'];

export default function JobsPage(){
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title:'', company:'', link:'', location:'', status:'Saved', notes:'', tags:'' });
  const [filters, setFilters] = useState({ q:'', status:'' });

  async function load(){
    setLoading(true);
    const qs = new URLSearchParams();
    if (filters.q) qs.set('q', filters.q);
    if (filters.status) qs.set('status', filters.status);
    const res = await fetch(`${API}/jobs?${qs.toString()}`);
    const data = await res.json();
    setJobs(data);
    setLoading(false);
  }
  useEffect(()=>{ load(); /* eslint-disable-next-line */ }, [filters.q, filters.status]);

  async function createJob(e){
    e.preventDefault();
    const payload = { ...form, tags: form.tags ? form.tags.split(',').map(s=>s.trim()).filter(Boolean) : [] };
    const res = await fetch(`${API}/jobs`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
    if (res.ok){ setForm({ title:'', company:'', link:'', location:'', status:'Saved', notes:'', tags:'' }); load(); }
  }

  async function updateStatus(id, status){
    await fetch(`${API}/jobs/${id}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ status }) });
    load();
  }

  async function remove(id){
    if (!window.confirm('Delete this job?')) return;
    await fetch(`${API}/jobs/${id}`, { method:'DELETE' });
    load();
  }

  const columns = useMemo(()=> {
    const map = Object.fromEntries(STATUSES.map(s=>[s, []]));
    for (const j of jobs) map[j.status]?.push(j);
    return map;
  }, [jobs]);

  return (
    <div className="grid" style={{gridTemplateColumns:'1fr'}}>
      <section className="card">
        <h2 style={{marginTop:0}}>Add Job</h2>
        <form onSubmit={createJob} className="grid" style={{gridTemplateColumns:'repeat(5,1fr)'}}>
          <input className="input" placeholder="Title" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}/>
          <input className="input" placeholder="Company" value={form.company} onChange={e=>setForm(f=>({...f,company:e.target.value}))}/>
          <input className="input" placeholder="Link" value={form.link} onChange={e=>setForm(f=>({...f,link:e.target.value}))}/>
          <input className="input" placeholder="Location" value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))}/>
          <select className="select" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>
            {STATUSES.map(s=><option key={s}>{s}</option>)}
          </select>
          <input className="input" placeholder="Tags (comma separated)" value={form.tags} onChange={e=>setForm(f=>({...f,tags:e.target.value}))} />
          <textarea className="textarea" placeholder="Notes" rows={2} value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}/>
          <button className="btn" type="submit" style={{gridColumn:'span 5'}}>Add</button>
        </form>
      </section>

      <section className="card">
        <div className="header">
          <h2 style={{margin:0}}>Your Applications</h2>
          <div style={{display:'flex', gap:8}}>
            <input className="input" placeholder="Search…" value={filters.q} onChange={e=>setFilters(f=>({...f,q:e.target.value}))}/>
            <select className="select" value={filters.status} onChange={e=>setFilters(f=>({...f,status:e.target.value}))}>
              <option value="">All Statuses</option>
              {STATUSES.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {loading ? <p>Loading…</p> :
          <div className="grid" style={{gridTemplateColumns:'repeat(5,1fr)'}}>
            {STATUSES.map(status=>(
              <div className="col" key={status}>
                <h3 style={{marginTop:0}}>{status}</h3>
                <div className="grid">
                  {columns[status].map(j=>(
                    <article className="card" key={j._id}>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <div>
                          <div style={{fontWeight:600}}>{j.title}</div>
                          <div style={{fontSize:12, color:'#94a3b8'}}>{j.company} • {j.location || '—'}</div>
                        </div>
                        <select className="select" value={j.status} onChange={e=>updateStatus(j._id, e.target.value)} style={{maxWidth:140}}>
                          {STATUSES.map(s=><option key={s}>{s}</option>)}
                        </select>
                      </div>
                      {j.tags?.length ? (
                        <div style={{marginTop:8, display:'flex', gap:6, flexWrap:'wrap'}}>
                          {j.tags.map(t=><span className="badge" key={t}>{t}</span>)}
                        </div>
                      ) : null}
                      {j.notes ? <p style={{fontSize:13, color:'#cbd5e1'}}>{j.notes}</p> : null}
                      <div style={{display:'flex', gap:8, marginTop:8}}>
                        {j.link ? <a className="badge" href={j.link} target="_blank" rel="noreferrer">Job Link</a> : null}
                        <button className="badge" onClick={()=>remove(j._id)}>Delete</button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>}
      </section>
    </div>
  );
}
