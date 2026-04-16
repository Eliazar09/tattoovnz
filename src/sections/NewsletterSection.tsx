import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'
import FadeIn from '../components/FadeIn'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSent(true)
      setEmail('')
    }
  }

  return (
    <section id="contato" className="bg-black py-20 lg:py-28 relative overflow-hidden">
      {/* Tribal decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-5">
        <svg viewBox="0 0 100 100" fill="white">
          <polygon points="50,5 95,95 5,95" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5 rotate-180">
        <svg viewBox="0 0 100 100" fill="white">
          <polygon points="50,5 95,95 5,95" />
        </svg>
      </div>

      <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
        <FadeIn>
          <p className="text-xs font-body tracking-[0.3em] text-zinc-500 uppercase mb-4">Manténte informado</p>
          <h2 className="font-display text-5xl md:text-6xl tracking-wide text-white mb-4">
            SUSCRÍBETE AL<br />NEWSLETTER
          </h2>
          <p className="text-zinc-400 font-body text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Recibe novedades, promociones exclusivas e inspiraciones de tatuajes directamente en tu correo.
          </p>

          {sent ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <CheckCircle2 size={48} className="text-white" />
              <p className="font-display text-2xl text-white tracking-wider">¡SUSCRITO CON ÉXITO!</p>
              <p className="text-zinc-400 text-sm font-body">Pronto recibirás novedades de Ramses Tatto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="flex-1 bg-transparent border border-zinc-700 text-white placeholder-zinc-600 px-5 py-3 rounded-lg font-body text-sm focus:outline-none focus:border-zinc-400 transition-colors"
              />
              <button
                type="submit"
                className="bg-white text-black px-6 py-3 rounded-lg font-body text-sm font-medium tracking-wider hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shrink-0"
              >
                <Send size={14} />
                SUSCRIBIR
              </button>
            </form>
          )}

          <p className="text-zinc-700 text-xs font-body mt-5 tracking-wider">
            Sin spam. Cancela cuando quieras.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
