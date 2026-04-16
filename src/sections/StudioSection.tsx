import { useEffect } from 'react'
import { ShieldCheck, Star, Lock } from 'lucide-react'
import FadeIn from '../components/FadeIn'

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } }
  }
}

const POSTS = [
  'https://www.instagram.com/p/DVE4ZKBjgWv/',
  'https://www.instagram.com/p/DUtw45ejE2d/',
  'https://www.instagram.com/p/DTv8V6-DiH_/',
  'https://www.instagram.com/p/DUWjbyJjgKX/',
  'https://www.instagram.com/p/DTd-nmfjlq6/',
  'https://www.instagram.com/p/DOPhtwwjFeD/',
]

export default function StudioSection() {
  useEffect(() => {
    const existing = document.getElementById('ig-embed-js')
    if (existing) {
      window.instgrm?.Embeds.process()
      return
    }
    const script = document.createElement('script')
    script.id = 'ig-embed-js'
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    script.onload = () => window.instgrm?.Embeds.process()
    document.body.appendChild(script)
  }, [])

  return (
    <section className="bg-[#0D0D0D] py-14 lg:py-32 relative overflow-hidden">
      {/* Geometric decorations */}
      <div className="absolute top-8 left-8 w-20 h-20 border border-zinc-800 rounded-full opacity-40" />
      <div className="absolute top-12 left-12 w-10 h-10 border border-zinc-700 rounded-full opacity-40" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border border-zinc-800 rounded-full opacity-40" />
      <div className="absolute bottom-12 right-12 w-10 h-10 border border-zinc-700 rounded-full opacity-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-12">
          <p className="text-xs font-body tracking-[0.3em] text-zinc-500 uppercase mb-3">Instagram</p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-wide text-white mb-3">
            NUESTRO TRABAJO
          </h2>
          <div className="flex items-center justify-center gap-3 mt-2 mb-4">
            <div className="h-px w-12 bg-zinc-700" />
            <span className="text-zinc-600 text-lg">✦</span>
            <div className="h-px w-12 bg-zinc-700" />
          </div>
          <p className="text-zinc-400 font-body text-base max-w-lg mx-auto">
            Sigue nuestros trabajos directo desde Instagram
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          {/* Horizontal scroll carousel */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:-mx-12 md:px-12">
            {POSTS.map(url => (
              <div key={url} className="min-w-[320px] max-w-[340px] snap-start shrink-0">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={url}
                  data-instgrm-version="14"
                  data-instgrm-captioned
                  style={{
                    background: '#1a1a1a',
                    border: '1px solid #2d2d2d',
                    borderRadius: '12px',
                    margin: '0',
                    maxWidth: '340px',
                    minWidth: '320px',
                    width: '100%',
                  }}
                />
              </div>
            ))}
          </div>
          <p className="text-center text-zinc-600 text-xs font-body mt-4 tracking-wider">
            → DESLIZA PARA VER MÁS
          </p>
        </FadeIn>

        {/* Studio features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {[
            { Icon: ShieldCheck, title: 'Bioseguridad', desc: 'Materiales esterilizados y ambiente higienizado según normas de salud.' },
            { Icon: Star, title: 'Ambiente Premium', desc: 'Espacio diseñado para proporcionar comodidad e inspiración durante toda la sesión.' },
            { Icon: Lock, title: 'Privacidad', desc: 'Cabinas privadas para sesiones más íntimas y cómodas.' },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4">
                <Icon size={20} className="text-white" />
              </div>
              <h4 className="font-display text-xl text-white tracking-wider mb-2">{title}</h4>
              <p className="text-zinc-500 text-sm font-body leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
