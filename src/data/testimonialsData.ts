export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  companyDomain?: string;
  location: string;
  avatar: string;
  rating: number;
  category: 'FinTech & Banking' | 'Full-Stack Web' | 'AI & Automation' | 'Enterprise POS' | 'Cloud & Systems';
  projectTitle: string;
  projectSnippet: string;
  quote: string;
  metric: {
    value: string;
    label: string;
  };
  tags: string[];
  date: string;
  verified: boolean;
  projectSlug?: string;
}

export interface TestimonialMetricSummary {
  averageRating: number;
  totalReviews: number;
  onTimeDeliveryRate: number;
  repeatHireRate: number;
}

export const TESTIMONIALS_METRICS: TestimonialMetricSummary = {
  averageRating: 5.0,
  totalReviews: 28,
  onTimeDeliveryRate: 100,
  repeatHireRate: 94,
};

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Sopheak Vathana',
    role: 'Chief Technology Officer',
    company: 'Angkor PayTech Solutions',
    companyDomain: 'angkorpaytech.com.kh',
    location: 'Phnom Penh, Cambodia',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    category: 'FinTech & Banking',
    projectTitle: 'ABA PayWay & Bakong KHQR Enterprise Payment Engine',
    projectSnippet: 'High-throughput dynamic QR checkout gateway with cryptographic webhook verification.',
    quote:
      'Kim San architected our core ABA PayWay and Bakong KHQR transaction microservice from the ground up. His deep grasp of cryptographic payment signatures, zero-drop idempotency keys, and instant reconciliation cut our checkout failure rate to zero. He communicates with relentless clarity and delivered 4 days ahead of our launch schedule.',
    metric: {
      value: '99.99%',
      label: 'Payment Gateway Uptime',
    },
    tags: ['ABA PayWay', 'Bakong KHQR', 'Node.js', 'PostgreSQL'],
    date: 'August 2024',
    verified: true,
    projectSlug: 'projects',
  },
  {
    id: 'test-2',
    name: 'Sarah Jenkins',
    role: 'VP of Product Engineering',
    company: 'CloudScale Global',
    companyDomain: 'cloudscale-global.io',
    location: 'Singapore / Remote',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    category: 'Full-Stack Web',
    projectTitle: 'Multi-Tenant SaaS Management & Analytics Portal',
    projectSnippet: 'Full-stack React 19 and Node.js portal with role-based access control and live charts.',
    quote:
      'Working with Kim San has been a breath of fresh air. He does not just code features—he solves business bottlenecks. He transformed our sluggish analytics dashboard into a lightning-fast React application with sub-second page loads and modular Tailwind design systems. Our customer NPS jumped 28 points in our Q3 review.',
    metric: {
      value: '+28 NPS',
      label: 'Customer Satisfaction Score',
    },
    tags: ['React 19', 'Tailwind CSS', 'TypeScript', 'D3.js'],
    date: 'July 2024',
    verified: true,
    projectSlug: 'projects',
  },
  {
    id: 'test-3',
    name: 'Rithy Seng',
    role: 'Managing Director',
    company: 'Premier Retail Group Cambodia',
    companyDomain: 'premierretail.com.kh',
    location: 'Phnom Penh, Cambodia',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    category: 'Enterprise POS',
    projectTitle: 'Real-Time Multi-Branch POS & Inventory Engine',
    projectSnippet: 'High-availability retail POS with offline caching, thermal printing, and barcode processing.',
    quote:
      'Our retail chain needed an agile POS system capable of synchronizing stock across 6 branches in real time while continuing to ring up sales during network blinks. Kim San built an offline-first indexed caching system that synced effortlessly the moment connections resumed. His solution eliminated double-allocations completely.',
    metric: {
      value: '3.4x Faster',
      label: 'Counter Checkout Speed',
    },
    tags: ['Electron', 'React', 'SQLite', 'Offline-First'],
    date: 'May 2024',
    verified: true,
    projectSlug: 'projects',
  },
  {
    id: 'test-4',
    name: 'Dr. David Chen',
    role: 'Head of Applied AI',
    company: 'Nexus Cognitive Labs',
    companyDomain: 'nexuslabs.ai',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    category: 'AI & Automation',
    projectTitle: 'Gemini-Powered Intelligent Document & Invoice Parser',
    projectSnippet: 'Multi-modal document parsing pipeline extracting structured JSON with automated fallback.',
    quote:
      'Kim San is one of the rare full-stack engineers who genuinely understands the operational realities of generative AI and LLM agents. Rather than naive prompt wrappers, he crafted robust schema validations, token optimization layers, and self-healing retries with Google Gemini. The efficiency gains across our intake team were immense.',
    metric: {
      value: '-65%',
      label: 'Manual Data Entry Overhead',
    },
    tags: ['Gemini API', 'LLM Agents', 'Python', 'FastAPI'],
    date: 'March 2024',
    verified: true,
    projectSlug: 'projects',
  },
  {
    id: 'test-5',
    name: 'Dara Chea',
    role: 'Founder & Head of Academics',
    company: 'NextGen International Academy',
    companyDomain: 'nextgenacademy.edu.kh',
    location: 'Siem Reap, Cambodia',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    category: 'Full-Stack Web',
    projectTitle: 'Integrated School & Student Learning Management System',
    projectSnippet: 'Role-based LMS managing admissions, automated grading matrices, and Telegram parent alerts.',
    quote:
      'We entrusted Kim San with designing our complete School ERP and Learning Management Portal. Over 1,200 students and parents use it daily for attendance, grade reporting, and fee payments. The interface is intuitive, beautiful in Khmer and English, and has never experienced a single outage during peak exam periods.',
    metric: {
      value: '1,200+',
      label: 'Active Daily Users',
    },
    tags: ['Next.js', 'PostgreSQL', 'Telegram Bot API', 'Khmer UI'],
    date: 'January 2024',
    verified: true,
    projectSlug: 'projects',
  },
  {
    id: 'test-6',
    name: 'Marcus Lindqvist',
    role: 'Lead Cloud Infrastructure Architect',
    company: 'Nordic Wave Logistics',
    companyDomain: 'nordicwave.eu',
    location: 'Stockholm, Sweden',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    category: 'Cloud & Systems',
    projectTitle: 'Distributed API Gateway & Redis Cache Cluster',
    projectSnippet: 'High-throughput event bus handling cargo telematics and freight dispatch routing.',
    quote:
      'Kim San tuned our Redis caching policies and refactored our database connection pools under heavy load spikes. He dropped our 99th percentile API latency from 380ms to 32ms. His code quality is pristine, properly typed, and documented with genuine craftsmanship. Highly recommended for any serious engineering team.',
    metric: {
      value: '32ms',
      label: 'p99 API Response Latency',
    },
    tags: ['Redis', 'PostgreSQL', 'Docker', 'REST API'],
    date: 'November 2023',
    verified: true,
    projectSlug: 'projects',
  },
];
