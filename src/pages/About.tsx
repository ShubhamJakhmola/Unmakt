import { Users, Target, Zap, Heart } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Expert-Driven',
      description:
        'Our work is rooted in real industry experience, technical skill, and a deep understanding of modern digital needs.'
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description:
        'We embrace new technologies and creative approaches to deliver fresh, future-ready solutions.'
    },
    {
      icon: Heart,
      title: 'Client-Focused',
      description:
        'Your success guides our decisions. We work closely with you to create solutions that truly matter.'
    },
    {
      icon: Users,
      title: 'Collaborative',
      description:
        'We believe the best results come from teamwork—working alongside you, not just for you.'
    }
  ];

  return (
    <div className="tech-surface min-h-screen pt-24 pb-16 px-4">
      <div className="tech-surface__inner max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            About{' '}
            <span className="bg-gradient-to-r from-unmakt-1 via-unmakt-2 to-unmakt-3 bg-clip-text text-transparent">
              Unmakt
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Unmakt is a modern digital services platform built to help individuals,
            creators, and small businesses establish and grow their online presence.
            We focus on simple, clean, and effective digital experiences that make
            technology easy and accessible for everyone.
          </p>
        </div>

        {/* Our Story */}
        <div className="mb-20 bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Our Story
          </h2>

          <div className="space-y-4 text-gray-600 text-lg leading-relaxed text-justify md:text-left">
            <p>
              Unmakt was created with a straightforward belief technology should not
              feel overwhelming or complicated. Whether it's building a website,
              automating workflows, integrating AI, or managing digital presence,
              people deserve solutions that are simple, modern, and genuinely useful.
            </p>

            <p>
              Our team is a blend of developers, designers, cloud specialists, and
              digital strategists. Together, we bring experience from multiple fields
              to craft solutions that are both practical and impactful.
            </p>

            <p>
              Every project at Unmakt is treated as a collaboration. We don't just
              deliver services we build long-term partnerships, helping clients bring
              their ideas to life and supporting them as they grow.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Values
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-unmakt-1 via-unmakt-2 to-unmakt-3 text-white mb-4">
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

        {/* CTA */}
        <div className="bg-gradient-to-br from-unmakt-1 via-unmakt-2 to-unmakt-3 rounded-3xl shadow-xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Growing Community
          </h2>

          <p className="text-xl mb-8 opacity-90">
            Whether you're exploring digital solutions or want to collaborate,
            we’d love to have you with us.
          </p>

          <a
            href="https://discord.gg/hHvRzMxw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center px-8 py-4 bg-white text-unmakt-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-unmakt-2"
          >
            Join our Discord
          </a>
        </div>

      </div>
    </div>
  );
}
