import { Mail, MapPin, Phone, Linkedin, Twitter } from 'lucide-react';
const quickLinks = [
  { label: 'Home', action: () => window.dispatchEvent(new CustomEvent('navigate', { detail: 'home' })) },
  { label: 'About Us', action: () => window.dispatchEvent(new CustomEvent('navigate', { detail: 'about' })) },
  { label: 'Contact Us', action: () => window.dispatchEvent(new CustomEvent('navigate', { detail: 'contact' })) },
  { label: 'Privacy Policy', action: () => window.dispatchEvent(new CustomEvent('navigate', { detail: 'privacy' })) },
  { label: 'Terms & Conditions', action: () => window.dispatchEvent(new CustomEvent('navigate', { detail: 'terms' })) }
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <img src="/Unmakt.png" alt="Unmakt logo" className="h-12 w-auto" />
          <p className="text-gray-400">
            Strategy, design, engineering, marketing, and cloud expertise inside one collaborative collective.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/unmaktofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition bg-unmakt-dark-2/20"
              aria-label="Unmakt on LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://x.com/UnmaktInfo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition bg-unmakt-dark-2/20"
              aria-label="Unmakt on X (Twitter)"
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={link.action}
                  className="hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-unmakt-2 rounded"
                >
                  {link.label}
                </button>
              </li>
            ))}
            {/* external Discord invite removed here to avoid duplicate 'Join Community' — social icons remain */}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex gap-3">
              <Mail size={18} className="text-unmakt-2 flex-shrink-0 mt-0.5" />
              unmakt.info@gmail.com
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="text-unmakt-2 flex-shrink-0 mt-0.5" />
              +1 (555)123-4567
            </li>
            <li className="flex gap-3">
              <MapPin size={18} className="text-unmakt-2 flex-shrink-0 mt-0.5" />
              Remote collective • Available worldwide
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Ready to talk?</h3>
          <p className="text-gray-400 mb-4">
            Share your roadmap and we’ll assemble the right squad for a tailored plan.
          </p>
          <a
            href="https://calendly.com/unmakt-info/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-unmakt-1 via-unmakt-2 to-unmakt-3 font-semibold hover:shadow-lg transition text-white text-center"
          >
            Book a discovery call
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Unmakt. All rights reserved.
      </div>
    </footer>
  );
}

