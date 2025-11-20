import { useEffect, useMemo, useRef, useState } from 'react'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'
import Toolbar from './components/Toolbar'

const empty = {
  name: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  skills: [],
  links: [],
  experience: [],
  education: [],
  projects: [],
  certifications: [],
  photo: ''
}

const sample = {
  name: 'Jane Doe',
  title: 'Senior Product Designer',
  email: 'jane.doe@example.com',
  phone: '(555) 555-1212',
  location: 'San Francisco, CA',
  summary: 'Human-centered designer with 8+ years leading end-to-end product design across web and mobile. Passionate about elegant systems, accessibility, and fast iteration.',
  skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'React', 'Tailwind'],
  links: ['github.com/jane', 'linkedin.com/in/jane'],
  experience: [
    { role: 'Lead Product Designer', company: 'Acme Inc.', period: '2021 — Present', details: 'Led redesign of flagship SaaS increasing activation by 18%\nPartnered with PM and Eng to ship 0->1 features\nMentored 3 designers across squads' },
    { role: 'Product Designer', company: 'Globex', period: '2018 — 2021', details: 'Owned design for mobile app used by 500k MAU\nBuilt component library adopted org-wide' }
  ],
  education: [
    { degree: 'B.S. Human-Computer Interaction', school: 'State University', period: '2014 — 2018', details: 'Magna Cum Laude' }
  ],
  projects: [
    { name: 'Design System Revamp', link: 'acme.design', period: '2023', details: 'Built scalable component library; reduced design debt by 40%' }
  ],
  certifications: [
    { name: 'NN/g UX Certification', issuer: 'Nielsen Norman Group', year: '2020' }
  ],
  photo: ''
}

const defaultUI = {
  theme: 'minimal', // minimal | corporate | creative
  accent: '#2563eb',
  visibility: {
    summary: true,
    skills: true,
    links: true,
    experience: true,
    education: true,
    projects: true,
    certifications: true,
    photo: false
  }
}

export default function App() {
  const printableRef = useRef(null)
  const [data, setData] = useState(sample)
  const [ui, setUI] = useState(defaultUI)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem('resume_builder_data')
      const storedUI = localStorage.getItem('resume_builder_ui')
      if (storedData) setData(JSON.parse(storedData))
      if (storedUI) setUI(prev => ({ ...prev, ...JSON.parse(storedUI) }))
    } catch {}
  }, [])

  // Persist to localStorage
  useEffect(() => {
    try { localStorage.setItem('resume_builder_data', JSON.stringify(data)) } catch {}
  }, [data])
  useEffect(() => {
    try { localStorage.setItem('resume_builder_ui', JSON.stringify(ui)) } catch {}
  }, [ui])

  const onPrint = () => window.print()
  const onReset = () => { setData(empty); setUI(defaultUI) }
  const onLoadSample = () => { setData(sample) }

  const onExport = () => {
    const blob = new Blob([JSON.stringify({ data, ui }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'resume.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const onImport = (json) => {
    try {
      const parsed = typeof json === 'string' ? JSON.parse(json) : json
      if (parsed.data) setData(parsed.data)
      if (parsed.ui) setUI(prev => ({ ...prev, ...parsed.ui }))
    } catch (e) {
      alert('Invalid JSON file')
    }
  }

  const setTheme = (theme) => setUI(prev => ({ ...prev, theme }))
  const setAccent = (accent) => setUI(prev => ({ ...prev, accent }))
  const setVisibility = (section, value) => setUI(prev => ({ ...prev, visibility: { ...prev.visibility, [section]: value } }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3 md:flex-row md:items-center md:gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-bold">R</div>
            <div className="font-semibold">Resume Builder</div>
          </div>
          <div className="md:ml-auto w-full"><Toolbar
            onReset={onReset}
            onLoadSample={onLoadSample}
            onPrint={onPrint}
            onExport={onExport}
            onImport={onImport}
            theme={ui.theme}
            setTheme={setTheme}
            accent={ui.accent}
            setAccent={setAccent}
            visibility={ui.visibility}
            setVisibility={setVisibility}
          /></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid xl:grid-cols-2 gap-6">
        <section className="space-y-6">
          <div className="text-slate-300">Fill out your details. Sections update live on the right. Your work is autosaved.</div>
          <ResumeForm data={data} setData={setData} ui={ui} setUI={setUI} />
        </section>

        <section>
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6">
            <div className="mx-auto bg-white shadow-xl rounded-lg print:shadow-none print:rounded-none" style={{ width: '816px', maxWidth: '100%' }}>
              <ResumePreview data={data} ui={ui} />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-slate-400">
        Built with ❤️ — Export via your browser's Print to PDF
      </footer>
    </div>
  )
}
