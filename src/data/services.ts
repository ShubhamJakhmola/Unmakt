import { Service } from '../types';

export const services: Service[] = [
  {
    id: 1,
    slug: 'service-website-development',
    title: 'Website Development',
    description: 'Crafting stunning, responsive websites that drive results and deliver exceptional user experiences.',
    icon: 'code',
    image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=1200&q=80&fm=webp',
    features: [
      'Custom Web Applications',
      'Responsive Design',
      'E-commerce Solutions',
      'Progressive Web Apps'
    ]
  },
  {
    id: 2,
    slug: 'service-digital-marketing',
    title: 'Digital Marketing',
    description: 'Elevate your brand with data-driven marketing strategies that convert.',
    icon: 'megaphone',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80&fm=webp',
    features: [
      'SEO Optimization',
      'Social Media Marketing',
      'Content Strategy',
      'Performance Tracking'
    ]
  },
  {
    id: 3,
    slug: 'service-cloud-solutions',
    title: 'Cloud Solutions',
    description: 'Reliable, scalable cloud infrastructure to power your digital presence.',
    icon: 'cloud',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80&fm=webp',
    features: [
      'Cloud Migration',
      'Managed Hosting',
      'CDN Integration',
      '24/7 Support'
    ]
  },
  {
    id: 4,
    slug: 'service-analytics-automation',
    title: 'Analytics & AI Automation',
    description: 'Transform your data into actionable insights with intelligent automation solutions.',
    icon: 'brain-circuit',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80&fm=webp',
    features: [
      'Predictive Analytics',
      'Process Automation',
      'Machine Learning Models',
      'Data Visualization'
    ]
  }
];
