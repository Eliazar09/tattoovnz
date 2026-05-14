import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotras', href: '/#sobre' },
  { label: 'Servicios', href: '/#servicos' },
  { label: 'Galería', href: '/#galeria' },
  { label: 'Contacto', href: '/#contato' },
]

export default function Navbar({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => location.pathname === href

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-10 lg:px-14 pt-4 pb-2 transition-all duration-300 ${
        scrolled ? 'pt-2' : 'pt-4'
      }`}
    >
      <div
        className={`rounded-xl px-5 py-3 flex items-center justify-between transition-all duration-300 ${
          dark
            ? 'glass-dark-solid'
            : scrolled
            ? 'glass-dark shadow-lg'
            : 'glass-dark'
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className={`font-display text-xl md:text-2xl italic tracking-tight ${dark ? 'text-white' : 'text-black'}`}
        >
          <span style={dark ? {
            background: 'linear-gradient(135deg, #E8D48B 0%, #D4AF37 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          } : {}}>
            Miami Stylls
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) =>
            l.href.startsWith('/#') ? (
              <a
                key={l.label}
                href={l.href}
                className={`text-sm font-medium font-body tracking-wide transition-all duration-200 hover:opacity-60 ${
                  dark ? 'text-white/80' : 'text-black/70'
                }`}
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.href}
                className={`text-sm font-medium font-body tracking-wide transition-all duration-200 hover:opacity-60 ${
                  dark ? 'text-white/80' : 'text-black/70'
                } ${isActive(l.href) ? 'border-b border-current pb-px' : ''}`}
              >
                {l.label}
              </Link>
            )
          )}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <Link
            to="/agendar"
            className="hidden md:flex items-center gap-1.5 text-xs font-medium font-body tracking-wider px-5 py-2 rounded-lg transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #C9A961 0%, #D4AF37 100%)',
              color: '#0A0A0A',
              boxShadow: '0 2px 10px rgba(212,175,55,0.25)',
            }}
          >
            Agenda tu cita
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden p-1.5 rounded-md ${dark ? 'text-white' : 'text-black'}`}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className={`md:hidden mt-2 rounded-xl px-5 py-4 flex flex-col gap-4 ${dark ? 'glass-dark-solid' : 'glass-dark'}`}>
          {links.map((l) =>
            l.href.startsWith('/#') ? (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium font-body tracking-wide ${dark ? 'text-white/80' : 'text-black/70'}`}
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium font-body tracking-wide ${dark ? 'text-white/80' : 'text-black/70'}`}
              >
                {l.label}
              </Link>
            )
          )}
          <Link
            to="/agendar"
            onClick={() => setOpen(false)}
            className="text-sm font-semibold font-body tracking-wider px-5 py-2.5 rounded-lg text-center"
            style={{
              background: 'linear-gradient(135deg, #C9A961 0%, #D4AF37 100%)',
              color: '#0A0A0A',
            }}
          >
            Agenda tu cita
          </Link>
        </div>
      )}
    </nav>
  )
}
