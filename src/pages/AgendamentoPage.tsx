import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight, CheckCircle2, ChevronLeft,
  HelpCircle, Clock, AlertTriangle, MessageCircle,
  CalendarCheck, Sparkles, ArrowRight,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface FormData {
  nombre: string
  email: string
  telefono: string
  comoConheceu: string
  servicio: string
  descripcion: string
  esNueva: string
  dias: string[]
  horario: string
  referencia: string
  termos: boolean
}

const initialForm: FormData = {
  nombre: '', email: '', telefono: '', comoConheceu: '',
  servicio: '', descripcion: '',
  esNueva: 'nao',
  dias: [], horario: '', referencia: '', termos: false,
}

const steps = ['Datos Personales', 'Sobre el Servicio', 'Preferencias', 'Confirmación']

const SERVICES = [
  'Micropigmentación',
  'Microblading',
  'Microshading',
  'Neutralización de Labios',
  'Microlips',
  'Delineado de Ojos',
  'Otro servicio',
]

const faq = [
  { q: '¿Cuánto dura el procedimiento?', a: 'Depende del servicio: entre 1 y 3 horas. Ana te informará el tiempo exacto al agendar.' },
  { q: '¿El procedimiento es doloroso?', a: 'Se aplica anestesia tópica para minimizar la incomodidad. La mayoría de las clientas lo tolera muy bien.' },
  { q: '¿Cuánto dura el resultado?', a: 'Entre 1 y 3 años dependiendo del tipo de piel y cuidados. Se recomienda un retoque a los 12 meses.' },
  { q: '¿Cómo prepararme para la cita?', a: 'Evita el sol y depilación en la zona 48h antes. No consumas anticoagulantes. Llega con el rostro limpio.' },
]

const GOLD = 'linear-gradient(135deg, #C9A961 0%, #D4AF37 100%)'
const WA_LINK = 'https://wa.me/584141699512?text=Hola%20Ana%2C%20me%20interesa%20agendar%20una%20cita%20con%20Miami%20Stylls'

type BookingMode = 'choose' | 'form' | 'submitted'

