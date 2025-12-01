import { Service } from '../types';
import { services } from './services';

export interface ServiceDetailContent {
  slug: string;
  service: Service;
  tagline: string;
  intro: string[];
  capabilities: { title: string; items: string[] }[];
  process: { title: string; description: string }[];
  outcomes: string[];
}

const serviceLookup = services.reduce<Record<string, Service>>((acc, service) => {
  acc[service.slug] = service;
  return acc;
}, {});

export const serviceDetailContent: Record<string, ServiceDetailContent> = {
  'service-website-development': {
    slug: 'service-website-development',
    service: serviceLookup['service-website-development']!,
    tagline: 'Design systems, performant builds, and ongoing optimization under one roof.',
    intro: [
      'Launch custom marketing sites, landing pages, or full product experiences with one squad handling discovery, design, engineering, and QA.',
      'We work with modern frameworks and headless CMS platforms so updates are fast, reliable, and easy for your team to own after launch.'
    ],
    capabilities: [
      {
        title: 'Experience & Strategy',
        items: [
          'Brand + UX audits',
          'Design systems & component libraries',
          'Conversion-focused copywriting',
          'Accessibility + localization'
        ]
      },
      {
        title: 'Engineering',
        items: [
          'Next.js / Remix / Astro builds',
          'Headless CMS (Sanity, Contentful, Strapi)',
          'Commerce & membership integrations',
          'Automated testing + CI/CD rollout'
        ]
      }
    ],
    process: [
      { title: '01 • Discovery', description: 'Map user journeys, audit existing assets, and define KPIs together.' },
      { title: '02 • Sprint builds', description: 'Design + engineering sprint pairs to deliver reviewed increments weekly.' },
      { title: '03 • Launch & optimize', description: 'Handle production rollout, analytics wiring, and CRO experiments.' }
    ],
    outcomes: [
      'Responsive experiences that stay fast on any device',
      'Reusable design system assets your team can extend',
      'Analytics + experimentation baked into launch',
      'Hands-on enablement so you can own day-two changes'
    ]
  },
  'service-digital-marketing': {
    slug: 'service-digital-marketing',
    service: serviceLookup['service-digital-marketing']!,
    tagline: 'Acquisition, retention, and creative production aligned to measurable growth.',
    intro: [
      'We audit your funnels, ship fresh creative, and instrument every channel so you know exactly what moves the metrics.',
      'Engage one integrated pod (strategist, media buyer, marketing ops) instead of juggling multiple vendors.'
    ],
    capabilities: [
      {
        title: 'Acquisition',
        items: [
          'Paid search & paid social playbooks',
          'Creative production + ad ops',
          'Landing page + CRO support',
          'Attribution + dashboarding'
        ]
      },
      {
        title: 'Retention & CRM',
        items: [
          'Lifecycle journeys (email/SMS/in-app)',
          'Audience + segment modeling',
          'Marketing automation builds',
          'HubSpot, Klaviyo, Customer.io setup'
        ]
      }
    ],
    process: [
      { title: '01 • Insights', description: 'Channel + data audit with KPI framework and experiment backlog.' },
      { title: '02 • Always-on testing', description: 'Ship creative, copy, and audience tests on a weekly cadence.' },
      { title: '03 • Scale', description: 'Double-down on winners, automate ops, and handoff playbooks.' }
    ],
    outcomes: [
      'Clear dashboards that show how every channel performs',
      'Creative + copy vault that compounds over time',
      'Lifecycle programs that nurture and retain',
      'Marketing automation stack configured for scale'
    ]
  },
  'service-cloud-solutions': {
    slug: 'service-cloud-solutions',
    service: serviceLookup['service-cloud-solutions']!,
    tagline: 'Cloud architecture, security, and SRE support tuned for lean teams.',
    intro: [
      'Whether you are migrating, modernizing, or trying to tame spend, our cloud engineers co-own the roadmap with you.',
      'We operate across AWS, Azure, and GCP with Terraform-first workflows so every change is auditable.'
    ],
    capabilities: [
      {
        title: 'Architecture & Ops',
        items: [
          'Cloud readiness assessments',
          'Landing zones & network design',
          'Cost optimization + FinOps reporting',
          'Observability stack (Grafana, Datadog)'
        ]
      },
      {
        title: 'Automation & Security',
        items: [
          'CI/CD pipelines with policy gates',
          'Disaster recovery + backup automation',
          'Container orchestration (EKS, AKS, GKE)',
          'Security baselines & compliance support'
        ]
      }
    ],
    process: [
      { title: '01 • Assess', description: 'Review workloads, SLAs, and incidents to prioritize quick wins.' },
      { title: '02 • Implement', description: 'Roll out Terraform modules, monitoring, and guardrails incrementally.' },
      { title: '03 • Operate', description: 'Provide runbooks, training, and optional SRE coverage.' }
    ],
    outcomes: [
      'Predictable, version-controlled infrastructure',
      'Visibility into spend and performance',
      'Hardened environments that pass audits',
      'On-call partnership for mission-critical systems'
    ]
  },
  'service-analytics-automation': {
    slug: 'service-analytics-automation',
    service: serviceLookup['service-analytics-automation']!,
    tagline: 'Bring AI + analytics out of slide decks and into day-to-day workflows.',
    intro: [
      'We connect your data sources, design the dashboards stakeholders actually use, and automate repetitive work with AI copilots.',
      'From prompt engineering to production-ready ML, we focus on use-cases that pay for themselves fast.'
    ],
    capabilities: [
      {
        title: 'Analytics Foundation',
        items: [
          'Warehouse setup (Snowflake, BigQuery, Postgres)',
          'ELT pipelines (Fivetran, Airbyte, custom)',
          'Semantic layers & governance',
          'Executive dashboards + self-serve'
        ]
      },
      {
        title: 'Automation & AI',
        items: [
          'Process automation with n8n / Make / Zapier',
          'Custom GPT copilots + RAG workflows',
          'Forecasting + anomaly detection models',
          'Alerting + human-in-the-loop reviews'
        ]
      }
    ],
    process: [
      { title: '01 • Use-case sprint', description: 'Prioritize the insights or automations with highest ROI.' },
      { title: '02 • Data & infra', description: 'Connect sources, model data, and secure access controls.' },
      { title: '03 • Automation launch', description: 'Ship dashboards/agents, monitor adoption, and iterate.' }
    ],
    outcomes: [
      'Single source of truth dashboards teams trust',
      'Automations that free teams from repetitive work',
      'Embedded AI copilots tailored to your workflows',
      'Change management + training for every release'
    ]
  }
};

export const serviceDetailSlugs = Object.keys(serviceDetailContent);

