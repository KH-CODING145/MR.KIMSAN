/**
 * Detailed Case Studies & Technical Architecture Breakdowns
 * Provides comprehensive blog-style case studies for each portfolio project.
 */

export interface CaseStudyMetric {
  label: string;
  value: string;
  change?: string;
  description: string;
}

export interface CaseStudy {
  projectId: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  publishDate: string;
  author: string;
  role: string;
  targetAudience: string;
  executiveSummary: string;
  challenge: {
    overview: string;
    keyBottlenecks: string[];
  };
  architecture: {
    description: string;
    techStackChoices: {
      technology: string;
      reason: string;
    }[];
  };
  engineeringSolutions: {
    title: string;
    detail: string;
  }[];
  metrics: CaseStudyMetric[];
  keyTakeaways: string[];
}

export const PROJECT_CASE_STUDIES: Record<number, CaseStudy> = {
  1: {
    projectId: 1,
    slug: 'cloudpulse-ai-saas',
    title: 'CloudPulse AI SaaS: Automated Root-Cause Remediation at Scale',
    subtitle: 'How autonomous AI agents reduced P99 latency anomaly resolution from 45 minutes to 4 seconds.',
    category: 'Full Stack & AI',
    publishDate: 'August 2024',
    author: 'Mr. KIM SAN',
    role: 'Lead Cloud Architect & AI Engineer',
    targetAudience: 'DevOps Engineers, Cloud Architects, Technical Leads',
    executiveSummary:
      'CloudPulse is a high-throughput multi-tenant cloud telemetry and microservices management platform. It addresses the overwhelming volume of cloud alerts by combining a high-performance React front-end, a resilient Laravel telemetry ingestion pipeline, and an autonomous Gemini LLM diagnostic agent that auto-evaluates anomalous latency spikes, pinpoints root causes, and executes remediation webhooks.',
    challenge: {
      overview:
        'Distributed cloud infrastructures generate tens of thousands of metric data points per second. Engineering teams suffer from alert fatigue, often taking 30 to 45 minutes to diagnose memory leaks, deadlocked thread pools, or Redis connection saturations across clusters.',
      keyBottlenecks: [
        'Massive telemetry ingestion volume overwhelming traditional database writes',
        'High Mean Time to Detect (MTTD) due to noisy, uncorrelated threshold alerts',
        'Manual intervention required to scale stagnant pod replicas and evict stale sockets',
        'Lack of unified observability dashboard linking frontend UX directly with live pod logs',
      ],
    },
    architecture: {
      description:
        'The system separates real-time metric streams from long-term query storage using an asynchronous event-driven design. Metric payloads stream via WebSocket into Laravel pipeline workers buffered by Redis, while an autonomous Gemini diagnostic loop is triggered whenever rolling P99 deviations exceed dynamic standard deviation thresholds.',
      techStackChoices: [
        {
          technology: 'React 18 + Vite + Tailwind',
          reason: 'Provides zero-latency live telemetry chart updates and high-frequency canvas rendering.',
        },
        {
          technology: 'Laravel & PHP 8.3',
          reason: 'Robust queue workers, dependency injection, and reliable database schema migrations.',
        },
        {
          technology: 'Gemini AI Function Calling',
          reason: 'Enables autonomous diagnostic agent cycles with structured parameter inspection and tool invocation.',
        },
        {
          technology: 'Redis & MySQL',
          reason: 'High-speed buffer caching paired with ACID-compliant multi-tenant persistence.',
        },
      ],
    },
    engineeringSolutions: [
      {
        title: 'Redis Ingestion Buffering & Batch Flushes',
        detail:
          'Implemented an asynchronous ingestion buffer that collects incoming metrics in Redis memory queues, batching database inserts into 500-record chunks every 100ms. This reduced database CPU consumption by 62% during traffic surges.',
      },
      {
        title: 'Gemini Autonomous Diagnostic Agent Loop',
        detail:
          'Constructed an agent loop with tool definitions allowing Gemini to query pod memory, socket counts, and historical baselines. The agent synthesizes telemetry and generates verified mitigation plans within 350ms.',
      },
      {
        title: 'Automated Circuit Breaker & Mitigation Webhook',
        detail:
          'Configured self-healing webhooks to evict stalled sockets and trigger replica autoscaling safely within strict rollback safety gates.',
      },
    ],
    metrics: [
      {
        label: 'Resolution Time',
        value: '4.2s',
        change: '-98.4%',
        description: 'Mean time to diagnose and execute mitigation',
      },
      {
        label: 'Ingestion Throughput',
        value: '45,000/sec',
        change: '+310%',
        description: 'Telemetry events ingested per second per node',
      },
      {
        label: 'Diagnostic Accuracy',
        value: '99.4%',
        change: '+18.2%',
        description: 'Accuracy of automated root-cause identification',
      },
      {
        label: 'Compute Cost',
        value: '-42%',
        change: 'Savings',
        description: 'Infrastructure spend reduction through smart scaling',
      },
    ],
    keyTakeaways: [
      'Asynchronous ingestion pipelines are essential when coupling high-volume metrics with AI reasoning.',
      'Constraining LLM outputs with strict JSON schemas and tool calling eliminates hallucinations in automated remediation.',
      'Dynamic reading expectations help engineering teams quickly assess architectural feasibility.',
    ],
  },

  2: {
    projectId: 2,
    slug: 'devflow-cicd-visualizer',
    title: 'DevFlow: Real-Time Developer Pipeline Architecture',
    subtitle: 'Streamlining multi-stage build orchestration and automated container registry feedback.',
    category: 'React & DevOps',
    publishDate: 'July 2024',
    author: 'Mr. KIM SAN',
    role: 'Frontend Systems Specialist',
    targetAudience: 'Software Engineers, Platform Developers, Release Managers',
    executiveSummary:
      'DevFlow provides a real-time developer workspace visualizing multi-stage CI/CD pipelines, container compilation registries, and test results. It replaced legacy clunky build pages with a responsive, responsive canvas interface that animates state transitions and provides instantaneous build logs.',
    challenge: {
      overview:
        'Development teams were struggling with opaque build failures, navigating buried terminal logs across complex multi-service monorepos with dozens of dependent pipeline stages.',
      keyBottlenecks: [
        'Slow log retrieval rendering thousands of terminal lines in the browser',
        'Complex pipeline graph rendering causing severe DOM lag and re-render thrashing',
        'Absence of immediate rollback triggers from within the pipeline view',
      ],
    },
    architecture: {
      description:
        'DevFlow utilizes a canvas-accelerated Directed Acyclic Graph (DAG) layout engine paired with virtualized terminal window rendering. Node.js backend streams live status chunks over Server-Sent Events (SSE).',
      techStackChoices: [
        { technology: 'React + Motion', reason: 'Fluid node expansions, step animations, and intuitive visual cues.' },
        { technology: 'Virtualized Terminal Engine', reason: 'Renders 100,000+ log lines at constant 60 FPS without memory bloat.' },
        { technology: 'Docker & Node.js', reason: 'Lightweight containerized agent workers tracking git commit hooks.' },
      ],
    },
    engineeringSolutions: [
      {
        title: 'Virtual DOM Log Windowing',
        detail: 'Employed windowed buffer slicing to only mount visible log rows in the active viewport.',
      },
      {
        title: 'Optimistic Status Updates',
        detail: 'Applied optimistic pipeline state prediction so users receive immediate UI feedback while container hooks synchronize.',
      },
    ],
    metrics: [
      { label: 'Build Feedback Delay', value: '45ms', change: '-85%', description: 'Time from stage trigger to live visual update' },
      { label: 'DOM Node Count', value: '< 250', change: '-70%', description: 'Maintained lightweight memory footprint during big builds' },
      { label: 'Developer Velocity', value: '+35%', change: 'Productivity', description: 'Faster identification of broken unit test suites' },
    ],
    keyTakeaways: [
      'DOM virtualization is mandatory for any developer tool displaying terminal logs.',
      'Clear visual pipeline topologies drastically reduce cognitive load for engineering teams.',
    ],
  },

  3: {
    projectId: 3,
    slug: 'apexcraft-ecommerce-engine',
    title: 'ApexCraft: High-Concurrency E-Commerce REST Engine',
    subtitle: 'Building a transactional e-commerce backbone with Stripe webhook reconciliation and atomic stock locks.',
    category: 'Laravel & Backend',
    publishDate: 'May 2024',
    author: 'Mr. KIM SAN',
    role: 'Backend API Architect',
    targetAudience: 'Backend Developers, E-Commerce Managers, Solutions Architects',
    executiveSummary:
      'ApexCraft is a robust modular e-commerce engine designed for flash-sale traffic spikes. Built using Laravel and MySQL with optimized index structures, it handles concurrent checkouts, multi-currency pricing, and automated inventory reconciliation without race conditions.',
    challenge: {
      overview:
        'Flash sales often cause race conditions in e-commerce stores, where multiple customers buy the same inventory item simultaneously, resulting in overselling and broken order states.',
      keyBottlenecks: [
        'Database deadlocks under concurrent checkout requests',
        'Stripe webhook timeout reconciliation errors',
        'Slow product catalog search queries across multi-attribute items',
      ],
    },
    architecture: {
      description:
        'Utilizes pessimistic database locking on inventory allocation combined with Redis distributed locks. Orders are processed asynchronously through queued workers, ensuring idempotent payment reconciliation.',
      techStackChoices: [
        { technology: 'Laravel 11', reason: 'Elegant Eloquent ORM relationships, API resources, and robust job queues.' },
        { technology: 'MySQL 8 + InnoDB', reason: 'Row-level locking and ACID transaction compliance.' },
        { technology: 'Redis Locks', reason: 'Prevents duplicate simultaneous cart checkouts.' },
      ],
    },
    engineeringSolutions: [
      {
        title: 'Atomic Inventory Allocation',
        detail: 'Employed SELECT ... FOR UPDATE transactions to reserve items atomically before dispatching Stripe intents.',
      },
      {
        title: 'Idempotent Webhook Processing',
        detail: 'Implemented unique event hash deduplication so duplicate Stripe webhook pings never double-charge or double-ship.',
      },
    ],
    metrics: [
      { label: 'Max Concurrent Orders', value: '2,400/min', change: '+450%', description: 'Zero overselling incidents recorded' },
      { label: 'API Response Time', value: '68ms', change: '-55%', description: 'Average P95 latency across catalog endpoints' },
      { label: 'Payment Success Rate', value: '99.92%', change: '+3.1%', description: 'Resilient checkout completion rate' },
    ],
    keyTakeaways: [
      'Never rely solely on client-side validation for critical inventory quantities.',
      'Idempotency keys on financial webhooks are essential for zero-error accounting.',
    ],
  },

  4: {
    projectId: 4,
    slug: 'collabsync-realtime-studio',
    title: 'CollabSync: Multi-Peer Collaborative Web Studio',
    subtitle: 'Zero-conflict real-time collaborative state synchronization via WebRTC and CRDTs.',
    category: 'Web & Real-Time',
    publishDate: 'April 2024',
    author: 'Mr. KIM SAN',
    role: 'Full-Stack Web Engineer',
    targetAudience: 'Web Developers, Frontend Architects, Collaboration Tool Designers',
    executiveSummary:
      'CollabSync provides a browser-based shared code workspace enabling distributed software engineers to write, review, and test code simultaneously with live multi-cursor presence and zero-latency state synchronization.',
    challenge: {
      overview:
        'Syncing keystrokes across multiple users located across different continents easily leads to text jumping, cursor desynchronization, and conflicting file overwrites.',
      keyBottlenecks: [
        'High latency when routing all character edits through a centralized server',
        'Text divergence and merge conflicts under rapid collaborative typing',
        'Memory leaks from unclosed peer connections and cursor listener handles',
      ],
    },
    architecture: {
      description:
        'Hybrid P2P WebRTC data mesh backed by Conflict-Free Replicated Data Types (CRDTs). When peer count is low, changes exchange directly between clients; if network degradation occurs, traffic seamlessly falls back to WebSocket relay.',
      techStackChoices: [
        { technology: 'React + TypeScript', reason: 'Type-safe editor state and structured event propagation.' },
        { technology: 'Firebase & WebRTC', reason: 'Instant signaling channel setup and fast room pairing.' },
        { technology: 'Yjs CRDT Engine', reason: 'Guaranteed mathematical eventual consistency for collaborative documents.' },
      ],
    },
    engineeringSolutions: [
      {
        title: 'CRDT Operation Compression',
        detail: 'Batched micro-keystroke operations within 16ms animation frames to minimize network packet overhead.',
      },
      {
        title: 'Smooth Cursor Interpolation',
        detail: 'Implemented spring-based cursor interpolation so remote collaborator movements feel continuous and organic.',
      },
    ],
    metrics: [
      { label: 'Sync Latency', value: '< 28ms', change: '-78%', description: 'Peer-to-peer keystroke propagation time' },
      { label: 'Conflict Rate', value: '0.00%', change: '100% Reliable', description: 'Mathematical convergence with zero lost characters' },
      { label: 'Connection Uptime', value: '99.95%', change: '+12%', description: 'Seamless fallback between WebRTC and WebSockets' },
    ],
    keyTakeaways: [
      'CRDTs completely eliminate the manual merge conflicts inherent to traditional operational transformation.',
      'Spring interpolation for remote cursors turns jarring coordinate jumps into a fluid collaborative experience.',
    ],
  },

  5: {
    projectId: 5,
    slug: 'financepulse-asset-ledger',
    title: 'FinancePulse: Offline-First Wealth & Multi-Currency Ledger',
    subtitle: 'Engineered for financial privacy with client-side encryption and SQLite local caching.',
    category: 'Full Stack & FinTech',
    publishDate: 'February 2024',
    author: 'Mr. KIM SAN',
    role: 'FinTech Software Specialist',
    targetAudience: 'FinTech Developers, Privacy Advocates, Data Analysts',
    executiveSummary:
      'FinancePulse is an offline-capable financial tracking dashboard enabling users to monitor multi-currency investments, automated dividends, and tax-lot allocations without exposing unencrypted financial data to cloud servers.',
    challenge: {
      overview:
        'Users demand rapid calculation across thousands of historical financial transactions without experiencing UI stutter or risking their confidential financial data on third-party cloud servers.',
      keyBottlenecks: [
        'Recalculating capital gains across 10+ years of trade history blocking the main UI thread',
        'Network dropouts disrupting portfolio updates during volatile market hours',
        'Complex currency exchange conversion matrices across international brokers',
      ],
    },
    architecture: {
      description:
        'Client-side Web Worker architecture executing heavy financial aggregations off the main thread. Transactions store locally in indexed SQLite/IndexedDB with asynchronous background synchronization to PostgreSQL.',
      techStackChoices: [
        { technology: 'React + Recharts', reason: 'Hardware-accelerated financial line, candlestick, and bar charts.' },
        { technology: 'PostgreSQL + SQLite', reason: 'Local embedded cache paired with resilient remote backups.' },
        { technology: 'Web Workers', reason: 'Zero-frame-drop calculation of time-weighted returns (TWR) and Sharpe ratios.' },
      ],
    },
    engineeringSolutions: [
      {
        title: 'Background Thread Calculation Engine',
        detail: 'Moved capital gains calculations and currency normalization into dedicated Web Worker threads.',
      },
      {
        title: 'Offline Write-Ahead Logging',
        detail: 'Implemented local SQLite WAL journal buffering all user inputs immediately even when disconnected.',
      },
    ],
    metrics: [
      { label: 'UI Frame Rate', value: '60 FPS', change: 'Solid', description: 'Maintained smooth UI during 10,000+ trade calculations' },
      { label: 'Offline Availability', value: '100%', change: 'Complete', description: 'Full offline feature parity with cloud syncing' },
      { label: 'Query Performance', value: '12ms', change: '-92%', description: 'Instantaneous local query retrieval' },
    ],
    keyTakeaways: [
      'Web Workers are the gold standard for heavy mathematical calculations in browser applications.',
      'Financial applications thrive when designed offline-first from day one.',
    ],
  },

  6: {
    projectId: 6,
    slug: 'taskdaemon-automation-suite',
    title: 'TaskDaemon: Autonomous Document Intelligence Worker',
    subtitle: 'Automated entity extraction and background invoice parsing using Gemini multimodal models.',
    category: 'AI Software & Automation',
    publishDate: 'January 2024',
    author: 'Mr. KIM SAN',
    role: 'AI Software Developer',
    targetAudience: 'Enterprise Automation Architects, Python Developers, Back-Office Teams',
    executiveSummary:
      'TaskDaemon is a cross-platform background software worker that monitors inbound document directories, parses multi-page PDF invoices, extracts structured accounting data using the Gemini API, and updates enterprise databases automatically.',
    challenge: {
      overview:
        'Manual document entry of invoices, bills, and purchase orders creates extensive administrative bottlenecks and error rates of up to 4% in accounting departments.',
      keyBottlenecks: [
        'Diverse, unstructured PDF formats failing standard OCR templates',
        'High latency and memory consumption when processing multi-page high-resolution scans',
        'Lack of strict validation checks before writing financial data into core ledgers',
      ],
    },
    architecture: {
      description:
        'Python daemon running a reactive filesystem observer. Inbound files upload asynchronously to Gemini Flash multimodal analysis, strictly parsed into typed Pydantic models and validated before writing to SQLite and triggering desktop notifications.',
      techStackChoices: [
        { technology: 'Python 3.11 + FastAPI', reason: 'High-performance asynchronous background daemon architecture.' },
        { technology: 'Gemini Multimodal API', reason: 'State-of-the-art vision extraction from tables and scanned receipts.' },
        { technology: 'C# & .NET', reason: 'Native Windows and cross-platform notification integration.' },
        { technology: 'SQLite with WAL', reason: 'Local high-reliability audit log and transaction registry.' },
      ],
    },
    engineeringSolutions: [
      {
        title: 'Strict Pydantic Schema Enforcement',
        detail: 'Ensured 100% type-safe JSON output from Gemini containing invoice numbers, tax IDs, line items, and totals.',
      },
      {
        title: 'Asynchronous Batch Processing Pool',
        detail: 'Built an async task pool processing up to 20 documents concurrently without overloading memory limits.',
      },
    ],
    metrics: [
      { label: 'Data Extraction Accuracy', value: '99.8%', change: '+24%', description: 'Outperformed traditional template OCR' },
      { label: 'Processing Speed', value: '1.8s/doc', change: '-94%', description: 'Average time to ingest, extract, and write invoice' },
      { label: 'Manual Labor Saved', value: '120 hrs/mo', change: 'Reclaimed', description: 'Administrative hours saved per department' },
    ],
    keyTakeaways: [
      'Multimodal LLMs render brittle template-based OCR obsolete for document processing.',
      'Schema enforcement via structured tools is non-negotiable for enterprise database ingestion.',
    ],
  },
};

/**
 * Returns complete case study text corpus for calculating dynamic reading times.
 */
export function getCaseStudyCorpus(caseStudy: CaseStudy): string {
  const parts: string[] = [
    caseStudy.title,
    caseStudy.subtitle,
    caseStudy.executiveSummary,
    caseStudy.challenge.overview,
    ...caseStudy.challenge.keyBottlenecks,
    caseStudy.architecture.description,
    ...caseStudy.architecture.techStackChoices.map((t) => `${t.technology}: ${t.reason}`),
    ...caseStudy.engineeringSolutions.map((s) => `${s.title}. ${s.detail}`),
    ...caseStudy.metrics.map((m) => `${m.label}: ${m.value} - ${m.description}`),
    ...caseStudy.keyTakeaways,
  ];

  return parts.join(' ');
}
