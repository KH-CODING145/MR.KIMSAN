import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Play,
  Clock,
  BookOpen,
  GraduationCap,
  Sparkles,
  Users,
  Star,
  ArrowRight,
  Video,
  Layers,
  Search,
  ExternalLink,
  Smartphone
} from 'lucide-react';
import { Course, sampleCourses } from '../data/coursesData';

interface CoursesProps {
  onOpenCourseModal: (courseId?: string, lessonId?: string) => void;
}

export default function Courses({ onOpenCourseModal }: CoursesProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [courseSearch, setCourseSearch] = useState<string>('');

  const categories = ['All', 'AI', 'React', 'Laravel', 'Node.js', 'Python'];

  const filteredCourses = useMemo(() => {
    return sampleCourses.filter((course) => {
      const matchesCategory =
        activeCategory === 'All' ||
        course.category.toLowerCase() === activeCategory.toLowerCase();

      const query = courseSearch.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        course.title.toLowerCase().includes(query) ||
        course.titleKh.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, courseSearch]);

  return (
    <section
      id="learning"
      className="py-20 lg:py-28 relative bg-slate-50 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/60"
      aria-label="Course and Online Video Learning"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-semibold mb-3">
            <Video className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>COURSE / LEARNING VIDEO HUB &bull; វីដេអូមេរៀនអនឡាញ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Online Courses &amp; Video Lessons
          </h2>
          <div className="w-12 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Free high-yield video tutorials, clean architecture walk-throughs, and code-along masterclasses
            for modern full-stack software development.
          </p>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-1">
            មេរៀនវីដេអូសម្រាប់ស្វ័យសិក្សាតាមប្រព័ន្ធអនឡាញ ដោយឥតគិតថ្លៃ
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 w-full sm:w-auto">
            {categories.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-105'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={courseSearch}
              onChange={(e) => setCourseSearch(e.target.value)}
              placeholder="Search course topics..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
            />
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -8,
                      scale: 1.015,
                      transition: { duration: 0.25, ease: 'easeOut' },
                    }
              }
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-shadow duration-300 group"
            >
              <div>
                {/* Course Image Banner with Overlay */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => onOpenCourseModal(course.id)}
                      className="w-14 h-14 rounded-2xl bg-indigo-600/90 hover:bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 transform group-hover:scale-110 transition-all duration-200 cursor-pointer backdrop-blur-xs"
                      aria-label={`Play course ${course.title}`}
                    >
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </button>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-900/90 text-indigo-600 dark:text-indigo-400 backdrop-blur-md shadow-xs">
                        {course.category}
                      </span>
                      <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                        <Smartphone className="w-2.5 h-2.5 rotate-90" />
                        <span>ផ្ដេកទូរស័ព្ទ</span>
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur-md">
                      <Clock className="w-3 h-3" />
                      {course.totalDuration}
                    </span>
                  </div>

                  {/* Bottom Stats on Image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200 font-medium">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                      {course.lessonsCount} Video Lessons
                    </span>
                    <span className="flex items-center gap-1 text-amber-400 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {course.rating} ({course.studentsEnrolled}+ students)
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
                      {course.level} Level
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      By {course.instructor}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                    {course.titleKh}
                  </p>

                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenCourseModal(course.id)}
                  className="flex-1 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/35 transition-all duration-200 cursor-pointer group/btn"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Learning / មើលវីដេអូមេរៀន</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                {course.driveUrl && (
                  <a
                    href={course.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-3 px-3.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors whitespace-nowrap shadow-xs"
                    title="Open Google Drive materials"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Drive Link</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning Hub Callout Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 text-white border border-indigo-800/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-cyan-400 shrink-0">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold">
                Online Developer Learning &amp; Masterclasses
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Explore comprehensive curriculum videos, source code repositories, and cheat sheets curated by Mr. KIM SAN.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpenCourseModal()}
            className="whitespace-nowrap px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-white text-indigo-950 hover:bg-indigo-50 shadow-lg shadow-black/20 hover:scale-105 transition-all duration-200 cursor-pointer flex items-center gap-2"
          >
            <Video className="w-4 h-4 text-indigo-600" />
            <span>Launch Video Player / ចូលរៀនឥឡូវនេះ</span>
          </button>
        </div>
      </div>
    </section>
  );
}
