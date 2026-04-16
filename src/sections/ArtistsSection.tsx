import { Link } from 'react-router-dom'
import { Instagram, CalendarCheck } from 'lucide-react'
import FadeIn from '../components/FadeIn'

const ARTIST = {
  name: 'RAMSES BERMUDEZ',
  role: 'ARTISTA DEL TATUAJE',
  bio: 'Apasionado por el arte del tatuaje, especializado en crear piezas únicas y personalizadas. Te ayudo con el tatuaje de tus sueños. Venezuela, Caracas Utilizo tu idea para crear una pieza única.',
  specialties: ['Realismo', 'Blackwork', 'Mandala', 'Tribal', 'Cover-up', 'Fineline'],
  instagram: '@ramses_tatto',
  photo: '/ramses.jpg',
}

export default function ArtistsSection() {
  return (
    <section id="artistas" className="bg-white py-14 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-body tracking-[0.3em] text-zinc-400 uppercase mb-3">El artista</p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-wide mb-3">CONOCE AL ARTISTA</h2>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px w-12 bg-zinc-300" />
            <span className="text-zinc-400 text-lg">✦</span>
            <div className="h-px w-12 bg-zinc-300" />
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] bg-zinc-100 max-h-[540px]">
                <img
                  src={ARTIST.photo}
                  alt={ARTIST.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <a
                href="https://www.instagram.com/ramses_tatto/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 glass-dark rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-black/10 transition-colors"
              >
                <Instagram size={14} className="text-black" />
                <span className="font-body text-xs font-medium text-black">{ARTIST.instagram}</span>
              </a>
            </div>

            {/* Info */}
            <div>
              <p className="font-body text-xs tracking-[0.3em] text-zinc-400 uppercase mb-4">Fundador del Estudio</p>
              <h3 className="font-display text-4xl md:text-6xl tracking-wide mb-2">{ARTIST.name}</h3>
              <p className="font-body text-xs tracking-widest text-zinc-400 uppercase mb-6">{ARTIST.role}</p>
              <p className="font-body text-sm text-zinc-600 leading-relaxed mb-8">{ARTIST.bio}</p>

              <p className="font-body text-xs tracking-[0.2em] text-zinc-400 uppercase mb-3">Especialidades</p>
              <div className="flex flex-wrap gap-2 mb-10">
                {ARTIST.specialties.map(s => (
                  <span
                    key={s}
                    className="border border-black/20 text-black text-xs font-body font-medium px-4 py-1.5 rounded-full tracking-wider"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <Link
                to="/agendamento"
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-zinc-800 transition-colors"
              >
                <CalendarCheck size={16} />
                AGENDAR CON EL ARTISTA
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
