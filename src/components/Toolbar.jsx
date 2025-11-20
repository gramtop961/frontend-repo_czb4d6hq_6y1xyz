import { useRef } from 'react'

export default function Toolbar({ onReset, onLoadSample, onPrint, onExport, onImport, theme, setTheme, accent, setAccent, visibility, setVisibility }) {
  const fileRef = useRef(null)

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      onImport(reader.result)
    }
    reader.readAsText(file)
  }

  const SectionToggle = ({ id, label }) => (
    <label className="flex items-center gap-2 text-xs text-slate-300">
      <input type="checkbox" checked={visibility[id]} onChange={e=>setVisibility(id, e.target.checked)} />
      {label}
    </label>
  )

  return (
    <div className="flex flex-col gap-3 p-3 bg-slate-800/60 border border-slate-700 rounded-xl">
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={onLoadSample} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition">Load sample</button>
        <button onClick={onReset} className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition">Clear</button>
        <button onClick={onPrint} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition">Download PDF</button>
        <button onClick={onExport} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition">Export JSON</button>
        <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={handleImport} />
        <button onClick={()=>fileRef.current?.click()} className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white transition">Import JSON</button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="text-xs text-slate-300">Theme</label>
        <select value={theme} onChange={e=>setTheme(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm">
          <option value="minimal">Minimal</option>
          <option value="corporate">Corporate</option>
          <option value="creative">Creative</option>
        </select>
        <label className="text-xs text-slate-300 ml-2">Accent</label>
        <input type="color" value={accent} onChange={e=>setAccent(e.target.value)} className="w-10 h-8 rounded-md bg-transparent" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <span className="text-xs text-slate-400">Show/Hide:</span>
        <SectionToggle id="summary" label="Summary" />
        <SectionToggle id="skills" label="Skills" />
        <SectionToggle id="links" label="Links" />
        <SectionToggle id="experience" label="Experience" />
        <SectionToggle id="education" label="Education" />
        <SectionToggle id="projects" label="Projects" />
        <SectionToggle id="certifications" label="Certifications" />
        <SectionToggle id="photo" label="Photo" />
      </div>
    </div>
  )
}
