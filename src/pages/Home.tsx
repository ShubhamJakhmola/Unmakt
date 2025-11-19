import { useEffect, useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';

const heroWords = ['Websites', 'AI Automation','Digital Marketing', 'Cloud Ops'];
const heroImage = '/hero.png';

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
              <a
                href="mailto:unmakt.info@gmail.com"
                className="w-full sm:w-auto inline-flex justify-center px-6 sm:px-8 py-3 sm:py-4 border border-white/30 text-white rounded-full font-semibold hover:border-white/70 transition-all text-center"
              >
                Book a strategy call
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative">
              <img
                src={heroImage}
                alt="Analytics dashboard illustration"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/70 via-transparent to-slate-950/80" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.9),_transparent_55%)]" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white" id="services">
        <div className="max-w-6xl mx-auto text-center space-y-4">
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
