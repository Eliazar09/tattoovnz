import { Link } from 'react-router-dom'
import { Instagram, Phone, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Logo central */}
        <div className="text-center mb-12">
          <p className="font-display text-7xl md:text-9xl tracking-tight text-white opacity-90 select-none">
            RAMSES TATTO
          </p>
          <div className="w-48 h-px bg-zinc-700 mx-auto mt-6 mb-8" />
          <p className="text-zinc-400 text-sm font-body max-w-md mx-auto">
            Arte permanente, experiencia única. Transformamos tu visión en arte en la piel.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Navegação */}
          <div>
            <h4 className="font-display text-lg tracking-widest text-white mb-4">NAVEGACIÓN</h4>
            <ul className="space-y-2">
              {['Inicio', 'Sobre', 'Servicios', 'Artista', 'Portafolio', 'Agendar'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-zinc-400 text-sm font-body hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="font-display text-lg tracking-widest text-white mb-4">SERVICIOS</h4>
            <ul className="space-y-2">
              {['Mandala', 'Tribal', 'Realismo', 'Blackwork', 'Cover-up'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-zinc-400 text-sm font-body hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-display text-lg tracking-widest text-white mb-4">CONTACTO</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-zinc-400 text-sm font-body">
                <MapPin size={15} className="text-zinc-500 mt-0.5 shrink-0" />
                Venezuela, Caracas
              </li>
              <li className="flex items-center gap-2.5 text-zinc-400 text-sm font-body">
                <Phone size={15} className="text-zinc-500 shrink-0" />
                +58 424-1862505
              </li>
              <li className="flex items-center gap-2.5 text-zinc-400 text-sm font-body">
                <Clock size={15} className="text-zinc-500 shrink-0" />
                Lun–Sáb: 10h a 20h
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="font-display text-lg tracking-widest text-white mb-4">SÍGUENOS</h4>
            <div className="flex gap-3 mb-4">
              <a
                href="https://www.instagram.com/ramses_tatto/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-zinc-700 rounded-lg flex items-center justify-center text-zinc-400 hover:border-white hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/584241862505"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-zinc-700 rounded-lg flex items-center justify-center text-zinc-400 hover:border-white hover:text-white transition-all"
                aria-label="WhatsApp"
              >
                <Phone size={18} />
              </a>
            </div>
            <p className="text-zinc-500 text-xs font-body">@ramses_tatto</p>
          </div>
        </div>

        {/* Divisor tribal */}
        <div className="relative flex items-center mb-8">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="px-4 font-display text-2xl text-zinc-700 tracking-widest">❖ RAMSES TATTO ❖</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-zinc-600 text-xs font-body">
          <p>© {new Date().getFullYear()} Ramses Tatto. Todos los derechos reservados.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Términos</a>
            <Link to="/agendamento" className="hover:text-zinc-400 transition-colors">Agendar</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
