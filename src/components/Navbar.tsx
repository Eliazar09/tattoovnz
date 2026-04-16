import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Inicio', href: '/' },
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Servicios', href: '/#servicos' },
  { label: 'Artista', href: '/#artistas' },
  { label: 'Galeria', href: '/portfolio' },
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
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-16 pt-4 pb-2 transition-all duration-300 ${
        scrolled ? 'pt-2' : 'pt-4'
      }`}
    >
      <div
        className={`rounded-xl px-4 py-3 flex items-center justify-between transition-all duration-300 ${
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
          className={`font-display text-2xl tracking-tight ${dark ? 'text-white' : 'text-black'}`}
        >
          RAMSES TATTO
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) =>
            l.href.startsWith('/#') ? (
              <a
                key={l.label}
                href={l.href}
                className={`text-sm font-medium font-body tracking-wide transition-all duration-200 hover:opacity-60 ${
                  dark ? 'text-white' : 'text-black'
                }`}
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.href}
                className={`text-sm font-medium font-body tracking-wide transition-all duration-200 hover:opacity-60 ${
                  dark ? 'text-white' : 'text-black'
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
            to="/agendamento"
            className={`hidden md:block text-sm font-medium font-body tracking-wider px-5 py-2 rounded-lg transition-all duration-200 ${
              dark
                ? 'bg-white text-black hover:bg-zinc-200'
                : 'bg-black text-white hover:bg-zinc-800'
            }`}
          >
            Agendar
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
                className={`text-sm font-medium font-body tracking-wide ${dark ? 'text-white' : 'text-black'}`}
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium font-body tracking-wide ${dark ? 'text-white' : 'text-black'}`}
              >
                {l.label}
              </Link>
            )
          )}
          <Link
            to="/agendamento"
            onClick={() => setOpen(false)}
            className={`text-sm font-medium font-body tracking-wider px-5 py-2.5 rounded-lg text-center ${
              dark ? 'bg-white text-black' : 'bg-black text-white'
            }`}
          >
            Agendar Cita
          </Link>
        </div>
      )}
    </nav>
  )
}
