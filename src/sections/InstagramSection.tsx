import { useEffect, useState } from 'react'
import { Instagram } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { searchPhotos, PexelsPhoto } from '../data/pexels'

const IG_URL = 'https://www.instagram.com/miamistylls/'
const LOCAL = ['/gallery-1.png', '/gallery-2.png', '/gallery-3.png', '/gallery-4.png', '/gallery-5.png', '/gallery-6.png']

export default function InstagramSection() {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([])
  const [showLocal, setShowLocal] = useState(false)

  useEffect(() => {
    searchPhotos('eyebrow micropigmentation beauty makeup', 6)
      .then(p => {
        if (p.length > 0) setPhotos(p)
        else setShowLocal(true)
      })
      .catch(() => setShowLocal(true))
  }, [])

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-10">
          <p className="text-xs font-body tracking-[0.3em] text-zinc-400 uppercase mb-2">Redes Sociales</p>
          <div className="flex items-center justify-center gap-3 mb-2">
            <Instagram size={26} style={{ color: '#D4AF37' }} />
            <h2 className="font-display italic text-3xl md:text-4xl">Síguenos en Instagram</h2>
          </div>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-zinc-400 hover:text-black transition-colors tracking-widest"
          >
            @miamistylls
          </a>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {showLocal
            ? LOCAL.map((src, i) => (
                <a
                  key={i}
                  href={IG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gallery-item relative aspect-square overflow-hidden rounded-lg group"
                >
                  <img
                    src={src}
                    alt="Miami Stylls Instagram"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="overlay absolute inset-0 flex items-center justify-center"
                    style={{ background: 'rgba(212,175,55,0.35)' }}
                  >
                    <Instagram size={26} className="text-white" />
                  </div>
                </a>
              ))
            : photos.slice(0, 6).map(photo => (
                <a
                  key={photo.id}
                  href={IG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gallery-item relative aspect-square overflow-hidden rounded-lg group"
                >
                  <img
                    src={photo.src.medium}
                    alt={photo.alt || 'Miami Stylls'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="overlay absolute inset-0 flex items-center justify-center"
                    style={{ background: 'rgba(212,175,55,0.35)' }}
                  >
                    <Instagram size={26} className="text-white" />
                  </div>
                </a>
              ))}
        </div>

        <div className="text-center mt-8">
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full font-body text-sm font-medium tracking-wider transition-all duration-300 hover:-translate-y-0.5"
            style={{
              border: '1px solid rgba(212,175,55,0.35)',
              color: '#B8960C',
            }}
            onMouseOver={e => {
              ;(e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, #C9A961 0%, #D4AF37 100%)'
              ;(e.currentTarget as HTMLElement).style.color = '#0A0A0A'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'transparent'
            }}
            onMouseOut={e => {
              ;(e.currentTarget as HTMLElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLElement).style.color = '#B8960C'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.35)'
            }}
          >
            <Instagram size={15} />
            Ver perfil completo
          </a>
        </div>
      </div>
    </section>
  )
}
