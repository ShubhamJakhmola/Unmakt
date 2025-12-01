import { Menu, X, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
  const servicesButtonRef = useRef<HTMLButtonElement | null>(null);
  const servicesMenuRef = useRef<HTMLDivElement | null>(null);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'join', label: 'Join Community' }
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleServicesNavigate = (destination: string) => {
    handleNavigate(destination);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 120);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (!servicesOpen) return;
      const target = event.target as Node;
      if (
        servicesButtonRef.current?.contains(target) ||
        servicesMenuRef.current?.contains(target)
      ) {
        return;
      }
      setServicesOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesOpen(false);
        setMobileServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickAway);
    document.addEventListener('keyup', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickAway);
      document.removeEventListener('keyup', handleEscape);
    };
  }, [servicesOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-black/30 backdrop-blur-xl border-transparent shadow-none'
          : 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-3"
            aria-label="Go to Unmakt home"
          >
            <img
              src="/Unmakt.png"
              alt="Unmakt logo"
              width={128}
              height={128}
              className={`h-12 md:h-16 w-auto max-h-16 object-contain transition-all duration-500 ease-out ${
                scrolled
                  ? 'mix-blend-normal scale-105 drop-shadow-[0_0_30px_rgba(14,165,233,0.85)] saturate-150 brightness-110'
                  : 'mix-blend-multiply drop-shadow-lg'
              }`}
            />
          </button>

          <div className={`hidden md:flex items-center space-x-8 transition-colors ${scrolled ? 'text-white' : 'text-gray-900'}`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-unmakt-2 rounded px-1 py-0.5 ${
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
                ref={servicesButtonRef}
                type="button"
                className="flex items-center gap-2 text-current hover:text-unmakt-2 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-unmakt-2 rounded"
                aria-haspopup="menu"
                aria-expanded={servicesOpen}
                aria-controls="desktop-services-menu"
                onClick={() => setServicesOpen((prev) => !prev)}
                onFocus={() => setServicesOpen(true)}
              >
                Services
                <ChevronDown
                  size={16}
                  className={`transition-transform ${servicesOpen ? 'rotate-180 text-unmakt-2' : ''}`}
                />
              </button>
              {servicesOpen && (
                <div className="absolute right-0 top-full pt-3">
                  <div
                    id="desktop-services-menu"
                    ref={servicesMenuRef}
                    role="menu"
                    aria-label="Services"
                    className="w-64 rounded-2xl border border-gray-100 bg-white shadow-2xl p-4 space-y-1 text-gray-900"
                  >
                    {services.map((service) => (
                      <button
                          key={service.id}
                          onClick={() => handleServicesNavigate(service.slug)}
                          className="block w-full text-left px-3 py-2 rounded-xl text-sm text-gray-900 hover:bg-unmakt-1/10 hover:text-unmakt-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-unmakt-2"
                          role="menuitem"
                        >
                          {service.title}
                        </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {isAuthenticated && (
              <button
                onClick={() => handleNavigate('dashboard')}
                className="ml-4 px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold hover:border-unmakt-2 hover:text-unmakt-2 transition"
              >
                Dashboard
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            className="md:hidden p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-unmakt-2 rounded"
            aria-label="Toggle menu"
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
            {isAuthenticated && (
              <button
                onClick={() => handleNavigate('dashboard')}
                  className="block w-full text-left px-4 py-2 rounded-lg border border-gray-100 font-semibold text-unmakt-dark hover:bg-unmakt-1/10"
              >
                Dashboard
              </button>
            )}
            <div className="border-t border-gray-100 pt-4">
              <button
                onClick={() => setMobileServicesOpen((prev) => !prev)}
                className="flex w-full items-center justify-between px-4 py-2 rounded-lg text-unmakt-dark hover:bg-unmakt-1/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-unmakt-2"
                aria-expanded={mobileServicesOpen}
                aria-controls="mobile-services-menu"
              >
                <span>Services</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileServicesOpen && (
                <div id="mobile-services-menu" className="mt-2 space-y-2">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServicesNavigate(service.slug)}
                      className="block w-full text-left px-6 py-2 rounded-lg text-gray-600 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-unmakt-2"
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
