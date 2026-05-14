import { Link } from 'react-router-dom'
import { Instagram, Phone, MapPin, Clock } from 'lucide-react'

const WA_LINK = 'https://wa.me/584141699512?text=Hola%20Ana%2C%20me%20interesa%20agendar%20una%20cita'

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Logo central */}
        <div className="text-center mb-12">
          <p
            className="font-display italic text-6xl md:text-8xl select-none"
            style={{
              background: 'linear-gradient(135deg, #E8D48B 0%, #D4AF37 50%, #C9A961 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Miami Stylls
          </p>
          <div
            className="w-48 h-px mx-auto mt-6 mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
          />
          <p className="text-zinc-400 text-sm font-body max-w-md mx-auto leading-relaxed">
            Especialista en micropigmentación y belleza. Realzamos tu belleza natural en Maracaibo, Venezuela.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Navegación */}
          <div>
            <h4 className="font-display italic text-base text-[#D4AF37] mb-4 tracking-wide">Navegación</h4>
            <ul className="space-y-2">
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Nosotras', href: '/#sobre' },
                { label: 'Servicios', href: '/#servicos' },
                { label: 'Galería', href: '/#galeria' },
                { label: 'Contacto', href: '/#contato' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-zinc-400 text-sm font-body hover:text-[#D4AF37] transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-display italic text-base text-[#D4AF37] mb-4 tracking-wide">Servicios</h4>
            <ul className="space-y-2">
              {['Micropigmentación', 'Microblading', 'Microshading', 'Microlips', 'Delineado de Ojos', 'Pestañas'].map((item) => (
                <li key={item}>
                  <a href="/#servicos" className="text-zinc-400 text-sm font-body hover:text-[#D4AF37] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-display italic text-base text-[#D4AF37] mb-4 tracking-wide">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-zinc-400 text-sm font-body">
                <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: '#C9A961' }} />
                Maracaibo, Venezuela 🇻🇪
              </li>
              <li className="flex items-center gap-2.5 text-zinc-400 text-sm font-body">
                <Phone size={15} className="shrink-0" style={{ color: '#C9A961' }} />
                +58 414-1699512
              </li>
              <li className="flex items-center gap-2.5 text-zinc-400 text-sm font-body">
                <Clock size={15} className="shrink-0" style={{ color: '#C9A961' }} />
                Lun–Sáb: 9h a 18h
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h4 className="font-display italic text-base text-[#D4AF37] mb-4 tracking-wide">Síguenos</h4>
            <div className="flex gap-3 mb-4">
              <a
                href="https://www.instagram.com/miamistylls/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-zinc-400 transition-all"
                style={{ border: '1px solid #2A2A2A' }}
                onMouseOver={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#D4AF37'
                  ;(e.currentTarget as HTMLElement).style.color = '#D4AF37'
                }}
                onMouseOut={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#2A2A2A'
                  ;(e.currentTarget as HTMLElement).style.color = ''
                }}
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-zinc-400 transition-all"
                style={{ border: '1px solid #2A2A2A' }}
                onMouseOver={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#25D366'
                  ;(e.currentTarget as HTMLElement).style.color = '#25D366'
                }}
                onMouseOut={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#2A2A2A'
                  ;(e.currentTarget as HTMLElement).style.color = ''
                }}
                aria-label="WhatsApp"
              >
                <Phone size={18} />
              </a>
            </div>
            <p className="text-zinc-500 text-xs font-body">@miamistylls</p>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex items-center mb-8">
          <div className="flex-1 h-px bg-[#1A1A1A]" />
          <span
            className="px-5 font-display italic text-xl"
            style={{ color: '#2A2A2A' }}
          >
            ✦ Miami Stylls ✦
          </span>
          <div className="flex-1 h-px bg-[#1A1A1A]" />
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-zinc-600 text-xs font-body">
          <p>© {new Date().getFullYear()} Miami Stylls. Todos los derechos reservados.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Términos</a>
            <Link to="/agendar" className="hover:text-[#D4AF37] transition-colors">Agendar</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
