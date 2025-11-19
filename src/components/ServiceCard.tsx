import { Code, BrainCircuit, Megaphone, Cloud, CheckCircle } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const iconMap = {
  code: Code,
  'brain-circuit': BrainCircuit,
  megaphone: Megaphone,
  cloud: Cloud
};

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = iconMap[service.icon as keyof typeof iconMap];
  const isEven = index % 2 === 0;
  const sectionId = `service-${service.id}`;

  return (
    <section id={sectionId} className="py-20 px-4">
      <div
        className={`max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center ${
          isEven ? '' : 'lg:grid-flow-dense'
        }`}
      >
        <div className={`space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-unmakt-1 via-unmakt-2 to-unmakt-3 text-white shadow-lg shadow-unmakt-2/30">
            <Icon size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {service.title}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {service.description}
          </p>
          <div className="space-y-3">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-unmakt-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={service.image}
              alt={service.title}
              className="h-[420px] w-full object-cover"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/40 via-transparent to-slate-950/70" />
          </div>
        </div>
      </div>
    </section>
  );
}
