import { Users, Target, Zap, Heart } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Expert-Driven',
      description: 'Our team consists of seasoned professionals with years of industry experience.'
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'We leverage cutting-edge technologies to deliver modern solutions.'
    },
    {
      icon: Heart,
      title: 'Client-Focused',
      description: 'Your success is our success. We build lasting partnerships.'
    },
    {
      icon: Users,
      title: 'Collaborative',
      description: 'We work as an extension of your team to achieve shared goals.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-6 mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            About <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Unmakt</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a collective of passionate experts united by a common goal:
            to help businesses thrive in the digital age through innovative technology solutions.
          </p>
        </div>

        <div className="mb-20 bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
            <p>
              Unmakt was founded on the belief that exceptional digital solutions require
              more than just technical expertise they require a deep understanding of business
              needs, creative problem-solving, and a commitment to excellence.
            </p>
            <p>
              Our diverse team brings together specialists in web development, artificial
              intelligence, digital marketing, and cloud infrastructure. Together, we create
              comprehensive solutions that drive real business results.
            </p>
            <p>
              We don't just build products; we build partnerships. Every project is an
              opportunity to combine our expertise with your vision to create something
              truly remarkable.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white mb-4">
                  <value.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl shadow-xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-xl mb-8 opacity-90">
            We're always looking for talented individuals to join our collective.
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'join' }))}
            className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
