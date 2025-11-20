import { useMemo, useRef, useState } from 'react'
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
  education: []
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
  ]
}

export default function App() {
  const [data, setData] = useState(sample)
  const printableRef = useRef(null)

  const onPrint = () => {
    // Simple print to PDF using browser
    window.print()
  }

  const onReset = () => setData(empty)
  const onLoadSample = () => setData(sample)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-bold">R</div>
          <div className="font-semibold">Resume Builder</div>
          <div className="ml-auto w-full max-w-3xl"><Toolbar onReset={onReset} onLoadSample={onLoadSample} onPrint={onPrint} /></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-6">
        <section className="space-y-6">
          <div className="text-slate-300">Fill out your details. Sections update live on the right.</div>
          <ResumeForm data={data} setData={setData} />
        </section>

        <section>
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6">
            <div className="mx-auto bg-white shadow-xl rounded-lg print:shadow-none print:rounded-none" style={{ width: '816px', maxWidth: '100%' }}>
              <ResumePreview data={data} />
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
