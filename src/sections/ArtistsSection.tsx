import { Instagram, MessageCircle } from 'lucide-react'
import FadeIn from '../components/FadeIn'

const WA_LINK = 'https://wa.me/584141699512?text=Hola%20Ana%2C%20me%20interesa%20agendar%20una%20cita'

const ARTIST = {
  name: 'Ana Rodriguez',
  role: 'ESPECIALISTA EN MICROPIGMENTACIÓN',
  bio: 'Apasionada por el arte de la belleza, Ana Rodriguez se especializa en micropigmentación y tratamientos estéticos exclusivos. Con años de experiencia en Maracaibo, te ayuda a realzar tu belleza natural con técnicas modernas y pigmentos premium. Cada cita es una transformación única.',
  specialties: ['Micropigmentación', 'Microblading', 'Pestañas', 'Faciales', 'Depilación', 'Cursos'],
  instagram: '@miamistylls',
  photo: '/ana.png',
}

export default function ArtistsSection() {
  return (
    <section id="artistas" className="bg-white py-16 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-body tracking-[0.3em] text-zinc-400 uppercase mb-3">La especialista</p>
          <h2 className="font-display italic text-4xl md:text-5xl lg:text-6xl mb-3">Conoce a Ana</h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
            <span style={{ color: '#D4AF37' }} className="text-base">✦</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Photo */}
            <div className="relative">
              <div
                className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] bg-zinc-100 max-h-[540px]"
                style={{ boxShadow: '0 20px 60px rgba(212,175,55,0.12)' }}
              >
                <img
                  src={ARTIST.photo}
                  alt={ARTIST.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              {/* Instagram badge */}
              <a
                href="https://www.instagram.com/miamistylls/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                }}
              >
                <Instagram size={14} style={{ color: '#D4AF37' }} />
                <span className="font-body text-xs font-semibold text-black">{ARTIST.instagram}</span>
              </a>
            </div>

            {/* Info */}
            <div>
              <p className="font-body text-xs tracking-[0.3em] text-zinc-400 uppercase mb-3">Fundadora · Miami Stylls</p>
              <h3
                className="font-display italic text-4xl md:text-5xl mb-1"
                style={{
                  background: 'linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {ARTIST.name}
              </h3>
              <p
                className="font-body text-xs tracking-[0.25em] uppercase mb-6"
                style={{ color: '#D4AF37' }}
              >
                {ARTIST.role}
              </p>
              <p className="font-body text-sm text-zinc-500 leading-relaxed mb-8">{ARTIST.bio}</p>

              <p className="font-body text-xs tracking-[0.2em] text-zinc-400 uppercase mb-3">Especialidades</p>
              <div className="flex flex-wrap gap-2 mb-10">
                {ARTIST.specialties.map(s => (
                  <span
                    key={s}
                    className="text-xs font-body font-medium px-4 py-1.5 rounded-full tracking-wider transition-all duration-300"
                    style={{
                      border: '1px solid rgba(212,175,55,0.35)',
                      color: '#B8960C',
                      background: 'rgba(212,175,55,0.06)',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-body text-sm font-semibold tracking-wider transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #C9A961 0%, #D4AF37 100%)',
                  color: '#0A0A0A',
                  boxShadow: '0 4px 18px rgba(212,175,55,0.3)',
                }}
              >
                <MessageCircle size={16} />
                Agendar con Ana
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
