export default function ResumePreview({ data }) {
  const s = (arr) => (arr && arr.length ? arr : [])

  return (
    <div id="resume" className="bg-white text-slate-900 rounded-xl shadow-xl overflow-hidden print:shadow-none print:rounded-none">
      <div className="p-8 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-white">
        <h1 className="text-3xl font-bold">{data.name || 'Your Name'}</h1>
        <p className="text-slate-600">{data.title || 'Job Title'}</p>
        <div className="mt-2 text-sm text-slate-600 space-x-3">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>• {data.phone}</span>}
          {data.location && <span>• {data.location}</span>}
        </div>
        {data.links?.length ? (
          <div className="mt-2 flex flex-wrap gap-2 text-sm text-blue-700">
            {s(data.links).map((l,i)=>(<span key={i} className="underline">{l}</span>))}
          </div>
        ) : null}
      </div>

      {data.summary && (
        <section className="p-8">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <p className="text-slate-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {data.skills?.length ? (
        <section className="px-8 pb-2">
          <h2 className="text-lg font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {s(data.skills).map((sk,i)=>(<span key={i} className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-sm">{sk}</span>))}
          </div>
        </section>
      ) : null}

      {data.experience?.length ? (
        <section className="p-8">
          <h2 className="text-lg font-semibold mb-4">Experience</h2>
          <div className="space-y-4">
            {s(data.experience).map((exp,i)=>(
              <div key={i}>
                <div className="flex justify-between">
                  <div className="font-medium">{exp.role}</div>
                  <div className="text-sm text-slate-600">{exp.period}</div>
                </div>
                <div className="text-slate-700">{exp.company}</div>
                {exp.details && (
                  <ul className="list-disc pl-6 text-slate-700 mt-2">
                    {exp.details.split('\n').map((d, idx)=> d && <li key={idx}>{d}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {data.education?.length ? (
        <section className="p-8 pt-0">
          <h2 className="text-lg font-semibold mb-4">Education</h2>
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
        </section>
      ) : null}
    </div>
  )
}
