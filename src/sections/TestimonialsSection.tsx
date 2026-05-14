import { useState, useEffect, useRef } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import FadeIn from '../components/FadeIn'

const testimonials = [
  {
    name: 'CAROLINA VARGAS',
    sub: 'Micropigmentación de cejas',
    text: 'Ana es una profesional increíble. Mis cejas quedaron perfectas, naturales y exactamente como las soñé. El resultado superó todas mis expectativas. ¡Ya quiero hacerme los labios también!',
    rating: 5,
    initials: 'CV',
  },
  {
    name: 'VALERIA MORALES',
    sub: 'Microblading y Microlips',
    text: 'Me hice el microblading y el microlips con Ana y estoy absolutamente enamorada del resultado. Muy profesional, el ambiente es limpio y te hace sentir cómoda. ¡Totalmente recomendada!',
    rating: 5,
    initials: 'VM',
  },
  {
    name: 'ISABELLA FERNÁNDEZ',
    sub: 'Delineado permanente de ojos',
    text: 'El delineado que me hizo Ana cambió mi rutina de maquillaje completamente. Me despierto lista en minutos. El trabajo es impecable y me da mucha seguridad. ¡Gracias Ana!',
    rating: 5,
    initials: 'IF',
  },
  {
    name: 'PATRICIA SALCEDO',
    sub: 'Cliente frecuente',
    text: 'He venido varias veces y siempre salgo feliz y renovada. La neutralización de labios fue un éxito total. Ana tiene un talento extraordinario y una dedicación que se nota en cada detalle.',
    rating: 5,
    initials: 'PS',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(
      () => setCurrent(c => (c + 1) % testimonials.length),
      6000
    )
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const go = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setCurrent(i)
  }

  const t = testimonials[current]

  return (
    <section className="py-20 lg:py-32" style={{ background: '#FAFAFA' }}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-body tracking-[0.3em] text-zinc-400 uppercase mb-3">Testimonios</p>
          <h2 className="font-display italic text-4xl md:text-5xl mb-3">Lo que dicen</h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
            <span style={{ color: '#D4AF37' }} className="text-base">✦</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
          </div>
        </FadeIn>

        <div
          className="relative bg-white rounded-2xl p-8 md:p-12"
          style={{ boxShadow: '0 4px 40px rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.1)' }}
        >
          <Quote size={48} className="absolute top-6 left-8 text-zinc-100" />

          <div className="relative z-10">
            {/* Stars */}
            <div className="flex gap-1 mb-6 justify-center">
              {Array(t.rating).fill(null).map((_, i) => (
                <Star key={i} size={18} style={{ color: '#D4AF37', fill: '#D4AF37' }} />
              ))}
            </div>

            {/* Text */}
            <p
              className="text-zinc-500 font-body text-base md:text-lg leading-relaxed italic text-center mb-8 min-h-[80px] transition-all duration-500"
              key={current}
            >
              "{t.text}"
            </p>

            {/* Client */}
            <div className="flex items-center justify-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-display italic text-lg text-white"
                style={{ background: 'linear-gradient(135deg, #C9A961 0%, #D4AF37 100%)' }}
              >
                {t.initials}
              </div>
              <div>
                <p
                  className="font-display italic text-lg"
                  style={{ color: '#0A0A0A' }}
                >
                  {t.name}
                </p>
                <p className="text-zinc-400 text-xs font-body">{t.sub}</p>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '28px' : '12px',
                    background: i === current ? '#D4AF37' : '#E5E5E5',
                  }}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => go((current - 1 + testimonials.length) % testimonials.length)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all border border-zinc-200 text-zinc-500"
            style={{}}
            onMouseOver={e => {
              ;(e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, #C9A961 0%, #D4AF37 100%)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'transparent'
              ;(e.currentTarget as HTMLElement).style.color = '#0A0A0A'
            }}
            onMouseOut={e => {
              ;(e.currentTarget as HTMLElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLElement).style.borderColor = ''
              ;(e.currentTarget as HTMLElement).style.color = ''
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go((current + 1) % testimonials.length)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all border border-zinc-200 text-zinc-500"
            onMouseOver={e => {
              ;(e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, #C9A961 0%, #D4AF37 100%)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'transparent'
              ;(e.currentTarget as HTMLElement).style.color = '#0A0A0A'
            }}
            onMouseOut={e => {
              ;(e.currentTarget as HTMLElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLElement).style.borderColor = ''
              ;(e.currentTarget as HTMLElement).style.color = ''
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
