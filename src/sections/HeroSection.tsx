import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, ChevronDown, CalendarCheck } from 'lucide-react'
import { searchVideos, getBestVideoFile } from '../data/pexels'

const FALLBACK_VIDEO = 'https://player.vimeo.com/external/292490785.hd.mp4?s=e7e84c2e2eb8ff4c2a33e6d99b9e57f61fd8ffd4&profile_id=175&oauth2_token_id=57447761'
const WA_LINK = 'https://wa.me/584141699512?text=Hola%20Ana%2C%20me%20interesa%20agendar%20una%20cita'
const GOLD = 'linear-gradient(135deg, #E8D48B 0%, #D4AF37 45%, #C9A961 75%, #C0C0C0 100%)'

const STATS = [
  { value: '500+', label: 'Clientas felices' },
  { value: '3+',   label: 'Años de experiencia' },
  { value: '6',    label: 'Servicios especializados' },
  { value: '100%', label: 'Pigmentos certificados' },
]

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoSrc, setVideoSrc] = useState('')
  const [vis, setVis]       = useState(false)
  const [btnVis, setBtnVis] = useState(false)
  const [statsVis, setStatsVis] = useState(false)

  useEffect(() => {
    searchVideos('beauty salon woman makeup', 3)
      .then(videos => {
        setVideoSrc(videos.length > 0 ? getBestVideoFile(videos[0]) : FALLBACK_VIDEO)
      })
      .catch(() => setVideoSrc(FALLBACK_VIDEO))

    setTimeout(() => setVis(true),      200)
    setTimeout(() => setBtnVis(true),   900)
    setTimeout(() => setStatsVis(true), 1300)
  }, [])

  const fade = (delay: number, extra = '') =>
    `transition-all duration-700 ${extra} ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-x-hidden"
      style={{ background: '#0A0A0A' }}
    >
      {/* Background video / image */}
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.28 }}
        />
      ) : (
        <img
          src="/ana.png"
          alt="Miami Stylls"
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ opacity: 0.32 }}
        />
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

      {/* Gold line top */}
      <div
        className="absolute top-0 inset-x-0 h-0.5 z-10"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 40%, #C0C0C0 70%, transparent)' }}
      />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-10">

        {/* ── BIG TITLE ── */}
        <h1
          className="font-display italic leading-none mb-4 select-none w-full px-4"
          style={{
            fontSize: 'clamp(4rem, 14vw, 13rem)',
            background: GOLD,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'scale(0.92)',
            transition: 'opacity 900ms ease 200ms, transform 900ms ease 200ms',
            textShadow: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          Miami<br />Stylls
        </h1>

        {/* Tagline */}
        <p
          className="font-body text-white/55 tracking-[0.3em] uppercase text-sm md:text-base font-light mb-1"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(12px)',
            transition: 'opacity 700ms ease 550ms, transform 700ms ease 550ms',
          }}
        >
          Realza tu belleza natural
        </p>
        <p
          className="font-body text-white/30 text-xs tracking-widest mb-8 font-light"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(12px)',
            transition: 'opacity 700ms ease 700ms, transform 700ms ease 700ms',
          }}
        >
          Micropigmentación profesional · Maracaibo, Venezuela
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          style={{
            opacity: btnVis ? 1 : 0,
            transform: btnVis ? 'none' : 'translateY(16px)',
            transition: 'opacity 700ms ease, transform 700ms ease',
          }}
        >
          <Link
            to="/agendar"
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-body text-sm font-semibold tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #C9A961 0%, #D4AF37 100%)',
              color: '#0A0A0A',
              boxShadow: '0 4px 24px rgba(212,175,55,0.45)',
            }}
          >
            <CalendarCheck size={16} />
            Agendar mi cita
          </Link>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-body text-sm font-medium tracking-wider transition-all duration-300 hover:bg-white/15"
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            <MessageCircle size={16} />
            Escribir por WhatsApp
          </a>
        </div>
      </div>

      {/* ── STATS BAR (bottom) ── */}
      <div
        className="relative z-10 w-full px-6 md:px-12 pb-10"
        style={{
          opacity: statsVis ? 1 : 0,
          transform: statsVis ? 'none' : 'translateY(12px)',
          transition: 'opacity 700ms ease, transform 700ms ease',
        }}
      >
        <div
          className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 pt-7"
          style={{ borderTop: '1px solid rgba(212,175,55,0.14)' }}
        >
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <p
                className="font-display italic text-3xl md:text-4xl"
                style={{ color: '#D4AF37' }}
              >
                {s.value}
              </p>
              <p className="font-body text-xs text-white/35 tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10" style={{ opacity: 0.22 }}>
        <ChevronDown size={18} className="text-white animate-bounce" />
      </div>

      {/* Gold line bottom */}
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 40%, #C0C0C0 70%, transparent)' }}
      />
    </section>
  )
}
