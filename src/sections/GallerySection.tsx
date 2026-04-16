import { useEffect, useState } from 'react'
import { ZoomIn, X } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { searchPhotos, PexelsPhoto } from '../data/pexels'

const categories = ['Todos', 'Realismo', 'Blackwork', 'Tribal', 'Geométrico', 'Acuarela']

const categoryQueries: Record<string, string> = {
  Todos: 'tattoo close up',
  Realismo: 'realistic tattoo portrait',
  Blackwork: 'blackwork tattoo',
  Tribal: 'tribal tattoo',
  Geométrico: 'geometric tattoo',
  Acuarela: 'watercolor tattoo',
}

export default function GallerySection() {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([])
  const [active, setActive] = useState('Todos')
  const [loading, setLoading] = useState(false)
  const [lightbox, setLightbox] = useState<PexelsPhoto | null>(null)

  useEffect(() => {
    setLoading(true)
    searchPhotos(categoryQueries[active] || 'tattoo', 12).then(p => {
      setPhotos(p)
      setLoading(false)
    })
  }, [active])

  return (
    <section id="galeria" className="bg-[#0D0D0D] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-10">
          <p className="text-xs font-body tracking-[0.3em] text-zinc-500 uppercase mb-3">Portafolio</p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-wide text-white mb-3">
            GALERÍA DE TATUAJES
          </h2>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px w-12 bg-zinc-700" />
            <span className="text-zinc-600 text-lg">✦</span>
            <div className="h-px w-12 bg-zinc-700" />
          </div>
        </FadeIn>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-body font-medium tracking-wider transition-all duration-200 ${
                active === cat
                  ? 'bg-white text-black'
                  : 'border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array(9).fill(null).map((_, i) => (
              <div key={i} className={`bg-zinc-800 animate-pulse rounded-xl ${i % 3 === 0 ? 'h-72' : 'h-52'}`} />
            ))}
          </div>
        ) : (
          <div className="columns-2 md:columns-3 gap-3 space-y-3">
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                className="gallery-item relative rounded-xl overflow-hidden cursor-pointer break-inside-avoid mb-3 group"
                style={{ height: i % 5 === 0 ? '360px' : i % 3 === 0 ? '280px' : '220px' }}
                onClick={() => setLightbox(photo)}
              >
                <img
                  src={photo.src.large}
                  alt={photo.alt || 'Tattoo'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="overlay absolute inset-0 bg-black/50 flex items-center justify-center">
                  <ZoomIn size={32} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <a
            href="/portfolio"
            className="inline-block border border-zinc-700 text-white px-10 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            VER MÁS
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-zinc-300 transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Cerrar"
          >
            <X size={32} />
          </button>
          <img
            src={lightbox.src.large2x}
            alt={lightbox.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-xl"
            onClick={e => e.stopPropagation()}
          />
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-zinc-400 text-xs font-body">
            Foto por {lightbox.photographer}
          </p>
        </div>
      )}
    </section>
  )
}
