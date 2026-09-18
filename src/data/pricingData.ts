export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  description: string;
  badge?: string;
  popular?: boolean;
  fixedPrice: number;
  retainerPrice: number;
  currency: string;
  turnaround: string;
  deliverables: string[];
  ctaText: string;
  highlightColor: string;
  paymentUrl?: string;
}

export interface PricingAddon {
  title: string;
  rate: string;
  description: string;
}

export interface PricingFAQ {
  question: string;
  answer: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter-mvp',
    name: 'Starter MVP',
    tagline: 'High-Converting Landing & MVP',
    description: 'Perfect for startups, founders, and creators wanting rapid market validation and a polished web presence.',
    fixedPrice: 250,
    retainerPrice: 380,
    currency: '$',
    turnaround: '3 – 5 business days',
    highlightColor: 'from-blue-500 to-indigo-600',
    deliverables: [
      'Custom modern web app (React 19, TypeScript, Tailwind CSS)',
      'Ultra-fast Vite build, responsive mobile-first UI layout',
      'SEO meta tags, OpenGraph cards & Core Web Vitals optimization',
      'Contact inquiry form integration & Netlify/Vercel deployment',
      'Full Git repository handoff with clean documentation',
      '14 days post-launch bug fixing & maintenance warranty',
    ],
    ctaText: 'Choose Starter',
    paymentUrl: 'https://link.payway.com.kh/aba?id=18E2ED0EE307&code=461423&acc=093949145&dynamic=true',
  },
  {
    id: 'pro-fullstack',
    name: 'Full-Stack SaaS',
    tagline: 'End-to-End Application & Dashboard',
    description: 'Comprehensive web application with custom backend APIs, database management, and interactive admin controls.',
    badge: 'Most Popular',
    popular: true,
    fixedPrice: 560,
    retainerPrice: 790,
    currency: '$',
    turnaround: '1 – 2 weeks',
    highlightColor: 'from-indigo-600 to-purple-600',
    deliverables: [
      'Everything in Starter MVP',
      'Full-stack backend architecture (Express.js / Node.js or Laravel)',
      'Relational or document database schema (PostgreSQL / Firestore)',
      'Role-based access control (RBAC) & secure authentication',
      'Interactive admin dashboard with real-time KPI data visualizations',
      'REST API design with OpenAPI documentation & rate limiting',
      'Docker container setup & automated Cloud Run / VPS deployment',
      '30 days dedicated support & maintenance warranty',
    ],
    ctaText: 'Choose Full-Stack',
  },
  {
    id: 'ai-enterprise',
    name: 'AI & Enterprise',
    tagline: 'Autonomous AI Agents & Scale',
    description: 'Advanced AI system integration, intelligent agent loops, vector search, and high-concurrency cloud architecture.',
    badge: 'Advanced AI',
    fixedPrice: 890,
    retainerPrice: 1250,
    currency: '$',
    turnaround: '2 – 3 weeks',
    highlightColor: 'from-purple-600 to-pink-600',
    deliverables: [
      'Everything in Full-Stack SaaS',
      'Google Gemini, OpenAI & Claude API integration with streaming UI',
      'Autonomous agent loops, tool-calling & workflow automation',
      'RAG architecture with vector embeddings & semantic search',
      'Performance tuning: caching layers (Redis) & p99 latency reduction',
      'Automated CI/CD testing pipelines with GitHub Actions',
      'Enterprise architectural review, security hardening & 60-day SLA support',
    ],
    ctaText: 'Choose Enterprise',
  },
];

export const PRICING_ADDONS: PricingAddon[] = [
  {
    title: 'Hourly Technical Consulting',
    rate: '$85 / hr',
    description: '1-on-1 code reviews, architectural advice, system debugging, and technology stack selection.',
  },
  {
    title: 'Emergency 48-Hour Sprint',
    rate: '+$350',
    description: 'Dedicated priority queue with expedited delivery within 48 hours for urgent launch milestones.',
  },
  {
    title: 'Monthly Cloud & App Maintenance',
    rate: '$250 / mo',
    description: 'Ongoing server monitoring, dependency security updates, weekly backups, and uptime guarantee.',
  },
];

export const PRICING_GUARANTEES = [
  {
    title: '100% IP Ownership',
    description: 'Full intellectual property and clean Git source code are transferred to you upon project sign-off.',
  },
  {
    title: 'Milestone-Based Billing',
    description: '50% initial kickoff deposit and 50% only when all agreed milestones are thoroughly tested and delivered.',
  },
  {
    title: 'Free Discovery Call',
    description: 'A complimentary 30-minute technical discovery session to clarify requirements and architectural scope.',
  },
];
