import { useRef } from 'react'

export default function Toolbar({ onReset, onLoadSample, onPrint }) {
  return (
    <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-800/60 border border-slate-700 rounded-xl">
      <button onClick={onLoadSample} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition">Load sample</button>
      <button onClick={onReset} className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition">Clear</button>
      <button onClick={onPrint} className="ml-auto px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition">Download PDF</button>
    </div>
  )
}
