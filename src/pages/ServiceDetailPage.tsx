import { ArrowRight, CheckCircle } from 'lucide-react';
import { ServiceDetailContent } from '../data/serviceDetails';

interface ServiceDetailPageProps {
  detail: ServiceDetailContent;
}

export default function ServiceDetailPage({ detail }: ServiceDetailPageProps) {
  const { service, tagline, intro, capabilities, process, outcomes } = detail;

  return (
    <div className="tech-surface min-h-screen pt-24 pb-24 px-4">
      <div className="tech-surface__inner max-w-6xl mx-auto space-y-16">
        <header className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {service.title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>
            <p className="text-base text-gray-500">{tagline}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://calendly.com/unmakt-info/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-unmakt-1 via-unmakt-2 to-unmakt-3 text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Book a discovery call
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-[420px] object-cover"
              loading="lazy"
            />
          </div>
        </header>

        <section className="grid md:grid-cols-2 gap-8">
          {intro.map((paragraph, index) => (
            <p key={index} className="text-lg text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </section>

          <section className="bg-gray-50 rounded-3xl p-8 md:p-12 space-y-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-unmakt-1">
                Capabilities
              </p>
              <h2 className="text-3xl font-bold text-gray-900">What we deliver</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {capabilities.map((capability) => (
              <div
                key={capability.title}
                className="bg-white rounded-2xl border border-white/60 shadow-sm p-6 space-y-4"
              >
                <h3 className="text-2xl font-semibold text-gray-900">{capability.title}</h3>
                <ul className="space-y-3">
                  {capability.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-unmakt-3 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-unmakt-1">
              Service features
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              Core capabilities
            </h2>
            <div className="space-y-3">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-unmakt-3 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-950 text-white rounded-3xl p-8 space-y-6">
            <h3 className="text-2xl font-semibold">Proof of value</h3>
            <p className="text-white/80 leading-relaxed">
              Each engagement ships with KPI tracking, enablement docs, and recorded walkthroughs so your team can scale the work internally after hand-off.
            </p>
            <ul className="space-y-3">
              {outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-unmakt-1 flex-shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white border border-gray-100 rounded-3xl shadow-lg p-8 md:p-12 space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-unmakt-1">Working model</p>
            <h2 className="text-3xl font-bold text-gray-900">Our process together</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {process.map((step) => (
              <div key={step.title} className="rounded-2xl border border-gray-100 p-6 space-y-3">
                <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-br from-unmakt-1 via-unmakt-2 to-unmakt-3 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-white/80">Let’s build</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to align this service with your roadmap?
            </h2>
            <p className="text-white/80 text-lg">
              Share goals, timelines, and success metrics—we’ll assemble a roadmap and squad within 48 hours.
            </p>
          </div>
          <a
            href="https://calendly.com/unmakt-info/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-unmakt-2 font-semibold hover:shadow-2xl hover:-translate-y-0.5 transition-all text-lg"
          >
            Book a discovery call
          </a>
        </section>
      </div>
    </div>
  );
}

