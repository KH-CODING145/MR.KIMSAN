/**
 * Professional Portfolio Data Source
 * Centralized data configuration for easy customization.
 */

export const portfolio = {
  brand: "PRO DIGITAL",
  personal: {
    brand: "PRO DIGITAL",
    name: "Mr.KIM SAN",
    title: "Full-Stack Developer & AI Software Engineer",
    subtitle: "Frontend, Backend, Cloud Architecture & AI-Powered Software",
    description:
      "I design, engineer, and build high-performance full-stack web applications and intelligent software solutions with AI—uniting clean scalable code, resilient cloud architectures, and modern agentic intelligence.",
    location: "KOMPONGTHOM, Phnom Penh, Cambodia KH",
    email: "kimsan.dev@gmail.com",
    phone: "+855 (016/093/012) 949 145",
    avatar: "/images/kim-san.jpg",
    googleDriveAvatar: "https://lh3.googleusercontent.com/d/1Wp9FqC_xCINn16x-MzoqY6cug38SDAlf",
    status: "Available for freelance & full-time roles",
    yearsOfExperience: 3,
  },

  social: {
    github: "https://gist.github.com/kimsan-developer",
    linkedin: "https://linkedin.com",
    facebook: "https://www.youtube.com/@kimsan2000",
    telegram: "https://t.me/kim_san145",
    youtube: "https://www.youtube.com/@kimsan2000",
  },

  about: {
    intro:
      "Hello! I am a full-stack developer and software engineer dedicated to building scalable modern web applications and innovative software solutions with AI.",
    background:
      "Having spearheaded digital solutions from concept to high-concurrency production systems, I thrive at the intersection of aesthetic frontend fidelity, resilient backend engineering, and intelligent AI integration.",
    philosophy:
      "Software engineering is about crafting clean, reliable systems and harnessing modern AI capabilities to build high-leverage products that solve complex problems with elegance.",
    careerGoals:
      "Currently advancing scalable distributed systems, high-throughput APIs, and engineering next-generation full-stack software powered by Gemini, LLMs, and autonomous agents.",
  },

  statistics: [
    {
      value: "50+",
      label: "Projects Completed",
      subtext: "Production web apps & libraries",
    },
    {
      value: "3+",
      label: "Years Experience",
      subtext: "Continuous professional delivery",
    },
    {
      value: "20+",
      label: "Technologies",
      subtext: "Modern frontend & backend stack",
    },
  ],

  languages: [
    { name: "English", percentage: 80, level: "80%" },
    { name: "Chanise", percentage: 50, level: "50%" },
    { name: "VI", percentage: 50, level: "50%" },
    { name: "THAI", percentage: 70, level: "70%" },
    { name: "JP", percentage: 40, level: "40%" },
  ],

  skills: [
    // Frontend
    {
      name: "React",
      category: "Frontend",
      level: 95,
      experience: "3+ years",
      icon: "Code2",
      description: "Component architecture, hooks, state machines, Suspense & Server Components.",
    },
    {
      name: "JavaScript (ES6+)",
      category: "Frontend",
      level: 95,
      experience: "4+ years",
      icon: "Terminal",
      description: "Asynchronous programming, closures, event loop, and modern browser APIs.",
    },
    {
      name: "HTML5 & Semantic Web",
      category: "Frontend",
      level: 95,
      experience: "4+ years",
      icon: "Globe",
      description: "Accessible ARIA patterns, structured semantics, and SEO-first hierarchy.",
    },
    {
      name: "CSS3 & Responsive Design",
      category: "Frontend",
      level: 92,
      experience: "4+ years",
      icon: "Layers",
      description: "Flexbox, CSS Grid, animations, container queries, and subpixel rendering.",
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      level: 96,
      experience: "3+ years",
      icon: "Palette",
      description: "Design systems, JIT engine, custom theme configurations, and utility architecture.",
    },
    {
      name: "Vite",
      category: "Frontend",
      level: 90,
      experience: "3+ years",
      icon: "Zap",
      description: "Ultra-fast ESM bundling, code splitting, plugin pipelines, and build optimization.",
    },

    // Backend
    {
      name: "Laravel",
      category: "Backend",
      level: 90,
      experience: "3+ years",
      icon: "Server",
      description: "Eloquent ORM, queues, Artisan CLI, service containers, and authentication.",
    },
    {
      name: "PHP",
      category: "Backend",
      level: 88,
      experience: "3+ years",
      icon: "Code",
      description: "Modern PHP 8.2+ type safety, fibers, Composer ecosystem, and PSR standards.",
    },
    {
      name: "Node.js",
      category: "Backend",
      level: 92,
      experience: "3+ years",
      icon: "Cpu",
      description: "Express, Fastify, asynchronous stream handling, event-driven workers, and microservices.",
    },
    {
      name: "REST API",
      category: "Backend",
      level: 96,
      experience: "4+ years",
      icon: "Network",
      description: "RESTful principles, OpenAPI specifications, rate limiting, and webhook dispatch.",
    },

    // Database
    {
      name: "MySQL",
      category: "Database",
      level: 90,
      experience: "3+ years",
      icon: "Database",
      description: "Schema optimization, indexing, query execution planning, and transactions.",
    },
    {
      name: "PostgreSQL",
      category: "Database",
      level: 92,
      experience: "3+ years",
      icon: "Database",
      description: "Complex aggregations, JSONB indexing, triggers, full-text search, and replication.",
    },
    {
      name: "SQLite",
      category: "Database",
      level: 86,
      experience: "3+ years",
      icon: "HardDrive",
      description: "Embedded databases, local persistence, testing sandboxes, and WAL mode.",
    },
    {
      name: "Firebase",
      category: "Database",
      level: 88,
      experience: "2+ years",
      icon: "Flame",
      description: "Firestore real-time listeners, security rules, Cloud Functions, and Firebase Auth.",
    },

    // Programming
    {
      name: "Python",
      category: "Programming",
      level: 85,
      experience: "2+ years",
      icon: "Terminal",
      description: "Automation scripting, data extraction, FastAPI services, and asynchronous processing.",
    },
    {
      name: "C#",
      category: "Programming",
      level: 80,
      experience: "2 years",
      icon: "Binary",
      description: ".NET Core, LINQ, dependency injection, and desktop automation tools.",
    },
    {
      name: "TypeScript",
      category: "Programming",
      level: 94,
      experience: "3+ years",
      icon: "CheckCircle2",
      description: "Strict typing, generics, discriminated unions, and compile-time verification.",
    },

    // Tools
    {
      name: "Git",
      category: "Tools",
      level: 94,
      experience: "4+ years",
      icon: "GitBranch",
      description: "Feature branching, rebasing, bisecting, hook workflows, and merge strategies.",
    },
    {
      name: "GitHub",
      category: "Tools",
      level: 92,
      experience: "4+ years",
      icon: "Github",
      description: "GitHub Actions CI/CD pipelines, release management, issues, and PR reviews.",
    },
    {
      name: "Docker",
      category: "Tools",
      level: 85,
      experience: "2+ years",
      icon: "Box",
      description: "Multi-stage container builds, Docker Compose orchestration, and registry deployments.",
    },
    {
      name: "VS Code",
      category: "Tools",
      level: 98,
      experience: "4+ years",
      icon: "Monitor",
      description: "Advanced debugging, custom tasks, extension workflows, and remote SSH tunnels.",
    },
    {
      name: "Postman",
      category: "Tools",
      level: 92,
      experience: "3+ years",
      icon: "Send",
      description: "API regression suites, environment variables, mock servers, and automated tests.",
    },

    // AI & Intelligent Systems
    {
      name: "Gemini & LLMs",
      category: "AI & Automation",
      level: 94,
      experience: "2+ years",
      icon: "Sparkles",
      description: "Google Gemini, OpenAI, Claude API integration, multimodal prompts, function calling, and streaming.",
    },
    {
      name: "AI Agents & Automation",
      category: "AI & Automation",
      level: 92,
      experience: "2+ years",
      icon: "Bot",
      description: "Autonomous task agents, tool routing, multi-step agentic workflows, and automated reasoning loops.",
    },
    {
      name: "RAG & Vector Search",
      category: "AI & Automation",
      level: 90,
      experience: "2+ years",
      icon: "Cpu",
      description: "Retrieval-augmented generation, embeddings, semantic document search, and vector database indexing.",
    },
  ],

  services: [
    {
      id: "ai-software-dev",
      title: "AI & Software Engineering",
      description: "Build intelligent software and web applications with AI and LLMs.",
      icon: "Sparkles",
      features: [
        "Gemini, OpenAI & Claude API integration",
        "Autonomous AI agent loops & automated workflows",
        "RAG architecture & semantic vector search",
        "Full-stack AI-driven web apps & tools",
      ],
    },
    {
      id: "web-dev",
      title: "Web Development",
      description: "Build modern responsive websites and web applications.",
      icon: "Globe",
      features: [
        "Single Page Applications (SPA)",
        "Progressive Web Apps (PWA)",
        "Mobile-first responsive design",
        "Performance & Core Web Vitals optimization",
      ],
    },
    {
      id: "full-stack",
      title: "Full-Stack Development",
      description: "Frontend + backend + API + database integration.",
      icon: "Layers",
      features: [
        "End-to-end architecture design",
        "React frontend with Express/Laravel",
        "Secure relational & document databases",
        "Robust authentication & session management",
      ],
    },
    {
      id: "admin-dash",
      title: "Admin Dashboard",
      description: "Build modern administration dashboards.",
      icon: "LayoutDashboard",
      features: [
        "Real-time analytics & KPIs",
        "Interactive data visualizations",
        "Role-based access control (RBAC)",
        "Data export (CSV, Excel, PDF)",
      ],
    },
    {
      id: "api-dev",
      title: "API Development",
      description: "REST API development and integration.",
      icon: "Network",
      features: [
        "Clean RESTful contract design",
        "OpenAPI / Swagger documentation",
        "Rate limiting & JWT authentication",
        "Third-party webhook integrations",
      ],
    },
    {
      id: "ui-dev",
      title: "UI Development",
      description: "Responsive and user-friendly interfaces.",
      icon: "Sparkles",
      features: [
        "Pixel-perfect component engineering",
        "Smooth micro-interactions & animations",
        "WCAG 2.1 AA accessibility compliance",
        "Design system creation with Tailwind CSS",
      ],
    },
    {
      id: "software-dev",
      title: "Software Development",
      description: "Desktop and automation software development.",
      icon: "Cpu",
      features: [
        "Cross-platform desktop utilities",
        "Automated background processing tasks",
        "Data scrapers & ETL data ingestion",
        "System maintenance CLI tools",
      ],
    },
  ],

  projects: [
    {
      id: 1,
      title: "CloudPulse AI SaaS Platform",
      description:
        "An enterprise multi-tenant cloud telemetry and microservices management platform powered by AI anomaly detection, automated root-cause analysis, and real-time cluster monitoring.",
      image: "/images/project-1.svg",
      category: "Full Stack",
      technologies: ["React", "Laravel", "Gemini AI", "MySQL", "Tailwind CSS", "Docker"],
      demoUrl: "https://cloudpulse-saas-demo.com",
      githubUrl: "https://github.com/kimsan/cloudpulse-saas",
      highlight: "Full-Stack & AI",
      dateCompleted: "August 2024",
      lastUpdated: "August 2024",
    },
    {
      id: 2,
      title: "DevFlow CI/CD Pipeline Visualizer",
      description:
        "High-performance developer dashboard displaying live build pipelines, automated unit test test-beds, container registries, and rollback triggers.",
      image: "/images/project-2.svg",
      category: "React",
      technologies: ["React", "Vite", "Node.js", "Tailwind CSS", "Docker"],
      demoUrl: "https://devflow-pipeline.netlify.app",
      githubUrl: "https://github.com/kimsan/devflow-pipeline",
      highlight: "Developer Tool",
      dateCompleted: "July 2024",
      lastUpdated: "July 2024",
    },
    {
      id: 3,
      title: "ApexCraft E-Commerce Engine",
      description:
        "Modern modular e-commerce storefront with high-throughput Laravel RESTful APIs, Stripe webhook reconciliation, and automated stock queues.",
      image: "/images/project-3.svg",
      category: "Laravel",
      technologies: ["Laravel", "PHP", "MySQL", "REST API", "Tailwind CSS"],
      demoUrl: "https://apexcraft-store.example.com",
      githubUrl: "https://github.com/kimsan/apexcraft-store",
      highlight: "High Concurrency",
      dateCompleted: "May 2024",
      lastUpdated: "May 2024",
    },
    {
      id: 4,
      title: "CollabSync Real-Time Studio",
      description:
        "Browser-based collaborative code workspace featuring WebRTC multi-peer state syncing, cursor tracking, and inline syntax analysis.",
      image: "/images/project-4.svg",
      category: "Web",
      technologies: ["React", "Node.js", "Firebase", "Tailwind CSS", "Vite"],
      demoUrl: "https://collabsync-studio.example.com",
      githubUrl: "https://github.com/kimsan/collabsync-studio",
      highlight: "Real-time Sync",
      dateCompleted: "April 2024",
      lastUpdated: "April 2024",
    },
    {
      id: 5,
      title: "FinancePulse Asset Ledger",
      description:
        "Comprehensive personal finance and multi-currency portfolio management tool with automated dividend tracking, tax-lot calculations, and SQLite offline cache.",
      image: "/images/project-5.svg",
      category: "Full Stack",
      technologies: ["React", "PostgreSQL", "Node.js", "Tailwind CSS"],
      demoUrl: "https://financepulse-ledger.example.com",
      githubUrl: "https://github.com/kimsan/financepulse-ledger",
      highlight: "Data Visualization",
      dateCompleted: "February 2024",
      lastUpdated: "February 2024",
    },
    {
      id: 6,
      title: "TaskDaemon AI Automation Suite",
      description:
        "Cross-platform intelligent software worker combining LLM agents, automated document intelligence, PDF invoice entity extraction, and background database pipelines.",
      image: "/images/project-6.svg",
      category: "Software",
      technologies: ["Python", "Gemini API", "C#", "SQLite", "REST API"],
      demoUrl: "", // Empty URL test case - button should gracefully hide
      githubUrl: "https://github.com/kimsan/taskdaemon-suite",
      highlight: "AI Software & Automation",
      dateCompleted: "January 2024",
      lastUpdated: "January 2024",
    },
  ],

  experience: [
    {
      company: "Nexus Software Labs",
      position: "Lead Full-Stack Developer",
      period: "2024 - Present",
      location: "San Francisco, CA",
      description: [
        "Architected and deployed enterprise React single-page applications handling over 1.2M monthly active sessions.",
        "Engineered scalable REST APIs in Laravel and Node.js backed by PostgreSQL, achieving 99.98% uptime SLA.",
        "Mentored junior developers, established code review benchmarks, and cut CI/CD test duration by 42%.",
      ],
      technologies: ["React", "Laravel", "PostgreSQL", "Tailwind CSS", "Docker", "REST API"],
    },
    {
      company: "Vanguard Digital Agency",
      position: "Full-Stack Web Engineer",
      period: "2022 - 2024",
      location: "Austin, TX",
      description: [
        "Developed 18+ client web platforms from wireframe concepts to production deployment on Netlify and cloud containers.",
        "Integrated multi-tier payment gateways, custom administrative panels, and automated transactional emails.",
        "Optimized client websites for Core Web Vitals, elevating Lighthouse performance scores to an average of 96+.",
      ],
      technologies: ["React", "PHP", "MySQL", "JavaScript", "Tailwind CSS", "Git"],
    },
    {
      company: "ByteCraft Solutions",
      position: "Junior Frontend Developer",
      period: "2021 - 2022",
      location: "Seattle, WA",
      description: [
        "Collaborated with UI/UX designers to translate Figma design systems into responsive, accessible React components.",
        "Implemented rigorous client-side form validations, unit tests, and cross-browser compatibility fixes.",
        "Refactored legacy vanilla CSS codebases to utility-first Tailwind CSS, improving development velocity by 30%.",
      ],
      technologies: ["JavaScript", "HTML", "CSS", "React", "Git", "VS Code"],
    },
  ],

  education: [
    {
      institution: "California State University, Long Beach",
      degree: "Bachelor of Science",
      field: "Computer Science",
      period: "2017 - 2021",
      description:
        "Graduated with honors. Focused on Data Structures & Algorithms, Software Architecture, Database Systems, and Distributed Computing.",
      achievements: [
        "Dean's Honor List (4 semesters)",
        "Capstone Project Lead: Real-time Campus Transit Navigator",
      ],
    },
    {
      institution: "Full-Stack Software Architecture Certification",
      degree: "Professional Certificate",
      field: "Advanced Cloud & Web Engineering",
      period: "2022",
      description:
        "Comprehensive industry immersion covering microservices, containerization with Docker, high-availability relational databases, and enterprise security.",
      achievements: [
        "Score: 98th Percentile in Distributed Systems Capstone",
      ],
    },
  ],
};
