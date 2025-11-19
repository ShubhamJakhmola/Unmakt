import { Menu, X, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { services } from '../data/services';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAuthenticated?: boolean;
}

export default function Navigation({ currentPage, onNavigate, isAuthenticated }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'join', label: 'Join Community' }
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleServicesNavigate = (sectionId: string) => {
    handleNavigate('home');
    setServicesOpen(false);
    setMobileServicesOpen(false);
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 250);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 120);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-black/30 backdrop-blur-xl border-transparent shadow-none'
          : 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-3"
            aria-label="Go to Unmakt home"
          >
            <img src="/Unmakt.png" alt="Unmakt logo" className="h-12 md:h-16 w-auto drop-shadow-xl mix-blend-multiply" />
          </button>

          <div className={`hidden md:flex items-center space-x-8 transition-colors ${scrolled ? 'text-white' : 'text-gray-900'}`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`transition-colors ${
                  currentPage === item.id
                    ? 'text-unmakt-2 font-semibold'
                    : 'text-current hover:text-unmakt-2'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="flex items-center gap-2 text-current hover:text-unmakt-2 font-semibold transition-colors"
              >
                Services
                <ChevronDown
                  size={16}
                  className={`transition-transform ${servicesOpen ? 'rotate-180 text-unmakt-2' : ''}`}
                />
              </button>
              {servicesOpen && (
                <div className="absolute right-0 top-full pt-3">
                  <div className="w-64 rounded-2xl border border-gray-100 bg-white shadow-2xl p-4 space-y-1">
                    {services.map((service) => (
                      <button
                          key={service.id}
                          onClick={() => handleServicesNavigate(`service-${service.id}`)}
                          className="block w-full text-left px-3 py-2 rounded-xl text-sm text-current hover:bg-unmakt-1/10 hover:text-unmakt-2 transition"
                        >
                          {service.title}
                        </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavigate(isAuthenticated ? 'dashboard' : 'login')}
              className="ml-4 px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold hover:border-unmakt-2 hover:text-unmakt-2 transition"
            >
              {isAuthenticated ? 'Dashboard' : 'Login'}
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-unmakt-1/10 text-unmakt-2 font-semibold'
                    : 'text-unmakt-dark hover:bg-unmakt-1/10'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavigate(isAuthenticated ? 'dashboard' : 'login')}
                className="block w-full text-left px-4 py-2 rounded-lg border border-gray-100 font-semibold text-unmakt-dark hover:bg-unmakt-1/10"
            >
              {isAuthenticated ? 'Dashboard' : 'Login'}
            </button>
            <div className="border-t border-gray-100 pt-4">
              <button
                onClick={() => setMobileServicesOpen((prev) => !prev)}
                className="flex w-full items-center justify-between px-4 py-2 rounded-lg text-unmakt-dark hover:bg-unmakt-1/10"
              >
                <span>Services</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileServicesOpen && (
                <div className="mt-2 space-y-2">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServicesNavigate(`service-${service.id}`)}
                      className="block w-full text-left px-6 py-2 rounded-lg text-gray-600 hover:bg-blue-50"
                    >
                      {service.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
