import { useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import HomePage from './pages/HomePage'
import PortfolioPage from './pages/PortfolioPage'
import AgendamentoPage from './pages/AgendamentoPage'

function ScrollToHash() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [pathname, hash])
  return null
}

function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/agendamento" element={<AgendamentoPage />} />
      </Routes>

      {/* Floating action buttons */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-2">
        <a
          href="https://wa.me/584241862505?text=Hola!%20Me%20gustar%C3%ADa%20solicitar%20un%20presupuesto."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-white text-black border border-zinc-200 shadow-lg px-3 py-2 md:px-4 md:py-2.5 rounded-full font-body text-xs font-semibold tracking-wider hover:bg-zinc-50 transition-all"
        >
          <MessageCircle size={13} />
          <span className="hidden sm:inline">Presupuesto</span>
          <span className="sm:hidden">Precio</span>
        </a>
        <Link
          to="/agendamento"
          className="flex items-center gap-1.5 bg-black text-white shadow-lg px-4 py-2.5 md:px-5 md:py-3 rounded-full font-body text-xs font-bold tracking-wider hover:bg-zinc-800 transition-all"
        >
          Agendar Cita
        </Link>
      </div>
    </>
  )
}

export default App