export default function AgendamentoPage() {
  const [mode, setMode] = useState<BookingMode>('choose')
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(initialForm)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const set = (field: keyof FormData, value: string | boolean | string[]) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const toggleDia = (dia: string) => {
    set('dias', form.dias.includes(dia) ? form.dias.filter(d => d !== dia) : [...form.dias, dia])
  }

  const canNext = () => {
    if (step === 0) return form.nombre && form.email && form.telefono
    if (step === 1) return form.servicio && form.descripcion
    if (step === 2) return form.dias.length > 0 && form.horario
    if (step === 3) return form.termos
    return true
  }

  const handleSubmit = () => {
    if (!form.termos) return
    const msg = [
      '✨ *NUEVA CITA — MIAMI STYLLS* ✨',
      '',
      '*👤 DATOS*',
      `Nombre: ${form.nombre}`,
      `E-mail: ${form.email}`,
      `Teléfono: ${form.telefono}`,
      form.comoConheceu ? `Cómo nos conociste: ${form.comoConheceu}` : '',
      '',
      '*💄 SERVICIO*',
      `Servicio: ${form.servicio}`,
      `Descripción: ${form.descripcion}`,
      `¿Primera vez?: ${form.esNueva === 'sim' ? 'Sí' : 'No'}`,
      form.referencia ? `Referencia: ${form.referencia}` : '',
      '',
      '*📅 DISPONIBILIDAD*',
      `Días: ${form.dias.join(', ')}`,
      `Horario: ${form.horario}`,
    ].filter(Boolean).join('%0A')

    window.open(`https://wa.me/584141699512?text=${msg}`, '_blank')
    setMode('submitted')
  }

  const inputClass = "w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none transition-colors bg-white"
  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = '#D4AF37'
  }
  const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = '#e4e4e7'
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Page hero */}
      <div className="relative h-52 md:h-64 overflow-hidden mt-16" style={{ background: '#0A0A0A' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80" />
        <div
          className="absolute inset-0 opacity-15"
          style={{ backgroundImage: `url('/gallery-1.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="flex items-center gap-2 text-zinc-500 font-body text-xs tracking-widest mb-3">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <span className="text-white">Agendar</span>
          </div>
          <h1
            className="font-display italic text-3xl sm:text-4xl md:text-5xl"
            style={{
              background: 'linear-gradient(135deg, #E8D48B 0%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Agenda tu Cita
          </h1>
          <p className="text-zinc-400 font-body text-sm mt-2">Realza tu belleza natural con Ana Rodriguez</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-12 py-8 md:py-12">

        {/* ── METHOD CHOICE ── */}
        {mode === 'choose' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-body tracking-[0.3em] text-zinc-400 uppercase mb-2">¿Cómo prefieres agendar?</p>
              <h2 className="font-display italic text-3xl md:text-4xl" style={{ color: '#111' }}>
                Elige tu opción
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Form option */}
              <button
                type="button"
                onClick={() => setMode('form')}
                className="group relative text-left p-7 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: '2px solid rgba(212,175,55,0.2)',
                  background: '#0A0A0A',
                }}
                onMouseOver={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.6)'}
                onMouseOut={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.2)'}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(212,175,55,0.12)' }}
                >
                  <CalendarCheck size={22} style={{ color: '#D4AF37' }} />
                </div>
                <h3 className="font-display italic text-xl text-white mb-2">Formulario completo</h3>
                <p className="font-body text-sm text-zinc-400 leading-relaxed mb-5">
                  Llena el formulario paso a paso con todos los detalles de tu cita. Ana recibirá todo de forma organizada.
                </p>
                <div className="flex items-center gap-1.5 text-xs font-body font-semibold tracking-wider" style={{ color: '#D4AF37' }}>
                  Comenzar
                  <ArrowRight size={13} />
                </div>
              </button>

              {/* WhatsApp option */}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-left p-7 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: '2px solid rgba(37,211,102,0.15)',
                  background: '#0A0A0A',
                }}
                onMouseOver={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,211,102,0.45)'}
                onMouseOut={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,211,102,0.15)'}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(37,211,102,0.1)' }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.12 1.529 5.852L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.784 9.784 0 01-5.003-1.374l-.36-.213-3.76.896.957-3.659-.234-.376A9.786 9.786 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                  </svg>
                </div>
                <h3 className="font-display italic text-xl text-white mb-2">WhatsApp directo</h3>
                <p className="font-body text-sm text-zinc-400 leading-relaxed mb-5">
                  Escríbele a Ana directamente por WhatsApp y agenda tu cita en una conversación rápida y personalizada.
                </p>
                <div className="flex items-center gap-1.5 text-xs font-body font-semibold tracking-wider" style={{ color: '#25D366' }}>
                  Abrir WhatsApp
                  <ArrowRight size={13} />
                </div>
              </a>
            </div>

            {/* Quick services hint */}
            <div
              className="mt-8 rounded-xl p-5 text-center"
              style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.1)' }}
            >
              <Sparkles size={14} style={{ color: '#D4AF37' }} className="mx-auto mb-2" />
              <p className="font-body text-xs text-zinc-500 leading-relaxed">
                Servicios disponibles: <span style={{ color: '#D4AF37' }}>Micropigmentación · Microblading · Microshading · Microlips · Delineado · Neutralización de Labios</span>
              </p>
            </div>
          </div>
        )}

        {/* ── SUBMITTED ── */}
        {mode === 'submitted' && (
          <div className="max-w-lg mx-auto text-center py-20">
            <CheckCircle2 size={60} className="mx-auto mb-6" style={{ color: '#D4AF37' }} />
            <h2
              className="font-display italic text-3xl mb-3"
              style={{
                background: GOLD,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ¡Solicitud Enviada!
            </h2>
            <p className="text-zinc-500 font-body text-sm leading-relaxed mb-3">
              Tu solicitud fue enviada al WhatsApp de Ana. Espera su respuesta para confirmar fecha y horario.
            </p>
            <p className="text-zinc-400 font-body text-xs mb-8">
              Si tienes fotos de referencia, envíalas directamente en el chat de WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/584141699512"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-body text-sm font-semibold tracking-wider transition-all"
                style={{ background: GOLD, color: '#0A0A0A' }}
              >
                <MessageCircle size={16} />
                Abrir WhatsApp
              </a>
              <Link
                to="/"
                className="inline-flex items-center justify-center border border-zinc-200 text-black px-8 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-zinc-50 transition-colors"
              >
                Volver al Inicio
              </Link>
            </div>
          </div>
        )}

        {/* ── MULTI-STEP FORM ── */}
        {mode === 'form' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">

              {/* Back to choice */}
              <button
                type="button"
                onClick={() => { setMode('choose'); setStep(0); setForm(initialForm) }}
                className="flex items-center gap-1.5 text-xs font-body text-zinc-400 hover:text-black transition-colors mb-6"
              >
                <ChevronLeft size={14} />
                Cambiar método
              </button>

              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center gap-0 mb-3">
                  {steps.map((s, i) => (
                    <div key={s} className="flex items-center flex-1">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-body font-bold transition-all shrink-0"
                        style={
                          i < step
                            ? { background: GOLD, color: '#0A0A0A' }
                            : i === step
                            ? { background: '#D4AF37', color: '#0A0A0A', boxShadow: '0 0 0 4px rgba(212,175,55,0.2)' }
                            : { background: '#f4f4f5', color: '#a1a1aa' }
                        }
                      >
                        {i < step ? '✓' : i + 1}
                      </div>
                      {i < steps.length - 1 && (
                        <div
                          className="flex-1 h-0.5 transition-all"
                          style={{ background: i < step ? '#D4AF37' : '#f4f4f5' }}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  {steps.map((s, i) => (
                    <span
                      key={s}
                      className="text-xs font-body hidden sm:block"
                      style={{ color: i === step ? '#D4AF37' : '#a1a1aa', fontWeight: i === step ? 600 : 400 }}
                    >
                      {s}
                    </span>
                  ))}
                  <span className="sm:hidden text-xs font-body font-semibold" style={{ color: '#D4AF37' }}>
                    {steps[step]} ({step + 1}/{steps.length})
                  </span>
                </div>
              </div>

              {/* Step card */}
              <div className="bg-white border border-zinc-100 rounded-2xl p-4 sm:p-6 md:p-8" style={{ boxShadow: '0 2px 16px rgba(212,175,55,0.06)' }}>

                {/* Step 0 — Datos personales */}
                {step === 0 && (
                  <div className="space-y-5">
                    <h2 className="font-display italic text-2xl mb-6">Datos Personales</h2>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">Nombre Completo *</label>
                      <input
                        type="text" value={form.nombre}
                        onChange={e => set('nombre', e.target.value)}
                        placeholder="Tu nombre completo"
                        className={inputClass} onFocus={inputFocus} onBlur={inputBlur}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">E-mail *</label>
                      <input
                        type="email" value={form.email}
                        onChange={e => set('email', e.target.value)}
                        placeholder="tu@email.com"
                        className={inputClass} onFocus={inputFocus} onBlur={inputBlur}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">Teléfono / WhatsApp *</label>
                      <input
                        type="tel" value={form.telefono}
                        onChange={e => set('telefono', e.target.value)}
                        placeholder="+58 414-0000000"
                        className={inputClass} onFocus={inputFocus} onBlur={inputBlur}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">¿Cómo nos conociste?</label>
                      <select
                        value={form.comoConheceu}
                        onChange={e => set('comoConheceu', e.target.value)}
                        className={inputClass} onFocus={inputFocus} onBlur={inputBlur}
                      >
                        <option value="">Selecciona...</option>
                        <option>Instagram</option>
                        <option>Recomendación de amiga</option>
                        <option>Google</option>
                        <option>Facebook</option>
                        <option>Pasando por el lugar</option>
                        <option>Otro</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 1 — Servicio */}
                {step === 1 && (
                  <div className="space-y-5">
                    <h2 className="font-display italic text-2xl mb-6">Sobre el Servicio</h2>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">Servicio Deseado *</label>
                      <select
                        value={form.servicio}
                        onChange={e => set('servicio', e.target.value)}
                        className={inputClass} onFocus={inputFocus} onBlur={inputBlur}
                      >
                        <option value="">Selecciona un servicio...</option>
                        {SERVICES.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">Cuéntanos más *</label>
                      <textarea
                        value={form.descripcion}
                        onChange={e => set('descripcion', e.target.value)}
                        placeholder="Describe lo que buscas: estilo, color, inspiración..."
                        rows={4}
                        className={inputClass + ' resize-none'}
                        onFocus={inputFocus as never} onBlur={inputBlur as never}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">Referencia / Inspiración (opcional)</label>
                      <textarea
                        value={form.referencia}
                        onChange={e => set('referencia', e.target.value)}
                        placeholder="Describe o pega un link de imagen de referencia..."
                        rows={2}
                        className={inputClass + ' resize-none'}
                        onFocus={inputFocus as never} onBlur={inputBlur as never}
                      />
                      <p className="text-xs text-zinc-400 font-body mt-1.5">
                        También puedes enviar fotos directamente por WhatsApp después.
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">¿Es tu primera vez?</label>
                      <div className="flex gap-3">
                        {[{ v: 'sim', l: 'Sí, primera vez' }, { v: 'nao', l: 'Ya he venido antes' }].map(opt => (
                          <button
                            key={opt.v} type="button"
                            onClick={() => set('esNueva', opt.v)}
                            className="flex-1 py-2.5 rounded-lg text-sm font-body font-medium border transition-all"
                            style={
                              form.esNueva === opt.v
                                ? { background: GOLD, color: '#0A0A0A', borderColor: '#D4AF37' }
                                : { borderColor: '#e4e4e7', color: '#71717a' }
                            }
                          >
                            {opt.l}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2 — Preferencias */}
                {step === 2 && (
                  <div className="space-y-5">
                    <h2 className="font-display italic text-2xl mb-6">Preferencias</h2>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">Días Disponibles *</label>
                      <div className="flex flex-wrap gap-2">
                        {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map(dia => (
                          <button
                            key={dia} type="button"
                            onClick={() => toggleDia(dia)}
                            className="px-4 py-2 rounded-lg text-sm font-body font-medium border transition-all"
                            style={
                              form.dias.includes(dia)
                                ? { background: GOLD, color: '#0A0A0A', borderColor: '#D4AF37' }
                                : { borderColor: '#e4e4e7', color: '#71717a' }
                            }
                          >
                            {dia}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">Horario Preferido *</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: 'Mañana', sub: '9h – 12h' },
                          { label: 'Tarde', sub: '12h – 18h' },
                        ].map(h => (
                          <button
                            key={h.label} type="button"
                            onClick={() => set('horario', h.label)}
                            className="p-4 rounded-xl border text-left transition-all"
                            style={
                              form.horario === h.label
                                ? { background: GOLD, borderColor: '#D4AF37', color: '#0A0A0A' }
                                : { borderColor: '#e4e4e7' }
                            }
                          >
                            <p className="font-body font-semibold text-sm">{h.label}</p>
                            <p className="font-body text-xs mt-0.5 opacity-70">{h.sub}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3 — Confirmación */}
                {step === 3 && (
                  <div>
                    <h2 className="font-display italic text-2xl mb-6">Confirmación</h2>
                    <div className="space-y-2.5 mb-8">
                      {[
                        { label: 'Nombre', value: form.nombre },
                        { label: 'E-mail', value: form.email },
                        { label: 'Teléfono', value: form.telefono },
                        { label: 'Servicio', value: form.servicio },
                        { label: '¿Primera vez?', value: form.esNueva === 'sim' ? 'Sí' : 'No' },
                        { label: 'Días', value: form.dias.join(', ') || '—' },
                        { label: 'Horario', value: form.horario || '—' },
                      ].map(item => (
                        <div key={item.label} className="flex justify-between py-2.5 border-b border-zinc-50">
                          <span className="font-body text-xs tracking-widest text-zinc-400 uppercase">{item.label}</span>
                          <span className="font-body text-sm text-black font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    {form.descripcion && (
                      <div className="bg-zinc-50 rounded-xl p-4 mb-6">
                        <p className="text-xs font-body tracking-widest text-zinc-400 uppercase mb-2">Descripción</p>
                        <p className="font-body text-sm text-zinc-700 leading-relaxed">{form.descripcion}</p>
                      </div>
                    )}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.termos}
                        onChange={e => set('termos', e.target.checked)}
                        className="mt-0.5 w-4 h-4 shrink-0"
                        style={{ accentColor: '#D4AF37' }}
                      />
                      <span className="font-body text-sm text-zinc-600 leading-relaxed">
                        Acepto los{' '}
                        <a href="#" className="underline" style={{ color: '#D4AF37' }}>Términos de Servicio</a>{' '}
                        y la{' '}
                        <a href="#" className="underline" style={{ color: '#D4AF37' }}>Política de Privacidad</a>{' '}
                        de Miami Stylls.
                      </span>
                    </label>
                  </div>
                )}

                {/* Navigation */}
                <div className={`flex mt-8 ${step > 0 ? 'justify-between' : 'justify-end'}`}>
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep(s => s - 1)}
                      className="flex items-center gap-2 text-sm font-body font-medium text-zinc-500 hover:text-black transition-colors"
                    >
                      <ChevronLeft size={16} />
                      Volver
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => canNext() && setStep(s => s + 1)}
                      disabled={!canNext()}
                      className="px-8 py-3 rounded-lg font-body text-sm font-semibold tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ background: GOLD, color: '#0A0A0A' }}
                    >
                      Continuar
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!form.termos}
                      className="px-8 py-3 rounded-lg font-body text-sm font-semibold tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ background: GOLD, color: '#0A0A0A', boxShadow: '0 4px 16px rgba(212,175,55,0.3)' }}
                    >
                      Confirmar Cita ✨
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-zinc-50 rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-zinc-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body text-sm font-semibold text-black mb-1">Tiempo de respuesta</p>
                    <p className="font-body text-xs text-zinc-500 leading-relaxed">
                      Ana responde en hasta 24 horas hábiles después de tu solicitud.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-zinc-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body text-sm font-semibold text-black mb-1">Política de cancelación</p>
                    <p className="font-body text-xs text-zinc-500 leading-relaxed">
                      Cancela con al menos 24h de anticipación para reprogramar sin costo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-zinc-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <HelpCircle size={18} className="text-zinc-400" />
                  <h3 className="font-display italic text-lg">Preguntas frecuentes</h3>
                </div>
                <div className="space-y-3">
                  {faq.map((item, i) => (
                    <div key={i} className="border-b border-zinc-50 pb-3 last:border-0">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full text-left flex items-center justify-between gap-2"
                      >
                        <span className="font-body text-sm font-medium text-black">{item.q}</span>
                        <span className="text-zinc-400 text-lg shrink-0">{openFaq === i ? '−' : '+'}</span>
                      </button>
                      {openFaq === i && (
                        <p className="font-body text-xs text-zinc-500 leading-relaxed mt-2">{item.a}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-6 text-center" style={{ background: '#0A0A0A' }}>
                <p className="font-display italic text-xl mb-1" style={{ color: '#D4AF37' }}>Miami Stylls</p>
                <p className="font-body text-xs text-zinc-400 mb-1">¿Prefieres escribir directamente?</p>
                <p className="font-body text-xs text-zinc-500 mb-4">+58 414-1699512</p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-body text-sm font-semibold tracking-wider transition-all"
                  style={{ background: GOLD, color: '#0A0A0A' }}
                >
                  <MessageCircle size={15} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
