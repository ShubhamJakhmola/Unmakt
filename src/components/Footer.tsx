import { Mail, MapPin, Phone, Linkedin, Twitter } from 'lucide-react';

const COMMUNITY_INVITE_URL = 'https://discord.gg/hHvRzMxw';

const quickLinks = [
  { label: 'Home', action: () => window.dispatchEvent(new CustomEvent('navigate', { detail: 'home' })) },
  { label: 'About', action: () => window.dispatchEvent(new CustomEvent('navigate', { detail: 'about' })) },
  { label: 'Join Community', action: () => window.dispatchEvent(new CustomEvent('navigate', { detail: 'join' })) }
];

const scrollToServices = () => {
  window.dispatchEvent(new CustomEvent('navigate', { detail: 'home' }));
  setTimeout(() => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 200);
};

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
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition"
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
                  className="hover:text-white transition"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <button onClick={scrollToServices} className="hover:text-white transition">
                Services
              </button>
            </li>
            <li>
              <a
                href={COMMUNITY_INVITE_URL}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition inline-flex items-center gap-2"
              >
                Join Community
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex gap-3">
              <Mail size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
              hello@unmakt.com
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
              +1 (415) 555-0149
            </li>
            <li className="flex gap-3">
              <MapPin size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
              Remote collective • Available worldwide
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Stay in the loop</h3>
          <p className="text-gray-400 mb-4">
            Get quarterly insights on emerging tech, AI automation, and growth tactics.
          </p>
          <form className="space-y-3">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="button"
              className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 font-semibold hover:shadow-lg transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Unmakt. All rights reserved.
      </div>
    </footer>
  );
}

