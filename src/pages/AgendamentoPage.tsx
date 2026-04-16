import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, CheckCircle2, Upload, ChevronLeft, HelpCircle, Clock, AlertTriangle, MessageCircle, ImagePlus } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface FormData {
  nome: string
  email: string
  telefone: string
  comoConheceu: string
  estilo: string
  descricao: string
  parteCopo: string
  tamanho: string
  primeiraVez: string
  coverUp: string
  dias: string[]
  horario: string
  orcamento: string
  referencia: string
  termos: boolean
}

const initialForm: FormData = {
  nome: '', email: '', telefone: '', comoConheceu: '',
  estilo: '', descricao: '', parteCopo: '', tamanho: '',
  primeiraVez: 'nao', coverUp: 'nao',
  dias: [], horario: '', orcamento: '', referencia: '', termos: false,
}

const steps = ['Datos Personales', 'Sobre el Tatuaje', 'Preferencias', 'Confirmación']

const faq = [
  { q: '¿Cuál es el plazo de respuesta?', a: 'Respondemos en hasta 24 horas hábiles después de la solicitud.' },
  { q: '¿Necesito pagar un depósito?', a: 'Sí, cobramos el 30% del valor total para confirmar la sesión.' },
  { q: '¿Puedo cancelar o reprogramar?', a: 'Con hasta 48h de anticipación sin costo. Cancelaciones con menos tiempo pierden el depósito.' },
  { q: '¿Cómo prepararme para la sesión?', a: 'Duerme bien, come antes, hidrátate y usa ropa cómoda que dé acceso al área a tatuar.' },
]

