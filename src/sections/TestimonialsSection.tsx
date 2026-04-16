import { useState, useEffect, useRef } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import FadeIn from '../components/FadeIn'

const testimonials = [
  {
    name: 'MARÍA GONZÁLEZ',
    sub: 'Cliente desde hace 3 años',
    text: 'La experiencia fue increíble de principio a fin. Ramses entendió exactamente lo que quería y el resultado quedó aún mejor de lo que imaginaba. ¡Ya volví 3 veces y siempre salgo enamorada!',
    rating: 5,
    initials: 'MG',
  },
  {
    name: 'CARLOS PÉREZ',
    sub: 'Primer tatuaje',
    text: 'Estaba muy nervioso porque era mi primer tatuaje, pero Ramses fue extremadamente atento y cuidadoso. El ambiente es super limpio y profesional. ¡Lo recomiendo totalmente!',
    rating: 5,
    initials: 'CP',
  },
  {
    name: 'ANA RODRÍGUEZ',
    sub: 'Cover-up realizado',
    text: 'Tenía un tatuaje antiguo que ya no me gustaba y Ramses hizo un cover-up absolutamente hermoso. Transformó algo que me molestaba en una obra de arte. ¡Eternamente agradecida!',
    rating: 5,
    initials: 'AR',
  },
  {
    name: 'LUIS MARTÍNEZ',
    sub: 'Cliente desde hace 5 años',
    text: 'Tengo 12 tatuajes y todos los hice con Ramses. La calidad es consistente, la atención siempre excelente y el ambiente muy cómodo. ¡No lo cambiaría por nada!',
    rating: 5,
    initials: 'LM',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 6000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const go = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setCurrent(i)
  }

  const t = testimonials[current]

  return (
    <section className="bg-[#F8F8F8] py-20 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-body tracking-[0.3em] text-zinc-400 uppercase mb-3">Testimonios</p>
          <h2 className="font-display text-5xl md:text-6xl tracking-wide mb-3">LO QUE DICEN</h2>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px w-12 bg-zinc-300" />
            <span className="text-zinc-400 text-lg">✦</span>
            <div className="h-px w-12 bg-zinc-300" />
          </div>
        </FadeIn>

        <div className="relative bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <Quote size={48} className="text-zinc-100 absolute top-6 left-8" />

          <div className="relative z-10">
            {/* Stars */}
            <div className="flex gap-1 mb-6 justify-center">
              {Array(t.rating).fill(null).map((_, i) => (
                <Star key={i} size={18} className="text-black fill-black" />
              ))}
            </div>

            {/* Text */}
            <p
              className="text-zinc-600 font-body text-base md:text-lg leading-relaxed italic text-center mb-8 min-h-[80px] transition-all duration-500"
              key={current}
            >
              "{t.text}"
            </p>

            {/* Client */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-display text-lg">
                {t.initials}
              </div>
              <div>
                <p className="font-display text-lg tracking-wider">{t.name}</p>
                <p className="text-zinc-400 text-xs font-body">{t.sub}</p>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-7 bg-black' : 'w-3 bg-zinc-300'}`}
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
            className="w-10 h-10 border border-zinc-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go((current + 1) % testimonials.length)}
            className="w-10 h-10 border border-zinc-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
