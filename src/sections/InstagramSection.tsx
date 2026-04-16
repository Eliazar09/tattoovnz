import { useEffect, useState } from 'react'
import { Instagram } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { searchPhotos, PexelsPhoto } from '../data/pexels'

export default function InstagramSection() {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([])

  useEffect(() => {
    searchPhotos('tattoo design ink', 6).then(setPhotos)
  }, [])

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-10">
          <p className="text-xs font-body tracking-[0.3em] text-zinc-400 uppercase mb-2">Redes Sociales</p>
          <div className="flex items-center justify-center gap-3 mb-1">
            <Instagram size={28} className="text-black" />
            <h2 className="font-display text-4xl md:text-5xl tracking-wide">SÍGUENOS EN INSTAGRAM</h2>
          </div>
          <a
            href="https://www.instagram.com/ramses_tatto/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-zinc-400 hover:text-black transition-colors tracking-widest"
          >
            @ramses_tatto
          </a>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {photos.length > 0
            ? photos.slice(0, 6).map(photo => (
                <a
                  key={photo.id}
                  href="https://www.instagram.com/ramses_tatto/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gallery-item relative aspect-square overflow-hidden rounded-lg group"
                >
                  <img
                    src={photo.src.medium}
                    alt={photo.alt || 'Instagram post'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="overlay absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Instagram size={28} className="text-white" />
                  </div>
                </a>
              ))
            : Array(6).fill(null).map((_, i) => (
                <div key={i} className="aspect-square rounded-lg bg-zinc-100 animate-pulse" />
              ))}
        </div>
      </div>
    </section>
  )
}
