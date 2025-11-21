import { useEffect, useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';

const heroWords = ['Websites', 'AI Automation', 'Digital Marketing', 'Cloud Ops'];
const heroImage = '/hero.png';
const heroImageWebp = '/hero.webp';

const testimonials = [
  {
    id: 1,
    person: 'Isabella Mendes',
    company: 'UsoftSolucoes',
    quote:
      '“It was effortless collaborating with Unmakt. They anticipated blockers, kept us updated daily, and delivered our launch a full week ahead of schedule.”',
    image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80&fm=webp'
  },
  {
    id: 2,
    person: 'Hassan Qureshi',
    company: 'Salam Logistics',
    quote:
      '“Professional, proactive, and calm under pressure. The team handled every change request gracefully and wrapped the project before the deadline.”',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80&fm=webp'
  }
];

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeWord, setActiveWord] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % heroWords.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-white">
      <div
        className="fixed top-16 left-0 h-1 bg-gradient-to-r from-unmakt-1 via-unmakt-2 to-unmakt-3 transition-all duration-300 z-40"
        style={{ width: `${scrollProgress}%` }}
      />

      <section className="relative min-h-screen flex items-center px-4 pt-24 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-20 w-96 h-96 bg-unmakt-2/40 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-[32rem] h-[32rem] bg-unmakt-2/40 blur-3xl rounded-full" />
        </div>
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight break-words">
              Ship bold
              <span className="block whitespace-normal">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-unmakt-1 via-unmakt-2 to-unmakt-3 break-words">
                  {heroWords[activeWord]}
                </span>{' '}
                faster than ever.
              </span>
            </h1>
            <p className="text-xs sm:text-sm uppercase tracking-[0.6em] text-unmakt-1/90">Modern Infrastructure for Modern Minds</p>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-full md:max-w-xl break-words">
              Designers, engineers, automation specialists, and marketers working as one squad to launch products, scale growth, and manage cloud infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <button
                onClick={scrollToServices}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-unmakt-1 via-unmakt-2 to-unmakt-3 text-white rounded-full font-semibold hover:shadow-2xl hover:-translate-y-0.5 transition-all text-center"
              >
                View Services
              </button>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'contact' }))}
                className="w-full sm:w-auto inline-flex justify-center px-6 sm:px-8 py-3 sm:py-4 border border-white/30 text-white rounded-full font-semibold hover:border-white/70 transition-all text-center"
              >
                Book a strategy call
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative">
              <picture>
                <source srcSet={heroImageWebp} type="image/webp" />
                <source srcSet={heroImage} type="image/png" />
                <img
                  src={heroImage}
                  alt="Analytics dashboard illustration demonstrating Unmakt capabilities"
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={500}
                />
              </picture>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/70 via-transparent to-slate-950/80" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.9),_transparent_55%)]" />
            </div>
          </div>
        </div>
      </section>

      <section className="tech-surface-light py-16 px-4" id="services">
        <div className="tech-surface__inner max-w-6xl mx-auto text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-unmakt-2 font-semibold">Capabilities</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Everything you need to scale</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Deep partnerships across product, automation, marketing, and infrastructure with a single team managing the hand-offs.
          </p>
        </div>
      </section>

      {services.map((service, index) => (
        <ServiceCard key={service.id} service={service} index={index} />
      ))}

      <section className="tech-surface-light py-20 px-4">
        <div className="tech-surface__inner max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <p className="text-sm uppercase tracking-[0.4em] text-unmakt-2 font-semibold"></p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Our happy customers</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimony) => (
              <article
                key={testimony.id}
                className="bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-6 border border-white/50 hover:border-unmakt-2/30 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={testimony.image}
                    alt={`${testimony.person} portrait`}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-unmakt-2/60"
                    loading="lazy"
                    decoding="async"
                    width={64}
                    height={64}
                  />
                  <div>
                    <p className="text-xl font-semibold text-gray-900">{testimony.person}</p>
                    <p className="text-sm text-gray-500">{testimony.company}</p>
                  </div>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {testimony.quote}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-[60vh] flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to build something amazing?
          </h2>
          <p className="text-xl text-gray-300">
            Share your goals and we’ll orchestrate the right mix of talent to deliver end-to-end.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'contact' }))}
              className="inline-flex justify-center px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              Email the team
            </button>
            <button
              onClick={scrollToServices}
              className="inline-flex justify-center px-8 py-4 border border-white/40 rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              Browse services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
