import { Service } from '../types';

export const services: Service[] = [
  {
    id: 1,
    title: 'Website Development',
    description: 'Crafting stunning, responsive websites that drive results and deliver exceptional user experiences.',
    icon: 'code',
    features: [
      'Custom Web Applications',
      'Responsive Design',
      'E-commerce Solutions',
      'Progressive Web Apps'
    ]
  },
  {
    id: 2,
    title: 'Analytics & AI Automation',
    description: 'Transform your data into actionable insights with intelligent automation solutions.',
    icon: 'brain-circuit',
    features: [
      'Predictive Analytics',
      'Process Automation',
      'Machine Learning Models',
      'Data Visualization'
    ]
  },
  {
    id: 3,
    title: 'Digital Marketing',
    description: 'Elevate your brand with data-driven marketing strategies that convert.',
    icon: 'megaphone',
    features: [
      'SEO Optimization',
      'Social Media Marketing',
      'Content Strategy',
      'Performance Tracking'
    ]
  },
  {
    id: 4,
    title: 'Hosting & Cloud',
    description: 'Reliable, scalable cloud infrastructure to power your digital presence.',
    icon: 'cloud',
    features: [
      'Cloud Migration',
      'Managed Hosting',
      'CDN Integration',
      '24/7 Support'
    ]
  }
];
