import { useEffect, useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';

const heroWords = ['Websites', 'AI Automation', 'Digital Marketing', 'Cloud Ops'];
const heroImage = '/hero.png';
const heroImageWebp = '/hero.webp';

const testimonials = [
  {
    id: 1,
    person: 'Adilson',
    company: 'UsoftSolucoes',
    quote:
      '"It was effortless collaborating with Unmakt. They anticipated blockers, kept us updated daily, and delivered our launch a full week ahead of schedule."',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAABAlBMVEX++fP/+vT/+fL/+fX//PX//PP/+/H//fj//valz72Duqbm8emu2O2OyOfq9fL///nHx8vr6eRao4cAfEnd6d///vRnuOcAmuTi7fAlQUnp6OIlPEyvsrQrRFExR1f///yNkZZyg4ve3teDjI////8AnuRpdnyhpqdNYGpYaG/U19MPLUJham2Ll58AGTL//fYAf1UiNUr//PkmOUaLl5RcnJMAg0sbk9P649KqsLYAIjlbZHNylKwAdmh4tp3Y4OKOfYTAzdMAPnoAVnsAb6lDmc3sgESuxbfL2s+JoaoqS28vbpaEh53rbjf84daGrZmXt6mQtaN5oZD2v6ZhkX++0sqhKdgsAAABYklEQVR4AWyOhQECMBDEkgpu+y+L/OGQyrvwgWAUjYA36QM0ma0U8TMoRkDUDyhKJJ/g4/5BI/iL+bttQKPzIN4S0zEZi97iNfsvy1ytN9vmbn8YQ8cRFR2nC5nEgOAwEJw4x83Wja1DrbPrxv9/ytldjo0RAYBK5QpRrdUbqCmKkqyoGAHSdMO07G+m0+AVEauuh5DlB+HR8cmp3Hpltis0X3NETcK407U6Qs/uy0aIfZsAbTB80xyNNX8yCULRl8/wueAKWMI08BeXV9Vr52bcAl0HwfK00JBtWWx5Mg+t27v7+4fHJ1SdTm1UMbUu0mahzSEeEcB054vlar3hu9FsGk+TWRzN4niaxjEHAEx1nGUsTRKzPJ1GSRJFZhSnSZED/V6VKke8vnt73QoHIkyLQ8yJsEe9F+ujrAT90dFWiwYa+FeLPz35B32MxjaXgL+MLebLMADlkoT1MeKShjsZAJlYJPjacCuzAAAAAElFTkSuQmCC'
  },
  {
    id: 2,
    person: 'Hassan Qureshi',
    company: 'Salam Logistics',
    quote:
      '"Professional, proactive, and calm under pressure. The team handled every change request gracefully and wrapped the project before the deadline."',
    image: 'https://salam-logistic.com/wp-content/uploads/2025/06/Logo-Salam-Logistic-coleur.jpg'
  },
  {
    id: 3,
    person: 'Shubham',
    company: 'Nutrihealthmania',
    quote:
      '"The site looks decent overall. Let’s keep refining it step by step to make it even better. Looking forward to working more with you guys. Thank you!"',
    image: 'https://lh3.googleusercontent.com/a/ACg8ocKDvkpfArH4CSE6PEk4JdJ7MONMdFFXs5CsWbMMY5oM3gQjSJ8=s360-c-no'
  }
];

export default function Home() {
  const [activeWord, setActiveWord] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Create extended testimonials array for infinite loop effect
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % heroWords.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle infinite loop reset
  useEffect(() => {
    if (currentSlide === testimonials.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
        setTimeout(() => {
          setIsTransitioning(true);
        }, 50);
      }, 500);
    }
  }, [currentSlide]);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setIsTransitioning(false);
      setCurrentSlide(testimonials.length);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentSlide(testimonials.length - 1);
      }, 50);
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-white">
      <section className="relative min-h-screen flex items-center px-4 pt-24 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-20 w-96 h-96 bg-unmakt-2/40 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-[32rem] h-[32rem] bg-unmakt-2/40 blur-3xl rounded-full" />
        </div>
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight break-words">
              Ship bold,
              <span className="block whitespace-normal">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-unmakt-1 via-unmakt-2 to-unmakt-3 break-words">
                  {heroWords[activeWord]}
                </span>{' '}
                faster than ever.
              </span>
            </h1>
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-unmakt-1/90">Modern Infrastructure for Modern Minds</p>
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
                onClick={() => window.open('https://calendly.com/unmakt-info/30min', '_blank', 'noopener,noreferrer')}
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Everything you need to scale</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Deep partnerships across product, automation, marketing, and infrastructure with a single team managing the hand-offs.
          </p>
        </div>
      </section>

      {services.map((service, index: number) => (
        <ServiceCard key={service.id} service={service} index={index} />
      ))}

      <section className="tech-surface-light py-20 px-4">
        <div className="tech-surface__inner max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Our happy customers</h2>
            
          </div>

          {/* Carousel Container */}
          <div className="relative max-w-6xl mx-auto px-12">
            {/* Carousel Wrapper */}
            <div className="overflow-hidden">
              <div
                className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
                style={{ transform: `translateX(-${currentSlide * 50}%)` }}
              >
                {extendedTestimonials.map((testimony, idx) => (
                  <div key={`${testimony.id}-${idx}`} className="w-full md:w-1/2 flex-shrink-0 px-3">
                    <article
                      className="rounded-3xl border border-gray-200 p-6 md:p-8 flex flex-col gap-6 transition-all duration-300 bg-white hover:border-unmakt-2/40 group h-full"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={testimony.image}
                          alt={`${testimony.person} portrait`}
                          className="w-16 h-16 rounded-full object-cover ring-2 ring-unmakt-2/60 group-hover:ring-4 group-hover:ring-unmakt-2 transition-all duration-300"
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
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        {testimony.quote}
                      </p>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-unmakt-2 group z-10"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-6 h-6 text-gray-700 group-hover:text-unmakt-2 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-unmakt-2 group z-10"
              aria-label="Next testimonial"
            >
              <svg
                className="w-6 h-6 text-gray-700 group-hover:text-unmakt-2 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide % testimonials.length === index
                      ? 'w-8 h-3 bg-gradient-to-r from-unmakt-1 via-unmakt-2 to-unmakt-3'
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-[60vh] flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to build something amazing?
          </h2>
          <p className="text-xl text-gray-300">
            Share your goals and we'll orchestrate the right mix of talent to deliver end-to-end.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'contact' }))}
              className="inline-flex justify-center px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              Contact Us
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