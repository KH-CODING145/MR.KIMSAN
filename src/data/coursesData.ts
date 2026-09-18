export interface Lesson {
  id: string;
  title: string;
  titleKh?: string;
  duration: string;
  videoUrl: string; // YouTube embed or video URL
  youtubeId: string;
  driveUrl?: string;
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
  category: 'React' | 'Laravel' | 'Node.js' | 'Python' | 'Full Stack' | 'AI';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  totalDuration: string;
  lessonsCount: number;
  instructor: string;
  rating: number;
  studentsEnrolled: number;
  thumbnail: string;
  driveUrl?: string;
  description: string;
  descriptionKh: string;
  tags: string[];
  lessons: Lesson[];
}

export const sampleCourses: Course[] = [
  {
    id: 'course-react-fullstack',
    title: 'AI SOFTWARE ENGINEER',
    titleKh: 'វគ្គបណ្តុះបណ្តាល AI Software Engineer កម្រិតខ្ពស់',
    slug: 'ai-software-engineer',
    category: 'AI',
    level: 'Advanced',
    totalDuration: '8h 30m',
    lessonsCount: 6,
    instructor: 'Mr. KIM SAN (PRO DIGITAL)',
    rating: 5.0,
    studentsEnrolled: 1680,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
    driveUrl: 'https://drive.google.com/file/d/1AX1mL1fN8CuEKqkQUO4Hr7jyNE8wxF8H/view?usp=drivesdk',
    description:
      'Master modern AI Software Engineering principles: LLM orchestration, Agentic frameworks, RAG architectures, multi-modal reasoning, prompt engineering, and deploying production full-stack AI applications.',
    descriptionKh:
      'សិក្សាពីការបង្កើតកម្មវិធី AI Software Engineering ទំនើបដោយប្រើ LLM Models, Agentic Workflows, RAG Architectures, និងការបញ្ចេញទៅកាន់ Cloud Hosting។',
    tags: ['AI Software Engineer', 'Gemini AI', 'Python', 'TypeScript', 'Next.js'],
    lessons: [
      {
        id: 'r19-l1',
        title: 'AI Software Engineering Architecture & Setup',
        titleKh: 'ស្ថាបត្យកម្មវិស្វករផ្នែកទន់ AI និងការដំឡើងបរិស្ថានការងារ',
        duration: '28:40',
        videoUrl: 'https://www.youtube.com/embed/5q87K1WaoFI',
        youtubeId: '5q87K1WaoFI',
        driveUrl: 'https://drive.google.com/file/d/1AX1mL1fN8CuEKqkQUO4Hr7jyNE8wxF8H/view?usp=drivesdk',
        summary:
          'Deep dive into AI Software Engineering paradigms, agentic architecture, LLM inference pipelines, and production workspace setup.',
        keyPoints: [
          'Overview of AI Software Engineering stack and development lifecycle',
          'Accessing Google Drive course resources, templates, and video walkthroughs',
          'Orchestrating agent workflows and state persistence',
          'Production project setup with Gemini API, TypeScript, and modern frontends',
        ],
        codeSnippet: `// AI Software Engineering - GenAI Agentic Integration
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function runAIEngineerAgent(prompt: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      temperature: 0.2,
      systemInstruction: 'You are an autonomous AI Software Engineer assistant.',
    },
  });
  return response.text;
}`,
        codeLanguage: 'tsx',
        resources: [
          {
            name: 'Google Drive Course Materials & Lecture',
            url: 'https://drive.google.com/file/d/1AX1mL1fN8CuEKqkQUO4Hr7jyNE8wxF8H/view?usp=drivesdk',
          },
          { name: 'Google GenAI SDK Documentation', url: 'https://ai.google.dev' },
        ],
      },
      {
        id: 'r19-l2',
        title: 'Large Language Models (LLM) Architecture & Reasoning',
        titleKh: 'ស្ថាបត្យកម្មម៉ូដែល LLMs & ដំណើរការគិត Reasoning',
        duration: '42:15',
        videoUrl: 'https://www.youtube.com/embed/2eWuYf-aZE4',
        youtubeId: '2eWuYf-aZE4',
        driveUrl: 'https://drive.google.com/file/d/1AX1mL1fN8CuEKqkQUO4Hr7jyNE8wxF8H/view?usp=drivesdk',
        summary:
          'Comprehensive exploration of tokenization, transformer architectures, pre-training, fine-tuning, and reasoning models.',
        keyPoints: [
          'Neural network weights, tokenizers, and context windows',
          'Attention mechanisms and transformer layers',
          'Reinforcement Learning from Human Feedback (RLHF)',
          'Prompt decomposition and Chain-of-Thought reasoning',
        ],
        codeSnippet: `// LLM Reasoning & Chain-of-Thought prompt
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: 'Analyze the performance trade-offs of Vector Embeddings vs Full-Text Search.',
  config: {
    thinkingConfig: { thinkingBudget: 1024 },
  },
});`,
        codeLanguage: 'typescript',
        resources: [
          {
            name: 'Google Drive Course Materials & Lecture',
            url: 'https://drive.google.com/file/d/1AX1mL1fN8CuEKqkQUO4Hr7jyNE8wxF8H/view?usp=drivesdk',
          },
          { name: 'LLM Visualization & Research Papers', url: 'https://arxiv.org' },
        ],
      },
      {
        id: 'r19-l3',
        title: 'Deep Learning & Neural Networks for AI Engineers',
        titleKh: 'Deep Learning & បណ្តាញសរសៃប្រសាទសិប្បនិម្មិត',
        duration: '35:20',
        videoUrl: 'https://www.youtube.com/embed/aircAruvnKk',
        youtubeId: 'aircAruvnKk',
        driveUrl: 'https://drive.google.com/file/d/1AX1mL1fN8CuEKqkQUO4Hr7jyNE8wxF8H/view?usp=drivesdk',
        summary:
          'Understand fundamental deep learning models, forward and backward propagation, loss functions, and PyTorch tensors.',
        keyPoints: [
          'Tensors, gradient descent, and backpropagation',
          'Activation functions (ReLU, GELU, Softmax)',
          'Training optimization with AdamW and learning rate schedulers',
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
