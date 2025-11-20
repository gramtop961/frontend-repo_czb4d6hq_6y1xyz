export default function ResumePreview({ data, ui = { theme: 'minimal', accent: '#2563eb', visibility: {} } }) {
  const s = (arr) => (arr && arr.length ? arr : [])
  const accent = ui.accent || '#2563eb'
  const show = (key) => ui?.visibility?.[key] ?? true

  const Header = () => (
    <div className="p-8 border-b border-slate-200" style={{ background: ui.theme === 'creative' ? `linear-gradient(90deg, ${accent}22, transparent)` : ui.theme === 'corporate' ? '#f8fafc' : 'white' }}>
      <div className="flex items-center gap-6">
        {show('photo') && data.photo ? (
          <img src={data.photo} alt="Profile" className="w-20 h-20 rounded-full object-cover border" />
        ) : null}
        <div>
          <h1 className="text-3xl font-bold" style={{ color: ui.theme === 'creative' ? '#0f172a' : '#0f172a' }}>{data.name || 'Your Name'}</h1>
          <p className="text-slate-600">{data.title || 'Job Title'}</p>
          <div className="mt-2 text-sm text-slate-600 space-x-3">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>• {data.phone}</span>}
            {data.location && <span>• {data.location}</span>}
          </div>
          {show('links') && data.links?.length ? (
            <div className="mt-2 flex flex-wrap gap-2 text-sm" style={{ color: accent }}>
              {s(data.links).map((l,i)=>(<span key={i} className="underline">{l}</span>))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )

  const Section = ({ title, children }) => (
    <section className="p-8">
      <h2 className="text-lg font-semibold mb-2" style={{ color: accent }}>{title}</h2>
      {children}
    </section>
  )

  const ListItems = ({ items, titleKey, subtitleKey, metaKey, detailsKey }) => (
    <div className="space-y-4">
      {items.map((it,i)=>(
        <div key={i}>
          <div className="flex justify-between">
            <div className="font-medium">{it[titleKey]}</div>
            <div className="text-sm text-slate-600">{it[metaKey]}</div>
          </div>
          <div className="text-slate-700">{it[subtitleKey]}</div>
          {it[detailsKey] && (
            <ul className="list-disc pl-6 text-slate-700 mt-2">
              {it[detailsKey].split('\n').map((d, idx)=> d && <li key={idx}>{d}</li>)}
            </ul>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <div id="resume" className="bg-white text-slate-900 rounded-xl shadow-xl overflow-hidden print:shadow-none print:rounded-none">
      <Header />

      {show('summary') && data.summary && (
        <Section title="Summary">
          <p className="text-slate-700 leading-relaxed">{data.summary}</p>
        </Section>
      )}

      {show('skills') && data.skills?.length ? (
        <section className="px-8 pb-2">
          <h2 className="text-lg font-semibold mb-2" style={{ color: accent }}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {s(data.skills).map((sk,i)=>(<span key={i} className="px-2 py-1 rounded" style={{ background: `${accent}15`, color: '#0f172a', border: `1px solid ${accent}33` }}>{sk}</span>))}
          </div>
        </section>
      ) : null}

      {show('experience') && data.experience?.length ? (
        <Section title="Experience">
          <ListItems items={s(data.experience)} titleKey="role" subtitleKey="company" metaKey="period" detailsKey="details" />
        </Section>
      ) : null}

      {show('education') && data.education?.length ? (
        <Section title="Education">
          <div className="space-y-2">
            {s(data.education).map((ed,i)=>(
              <div key={i}>
                <div className="flex justify-between">
                  <div className="font-medium">{ed.degree}</div>
                  <div className="text-sm text-slate-600">{ed.period}</div>
                </div>
                <div className="text-slate-700">{ed.school}</div>
                {ed.details && (
                  <p className="text-slate-700 mt-1">{ed.details}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {show('projects') && data.projects?.length ? (
        <Section title="Projects">
          <div className="space-y-4">
            {s(data.projects).map((p,i)=> (
              <div key={i}>
                <div className="flex justify-between">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-slate-600">{p.period}</div>
                </div>
                <div className="text-slate-700">{p.link}</div>
                {p.details && <p className="text-slate-700 mt-1">{p.details}</p>}
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {show('certifications') && data.certifications?.length ? (
        <Section title="Certifications">
          <ul className="list-disc pl-6 text-slate-700">
            {s(data.certifications).map((c,i)=> (
              <li key={i}><span className="font-medium">{c.name}</span> — {c.issuer} ({c.year})</li>
            ))}
          </ul>
        </Section>
      ) : null}
    </div>
  )
}
