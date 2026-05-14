import { ShieldCheck, Star, Award } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { PhotoGallery } from '../components/ui/gallery'

export default function StudioSection() {
  return (
    <section className="py-14 lg:py-28 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      {/* Gold circle decorations */}
      <div
        className="absolute top-8 left-8 w-24 h-24 rounded-full opacity-10"
        style={{ border: '1px solid #D4AF37' }}
      />
      <div
        className="absolute top-14 left-14 w-10 h-10 rounded-full opacity-10"
        style={{ border: '1px solid #D4AF37' }}
      />
      <div
        className="absolute bottom-8 right-8 w-24 h-24 rounded-full opacity-10"
        style={{ border: '1px solid #C0C0C0' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        <FadeIn className="text-center mb-4">
          <p className="text-xs font-body tracking-[0.3em] text-zinc-500 uppercase mb-3">Nuestro trabajo</p>
          <h2
            className="font-display italic text-4xl md:text-5xl lg:text-6xl mb-3"
            style={{
              background: 'linear-gradient(135deg, #E8D48B 0%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Resultados reales
          </h2>
          <div className="flex items-center justify-center gap-3 mt-3 mb-4">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
            <span style={{ color: '#D4AF37' }} className="text-base">✦</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
          </div>
          <p className="text-zinc-400 font-body text-sm max-w-md mx-auto">
            Cada trabajo es único. Mira la transformación que logramos para nuestras clientas.
          </p>
        </FadeIn>

        {/* Interactive Photo Gallery */}
        <PhotoGallery animationDelay={0.4} />

        {/* Instagram CTA */}
        <FadeIn delay={200}>
          <div className="text-center mt-10 mb-14">
            <a
              href="https://www.instagram.com/miamistylls/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-body font-medium tracking-widest transition-all duration-300 hover:opacity-75"
              style={{ color: '#D4AF37' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Ver más en @miamistylls
            </a>
          </div>
        </FadeIn>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              Icon: ShieldCheck,
              title: 'Seguridad e Higiene',
              desc: 'Materiales estériles, pigmentos certificados y ambiente 100% sanitizado para tu tranquilidad.',
            },
            {
              Icon: Star,
              title: 'Calidad Premium',
              desc: 'Usamos las mejores marcas de pigmentos importados para garantizar resultados duraderos y naturales.',
            },
            {
              Icon: Award,
              title: 'Profesional Certificada',
              desc: 'Ana Rodriguez es especialista con formación y certificación en micropigmentación y servicios estéticos.',
            },
          ].map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                border: '1px solid rgba(212,175,55,0.12)',
                background: 'rgba(255,255,255,0.03)',
              }}
              onMouseOver={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.35)'}
              onMouseOut={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.12)'}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(212,175,55,0.1)' }}
              >
                <Icon size={20} style={{ color: '#D4AF37' }} />
              </div>
              <h4 className="font-display italic text-lg text-white mb-2">{title}</h4>
              <p className="text-zinc-500 text-sm font-body leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
