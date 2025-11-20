const fieldClass = "w-full px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700 focus:border-blue-500 outline-none text-white placeholder-slate-400"
const labelClass = "text-sm text-slate-300 mb-1 block"

export default function ResumeForm({ data, setData }) {
  const update = (key, value) => setData(prev => ({ ...prev, [key]: value }))

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className={labelClass}>Full Name</label>
          <input value={data.name} onChange={e=>update('name', e.target.value)} className={fieldClass} placeholder="Jane Doe"/>
        </div>
        <div>
          <label className={labelClass}>Title</label>
          <input value={data.title} onChange={e=>update('title', e.target.value)} className={fieldClass} placeholder="Product Designer"/>
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input value={data.email} onChange={e=>update('email', e.target.value)} className={fieldClass} placeholder="jane@example.com"/>
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input value={data.phone} onChange={e=>update('phone', e.target.value)} className={fieldClass} placeholder="(555) 555-5555"/>
        </div>
        <div>
          <label className={labelClass}>Location</label>
          <input value={data.location} onChange={e=>update('location', e.target.value)} className={fieldClass} placeholder="San Francisco, CA"/>
        </div>
        <div>
          <label className={labelClass}>Photo URL (optional)</label>
          <input value={data.photo||''} onChange={e=>update('photo', e.target.value)} className={fieldClass} placeholder="https://.../avatar.jpg"/>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className={labelClass}>Summary</label>
          <textarea value={data.summary} onChange={e=>update('summary', e.target.value)} rows={8} className={fieldClass} placeholder="Brief professional summary"/>
        </div>
      </div>

      <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
        <ArrayField label="Skills (comma separated)" value={data.skills} onChange={v=>update('skills', v)} placeholder="React, Tailwind, Figma" />
        <ArrayField label="Links (comma separated)" value={data.links} onChange={v=>update('links', v)} placeholder="github.com/jane, linkedin.com/in/jane" />
      </div>

      <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
        <ListField label="Experience" value={data.experience} onChange={v=>update('experience', v)} itemTemplate={{role:'', company:'', period:'', details:''}}/>
        <ListField label="Education" value={data.education} onChange={v=>update('education', v)} itemTemplate={{degree:'', school:'', period:'', details:''}}/>
      </div>

      <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
        <ListField label="Projects" value={data.projects} onChange={v=>update('projects', v)} itemTemplate={{name:'', link:'', period:'', details:''}}/>
        <ListField label="Certifications" value={data.certifications} onChange={v=>update('certifications', v)} itemTemplate={{name:'', issuer:'', year:''}}/>
      </div>
    </div>
  )
}

function ArrayField({ label, value, onChange, placeholder }) {
  const text = (value || []).join(', ')
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        value={text}
        onChange={e=>onChange(e.target.value.split(',').map(s=>s.trim()).filter(Boolean))}
        className={fieldClass}
        placeholder={placeholder}
      />
    </div>
  )
}

function ListField({ label, value = [], onChange, itemTemplate }) {
  const add = () => onChange([...(value||[]), { ...itemTemplate }])
  const update = (i, key, val) => {
    const next = [...(value||[])]
    next[i] = { ...next[i], [key]: val }
    onChange(next)
  }
  const remove = (i) => onChange(value.filter((_,idx)=>idx!==i))

  return (
    <div>
      <div className="flex items-center mb-2">
        <label className={labelClass + ' flex-1'}>{label}</label>
        <button type="button" onClick={add} className="px-3 py-1 text-sm rounded-md bg-slate-700 hover:bg-slate-600 text-white">Add</button>
      </div>
      <div className="space-y-3">
        {(value||[]).map((item, i) => (
          <div key={i} className="p-3 rounded-lg bg-slate-800/60 border border-slate-700 space-y-2">
            {Object.keys(itemTemplate).map((k)=> (
              <input key={k} value={item[k]||''} onChange={e=>update(i, k, e.target.value)} className={fieldClass} placeholder={k.charAt(0).toUpperCase()+k.slice(1)} />
            ))}
            <button type="button" onClick={()=>remove(i)} className="text-xs text-red-300 hover:text-red-200">Remove</button>
          </div>
        ))}
      </div>
    </div>
  )
}
