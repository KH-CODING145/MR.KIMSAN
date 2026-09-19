import { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Github,
  Linkedin,
  Facebook,
  Send,
  Youtube,
  Terminal,
  Sparkles,
  CheckCircle,
  GraduationCap,
  Languages,
  Video,
  Play,
  User,
  Layout,
  Maximize2,
} from 'lucide-react';
import TypewriterTitle from './TypewriterTitle';
import FadeInUpSection from './FadeInUpSection';
import ProDigitalBrandPoster from './ProDigitalBrandPoster';
import ProDigitalBrandPosterModal from './ProDigitalBrandPosterModal';

interface HeroProps {
  personal: {
    name: string;
    brand?: string;
    title: string;
    subtitle?: string;
    description: string;
    avatar: string;
    googleDriveAvatar?: string;
    location: string;
    status: string;
  };
  social: {
    github: string;
    linkedin: string;
    facebook: string;
    telegram: string;
    youtube: string;
  };
  onOpenResume?: () => void;
  onOpenCourseModal?: () => void;
}

export default function Hero({ personal, social, onOpenResume, onOpenCourseModal }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeVisualTab, setActiveVisualTab] = useState<'profile' | 'poster'>('poster');
  const [posterModalOpen, setPosterModalOpen] = useState(false);

  const socialLinks = [
    { name: 'GitHub', href: social.github, icon: Github },
    { name: 'LinkedIn', href: social.linkedin, icon: Linkedin },
    { name: 'Facebook', href: social.facebook, icon: Facebook },
    { name: 'Telegram', href: social.telegram, icon: Send },
    { name: 'YouTube', href: social.youtube, icon: Youtube },
  ].filter((s) => Boolean(s.href));

  const techPills = ['React', 'TypeScript', 'Node.js', 'Laravel', 'Gemini AI', 'Tailwind CSS', 'Docker'];

  const languagesList = [
    { name: 'ENGLISH', percent: 80, barColor: 'from-blue-500 to-indigo-600' },
    { name: 'CHANISE', percent: 50, barColor: 'from-amber-500 to-red-500' },
    { name: 'VIETNAMESE', percent: 60, barColor: 'from-emerald-500 to-teal-500' },
    { name: 'THAILAND', percent: 80, barColor: 'from-purple-500 to-pink-500' },
    { name: 'JAPANESE', percent: 40, barColor: 'from-rose-500 to-indigo-500' },
    { name: 'KHMER', percent: 99, barColor: 'from-cyan-500 to-blue-600' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Background ambient gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-indigo-500/10 dark:bg-indigo-500/15 blur-[120px] rounded-full" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-cyan-500/10 dark:bg-cyan-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-purple-500/10 dark:bg-purple-500/10 blur-[110px] rounded-full" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <FadeInUpSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" yOffset={24}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Call to Action */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Availability status badge & Brand */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-medium shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{personal.status || 'Available for freelance & full-time roles'}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold font-mono tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>{personal.brand || 'PRO DIGITAL'}</span>
              </div>
            </div>

            {/* Intro greetings */}
            <span className="text-sm sm:text-base font-mono font-medium tracking-wide text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-1.5">
              <Terminal className="w-4 h-4" />
              <span>Hello, I'm</span>
            </span>

            {/* Name */}
            <h1 className="font-name text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-normal tracking-normal text-slate-900 dark:text-white leading-tight mb-3">
              {personal.name}
            </h1>

            {/* Title / Role with Typewriter Effect */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-6">
              <TypewriterTitle
                titles={[
                  'Full-Stack Developer',
                  'AI Software Engineer',
                ]}
              />
            </h2>

            {/* Short professional introduction */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-8">
              {personal.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <a
                id="hero-view-projects-btn"
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('projects');
                  if (el) {
                    const headerOffset = 76;
                    const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    history.pushState(null, '', '#projects');
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-md shadow-indigo-600/25 cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                id="hero-course-learning-btn"
                type="button"
                onClick={() => {
                  if (onOpenCourseModal) {
                    onOpenCourseModal();
                  } else {
                    const el = document.getElementById('learning') || document.getElementById('education');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-semibold text-sm border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/80 active:scale-95 transition-all duration-200 shadow-xs cursor-pointer group"
                title="Watch Online Courses & Video Lessons (វីដេអូមេរៀន)"
              >
                <Video className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                <span>COURSE/LEARNING</span>
              </button>

              <button
                id="hero-poster-modal-btn"
                type="button"
                onClick={() => setPosterModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-950/20 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 font-semibold text-sm border border-cyan-500/40 hover:bg-cyan-500/10 active:scale-95 transition-all duration-200 shadow-xs cursor-pointer group"
                title="View Official PRO DIGITAL Brand Graphic & Poster"
              >
                <Sparkles className="w-4 h-4 text-cyan-500 animate-pulse" />
                <span>PRO DIGITAL Graphic</span>
              </button>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2 border-t border-slate-200 dark:border-slate-800/80 w-full">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-2">
                Connect:
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200/60 dark:border-slate-800/60 transition-all duration-200"
                      aria-label={`Visit ${personal.name}'s ${item.name}`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Profile Visual & Brand Poster */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-center lg:items-end"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Visual View Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm mb-3 z-10">
              <button
                type="button"
                onClick={() => setActiveVisualTab('poster')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeVisualTab === 'poster'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>Brand Poster</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveVisualTab('profile')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeVisualTab === 'profile'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Photo Profile</span>
              </button>
            </div>

            <div className="relative w-full max-w-[380px] sm:max-w-[440px]">
              {activeVisualTab === 'poster' ? (
                <div className="relative">
                  <ProDigitalBrandPoster onOpenModal={() => setPosterModalOpen(true)} />
                </div>
              ) : (
                <div className="relative">
                  {/* Glow backdrop ring */}
                  <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 opacity-20 dark:opacity-30 blur-xl"></div>

                  {/* Main Card Container */}
                  <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-xl">
                    {/* Profile Image with subtle floating container */}
                    <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-square flex items-center justify-center">
                      <img
                        src={personal.avatar}
                        alt={`${personal.name} - ${personal.title}`}
                        className="w-full h-full object-cover object-top"
                        loading="eager"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          if (personal.googleDriveAvatar && e.currentTarget.src !== personal.googleDriveAvatar) {
                            e.currentTarget.src = personal.googleDriveAvatar;
                          }
                        }}
                      />
                      {/* Subtle gradient overlay at bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                      {/* Floating Micro Badge: Full-Stack & AI Software */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60 text-white text-xs">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="font-medium">Full-Stack &amp; AI Software</span>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-300">v3.5.0</span>
                      </div>
                    </div>

                    {/* Tech Pills under avatar */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                        Core Technologies
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {techPills.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/50 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 5 Languages under Core Technologies */}
                    <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                          <Languages className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Languages Proficiency</span>
                        </p>
                        <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
                          {languagesList.length} Languages
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {languagesList.map((lang) => (
                          <div key={lang.name} className="space-y-0.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-slate-700 dark:text-slate-200 text-[11px]">
                                {lang.name}
                              </span>
                              <span className="font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                                {lang.percent}%
                              </span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                              <motion.div
                                initial={shouldReduceMotion ? { width: `${lang.percent}%` } : { width: 0 }}
                                animate={{ width: `${lang.percent}%` }}
                                transition={{ duration: 0.7, ease: 'easeOut' }}
                                className={`h-full rounded-full bg-gradient-to-r ${lang.barColor}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating Stat Pill Left */}
                  <div className="hidden sm:flex items-center gap-2.5 absolute -bottom-4 -left-6 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">100% Quality</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Clean & Tested Code</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </FadeInUpSection>

      {/* Fullscreen Brand Poster Modal */}
      <ProDigitalBrandPosterModal
        isOpen={posterModalOpen}
        onClose={() => setPosterModalOpen(false)}
      />
    </section>
  );
}
