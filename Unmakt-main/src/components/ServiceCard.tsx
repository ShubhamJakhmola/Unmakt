import { Code, BrainCircuit, Megaphone, Cloud, CheckCircle } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const iconMap = {
  'code': Code,
  'brain-circuit': BrainCircuit,
  'megaphone': Megaphone,
  'cloud': Cloud
};

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = iconMap[service.icon as keyof typeof iconMap];
  const isEven = index % 2 === 0;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div
        className={`max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center ${
          isEven ? '' : 'md:grid-flow-dense'
        }`}
      >
        <div className={`space-y-6 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
            <Icon size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            {service.title}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {service.description}
          </p>
          <div className="space-y-3">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${isEven ? 'md:order-2' : 'md:order-1'}`}>
          <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 p-8 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-3xl"></div>
            <div className="relative h-full flex items-center justify-center">
              <Icon size={200} className="text-blue-600 opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
