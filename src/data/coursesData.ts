export interface Lesson {
  id: string;
  title: string;
  titleKh?: string;
  duration: string;
  videoUrl: string; // YouTube embed or video URL
  youtubeId: string;
  summary: string;
  keyPoints: string[];
  codeSnippet?: string;
  codeLanguage?: string;
  resources?: { name: string; url: string }[];
}

export interface Course {
  id: string;
  title: string;
  titleKh: string;
  slug: string;
  category: 'React' | 'Laravel' | 'Node.js' | 'Python' | 'Full Stack';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  totalDuration: string;
  lessonsCount: number;
  instructor: string;
  rating: number;
  studentsEnrolled: number;
  thumbnail: string;
  description: string;
  descriptionKh: string;
  tags: string[];
  lessons: Lesson[];
}

export const sampleCourses: Course[] = [
  {
    id: 'course-react-fullstack',
    title: 'Modern React 19 & Next.js Full-Stack Masterclass',
    titleKh: 'វគ្គសិក្សា React 19 & Next.js កម្រិតខ្ពស់',
    slug: 'modern-react-nextjs',
    category: 'React',
    level: 'Intermediate',
    totalDuration: '6h 45m',
    lessonsCount: 6,
    instructor: 'Mr. KIM SAN (PRO DIGITAL)',
    rating: 4.9,
    studentsEnrolled: 1420,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    description:
      'Master modern React 19 features including Server Actions, useOptimistic, Suspense architectures, Tailwind CSS design systems, and deploying production full-stack web applications.',
    descriptionKh:
      'សិក្សាពីការបង្កើតកម្មវិធី Full-Stack Web ទំនើបដោយប្រើ React 19, Server Components, Hooks, Tailwind CSS និងការបញ្ចេញទៅកាន់ Cloud Hosting។',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js'],
    lessons: [
      {
        id: 'r19-l1',
        title: 'React 19 Core Fundamentals & Modern Hooks',
        titleKh: 'មូលដ្ឋានគ្រឹះ React 19 និង Hooks ជំនាន់ថ្មី',
        duration: '18:40',
        videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8',
        youtubeId: 'bMknfKXIFA8',
        summary:
          'Deep dive into React 19 new architecture, compiler updates, and state management paradigms for blazing-fast frontends.',
        keyPoints: [
          'Overview of React 19 Actions and state primitives',
          'Eliminating unnecessary re-renders with compiler optimizations',
          'Comparison of useEffect vs Server Components data fetching',
          'Production project setup with TypeScript and Tailwind CSS',
        ],
        codeSnippet: `// React 19 Modern Action Example
import { useActionState, useOptimistic } from 'react';

export function CommentForm({ addCommentAction, initialComments }) {
  const [optimisticComments, setOptimistic] = useOptimistic(
    initialComments,
    (state, newText) => [...state, { id: 'temp', text: newText, pending: true }]
  );

  const [state, formAction, isPending] = useActionState(async (prev, formData) => {
    const text = formData.get('comment');
    setOptimistic(text);
    return await addCommentAction(text);
  }, null);

  return (
    <form action={formAction} className="space-y-3">
      <input name="comment" placeholder="Write a comment..." className="p-2 border rounded" />
      <button disabled={isPending} className="bg-indigo-600 text-white px-4 py-2 rounded">
        {isPending ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}`,
        codeLanguage: 'tsx',
        resources: [
          { name: 'Official React 19 Documentation', url: 'https://react.dev' },
          { name: 'Source Code GitHub Repository', url: 'https://github.com' },
        ],
      },
      {
        id: 'r19-l2',
        title: 'Building Interactive UI with Motion & Tailwind CSS',
        titleKh: 'ការបង្កើត UI ដ៏ស្រស់ស្អាតជាមួយ Motion & Tailwind CSS',
        duration: '22:15',
        videoUrl: 'https://www.youtube.com/embed/zoxz60-sQ-w',
        youtubeId: 'zoxz60-sQ-w',
        summary:
          'Construct accessible, mobile-first interfaces with slick layout transitions, responsive grids, and dark/light color schemes.',
        keyPoints: [
          'Design systems layout math and spacing ratios',
          'Creating performant spring animations with motion/react',
          'Dynamic theme switches with Tailwind dark mode classes',
          'Accessible modal dialogs and ARIA keyboard trap patterns',
        ],
        codeSnippet: `<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ y: -6, scale: 1.02 }}
  transition={{ duration: 0.3 }}
  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md"
>
  <h3 className="text-xl font-bold">Interactive Card</h3>
</motion.div>`,
        codeLanguage: 'tsx',
        resources: [
          { name: 'Tailwind CSS Official Docs', url: 'https://tailwindcss.com' },
          { name: 'Motion (formerly Framer Motion)', url: 'https://motion.dev' },
        ],
      },
      {
        id: 'r19-l3',
        title: 'Full-Stack Data Fetching & State Synchronization',
        titleKh: 'ការទាញយកទិន្នន័យពី API និងការគ្រប់គ្រង State',
        duration: '25:10',
        videoUrl: 'https://www.youtube.com/embed/LDB4uaJ87e0',
        youtubeId: 'LDB4uaJ87e0',
        summary:
          'Connect React client components with REST APIs, caching layers, error boundaries, and optimistic UI updates.',
        keyPoints: [
          'SWR / React Query data synchronization strategies',
          'Resilient error boundary handling and retry mechanics',
          'Handling authentication tokens and protected routes safely',
        ],
      },
      {
        id: 'r19-l4',
        title: 'Form Validation, Zod Schema & Security Auditing',
        titleKh: 'ការផ្ទៀងផ្ទាត់ទម្រង់បែបបទជាមួយ Zod និងសុវត្ថិភាព',
        duration: '19:30',
        videoUrl: 'https://www.youtube.com/embed/cc_xPawx44c',
        youtubeId: 'cc_xPawx44c',
        summary:
          'Implement type-safe schema validations, sanitize inputs against XSS, and protect CSRF attack vectors.',
        keyPoints: [
          'Writing robust Zod schemas for form submissions',
          'Client and server double validation pattern',
          'Sanitizing user inputs and escaping HTML safe strings',
        ],
      },
      {
        id: 'r19-l5',
        title: 'Performance Optimization & Lighthouse 100 Score',
        titleKh: 'ការបង្កើនល្បឿន Performance និងពិន្ទុ Lighthouse 100',
        duration: '21:05',
        videoUrl: 'https://www.youtube.com/embed/jMy4pVZMyLM',
        youtubeId: 'jMy4pVZMyLM',
        summary:
          'Audit Core Web Vitals, code-split dynamic imports, optimize images with next-gen WebP/AVIF formats, and minimize bundle sizes.',
        keyPoints: [
          'Dynamic code splitting with React.lazy and Suspense',
          'Optimizing Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS)',
          'Analyzing bundle sizes with rollup-plugin-visualizer',
        ],
      },
      {
        id: 'r19-l6',
        title: 'Production CI/CD Deployment to Cloud Hosting',
        titleKh: 'ការបញ្ចេញទៅកាន់ Production តាម CI/CD Cloud',
        duration: '17:40',
        videoUrl: 'https://www.youtube.com/embed/843nec-IvW0',
        youtubeId: '843nec-IvW0',
        summary:
          'Automate tests, build static and server bundles, configure environment variables safely, and deploy to modern cloud containers.',
        keyPoints: [
          'GitHub Actions workflow for automated testing and linting',
          'Zero-downtime deployment pipelines',
          'Setting custom domains, SSL certificates, and edge caching',
        ],
      },
    ],
  },
  {
    id: 'course-laravel-api',
    title: 'Laravel 11 & High-Performance REST API Architecture',
    titleKh: 'ស្ថាបត្យកម្ម REST API កម្រិតខ្ពស់ជាមួយ Laravel 11',
    slug: 'laravel-11-rest-api',
    category: 'Laravel',
    level: 'Intermediate',
    totalDuration: '5h 30m',
    lessonsCount: 5,
    instructor: 'Mr. KIM SAN (PRO DIGITAL)',
    rating: 4.95,
    studentsEnrolled: 1180,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    description:
      'Learn how to engineer secure, high-concurrency RESTful APIs in Laravel 11 with Sanctum authentication, Eloquent ORM relationships, Redis caching, and automated queue workers.',
    descriptionKh:
      'រៀនពីការបង្កើត REST API ដែលមានល្បឿនលឿន សុវត្ថិភាពខ្ពស់ និងរៀបចំ Database ជាមួយ Laravel 11, Sanctum Auth, Eloquent ORM និង Redis Cache។',
    tags: ['Laravel 11', 'PHP 8.3', 'MySQL', 'Redis', 'REST API'],
    lessons: [
      {
        id: 'lv-l1',
        title: 'Laravel 11 Streamlined Structure & API Routing',
        titleKh: 'រចនាសម្ព័ន្ធថ្មីនៃ Laravel 11 និង API Routing',
        duration: '16:50',
        videoUrl: 'https://www.youtube.com/embed/MYyJ4PuL4pY',
        youtubeId: 'MYyJ4PuL4pY',
        summary:
          'Understand Laravel 11 simplified application bootstrap, config reduction, and creating RESTful controller endpoints.',
        keyPoints: [
          'New bootstrap/app.php setup vs legacy kernels',
          'Resource controllers and API Route groups with rate limiting',
          'Standardizing JSON response schemas with API Resources',
        ],
        codeSnippet: `// Laravel 11 API Controller with Resource
namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Http\\Resources\\ProjectResource;
use App\\Models\\Project;
use Illuminate\\Http\\JsonResponse;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        $projects = Project::with('technologies')
            ->where('is_published', true)
            ->latest()
            ->paginate(12);

        return response()->json([
            'status' => 'success',
            'data' => ProjectResource::collection($projects),
            'pagination' => [
                'current_page' => $projects->currentPage(),
                'total_pages' => $projects->lastPage(),
                'total_records' => $projects->total(),
            ]
        ]);
    }
}`,
        codeLanguage: 'php',
      },
      {
        id: 'lv-l2',
        title: 'Eloquent ORM Performance & Eager Loading',
        titleKh: 'ការទាញទិន្នន័យពី Database និងដោះស្រាយបញ្ហា N+1 Query',
        duration: '24:15',
        videoUrl: 'https://www.youtube.com/embed/Vp6q9F2JqP0',
        youtubeId: 'Vp6q9F2JqP0',
        summary:
          'Prevent the notorious N+1 query problem, use indexed database columns, and structure polymorphic database relations.',
        keyPoints: [
          'Using with() and loadMissing() for eager loading',
          'Database indexes and query logging with Laravel Telescope',
          'Complex many-to-many pivots and query scopes',
        ],
      },
      {
        id: 'lv-l3',
        title: 'Sanctum Authentication & Role-Based Access (RBAC)',
        titleKh: 'ប្រព័ន្ធផ្ទៀងផ្ទាត់អ្នកប្រើប្រាស់ និងសិទ្ធិប្រើប្រាស់ RBAC',
        duration: '20:45',
        videoUrl: 'https://www.youtube.com/embed/rP3i5z9k120',
        youtubeId: 'rP3i5z9k120',
        summary:
          'Secure API endpoints using Laravel Sanctum personal access tokens, middleware authorization, and granular permissions.',
        keyPoints: [
          'Issuing and revoking Bearer tokens securely',
          'Defining policy gates and middleware guards',
          'Handling CORS headers and cross-origin preflight requests',
        ],
      },
      {
        id: 'lv-l4',
        title: 'Redis Caching & Background Queues with Artisan',
        titleKh: 'ការប្រើប្រាស់ Redis Cache និង Background Queue Workers',
        duration: '22:10',
        videoUrl: 'https://www.youtube.com/embed/a0qM_NfI8vE',
        youtubeId: 'a0qM_NfI8vE',
        summary:
          'Offload heavy operations such as transactional email delivery and report generation to asynchronous queues.',
        keyPoints: [
          'Setting up Redis drivers for session and cache store',
          'Dispatching Jobs to queue workers with retry policies',
          'Supervisord process management for queue listeners',
        ],
      },
      {
        id: 'lv-l5',
        title: 'API Testing with Pest PHP & Swagger OpenAPI Docs',
        titleKh: 'ការតេស្ត API ជាមួយ Pest PHP និងបង្កើតឯកសារ Swagger',
        duration: '19:00',
        videoUrl: 'https://www.youtube.com/embed/V6s_oZtZk0M',
        youtubeId: 'V6s_oZtZk0M',
        summary:
          'Write end-to-end HTTP integration tests and automatically generate interactive Swagger API documentation.',
        keyPoints: [
          'Writing expressive Pest PHP tests for endpoint assertions',
          'Database migrations and factories for isolated testing',
          'Exporting OpenAPI 3.0 specs for frontend integration',
        ],
      },
    ],
  },
  {
    id: 'course-python-ai',
    title: 'AI Software Engineering & Python Automation with Gemini',
    titleKh: 'ការអភិវឌ្ឍន៍កម្មវិធី AI និងស្វ័យប្រវត្តិកម្មជាមួយ Python & Gemini',
    slug: 'ai-software-python-gemini',
    category: 'Python',
    level: 'Advanced',
    totalDuration: '5h 15m',
    lessonsCount: 5,
    instructor: 'Mr. KIM SAN (PRO DIGITAL)',
    rating: 4.98,
    studentsEnrolled: 1890,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
    description:
      'Build autonomous AI agents, document intelligence workers, and multi-modal software systems with Python, the Google Gemini API, and LangChain orchestration.',
    descriptionKh:
      'រៀនពីការបង្កើត AI Agent ស្វ័យប្រវត្តិ កម្មវិធីវិភាគឯកសារឆ្លាតវៃ និងការតភ្ជាប់ជាមួយ Gemini API ដោយប្រើភាសា Python។',
    tags: ['Python', 'Gemini API', 'AI Agents', 'Automation', 'LLMs'],
    lessons: [
      {
        id: 'ai-l1',
        title: 'Getting Started with Google GenAI SDK & Python',
        titleKh: 'ចាប់ផ្តើមជាមួយ Google GenAI SDK និង Python',
        duration: '17:20',
        videoUrl: 'https://www.youtube.com/embed/O85q0q5E5Vw',
        youtubeId: 'O85q0q5E5Vw',
        summary:
          'Set up your environment, authenticate API keys securely, and make your first multi-modal LLM generation call.',
        keyPoints: [
          'Initializing GoogleGenAI client with environment variables',
          'Model selection: gemini-2.5-flash vs gemini-2.5-pro',
          'Streaming response tokens in real-time to standard output',
        ],
        codeSnippet: `from google import genai
import os

# Initialize Gemini Client
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Explain microservices architecture in 3 bullet points."
)

print(response.text)`,
        codeLanguage: 'python',
      },
      {
        id: 'ai-l2',
        title: 'Structured JSON Outputs & Data Extraction',
        titleKh: 'ការទាញយកទិន្នន័យជារចនាសម្ព័ន្ធ JSON ជាក់លាក់',
        duration: '21:40',
        videoUrl: 'https://www.youtube.com/embed/8v_Qz4G987A',
        youtubeId: '8v_Qz4G987A',
        summary:
          'Force deterministic JSON responses using Pydantic schemas for reliable database storage and downstream pipelines.',
        keyPoints: [
          'Using response_schema with Pydantic BaseModel',
          'Extracting invoice line items and receipt data automatically',
          'Handling validation errors gracefully',
        ],
      },
      {
        id: 'ai-l3',
        title: 'Building Autonomous AI Workers with Tool Calling',
        titleKh: 'ការបង្កើត AI Worker ដែលអាចហៅ Function/Tools ដោយខ្លួនឯង',
        duration: '26:30',
        videoUrl: 'https://www.youtube.com/embed/e1P04p7t-0k',
        youtubeId: 'e1P04p7t-0k',
        summary:
          'Equip AI agents with custom tools: querying SQL databases, fetching live weather, and executing code.',
        keyPoints: [
          'Declaring function declarations and tools in Gemini API',
          'Managing agent reasoning and multi-turn execution loops',
          'Safety boundaries and preventing infinite execution loops',
        ],
      },
      {
        id: 'ai-l4',
        title: 'Multi-modal Audio & Image Understanding',
        titleKh: 'ការវិភាគរូបភាព សំឡេង និងឯកសារ PDF ដោយ AI',
        duration: '23:10',
        videoUrl: 'https://www.youtube.com/embed/3EfZ3yqG78M',
        youtubeId: '3EfZ3yqG78M',
        summary:
          'Pass raw image bytes, blueprints, and diagrams into Gemini for visual reasoning, OCR, and UX design critique.',
        keyPoints: [
          'Passing image parts and MIME types to generateContent',
          'Extracting text from low-quality scans and receipts',
          'Visual comparison and automated UI bug detection',
        ],
      },
      {
        id: 'ai-l5',
        title: 'Deploying AI Web Services with FastAPI & Docker',
        titleKh: 'ការបញ្ចេញ AI Web Service ជាមួយ FastAPI និង Docker',
        duration: '18:50',
        videoUrl: 'https://www.youtube.com/embed/1_BdlQ_X79I',
        youtubeId: '1_BdlQ_X79I',
        summary:
          'Package your Python AI agent into a high-speed asynchronous FastAPI server ready for containerized cloud deployment.',
        keyPoints: [
          'Async FastAPI endpoints with streaming Server-Sent Events (SSE)',
          'Writing lightweight multi-stage Dockerfiles',
          'Deploying to Cloud Run or container servers with health checks',
        ],
      },
    ],
  },
  {
    id: 'course-nodejs-microservices',
    title: 'Node.js, Express & Distributed Cloud Architecture',
    titleKh: 'Node.js, Express និងស្ថាបត្យកម្ម Cloud Microservices',
    slug: 'nodejs-express-cloud',
    category: 'Node.js',
    level: 'Intermediate',
    totalDuration: '4h 50m',
    lessonsCount: 4,
    instructor: 'Mr. KIM SAN (PRO DIGITAL)',
    rating: 4.92,
    studentsEnrolled: 960,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    description:
      'Architect resilient backend services with Node.js, Express, TypeScript, event-driven message brokers, and Docker orchestration.',
    descriptionKh:
      'បង្កើតប្រព័ន្ធ Backend ខ្នាតធំជាមួយ Node.js, Express, TypeScript និងការគ្រប់គ្រង Database PostgreSQL។',
    tags: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Docker'],
    lessons: [
      {
        id: 'node-l1',
        title: 'Node.js Event Loop, Streams & Asynchronous I/O',
        titleKh: 'ស្វែងយល់ពី Event Loop និង Streams ក្នុង Node.js',
        duration: '21:10',
        videoUrl: 'https://www.youtube.com/embed/8aGhZQkoFbQ',
        youtubeId: '8aGhZQkoFbQ',
        summary:
          'Master Node.js core runtime architecture, libuv threads, event loops, and handling multi-gigabyte file streams without memory leaks.',
        keyPoints: [
          'Microtasks vs macrotasks queue in the event loop',
          'Readable, Writable, and Transform stream pipelines',
          'Profiling CPU and memory usage with Node inspector',
        ],
      },
      {
        id: 'node-l2',
        title: 'Express with TypeScript & Enterprise Clean Architecture',
        titleKh: 'បង្កើត Express REST API ដោយប្រើ Clean Architecture',
        duration: '26:40',
        videoUrl: 'https://www.youtube.com/embed/3qBXWUpoPHo',
        youtubeId: '3qBXWUpoPHo',
        summary:
          'Separate controllers, services, repositories, and domain models with complete type safety.',
        keyPoints: [
          'Domain-Driven Design (DDD) layered folder patterns',
          'Dependency injection and interface contracts',
          'Global error handling and structured JSON logging with Winston',
        ],
      },
      {
        id: 'node-l3',
        title: 'PostgreSQL Database Migrations with Drizzle & Prisma',
        titleKh: 'ការរៀបចំ Database PostgreSQL ជាមួយ ORM ទំនើប',
        duration: '23:30',
        videoUrl: 'https://www.youtube.com/embed/6bUf1L1U4qQ',
        youtubeId: '6bUf1L1U4qQ',
        summary:
          'Manage schema migrations, connection pooling with PgBouncer, and ACID transaction rollbacks.',
        keyPoints: [
          'Writing typed schemas and relations',
          'Connection pool sizing and transaction deadlocks prevention',
          'Complex aggregate queries and JSONB operations',
        ],
      },
      {
        id: 'node-l4',
        title: 'Dockerizing Node.js Apps & Container Optimization',
        titleKh: 'ការរៀបចំ Docker Container សម្រាប់ Node.js',
        duration: '18:20',
        videoUrl: 'https://www.youtube.com/embed/gAkwW2tuIqE',
        youtubeId: 'gAkwW2tuIqE',
        summary:
          'Craft minimal Alpine Docker containers, utilize non-root security users, and set up Docker Compose multi-service environments.',
        keyPoints: [
          'Multi-stage builds to reduce image size under 100MB',
          'Running as unprivileged node user',
          'Docker Compose with PostgreSQL and Redis services',
        ],
      },
    ],
  },
];
