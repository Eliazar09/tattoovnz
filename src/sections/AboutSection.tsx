import { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import CountUp from '../components/CountUp'
import { searchPhotos, PexelsPhoto } from '../data/pexels'

const perks = [
  'Más de 10 años de experiencia',
  'Tintas importadas y esterilizadas',
  'Ambiente 100% higienizado',
  'Atención personalizada',
]

const stats = [
  { end: 5000, prefix: '+', suffix: '', label: 'Tattoos' },
  { end: 2000, prefix: '+', suffix: '', label: 'Clientes' },
  { end: 10, prefix: '', suffix: '+', label: 'Años' },
  { end: 15, prefix: '', suffix: '', label: 'Premios' },
]

export default function AboutSection() {
  const [photo, setPhoto] = useState<PexelsPhoto | null>(null)

  useEffect(() => {
    searchPhotos('tattoo artist working studio', 5).then(photos => {
      if (photos.length > 0) setPhoto(photos[0])
    })
  }, [])

  return (
    <section id="sobre" className="bg-white py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section title */}
        <FadeIn className="text-center mb-16">
          <p className="text-xs font-body tracking-[0.3em] text-zinc-400 uppercase mb-3">Nuestra Historia</p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-wide mb-3">SOBRE NOSOTROS</h2>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px w-12 bg-zinc-300" />
            <span className="text-zinc-400 text-lg">✦</span>
            <div className="h-px w-12 bg-zinc-300" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left – Image */}
          <FadeIn direction="left" className="relative">
            <div className="relative inline-block w-full">
              <div
                className="rounded-2xl overflow-hidden shadow-2xl"
                style={{ transform: 'rotate(-2deg)' }}
              >
                {photo ? (
                  <img
                    src={photo.src.large}
                    alt={photo.alt || 'Estudio Ramses Tatto'}
                    className="w-full h-[480px] object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-[480px] bg-zinc-100 flex items-center justify-center">
                    <span className="font-display text-6xl text-zinc-300">RAMSES TATTO</span>
                  </div>
                )}
              </div>
              {/* Signature overlay */}
              <div
                className="absolute -bottom-4 -right-4 bg-black text-white px-5 py-3 rounded-xl shadow-xl"
                style={{ transform: 'rotate(2deg)' }}
              >
                <p className="font-display text-2xl tracking-wider">Est. 2014</p>
              </div>
            </div>
          </FadeIn>

          {/* Right – Text */}
          <FadeIn direction="right" delay={200}>
            <p className="font-body text-xs tracking-[0.3em] text-zinc-400 uppercase mb-3">Quiénes somos</p>
            <h3 className="font-display text-3xl md:text-4xl tracking-wide mb-5">
              PERFECCIÓN QUE ES ETERNA
            </h3>
            <p className="text-zinc-500 font-body text-base leading-relaxed mb-4">
              Ramses Tatto nació de la pasión por el arte y el deseo de crear tatuajes que van más allá del simple diseño — son historias grabadas en la piel para siempre.
            </p>
            <p className="text-zinc-500 font-body text-base leading-relaxed mb-6">
              Con un artista altamente cualificado y un ambiente sofisticado, ofrecemos una experiencia única y personalizada para cada cliente. Cada tatuaje es una obra de arte exclusiva, creada con dedicación y precisión.
            </p>

            {/* Perks */}
            <ul className="space-y-3 mb-8">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3 font-body text-sm text-zinc-700">
                  <CheckCircle size={17} className="text-black shrink-0" />
                  {p}
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 pt-6 border-t border-zinc-100">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-3xl md:text-4xl text-black leading-none">
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
