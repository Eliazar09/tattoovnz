import { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import CountUp from '../components/CountUp'
import { searchPhotos, PexelsPhoto } from '../data/pexels'

const perks = [
  'Especialista certificada en micropigmentación',
  'Pigmentos premium importados y seguros',
  'Ambiente 100% higiénico y profesional',
  'Atención personalizada en cada cita',
]

const stats = [
  { end: 500, prefix: '+', suffix: '', label: 'Clientas' },
  { end: 3, prefix: '', suffix: '+', label: 'Años' },
  { end: 6, prefix: '', suffix: '', label: 'Servicios' },
  { end: 100, prefix: '', suffix: '%', label: 'Satisfacción' },
]

export default function AboutSection() {
  const [photo, setPhoto] = useState<PexelsPhoto | null>(null)

  useEffect(() => {
    searchPhotos('beauty salon professional makeup studio', 5).then(photos => {
      if (photos.length > 0) setPhoto(photos[Math.floor(Math.random() * Math.min(photos.length, 3))])
    })
  }, [])

  return (
    <section id="sobre" className="bg-white py-20 lg:py-32 relative overflow-hidden">
      {/* Subtle gold accent top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 40%, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section title */}
        <FadeIn className="text-center mb-16">
          <p className="text-xs font-body tracking-[0.3em] text-zinc-400 uppercase mb-3">Nuestra Historia</p>
          <h2 className="font-display italic text-4xl md:text-5xl lg:text-6xl mb-3">Sobre Nosotras</h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
            <span style={{ color: '#D4AF37' }} className="text-base">✦</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left – Image */}
          <FadeIn direction="left" className="relative">
            <div className="relative inline-block w-full">
              <div
                className="rounded-2xl overflow-hidden shadow-2xl"
                style={{ transform: 'rotate(-1.5deg)' }}
              >
                {photo ? (
                  <img
                    src={photo.src.large}
                    alt="Miami Stylls Studio"
                    className="w-full h-[460px] object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-[460px] bg-zinc-100 flex items-center justify-center">
                    <span
                      className="font-display italic text-5xl"
                      style={{ color: '#D4AF37', opacity: 0.4 }}
                    >
                      Miami Stylls
                    </span>
                  </div>
                )}
              </div>
              {/* Gold badge */}
              <div
                className="absolute -bottom-4 -right-4 px-5 py-3 rounded-xl shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #C9A961 0%, #D4AF37 100%)',
                  transform: 'rotate(1.5deg)',
                }}
              >
                <p className="font-display italic text-xl text-[#0A0A0A] tracking-wide">✨ Maracaibo</p>
              </div>
            </div>
          </FadeIn>

          {/* Right – Text */}
          <FadeIn direction="right" delay={200}>
            <p className="font-body text-xs tracking-[0.3em] text-zinc-400 uppercase mb-3">Quiénes somos</p>
            <h3 className="font-display italic text-3xl md:text-4xl mb-5">
              Belleza que transforma
            </h3>
            <p className="text-zinc-500 font-body text-base leading-relaxed mb-4">
              Miami Stylls nació de la pasión por realzar la belleza natural de cada mujer. Ana Rodriguez, nuestra especialista, combina técnica, arte y dedicación para crear resultados que emocionan.
            </p>
            <p className="text-zinc-500 font-body text-base leading-relaxed mb-6">
              Utilizamos pigmentos de primera calidad y técnicas modernas de micropigmentación para ofrecerte un look impecable, duradero y completamente personalizado.
            </p>

            {/* Perks */}
            <ul className="space-y-3 mb-8">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3 font-body text-sm text-zinc-700">
                  <CheckCircle size={17} style={{ color: '#D4AF37' }} className="shrink-0" />
                  {p}
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 pt-6 border-t border-zinc-100">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p
                    className="font-display text-3xl md:text-4xl leading-none"
                    style={{ color: '#D4AF37' }}
                  >
                    <CountUp end={s.end} prefix={s.prefix} suffix={s.suffix} />
                  </p>
                  <p className="text-zinc-400 text-xs font-body mt-1 tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