export default function AgendamentoPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const set = (field: keyof FormData, value: string | boolean | string[]) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const toggleDia = (dia: string) => {
    set('dias', form.dias.includes(dia) ? form.dias.filter(d => d !== dia) : [...form.dias, dia])
  }

  const canNext = () => {
    if (step === 0) return form.nome && form.email && form.telefone
    if (step === 1) return form.estilo && form.descricao && form.parteCopo
    if (step === 2) return form.dias.length > 0 && form.horario
    if (step === 3) return form.termos
    return true
  }

  const WHATSAPP = '584241862505'

  const handleSubmit = () => {
    if (!form.termos) return

    const msg = [
      '� *NUEVA CITA — RAMSES TATTO* �',
      '',
      '*📋 DATOS DEL CLIENTE*',
      `Nombre: ${form.nome}`,
      `E-mail: ${form.email}`,
      `Teléfono: ${form.telefone}`,
      form.comoConheceu ? `Cómo nos conociste: ${form.comoConheceu}` : '',
      '',
      '*🎨 SOBRE EL TATUAJE*',
      `Estilo: ${form.estilo}`,
      `Descripción: ${form.descricao}`,
      `Parte del cuerpo: ${form.parteCopo}`,
      form.tamanho ? `Tamaño: ${form.tamanho}` : '',
      `Primer tatuaje: ${form.primeiraVez === 'sim' ? 'Sí' : 'No'}`,
      `Cover-up: ${form.coverUp === 'sim' ? 'Sí' : 'No'}`,
      form.referencia ? `Referencia/Inspiración: ${form.referencia}` : '',
      '',
      '*📅 PREFERENCIAS*',
      `Días disponibles: ${form.dias.join(', ')}`,
      `Horario: ${form.horario}`,
      form.orcamento ? `Presupuesto estimado: ${form.orcamento}` : '',
      '',
      form.referencia ? '📸 *El cliente tiene foto de referencia — ¡pide que la envíe aquí en el chat!*' : '',
    ].filter(Boolean).join('%0A')

    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank')
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <div className="relative h-56 md:h-72 bg-black overflow-hidden mt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="flex items-center gap-2 text-zinc-400 font-body text-xs tracking-widest mb-4">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <span className="text-white">Agendar</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-white tracking-wide">AGENDA TU CITA</h1>
          <p className="text-zinc-400 font-body text-sm mt-2">Da el primer paso hacia tu nuevo arte</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-12 py-8 md:py-12">
        {submitted ? (
          <div className="max-w-lg mx-auto text-center py-20">
            <CheckCircle2 size={64} className="text-black mx-auto mb-6" />
            <h2 className="font-display text-4xl mb-3 tracking-wide">¡SOLICITUD ENVIADA!</h2>
            <p className="text-zinc-500 font-body text-sm leading-relaxed mb-3">
              Tu solicitud fue enviada directo al WhatsApp de Ramses. Espera la respuesta para confirmar fecha, horario y presupuesto.
            </p>
            <p className="text-zinc-400 font-body text-xs mb-8">
              Si tienes fotos de referencia, envías en el chat de WhatsApp que acaba de abrirse.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/584241862505`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-zinc-800 transition-colors"
              >
                <MessageCircle size={16} />
                ABRIR WHATSAPP
              </a>
              <Link
                to="/"
                className="inline-block border border-zinc-200 text-black px-8 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-zinc-50 transition-colors"
              >
                VOLVER AL INICIO
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex items-center gap-0 mb-3">
                  {steps.map((s, i) => (
                    <div key={s} className="flex items-center flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold transition-all shrink-0 ${
                        i < step ? 'bg-black text-white' : i === step ? 'bg-black text-white ring-4 ring-black/20' : 'bg-zinc-100 text-zinc-400'
                      }`}>
                        {i < step ? '✓' : i + 1}
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`flex-1 h-0.5 transition-all ${i < step ? 'bg-black' : 'bg-zinc-100'}`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  {steps.map((s, i) => (
                    <span key={s} className={`text-xs font-body hidden sm:block ${i === step ? 'text-black font-semibold' : 'text-zinc-400'}`}>
                      {s}
                    </span>
                  ))}
                  <span className="sm:hidden text-xs font-body font-semibold text-black">
                    {steps[step]} ({step + 1}/{steps.length})
                  </span>
                </div>
              </div>

              {/* Step content */}
              <div className="bg-white border border-zinc-100 rounded-2xl p-4 sm:p-6 md:p-8">

                {/* Step 0 – Dados Pessoais */}
                {step === 0 && (
                  <div className="space-y-5">
                    <h2 className="font-display text-2xl tracking-wider mb-6">DATOS PERSONALES</h2>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">Nombre Completo *</label>
                      <input
                        type="text"
                        value={form.nome}
                        onChange={e => set('nome', e.target.value)}
                        placeholder="Tu nombre completo"
                        className="w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">E-mail *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => set('email', e.target.value)}
                        placeholder="tu@email.com"
                        className="w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">Teléfono / WhatsApp *</label>
                      <input
                        type="tel"
                        value={form.telefone}
                        onChange={e => set('telefone', e.target.value)}
                        placeholder="+58 424-0000000"
                        className="w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">¿Cómo nos conociste?</label>
                      <select
                        value={form.comoConheceu}
                        onChange={e => set('comoConheceu', e.target.value)}
                        className="w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-black transition-colors"
                      >
                        <option value="">Selecciona...</option>
                        <option>Instagram</option>
                        <option>Recomendación de amigo</option>
                        <option>Google</option>
                        <option>Facebook</option>
                        <option>Pasando por el lugar</option>
                        <option>Otro</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 1 – Sobre a Tattoo */}
                {step === 1 && (
                  <div className="space-y-5">
                    <h2 className="font-display text-2xl tracking-wider mb-6">SOBRE EL TATUAJE</h2>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">Estilo Deseado *</label>
                      <select
                        value={form.estilo}
                        onChange={e => set('estilo', e.target.value)}
                        className="w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-black transition-colors"
                      >
                        <option value="">Selecciona un estilo...</option>
                        {['Realismo', 'Blackwork', 'Tribal', 'Mandala', 'Geométrico', 'Acuarela', 'Fineline', 'Neotradicional', 'Japonés', 'Old School', 'Otro'].map(s => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">Descripción de la Idea *</label>
                      <textarea
                        value={form.descricao}
                        onChange={e => set('descricao', e.target.value)}
                        placeholder="Describe tu idea con el máximo de detalles posible..."
                        rows={4}
                        className="w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-black transition-colors resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">Presupuesto Estimado</label>
                      <select
                        value={form.orcamento}
                        onChange={e => set('orcamento', e.target.value)}
                        className="w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-black transition-colors"
                      >
                        <option value="">No sé / sin preferencia</option>
                        <option>Hasta $50</option>
                        <option>$50 – $100</option>
                        <option>$100 – $200</option>
                        <option>$200 – $400</option>
                        <option>Más de $400</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">Referencia / Inspiración (opcional)</label>
                      <textarea
                        value={form.referencia}
                        onChange={e => set('referencia', e.target.value)}
                        placeholder="Describe o pega el link de una imagen de referencia..."
                        rows={2}
                        className="w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-black transition-colors resize-none"
                      />
                      <div className="flex items-center gap-2 mt-2 text-xs text-zinc-400 font-body">
                        <ImagePlus size={13} />
                        <span>Las fotos de referencia se pueden enviar directamente por WhatsApp después del envío.</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">Parte del Cuerpo *</label>
                        <select
                          value={form.parteCopo}
                          onChange={e => set('parteCopo', e.target.value)}
                          className="w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-black transition-colors"
                        >
                          <option value="">Selecciona...</option>
                          {['Brazo', 'Antebrazo', 'Pierna', 'Espalda', 'Pecho', 'Cuello', 'Mano', 'Pie', 'Costilla', 'Hombro', 'Otro'].map(p => (
                            <option key={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">Tamaño</label>
                        <select
                          value={form.tamanho}
                          onChange={e => set('tamanho', e.target.value)}
                          className="w-full border border-zinc-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-black transition-colors"
                        >
                          <option value="">Selecciona...</option>
                          <option>Pequeño (hasta 5cm)</option>
                          <option>Mediano (5-15cm)</option>
                          <option>Grande (15-25cm)</option>
                          <option>Extra-grande (25cm+)</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">¿Primer Tatuaje?</label>
                        <div className="flex gap-3">
                          {['sim', 'nao'].map(v => (
                            <button
                              key={v}
                              onClick={() => set('primeiraVez', v)}
                              className={`flex-1 py-2.5 rounded-lg text-sm font-body font-medium border transition-all ${
                                form.primeiraVez === v ? 'bg-black text-white border-black' : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'
                              }`}
                            >
                              {v === 'sim' ? 'Sí' : 'No'}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">¿Es Cover-up?</label>
                        <div className="flex gap-3">
                          {['sim', 'nao'].map(v => (
                            <button
                              key={v}
                              onClick={() => set('coverUp', v)}
                              className={`flex-1 py-2.5 rounded-lg text-sm font-body font-medium border transition-all ${
                                form.coverUp === v ? 'bg-black text-white border-black' : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'
                              }`}
                            >
                              {v === 'sim' ? 'Sí' : 'No'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2 – Preferências */}
                {step === 2 && (
                  <div className="space-y-5">
                    <h2 className="font-display text-2xl tracking-wider mb-6">PREFERENCIAS</h2>
                    <div>
                      <label className="block text-xs font-body tracking-widest text-zinc-500 uppercase mb-2">Días Disponibles *</label>
                      <div className="flex flex-wrap gap-2">
                        {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map(dia => (
                          <button
                            key={dia}
                            onClick={() => toggleDia(dia)}
                            className={`px-4 py-2 rounded-lg text-sm font-body font-medium border transition-all ${
                              form.dias.includes(dia) ? 'bg-black text-white border-black' : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'
                            }`}
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
                          { label: 'Mañana', sub: '10h – 13h' },
                          { label: 'Tarde', sub: '13h – 18h' },
                        ].map(h => (
                          <button
                            key={h.label}
                            onClick={() => set('horario', h.label)}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              form.horario === h.label ? 'bg-black text-white border-black' : 'border-zinc-200 hover:border-zinc-400'
                            }`}
                          >
                            <p className={`font-body font-semibold text-sm ${form.horario === h.label ? 'text-white' : 'text-black'}`}>{h.label}</p>
                            <p className={`font-body text-xs mt-0.5 ${form.horario === h.label ? 'text-zinc-300' : 'text-zinc-400'}`}>{h.sub}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3 – Confirmação */}
                {step === 3 && (
                  <div>
                    <h2 className="font-display text-2xl tracking-wider mb-6">CONFIRMACIÓN</h2>
                    <div className="space-y-3 mb-8">
                      {[
                        { label: 'Nombre', value: form.nome },
                        { label: 'E-mail', value: form.email },
                        { label: 'Teléfono', value: form.telefone },
                        { label: 'Estilo', value: form.estilo },
                        { label: 'Parte del cuerpo', value: form.parteCopo },
                        { label: 'Tamaño', value: form.tamanho },
                        { label: 'Días', value: form.dias.join(', ') || '—' },
                        { label: 'Horario', value: form.horario || '—' },
                        { label: 'Presupuesto', value: form.orcamento || 'No informado' },
                        { label: 'Referencia', value: form.referencia || 'No informada' },
                      ].map(item => (
                        <div key={item.label} className="flex justify-between py-2.5 border-b border-zinc-50">
                          <span className="font-body text-xs tracking-widest text-zinc-400 uppercase">{item.label}</span>
                          <span className="font-body text-sm text-black font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    {form.descricao && (
                      <div className="bg-zinc-50 rounded-xl p-4 mb-6">
                        <p className="text-xs font-body tracking-widest text-zinc-400 uppercase mb-2">Descripción</p>
                        <p className="font-body text-sm text-zinc-700 leading-relaxed">{form.descricao}</p>
                      </div>
                    )}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.termos}
                        onChange={e => set('termos', e.target.checked)}
                        className="mt-0.5 accent-black w-4 h-4 shrink-0"
                      />
                      <span className="font-body text-sm text-zinc-600 leading-relaxed">
                        Acepto los{' '}
                        <a href="#" className="text-black underline">Términos de Servicio</a>{' '}
                        y la{' '}
                        <a href="#" className="text-black underline">Política de Privacidad</a>{' '}
                        de Ramses Tatto.
                      </span>
                    </label>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className={`flex mt-8 ${step > 0 ? 'justify-between' : 'justify-end'}`}>
                  {step > 0 && (
                    <button
                      onClick={() => setStep(s => s - 1)}
                      className="flex items-center gap-2 text-sm font-body font-medium text-zinc-500 hover:text-black transition-colors"
                    >
                      <ChevronLeft size={16} />
                      Volver
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      onClick={() => canNext() && setStep(s => s + 1)}
                      disabled={!canNext()}
                      className="bg-black text-white px-8 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-zinc-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continuar
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={!form.termos}
                      className="bg-black text-white px-8 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-zinc-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      CONFIRMAR CITA
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Info cards */}
              <div className="bg-zinc-50 rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-zinc-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body text-sm font-semibold text-black mb-1">Tiempo de respuesta</p>
                    <p className="font-body text-xs text-zinc-500 leading-relaxed">Respondemos en hasta 24 horas hábiles después de la solicitud.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-zinc-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body text-sm font-semibold text-black mb-1">Política de cancelación</p>
                    <p className="font-body text-xs text-zinc-500 leading-relaxed">Cancelaciones con menos de 48h de anticipación pierden el depósito (30% del valor).</p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="border border-zinc-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <HelpCircle size={18} className="text-zinc-400" />
                  <h3 className="font-display text-lg tracking-widest">PREGUNTAS FRECUENTES</h3>
                </div>
                <div className="space-y-3">
                  {faq.map((item, i) => (
                    <div key={i} className="border-b border-zinc-50 pb-3 last:border-0">
                      <button
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

              {/* WhatsApp CTA */}
              <div className="bg-black text-white rounded-2xl p-6 text-center">
                <p className="font-display text-xl tracking-wider mb-2">CONTÁCTANOS</p>
                <p className="font-body text-xs text-zinc-400 mb-1">¿Prefieres conversar directamente?</p>
                <p className="font-body text-xs text-zinc-500 mb-4">+58 424-1862505</p>
                <a
                  href="https://wa.me/584241862505?text=Hola!%20Me%20gustar%C3%ADa%20agendar%20una%20sesi%C3%B3n%20con%20Ramses%20Tatto."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white text-black px-6 py-2.5 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-zinc-200 transition-colors"
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
