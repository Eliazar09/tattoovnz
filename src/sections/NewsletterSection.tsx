import { useState } from 'react'
import { MapPin, Clock, Instagram, Phone, CheckCircle2, MessageCircle, ExternalLink } from 'lucide-react'
import FadeIn from '../components/FadeIn'

const WA_LINK = 'https://wa.me/584141699512?text=Hola%20Ana%2C%20me%20interesa%20agendar%20una%20cita'
const MAPS_LINK = 'https://maps.app.goo.gl/sfM8PwqZrhFUzD74A'
const IG_LINK = 'https://www.instagram.com/miamistylls/'

interface Form {
  nombre: string
  telefono: string
  servicio: string
  fecha: string
  mensaje: string
}

const SERVICES = [
  'Micropigmentación',
  'Microblading',
  'Microshading',
  'Neutralización de Labios',
  'Microlips',
  'Delineado de Ojos',
  'Otro servicio',
]

export default function NewsletterSection() {
  const [form, setForm] = useState<Form>({ nombre: '', telefono: '', servicio: '', fecha: '', mensaje: '' })
  const [sent, setSent] = useState(false)

  const set = (field: keyof Form, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre || !form.telefono || !form.servicio) return

    const lines = [
      '✨ *NUEVA CITA — MIAMI STYLLS* ✨',
      '',
      `👤 *Nombre:* ${form.nombre}`,
      `📱 *Teléfono:* ${form.telefono}`,
      `💄 *Servicio:* ${form.servicio}`,
      form.fecha ? `📅 *Fecha preferida:* ${form.fecha}` : '',
      form.mensaje ? `💬 *Mensaje:* ${form.mensaje}` : '',
    ].filter(Boolean).join('%0A')

    window.open(`https://wa.me/584141699512?text=${lines}`, '_blank')
    setSent(true)
  }

  return (
    <section id="contato" className="py-20 lg:py-32" style={{ background: '#0A0A0A' }}>
      {/* Gold top accent */}
      <div
        className="absolute left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 40%, transparent)' }}
      />

      {/* Decorative circles */}
      <div className="absolute top-12 right-12 w-32 h-32 rounded-full opacity-5" style={{ border: '1px solid #D4AF37' }} />
      <div className="absolute bottom-12 left-12 w-20 h-20 rounded-full opacity-5" style={{ border: '1px solid #C0C0C0' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-body tracking-[0.3em] text-zinc-500 uppercase mb-3">Citas & Contacto</p>
          <h2
            className="font-display italic text-4xl md:text-5xl lg:text-6xl mb-3"
            style={{
              background: 'linear-gradient(135deg, #E8D48B 0%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Agenda tu Cita
          </h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
            <span style={{ color: '#D4AF37' }} className="text-base">✦</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — Form */}
          <FadeIn direction="left">
            {sent ? (
              <div className="flex flex-col items-center gap-4 py-16 text-center">
                <CheckCircle2 size={56} style={{ color: '#D4AF37' }} />
                <p
                  className="font-display italic text-3xl"
                  style={{
                    background: 'linear-gradient(135deg, #E8D48B 0%, #D4AF37 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  ¡Mensaje enviado!
                </p>
                <p className="text-zinc-400 font-body text-sm max-w-xs leading-relaxed">
                  Tu solicitud fue enviada al WhatsApp de Ana. Espera la confirmación para tu cita.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-3 text-xs font-body text-zinc-600 hover:text-zinc-400 underline transition-colors"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <div
                className="rounded-2xl p-6 md:p-8"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(212,175,55,0.15)',
                }}
              >
                <h3 className="font-display italic text-2xl text-white mb-6">Solicitar cita</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        value={form.nombre}
                        onChange={e => set('nombre', e.target.value)}
                        placeholder="Tu nombre"
                        required
                        className="w-full bg-transparent text-white placeholder-zinc-600 px-4 py-3 rounded-lg font-body text-sm focus:outline-none transition-colors"
                        style={{ border: '1px solid rgba(212,175,55,0.2)' }}
                        onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.6)'}
                        onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.2)'}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">
                        WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={form.telefono}
                        onChange={e => set('telefono', e.target.value)}
                        placeholder="+58 414-0000000"
                        required
                        className="w-full bg-transparent text-white placeholder-zinc-600 px-4 py-3 rounded-lg font-body text-sm focus:outline-none transition-colors"
                        style={{ border: '1px solid rgba(212,175,55,0.2)' }}
                        onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.6)'}
                        onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.2)'}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">
                        Servicio *
                      </label>
                      <select
                        value={form.servicio}
                        onChange={e => set('servicio', e.target.value)}
                        required
                        className="w-full bg-[#1A1A1A] text-white px-4 py-3 rounded-lg font-body text-sm focus:outline-none transition-colors"
                        style={{ border: '1px solid rgba(212,175,55,0.2)' }}
                      >
                        <option value="">Selecciona...</option>
                        {SERVICES.map(s => <option key={s} className="bg-[#1A1A1A]">{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">
                        Fecha preferida
                      </label>
                      <input
                        type="date"
                        value={form.fecha}
                        onChange={e => set('fecha', e.target.value)}
                        className="w-full bg-transparent text-white px-4 py-3 rounded-lg font-body text-sm focus:outline-none transition-colors"
                        style={{ border: '1px solid rgba(212,175,55,0.2)', colorScheme: 'dark' }}
                        onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.6)'}
                        onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.2)'}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">
                      Mensaje (opcional)
                    </label>
                    <textarea
                      value={form.mensaje}
                      onChange={e => set('mensaje', e.target.value)}
                      placeholder="Cuéntanos más sobre lo que buscas..."
                      rows={3}
                      className="w-full bg-transparent text-white placeholder-zinc-600 px-4 py-3 rounded-lg font-body text-sm focus:outline-none transition-colors resize-none"
                      style={{ border: '1px solid rgba(212,175,55,0.2)' }}
                      onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.6)'}
                      onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.2)'}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-body text-sm font-semibold tracking-wider transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: 'linear-gradient(135deg, #C9A961 0%, #D4AF37 100%)',
                      color: '#0A0A0A',
                      boxShadow: '0 4px 18px rgba(212,175,55,0.35)',
                    }}
                  >
                    <MessageCircle size={16} />
                    Enviar por WhatsApp
                  </button>
                </form>
              </div>
            )}
          </FadeIn>

          {/* Right — Info */}
          <FadeIn direction="right" delay={150}>
            <div className="space-y-5">
              {/* Address */}
              <div
                className="rounded-xl p-5 flex items-start gap-4 transition-all duration-300"
                style={{ border: '1px solid rgba(212,175,55,0.15)', background: 'rgba(255,255,255,0.03)' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(212,175,55,0.12)' }}
                >
                  <MapPin size={18} style={{ color: '#D4AF37' }} />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-white mb-0.5">Ubicación</p>
                  <p className="font-body text-xs text-zinc-400 mb-2">Maracaibo, Venezuela 🇻🇪</p>
                  <a
                    href={MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-body font-medium transition-colors"
                    style={{ color: '#D4AF37' }}
                  >
                    <ExternalLink size={12} />
                    Ver en Google Maps
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div
                className="rounded-xl p-5 flex items-start gap-4"
                style={{ border: '1px solid rgba(212,175,55,0.15)', background: 'rgba(255,255,255,0.03)' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(212,175,55,0.12)' }}
                >
                  <Clock size={18} style={{ color: '#D4AF37' }} />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-white mb-0.5">Horario</p>
                  <p className="font-body text-xs text-zinc-400">Lunes a Sábado</p>
                  <p className="font-body text-xs text-zinc-400">9:00 am – 6:00 pm</p>
                </div>
              </div>

              {/* Social buttons */}
              <div className="flex gap-3">
                <a
                  href={IG_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-body text-sm font-medium tracking-wider transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    border: '1px solid rgba(212,175,55,0.25)',
                    color: '#D4AF37',
                    background: 'rgba(212,175,55,0.05)',
                  }}
                >
                  <Instagram size={16} />
                  Instagram
                </a>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-body text-sm font-medium tracking-wider transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: '#25D366',
                    color: 'white',
                  }}
                >
                  <Phone size={16} />
                  WhatsApp
                </a>
              </div>

              {/* Quick CTA */}
              <div
                className="rounded-xl p-5 text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(201,169,97,0.15) 0%, rgba(212,175,55,0.1) 100%)',
                  border: '1px solid rgba(212,175,55,0.25)',
                }}
              >
                <p className="font-body text-xs text-zinc-400 mb-1 tracking-widest uppercase">¿Prefiero llamar?</p>
                <p className="font-display italic text-xl" style={{ color: '#D4AF37' }}>
                  +58 414-1699512
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
