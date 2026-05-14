import { useEffect, useState } from 'react'
import { ZoomIn, X } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { searchPhotos, PexelsPhoto } from '../data/pexels'

const categories = ['Todos', 'Cejas', 'Labios', 'Ojos', 'Pestañas', 'Faciales']

const categoryQueries: Record<string, string> = {
  Todos: 'eyebrow micropigmentation beauty woman',
  Cejas: 'microblading eyebrows close up beauty',
  Labios: 'lip micropigmentation permanent makeup',
  Ojos: 'eyeliner permanent makeup eyes beauty',
  Pestañas: 'eyelash extensions beauty woman',
  Faciales: 'facial treatment beauty spa woman',
}

const LOCAL_GALLERY = [
  '/gallery-1.png',
  '/gallery-2.png',
  '/gallery-3.png',
  '/gallery-4.png',
  '/gallery-5.png',
  '/gallery-6.png',
]

type GalleryItem =
  | { type: 'local'; src: string; id: string }
  | { type: 'pexels'; photo: PexelsPhoto }

export default function GallerySection() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [active, setActive] = useState('Todos')
  const [loading, setLoading] = useState(false)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    const localItems: GalleryItem[] = LOCAL_GALLERY.map((src, i) => ({
      type: 'local',
      src,
      id: `local-${i}`,
    }))

    searchPhotos(categoryQueries[active] || 'beauty', 9).then(photos => {
      const pexelsItems: GalleryItem[] = photos.map(p => ({ type: 'pexels', photo: p }))
      if (active === 'Todos') {
        setItems([...localItems, ...pexelsItems])
      } else {
        setItems(pexelsItems)
      }
      setLoading(false)
    }).catch(() => {
      setItems(localItems)
      setLoading(false)
    })
  }, [active])

  const getSrc = (item: GalleryItem) => {
    if (item.type === 'local') return item.src
    return item.photo.src.large
  }

  const getLargeSrc = (item: GalleryItem) => {
    if (item.type === 'local') return item.src
    return item.photo.src.large2x
  }

  return (
    <section id="galeria" className="py-20 lg:py-32" style={{ background: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-10">
          <p className="text-xs font-body tracking-[0.3em] text-zinc-500 uppercase mb-3">Portafolio</p>
          <h2
            className="font-display italic text-4xl md:text-5xl lg:text-6xl mb-3"
            style={{ color: 'white' }}
          >
            Galería de Trabajos
          </h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
            <span style={{ color: '#D4AF37' }} className="text-base">✦</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
          </div>
        </FadeIn>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-5 py-2 rounded-full text-sm font-body font-medium tracking-wider transition-all duration-200"
              style={
                active === cat
                  ? {
                      background: 'linear-gradient(135deg, #C9A961 0%, #D4AF37 100%)',
                      color: '#0A0A0A',
                      boxShadow: '0 2px 10px rgba(212,175,55,0.3)',
                    }
                  : {
                      border: '1px solid rgba(212,175,55,0.2)',
                      color: 'rgba(255,255,255,0.5)',
                    }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array(9).fill(null).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl"
                style={{
                  background: '#1A1A1A',
                  height: i % 3 === 0 ? '280px' : '210px',
                }}
              />
            ))}
          </div>
        ) : (
          <div className="columns-2 md:columns-3 gap-3 space-y-3">
            {items.map((item, i) => (
              <div
                key={item.type === 'local' ? item.id : item.photo.id}
                className="gallery-item relative rounded-xl overflow-hidden cursor-pointer break-inside-avoid mb-3 group"
                style={{ height: i % 5 === 0 ? '340px' : i % 3 === 0 ? '260px' : '210px' }}
                onClick={() => setLightboxSrc(getLargeSrc(item))}
              >
                <img
                  src={getSrc(item)}
                  alt={
                    item.type === 'pexels'
                      ? (item.photo.alt || 'Miami Stylls')
                      : 'Miami Stylls trabajo'
                  }
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  className="overlay absolute inset-0 flex items-center justify-center"
                  style={{ background: 'rgba(212,175,55,0.25)' }}
                >
                  <ZoomIn size={28} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <a
            href="/portfolio"
            className="inline-block px-10 py-3 rounded-lg font-body text-sm font-medium tracking-wider transition-all duration-300"
            style={{
              border: '1px solid rgba(212,175,55,0.35)',
              color: '#D4AF37',
            }}
            onMouseOver={e => {
              ;(e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, #C9A961 0%, #D4AF37 100%)'
              ;(e.currentTarget as HTMLElement).style.color = '#0A0A0A'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'transparent'
            }}
            onMouseOut={e => {
              ;(e.currentTarget as HTMLElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLElement).style.color = '#D4AF37'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.35)'
            }}
          >
            Ver más trabajos
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.96)' }}
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-zinc-300 transition-colors"
            onClick={() => setLightboxSrc(null)}
            aria-label="Cerrar"
          >
            <X size={32} />
          </button>
          <img
            src={lightboxSrc}
            alt="Miami Stylls"
            className="max-w-full max-h-[90vh] object-contain rounded-xl"
            onClick={e => e.stopPropagation()}
            style={{ boxShadow: '0 20px 60px rgba(212,175,55,0.1)' }}
          />
        </div>
      )}
    </section>
  )
}
