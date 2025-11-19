import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white">
      <div
        className="fixed top-16 left-0 h-1 bg-gradient-to-r from-unmakt-1 via-unmakt-2 to-unmakt-3 transition-all duration-300 z-40"
        style={{ width: `${scrollProgress}%` }}
      />

      <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-unmakt-1/10 via-white to-unmakt-3/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Transform Your
            <span className="block bg-gradient-to-r from-unmakt-1 via-unmakt-2 to-unmakt-3 bg-clip-text text-transparent">
              Digital Vision
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            A collective of experts delivering cutting-edge solutions in web development,
            AI automation, marketing, and cloud infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-unmakt-1 via-unmakt-2 to-unmakt-3 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Explore Services
            </button>
            <a
              href="#contact"
                className="px-8 py-4 border-2 border-unmakt-2 text-unmakt-2 rounded-full font-semibold hover:bg-unmakt-1/10 transition-all"
            >
              Get Started
            </a>
          </div>
          <div className="pt-12 animate-bounce">
            <ArrowDown className="mx-auto text-gray-400" size={32} />
          </div>
        </div>
      </section>

      {services.map((service, index) => (
        <ServiceCard key={service.id} service={service} index={index} />
      ))}

      <section id="contact" className="min-h-[60vh] flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-gray-300">
            Let's discuss how we can help transform your ideas into reality.
          </p>
          <div className="pt-8">
            <a
              href="mailto:unmakt.info@gmail.com"
              className="inline-block px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
