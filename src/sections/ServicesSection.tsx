import { Eye, Heart, Feather, Layers, Sparkles, Smile } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { ServiceHighlightCard } from '../components/ui/product-card'

const WA_BASE = 'https://wa.me/584141699512?text=Hola%20Ana%2C%20me%20interesa%20el%20servicio%20de%20'

const services = [
  {
    Icon: Sparkles,
    category: 'CEJAS',
    name: 'Micropigmentación',
    desc: 'Define y diseña tus cejas perfectas con técnica semipermanente de larga duración.',
    price: '$20',
    wa: WA_BASE + 'Micropigmentaci%C3%B3n',
  },
  {
    Icon: Feather,
    category: 'CEJAS',
    name: 'Microblading',
    desc: 'Cejas naturales y definidas con microincisiones precisas, trazo a trazo.',
    price: '$15',
    wa: WA_BASE + 'Microblading',
  },
  {
    Icon: Layers,
    category: 'CEJAS',
    name: 'Microshading',
    desc: 'Efecto polvo para cejas densas y con relleno uniforme de larga duración.',
    price: '$25',
    wa: WA_BASE + 'Microshading',
  },
  {
    Icon: Heart,
    category: 'LABIOS',
    name: 'Neutralización de Labios',
    desc: 'Corrección del tono natural de tus labios con pigmentación especializada.',
    price: '$20',
    wa: WA_BASE + 'Neutralizaci%C3%B3n%20de%20Labios',
  },
  {
    Icon: Smile,
    category: 'LABIOS',
    name: 'Microlips',
    desc: 'Delinea y rellena tus labios con colores duraderos y de aspecto natural.',
    price: '$25',
    wa: WA_BASE + 'Microlips',
  },
  {
    Icon: Eye,
    category: 'OJOS',
    name: 'Delineado de Ojos',
    desc: 'Intensifica tu mirada con delineado permanente superior o inferior.',
    price: '$20',
    wa: WA_BASE + 'Delineado%20de%20Ojos',
  },
]

export default function ServicesSection() {
  return (
    <section id="servicos" className="py-16 lg:py-32" style={{ background: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-body tracking-[0.3em] text-zinc-500 uppercase mb-3">Lo que ofrecemos</p>
          <h2
            className="font-display italic text-4xl md:text-5xl lg:text-6xl mb-3"
            style={{
              background: 'linear-gradient(135deg, #E8D48B 0%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Nuestros Servicios
          </h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
            <span style={{ color: '#D4AF37' }} className="text-base">✦</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
          </div>
          <p className="text-zinc-500 font-body text-sm mt-4 max-w-md mx-auto">
            Especialista en micropigmentación, pestañas, faciales, depilación y cursos profesionales.
          </p>
        </FadeIn>

        {/* Service Cards Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          style={{ perspective: '1200px' }}
        >
          {services.map((s, i) => (
            <FadeIn key={s.name} delay={i * 70}>
              <ServiceHighlightCard
                categoryIcon={<s.Icon size={18} />}
                category={s.category}
                title={s.name}
                description={s.desc}
                price={s.price}
                href={s.wa}
              />
            </FadeIn>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeIn>
          <div
            className="rounded-2xl p-8 md:p-10 text-center"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(212,175,55,0.15)',
            }}
          >
            <p className="text-xs font-body tracking-[0.3em] text-zinc-500 uppercase mb-3">¿Tienes dudas?</p>
            <h3
              className="font-display italic text-3xl md:text-4xl mb-3"
              style={{
                background: 'linear-gradient(135deg, #E8D48B 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Consulta gratuita por WhatsApp
            </h3>
            <p className="text-zinc-500 font-body text-sm max-w-md mx-auto mb-6">
              Escríbele a Ana directamente y recibe asesoría personalizada sobre el servicio ideal para ti.
            </p>
            <a
              href="https://wa.me/584141699512?text=Hola%20Ana%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20Miami%20Stylls"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-body text-sm font-semibold tracking-wider transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #C9A961 0%, #D4AF37 100%)',
                color: '#0A0A0A',
                boxShadow: '0 4px 18px rgba(212,175,55,0.35)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.12 1.529 5.852L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.784 9.784 0 01-5.003-1.374l-.36-.213-3.76.896.957-3.659-.234-.376A9.786 9.786 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
              Consultar ahora
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
