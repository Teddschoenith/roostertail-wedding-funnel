'use client'

import { useState, useEffect, useRef } from 'react'
import SlideWrapper from '@/components/funnel/SlideWrapper'
import { useFunnelStore } from '@/lib/funnel-store'
import { getHeadlineVariant, getHeadline, type HeadlineVariant } from '@/lib/ab-test'
import FAQ from '@/components/funnel/FAQ'

/* Google-style detailed star SVG */
function StarIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="starGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FFB300" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L14.944 8.856L22 9.644L16.8 14.544L18.18 22L12 18.28L5.82 22L7.2 14.544L2 9.644L9.056 8.856L12 2Z"
        fill="url(#starGold)"
        stroke="#E6A800"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FiveStars({ size = 20 }: { size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} size={size} />
      ))}
    </div>
  )
}

export default function S1_Landing() {
  const { goNext, setAnswer } = useFunnelStore()
  const [beenBefore, setBeenBefore] = useState<string | null>(null)
  const [variant, setVariant] = useState<HeadlineVariant>('A')
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = getHeadlineVariant()
    setVariant(v)
    setAnswer('headlineVariant', v)
  }, [])

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <SlideWrapper>
      {/* ===== HERO ===== */}
      <section className="min-h-[100dvh] md:[min-height:auto] flex flex-col justify-center px-6 py-12 md:py-20 bg-white">
        <div className="md:max-w-3xl md:mx-auto md:w-full">
          <p className="text-accent text-xs md:text-sm font-semibold tracking-widest uppercase mb-4 text-center">
            Detroit&apos;s Waterfront Venue &middot; Est. 1958
          </p>

          <h1 className="font-display text-[2rem] md:text-5xl leading-[1.15] font-bold text-black mb-6 text-center">
            {getHeadline(variant)}
          </h1>

          <p className="text-black font-semibold text-lg mb-4 text-center">
            Have you ever been to a Roostertail wedding?
          </p>

          <div className="flex gap-3 md:gap-5 md:max-w-lg md:mx-auto">
            {[
              { label: 'Yes!', img: '/images/champagne-tower-bride-pouring.webp' },
              { label: 'Not yet', img: '/images/couple-dock-waterfront-golden-hour.webp' },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() => {
                  setBeenBefore(opt.label)
                  setAnswer('beenBefore', opt.label)
                  setTimeout(goNext, 400)
                }}
                className={`
                  flex-1 overflow-hidden rounded-2xl
                  hover:shadow-xl hover:scale-[1.02] active:scale-[0.97] transition-all
                  ${beenBefore === opt.label
                    ? 'ring-3 ring-blue ring-offset-2 shadow-lg'
                    : 'shadow-sm md:shadow-md'
                  }
                `}
              >
                <img
                  src={opt.img}
                  alt={opt.label}
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="py-3 px-3 text-center font-bold text-base bg-blue text-white">
                  {opt.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VIDEO SECTION ===== */}
      <section className="bg-light-gray py-12 md:py-16 px-6 text-center">
        <div className="md:max-w-4xl md:mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-black mb-2">
            See what your wedding day could look like
          </h2>
          <div className="animate-bounce mt-2 mb-6 inline-block">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C9A96E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-lg md:shadow-xl group cursor-pointer" onClick={!isPlaying ? handlePlayClick : undefined}>
            <video
              ref={videoRef}
              className="w-full aspect-video"
              poster="/images/wedding-highlight-poster.jpg"
              controls={isPlaying}
              playsInline
              preload="none"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/wedding-highlight.mp4" type="video/mp4" />
            </video>
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all flex items-center justify-center shadow-2xl">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 md:w-[44px] md:h-[44px]"
                  >
                    <path d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z" fill="#1a1a1a" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF BAR ===== */}
      <section className="bg-white py-10 md:py-14 px-6 text-center">
        <div className="flex justify-center mb-3">
          <FiveStars size={28} />
        </div>
        <p className="text-black font-bold text-2xl md:text-3xl mb-1">Over 1,000 five-star reviews</p>
        <p className="text-muted text-sm md:text-base mt-2">
          The only wedding venue in Detroit with this many five-star reviews.
        </p>
      </section>

      {/* ===== WHAT TO EXPECT ===== */}
      <section className="bg-light-gray py-12 md:py-16 px-6">
        <div className="md:max-w-5xl md:mx-auto">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
            What you get
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-black mb-2">
            What can you expect from The Roostertail?
          </h2>
          <p className="text-muted text-sm mb-8">
            More is included, so there&apos;s less to manage.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { icon: '🍽️', title: 'Plated or buffet dinner', desc: 'Chef-prepared, your choice' },
              { icon: '🥂', title: 'In-house bar service', desc: 'Open bar, cash bar, or custom packages' },
              { icon: '🪑', title: 'Tables, chairs & linens', desc: 'Chiavari chairs, chargers, all of it' },
              { icon: '👔', title: 'Professional service staff', desc: 'Venue setup, service, and breakdown' },
              { icon: '💡', title: 'Permanently installed LED lighting', desc: 'Custom colors and effects, DJ-ready' },
              { icon: '🅿️', title: 'On-site guest parking', desc: 'Convenient self-parking included' },
              { icon: '🌅', title: 'Waterfront access', desc: 'Right on the Detroit River' },
              { icon: '🏡', title: 'Private patio', desc: 'Exclusive outdoor space for your guests' },
              { icon: '📋', title: 'Venue coordinator', desc: 'Your point person for venue planning and logistics' },
              { icon: '💍', title: 'Ceremony on-site', desc: 'Outdoor ceremony options with weather backup' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-4">
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <p className="font-semibold text-sm text-black">{item.title}</p>
                <p className="text-muted text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-white py-12 md:py-16 px-6">
        <div className="md:max-w-5xl md:mx-auto">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
            Real couples
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-black mb-8">
            What couples love about us
          </h2>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {[
              {
                quote: "honestly we visited five other venues and none of them even came close. what we wanted was there, the water, the experience, and the trust that this was going to be the best night of our lives. it was.",
                name: 'Eliane & Paul',
                detail: '',
                img: '/images/couple-dock-waterfront-golden-hour.webp',
              },
              {
                quote: "our coordinator was amazing like she remembered every little detail we told her months ago. the day of we didnt have to think about anything we just showed up and had the best night of our lives",
                name: 'Emma & Emily',
                detail: '',
                img: '/images/outdoor-waterfront-ceremony-aisle.webp',
              },
              {
                quote: "i went into my wedding journey thinking i was going to be super stressed. i was reassured from the moment i got there that stress wasn't an option. so much of the stress in weddings was handled by them. it was my wedding day when i realized i made two of the best decisions of my life.",
                name: 'Lindsey & Ryan',
                detail: '',
                img: '/images/couple-walking-dock-string-lights.webp',
              },
            ].map((t) => (
              <div key={t.name} className="bg-light-gray rounded-2xl overflow-hidden md:flex-1">
                <img src={t.img} alt={t.name} className="w-full aspect-[16/9] object-cover" loading="lazy" />
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <FiveStars size={14} />
                  </div>
                  <p className="text-black/80 text-sm italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA right after reviews */}
          <div className="md:flex md:justify-center mt-8">
            <button
              onClick={goNext}
              className="w-full md:w-auto md:px-16 rounded-2xl bg-blue py-4 text-white text-base font-semibold hover:bg-blue-dark active:scale-[0.97] transition-all"
            >
              Let&apos;s get you in touch with a venue coordinator &rarr;
            </button>
          </div>
          <p className="text-muted text-xs mt-3 text-center">Takes less than 60 seconds</p>
        </div>
      </section>

      {/* ===== PHOTO GALLERY ===== */}
      <section className="bg-light-gray py-12 md:py-16 px-6">
        <div className="md:max-w-5xl md:mx-auto">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
            See it for yourself
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-black mb-6">
            Your venue, your vibe
          </h2>

          <div className="grid grid-cols-3 gap-2 md:gap-4">
            {[
              { src: '/images/outdoor-waterfront-ceremony-aisle.webp', alt: 'Outdoor waterfront ceremony' },
              { src: '/images/couple-fountain-night-dramatic.webp', alt: 'Couple by the fountain at night' },
              { src: '/images/first-dance-sunset-windows.webp', alt: 'First dance at sunset' },
              { src: '/images/waterfront-tablescape-chiavari-chairs.webp', alt: 'Waterfront tablescape' },
              { src: '/images/led-dance-floor-the-tail-logo.webp', alt: 'LED dance floor' },
              { src: '/images/venue-exterior-night-fountains.webp', alt: 'The Roostertail at night' },
            ].map((photo, i) => (
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                className={`w-full object-cover rounded-xl md:rounded-2xl ${i === 0 || i === 5 ? 'col-span-2 aspect-[2/1]' : 'aspect-square'}`}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT US ===== */}
      <section className="bg-white py-12 md:py-16 px-6">
        <div className="md:max-w-5xl md:mx-auto md:flex md:gap-12 md:items-center">
          <div className="flex gap-4 mb-6 md:mb-0 md:w-1/2 md:shrink-0">
            <img
              src="/images/hora-chair-dance-celebration.webp"
              alt="Wedding celebration at The Roostertail"
              className="w-1/2 rounded-2xl object-cover aspect-[3/4]"
              loading="lazy"
            />
            <img
              src="/images/saxophonist-florals-waterfront.webp"
              alt="Live saxophonist among florals at The Roostertail"
              className="w-1/2 rounded-2xl object-cover aspect-[3/4]"
              loading="lazy"
            />
          </div>

          <div>
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
              About us
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-black mb-3">
              Detroit&apos;s waterfront event venue since 1958
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed mb-4">
              The Roostertail sits on the Detroit River with panoramic waterfront views that have hosted over 10,000 celebrations. We&apos;re not just a venue - we&apos;re a team that helps bring your day together.
            </p>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              Our venue coordinator and professional staff support you through the planning process and on the day itself. That&apos;s why couples choose us - a beautiful setting with a team behind it.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-light-gray py-12 md:py-16 px-6">
        <div className="md:max-w-2xl md:mx-auto">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3 md:text-center">
            Common questions
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-black mb-6 md:text-center">
            Frequently Asked Questions
          </h2>
          <FAQ />
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-white py-12 md:py-16 px-6 text-center">
        <div className="md:max-w-2xl md:mx-auto">
          <div className="flex justify-center mb-3">
            <FiveStars size={24} />
          </div>
          <p className="text-muted text-xs font-medium mb-6">
            The only wedding venue in Detroit with 1,000+ five-star reviews
          </p>

          <h2 className="font-display text-2xl md:text-3xl font-bold text-black mb-3">
            One beautiful venue.{'\n'}A simpler way to plan.
          </h2>
          <p className="text-muted text-sm mb-6">
            Talk to one of our venue coordinators and see if we&apos;re the right fit for your day.
          </p>
          <button
            onClick={goNext}
            className="w-full md:w-auto md:px-16 rounded-2xl bg-blue py-4 text-white text-base font-semibold hover:bg-blue-dark active:scale-[0.97] transition-all"
          >
            Let&apos;s get you in touch with a venue coordinator &rarr;
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-light-gray py-6 px-6 text-center">
        <p className="text-muted text-xs">The Roostertail &middot; 100 Marquette Dr, Detroit, MI 48214</p>
      </footer>
    </SlideWrapper>
  )
}
