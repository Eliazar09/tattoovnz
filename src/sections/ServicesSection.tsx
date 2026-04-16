import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarCheck, MessageCircle, ChevronRight } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { searchPhotos, PexelsPhoto } from '../data/pexels'

const services = [
  { name: 'Mandala', query: 'mandala tattoo' },
  { name: 'Tribal', query: 'tribal tattoo' },
  { name: 'Realismo', query: 'realistic tattoo portrait' },
  { name: 'Blackwork', query: 'blackwork tattoo' },
  { name: 'Cover-up', query: 'tattoo cover up' },
]

export default function ServicesSection() {
  const [photos, setPhotos] = useState<(PexelsPhoto | null)[]>(Array(5).fill(null))
  const [featured, setFeatured] = useState<PexelsPhoto | null>(null)

  useEffect(() => {
    services.forEach((s, i) => {
      searchPhotos(s.query, 3).then(p => {
        if (p.length > 0) {
          setPhotos(prev => {
            const next = [...prev]
            next[i] = p[0]
            return next
          })
        }
      })
    })
    searchPhotos('realistic tattoo close up', 3).then(p => {
      if (p.length > 0) setFeatured(p[Math.floor(Math.random() * p.length)])
    })
  }, [])

  return (
    <section id="servicos" className="bg-[#F8F8F8] py-14 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-body tracking-[0.3em] text-zinc-400 uppercase mb-3">Lo que hacemos</p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-wide mb-3">NUESTROS SERVICIOS</h2>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px w-12 bg-zinc-300" />
            <span className="text-zinc-400 text-lg">✦</span>
            <div className="h-px w-12 bg-zinc-300" />
          </div>
        </FadeIn>

        {/* Grid 5 services */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {services.map((s, i) => (
            <FadeIn key={s.name} delay={i * 80}>
              <Link to="/agendamento" className="gallery-item group relative rounded-xl overflow-hidden cursor-pointer aspect-square bg-zinc-200 block w-40 md:w-48 lg:w-52">
                {photos[i] ? (
                  <img
                    src={photos[i]!.src.medium}
                    alt={s.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-200 animate-pulse" />
                )}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="text-white font-body text-xs font-semibold tracking-wider">{s.name.toUpperCase()}</span>
                </div>
                <div className="overlay absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2 p-3">
                  <span className="text-white font-display text-xl tracking-wider">{s.name}</span>
                  <span className="text-white/70 font-body text-xs tracking-widest border border-white/30 px-3 py-1 rounded-full">Agendar</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* CTA strip */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 py-6 border-y border-zinc-200">
            <Link
              to="/agendamento"
              className="flex items-center gap-2 bg-black text-white px-7 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-zinc-800 transition-colors w-full sm:w-auto justify-center"
            >
              <CalendarCheck size={16} />
              AGENDAR CITA
            </Link>
            <a
              href="https://wa.me/584241862505?text=Hola!%20Me%20gustar%C3%ADa%20solicitar%20un%20presupuesto%20para%20un%20tatuaje."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-black text-black px-7 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-black hover:text-white transition-all w-full sm:w-auto justify-center"
            >
              <MessageCircle size={16} />
              SOLICITAR PRESUPUESTO
            </a>
          </div>
        </FadeIn>

        {/* Featured – Realistic */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="h-72 lg:h-96 bg-zinc-100 overflow-hidden">
              {featured ? (
                <img
                  src={featured.src.large}
                  alt="Tatuagem Realista"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-zinc-100 animate-pulse" />
              )}
            </div>
            <div className="p-6 md:p-8 lg:p-12">
              <p className="text-xs font-body tracking-[0.3em] text-zinc-400 uppercase mb-3">Destacado</p>
              <h3 className="font-display text-4xl md:text-5xl tracking-wide mb-4">
                TATUAJES REALISTAS
              </h3>
              <p className="text-zinc-500 font-body text-sm leading-relaxed mb-6">
                Nuestra especialidad. Transformamos fotografías e ideas en obras de arte permanentes en la piel con impresionante fidelidad de detalles, texturas y sombreados.
              </p>
              <p className="text-zinc-500 font-body text-sm leading-relaxed mb-8">
                Cada trazo es ejecutado cuidadosamente, garantizando resultados que sorprenden y emocionan.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/agendamento"
                  className="flex items-center gap-2 bg-black text-white px-7 py-2.5 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-zinc-800 transition-all duration-300"
                >
                  <CalendarCheck size={15} />
                  AGENDAR
                </Link>
                <a
                  href="https://wa.me/584241862505?text=Hola!%20Tengo%20inter%C3%A9s%20en%20un%20tatuaje%20realista.%20%C2%BFMe%20puedes%20dar%20un%20presupuesto%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-black text-black px-7 py-2.5 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-black hover:text-white transition-all duration-300"
                >
                  <MessageCircle size={15} />
                  PRESUPUESTO
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
