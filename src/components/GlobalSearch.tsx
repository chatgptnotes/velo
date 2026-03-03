import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const searchItems = [
  { label: 'Dashboard', path: '/dashboard', keywords: 'home overview net worth' },
  { label: 'Portfolio Holdings', path: '/portfolio', keywords: 'stocks equity mutual funds' },
  { label: 'Tax Center', path: '/tax-center', keywords: 'tax ltcg stcg 80c' },
  { label: 'Goals', path: '/goals', keywords: 'retirement children education' },
  { label: 'Risk Analysis', path: '/risk-analysis', keywords: 'risk stress test diversification' },
  { label: 'Family Portfolio', path: '/family', keywords: 'family members spouse' },
  { label: 'Insurance Gap', path: '/insurance', keywords: 'insurance life health' },
  { label: 'Loan Tracker', path: '/loans', keywords: 'loan emi mortgage' },
  { label: 'Expense Tracker', path: '/expenses', keywords: 'expense budget spending' },
  { label: 'Compare Tools', path: '/compare', keywords: 'compare funds stocks' },
  { label: 'Documents', path: '/documents', keywords: 'documents vault files' },
  { label: 'Settings', path: '/settings', keywords: 'settings profile account' },
]

export default function GlobalSearch() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = query.length > 0
    ? searchItems.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.keywords.toLowerCase().includes(query.toLowerCase())
      )
    : []

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
        setTimeout(() => inputRef.current?.focus(), 50)
      }
      if (e.key === 'Escape') { setOpen(false); setQuery('') }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => { setSelectedIdx(0) }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx(i => Math.min(i + 1, results.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIdx(i => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && results[selectedIdx]) {
      navigate(results[selectedIdx].path)
      setOpen(false); setQuery('')
    }
  }

  return (
    <>
      <button
        onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 50) }}
        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-500 hover:bg-gray-200 transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline text-xs bg-white px-1.5 py-0.5 rounded border border-gray-200 text-gray-400">Ctrl+K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center pt-[15vh]" onClick={() => { setOpen(false); setQuery('') }}>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search pages, tools..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400"
              />
              {query && <button onClick={() => setQuery('')}><X className="h-4 w-4 text-gray-400" /></button>}
            </div>
            {results.length > 0 && (
              <div className="max-h-64 overflow-y-auto py-2">
                {results.map((item, i) => (
                  <button
                    key={item.path}
                    onClick={() => { navigate(item.path); setOpen(false); setQuery('') }}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 ${i === selectedIdx ? 'bg-[#0F4C75]/5 text-[#0F4C75]' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <Search className="h-4 w-4 opacity-40" />
                    {item.label}
                  </button>
                ))}
              </div>
            )}
            {query && results.length === 0 && (
              <div className="py-8 text-center text-sm text-gray-400">No results found</div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
