import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ZoomIn, X, ChevronRight, Filter } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FadeIn from '../components/FadeIn'
import { searchPhotos, PexelsPhoto } from '../data/pexels'

const styles = ['Todos', 'Realismo', 'Blackwork', 'Tribal', 'Geométrico', 'Acuarela', 'Mandala', 'Fineline']
const bodyParts = ['Todas las Áreas', 'Brazo', 'Pierna', 'Espalda', 'Pecho', 'Cuello', 'Antebrazo']

const styleQueries: Record<string, string> = {
  Todos: 'tattoo art',
  Realismo: 'realistic tattoo portrait body',
  Blackwork: 'blackwork tattoo body',
  Tribal: 'tribal tattoo body',
  Geométrico: 'geometric tattoo body',
  Acuarela: 'watercolor tattoo colorful',
  Mandala: 'mandala tattoo',
  Fineline: 'fine line tattoo minimalist',
}

export default function PortfolioPage() {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([])
  const [activeStyle, setActiveStyle] = useState('Todos')
  const [loading, setLoading] = useState(false)
  const [lightbox, setLightbox] = useState<PexelsPhoto | null>(null)
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    setLoading(true)
    setPage(1)
    searchPhotos(styleQueries[activeStyle] || 'tattoo', 18).then(p => {
      setPhotos(p)
      setLoading(false)
    })
  }, [activeStyle])

  const loadMore = () => {
    setLoading(true)
    searchPhotos(styleQueries[activeStyle] || 'tattoo', 9).then(more => {
      setPhotos(prev => [...prev, ...more])
      setPage(p => p + 1)
      setLoading(false)
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero compacto */}
      <div className="relative h-52 md:h-80 bg-black overflow-hidden mt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="flex items-center gap-2 text-zinc-400 font-body text-xs tracking-widest mb-4">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <span className="text-white">Portafolio</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl md:text-7xl text-white tracking-wide">PORTAFOLIO COMPLETO</h1>
          <p className="text-zinc-400 font-body text-sm mt-3">Cada tatuaje cuenta una historia única</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12">
        {/* Filters */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <p className="font-body text-sm text-zinc-500">{photos.length} trabajos encontrados</p>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border border-zinc-200 px-4 py-2 rounded-lg text-sm font-body font-medium hover:bg-black hover:text-white hover:border-black transition-all"
            >
              <Filter size={14} />
              Filtros
            </button>
          </div>

          {/* Style tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {styles.map(s => (
              <button
                key={s}
                onClick={() => setActiveStyle(s)}
                className={`px-4 py-1.5 rounded-full text-xs font-body font-medium tracking-wider transition-all ${
                  activeStyle === s
                    ? 'bg-black text-white'
                    : 'border border-zinc-200 text-zinc-600 hover:border-zinc-400'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Extra filters dropdown */}
          {showFilters && (
            <FadeIn>
              <div className="p-5 bg-zinc-50 rounded-xl border border-zinc-100">
                <div>
                  <label className="block text-xs font-body tracking-widest text-zinc-400 uppercase mb-2">Parte del Cuerpo</label>
                  <select
                    className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm font-body focus:outline-none focus:border-zinc-400"
                  >
                    {bodyParts.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>
            </FadeIn>
          )}
        </div>

        {/* Masonry Grid */}
        {loading && photos.length === 0 ? (
          <div className="columns-2 md:columns-3 gap-3">
            {Array(12).fill(null).map((_, i) => (
              <div key={i} className={`bg-zinc-100 animate-pulse rounded-xl mb-3 ${i % 4 === 0 ? 'h-80' : 'h-56'}`} />
            ))}
          </div>
        ) : (
          <div className="columns-2 md:columns-3 gap-3">
            {photos.map((photo, i) => (
              <div
                key={`${photo.id}-${i}`}
                className="gallery-item relative rounded-xl overflow-hidden cursor-pointer mb-3 break-inside-avoid group"
                style={{ height: i % 5 === 0 ? '380px' : i % 3 === 0 ? '290px' : '230px' }}
                onClick={() => setLightbox(photo)}
              >
                <img
                  src={photo.src.large}
                  alt={photo.alt || 'Tattoo'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="overlay absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-2 p-4">
                  <ZoomIn size={28} className="text-white" />
                  <p className="text-white text-xs font-body font-medium tracking-widest text-center opacity-80">
                    {activeStyle !== 'Todos' ? activeStyle.toUpperCase() : 'TATUAJE'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {photos.length > 0 && page < 3 && (
          <div className="text-center mt-10">
            <button
              onClick={loadMore}
              disabled={loading}
              className="border border-black text-black px-10 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-black hover:text-white transition-all disabled:opacity-50"
            >
              {loading ? 'Cargando...' : 'CARGAR MÁS'}
            </button>
          </div>
        )}

        {/* CTA Agendamento */}
        <div className="mt-20 bg-black rounded-2xl p-10 md:p-14 text-center">
          <p className="text-xs font-body tracking-[0.3em] text-zinc-500 uppercase mb-3">¿Te gustó lo que viste?</p>
          <h2 className="font-display text-4xl md:text-5xl text-white tracking-wide mb-4">QUIERO UNO ASÍ</h2>
          <p className="text-zinc-400 font-body text-sm max-w-md mx-auto mb-8">
            ¿Encontraste inspiración? Agenda una consulta y crearemos el tatuaje perfecto para ti.
          </p>
          <Link
            to="/agendamento"
            className="inline-block bg-white text-black px-8 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-zinc-200 transition-colors"
          >
            AGENDAR CITA
          </Link>
        </div>
      </div>

      <Footer />

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            onClick={() => setLightbox(null)}
          >
            <X size={32} />
          </button>
          <div
            className="max-w-4xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={lightbox.src.large2x}
              alt={lightbox.alt}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-white font-display text-xl tracking-wider">
                  {activeStyle !== 'Todos' ? activeStyle : 'Tattoo'}
                </p>
                <p className="text-zinc-500 text-xs font-body mt-1">Foto por {lightbox.photographer}</p>
              </div>
              <Link
                to="/agendamento"
                className="bg-white text-black px-6 py-2.5 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-zinc-200 transition-colors"
                onClick={() => setLightbox(null)}
              >
                Quiero una así
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
