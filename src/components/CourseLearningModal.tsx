import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Play,
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  Code2,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2,
  Minimize2,
  Check,
  Search,
  ExternalLink,
  MessageSquare,
  BookmarkCheck,
  Award,
  GraduationCap
} from 'lucide-react';
import { Course, Lesson, sampleCourses } from '../data/coursesData';
import ReadingTimeIndicator from './ReadingTimeIndicator';

interface CourseLearningModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourseId?: string;
  initialLessonId?: string;
}

export default function CourseLearningModal({
  isOpen,
  onClose,
  initialCourseId,
  initialLessonId,
}: CourseLearningModalProps) {
  // Currently active course & lesson
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    initialCourseId || sampleCourses[0].id
  );
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'notes' | 'code' | 'resources' | 'qna'>('notes');
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [userStudyNotes, setUserStudyNotes] = useState<string>('');
  const [savedNotesMessage, setSavedNotesMessage] = useState<string>('');

  // Track completed lessons
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('completed_course_lessons');
      return saved ? new Set(JSON.parse(saved)) : new Set(['r19-l1']);
    } catch {
      return new Set(['r19-l1']);
    }
  });

  // Keep selectedCourse updated if initialCourseId changes
  useEffect(() => {
    if (initialCourseId) {
      setSelectedCourseId(initialCourseId);
    }
  }, [initialCourseId]);

  const activeCourse = useMemo(() => {
    return sampleCourses.find((c) => c.id === selectedCourseId) || sampleCourses[0];
  }, [selectedCourseId]);

  // Set default lesson when course changes
  useEffect(() => {
    if (initialLessonId && activeCourse.lessons.some((l) => l.id === initialLessonId)) {
      setSelectedLessonId(initialLessonId);
    } else {
      setSelectedLessonId(activeCourse.lessons[0]?.id || '');
    }
  }, [activeCourse, initialLessonId]);

  const activeLesson = useMemo(() => {
    return (
      activeCourse.lessons.find((l) => l.id === selectedLessonId) ||
      activeCourse.lessons[0] ||
      null
    );
  }, [activeCourse, selectedLessonId]);

  const currentLessonIndex = useMemo(() => {
    return activeCourse.lessons.findIndex((l) => l.id === activeLesson?.id);
  }, [activeCourse, activeLesson]);

  // Handle ESC key to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleLessonCompleted = (lessonId: string) => {
    setCompletedLessonIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(lessonId)) {
        updated.delete(lessonId);
      } else {
        updated.add(lessonId);
      }
      try {
        localStorage.setItem('completed_course_lessons', JSON.stringify(Array.from(updated)));
      } catch (err) {
        console.error('Failed to save completed lesson', err);
      }
      return updated;
    });
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < activeCourse.lessons.length - 1) {
      setSelectedLessonId(activeCourse.lessons[currentLessonIndex + 1].id);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setSelectedLessonId(activeCourse.lessons[currentLessonIndex - 1].id);
    }
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShareLesson = () => {
    const shareUrl = `${window.location.origin}#courses?course=${activeCourse.id}&lesson=${activeLesson?.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSaveNotes = () => {
    setSavedNotesMessage('Notes saved to session!');
    setTimeout(() => setSavedNotesMessage(''), 2500);
  };

  // Filter lessons based on playlist search
  const filteredLessons = useMemo(() => {
    if (!searchQuery.trim()) return activeCourse.lessons;
    const q = searchQuery.toLowerCase();
    return activeCourse.lessons.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        (l.titleKh && l.titleKh.toLowerCase().includes(q)) ||
        l.summary.toLowerCase().includes(q)
    );
  }, [activeCourse, searchQuery]);

  // Calculate course completion percentage
  const completedInCourseCount = activeCourse.lessons.filter((l) =>
    completedLessonIds.has(l.id)
  ).length;
  const courseProgressPercentage = Math.round(
    (completedInCourseCount / (activeCourse.lessons.length || 1)) * 100
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-3 lg:p-6 bg-slate-950/85 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className={`flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all duration-300 ${
            isCinemaMode
              ? 'w-full h-full rounded-none'
              : 'w-full max-w-7xl h-[96vh] sm:h-[92vh] rounded-2xl sm:rounded-3xl'
          }`}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 shrink-0">
            {/* Left: Branding & Course Title */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-0.5 shrink-0 shadow-xs">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    {activeCourse.category}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 hidden md:inline">
                    Online Learning &bull; វីដេអូមេរៀន
                  </span>
                </div>
                <h2
                  id="course-modal-title"
                  className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate"
                >
                  {activeCourse.title}
                </h2>
              </div>
            </div>

            {/* Right: Actions (Course Switcher, Cinema Mode, Close) */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Course Selector Dropdown */}
              <div className="hidden lg:flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Course:</span>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="text-xs font-semibold py-1.5 px-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  {sampleCourses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Progress pill */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                <BookmarkCheck className="w-3.5 h-3.5 text-indigo-500" />
                <span>{courseProgressPercentage}% Complete</span>
              </div>

              {/* Cinema Mode Toggle */}
              <button
                type="button"
                onClick={() => setIsCinemaMode((prev) => !prev)}
                title={isCinemaMode ? 'Normal View' : 'Cinema / Full Screen'}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Toggle Cinema Mode"
              >
                {isCinemaMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-600 transition-colors cursor-pointer"
                aria-label="Close Learning Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Main Grid */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* LEFT / CENTER: Video Player & Study Content */}
            <div className="flex-1 flex flex-col overflow-y-auto border-r border-slate-200 dark:border-slate-800">
              {/* 16:9 Video Player Container */}
              <div className="relative w-full bg-black aspect-video shrink-0 flex items-center justify-center overflow-hidden group">
                {activeLesson?.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${activeLesson.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={activeLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="text-center p-8 text-white">
                    <Play className="w-16 h-16 mx-auto mb-3 text-indigo-400 opacity-80" />
                    <p className="text-sm font-semibold">Video stream loading...</p>
                  </div>
                )}
              </div>

              {/* Lesson Control & Progress Bar */}
              <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                        Lesson {currentLessonIndex + 1} of {activeCourse.lessons.length}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activeLesson?.duration}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {activeLesson?.title}
                    </h3>
                    {activeLesson?.titleKh && (
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        {activeLesson.titleKh}
                      </p>
                    )}
                  </div>

                  {/* Actions & Completion toggle */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => activeLesson && toggleLessonCompleted(activeLesson.id)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs ${
                        activeLesson && completedLessonIds.has(activeLesson.id)
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      {activeLesson && completedLessonIds.has(activeLesson.id) ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Completed / បានរៀនចប់</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mark as Completed</span>
                        </>
                      )}
                    </button>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-800 rounded-xl p-0.5">
                      <button
                        type="button"
                        onClick={handlePrevLesson}
                        disabled={currentLessonIndex <= 0}
                        className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                        title="Previous Lesson"
                        aria-label="Previous Lesson"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextLesson}
                        disabled={currentLessonIndex >= activeCourse.lessons.length - 1}
                        className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                        title="Next Lesson"
                        aria-label="Next Lesson"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Share Lesson Link */}
                    <button
                      type="button"
                      onClick={handleShareLesson}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Share Lesson Link"
                      aria-label="Share Lesson Link"
                    >
                      {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Study Tabs Header */}
              <div className="flex items-center px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 gap-4 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab('notes')}
                  className={`py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'notes'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Overview &amp; Notes</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('code')}
                  className={`py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'code'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-4 h-4" />
                  <span>Code Snippets</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('resources')}
                  className={`py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'resources'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Resources &amp; Docs</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('qna')}
                  className={`py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'qna'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Study Notes &amp; Q&amp;A</span>
                </button>
              </div>

              {/* Study Tab Contents */}
              <div className="p-6 flex-grow bg-white dark:bg-slate-900">
                {activeTab === 'notes' && (
                  <div className="space-y-6 max-w-3xl">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Lesson Summary
                        </h4>
                        <ReadingTimeIndicator
                          content={[
                            activeLesson?.summary,
                            ...(activeLesson?.keyPoints || []),
                            activeLesson?.notes,
                          ]}
                          variant="badge"
                          label="Notes"
                        />
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                        {activeLesson?.summary}
                      </p>
                    </div>

                    {activeLesson?.keyPoints && activeLesson.keyPoints.length > 0 && (
                      <div>
                        <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                          Key Learning Objectives (ចំណុចសំខាន់ៗ)
                        </h4>
                        <ul className="space-y-2.5">
                          {activeLesson.keyPoints.map((point, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                            >
                              <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold uppercase tracking-wide text-indigo-900 dark:text-indigo-200 mb-1">
                          Instructor Tip &bull; Mr. KIM SAN
                        </h5>
                        <p className="text-xs text-indigo-800 dark:text-indigo-300 leading-relaxed">
                          For best retention, type the code out by hand in your local code editor
                          and test every edge case yourself. Building real prototypes solidifies
                          production intuition faster than passive viewing!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'code' && (
                  <div className="space-y-4 max-w-4xl">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        Language: {activeLesson?.codeLanguage || 'TypeScript'}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          activeLesson?.codeSnippet && handleCopyCode(activeLesson.codeSnippet)
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Code2 className="w-3.5 h-3.5" />
                            <span>Copy Snippet</span>
                          </>
                        )}
                      </button>
                    </div>

                    {activeLesson?.codeSnippet ? (
                      <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto shadow-inner">
                        <pre>{activeLesson.codeSnippet}</pre>
                      </div>
                    ) : (
                      <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-xs">
                        No code snippet required for this conceptual lecture. Explore the resources
                        tab for reference repositories.
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'resources' && (
                  <div className="space-y-4 max-w-2xl">
                    <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                      External Documentation &amp; Source Repositories
                    </h4>
                    {activeLesson?.resources && activeLesson.resources.length > 0 ? (
                      <div className="space-y-2">
                        {activeLesson.resources.map((res, i) => (
                          <a
                            key={i}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all text-sm group"
                          >
                            <span className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                              {res.name}
                            </span>
                            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <a
                          href="https://github.com/kimsan"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all text-sm group"
                        >
                          <span className="font-medium text-slate-800 dark:text-slate-200">
                            Instructor GitHub Repository &amp; Lab Solutions
                          </span>
                          <ExternalLink className="w-4 h-4 text-slate-400" />
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'qna' && (
                  <div className="space-y-4 max-w-2xl">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Your Personal Study Notes (កំណត់ត្រាមេរៀន)
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Save your notes for this lesson during your study session:
                    </p>
                    <textarea
                      value={userStudyNotes}
                      onChange={(e) => setUserStudyNotes(e.target.value)}
                      placeholder="Write your study notes, commands, or takeaways here..."
                      rows={4}
                      className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleSaveNotes}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer"
                      >
                        Save Notes
                      </button>
                      {savedNotesMessage && (
                        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                          {savedNotesMessage}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Course Syllabus & Video Playlist */}
            <div className="w-full lg:w-96 flex flex-col bg-slate-50 dark:bg-slate-950 shrink-0 overflow-y-auto">
              {/* Syllabus Header */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
                    Course Syllabus &bull; មាតិកាមេរៀន
                  </span>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {completedInCourseCount}/{activeCourse.lessons.length} Finished
                  </span>
                </div>

                {/* Progress bar visual */}
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300 rounded-full"
                    style={{ width: `${courseProgressPercentage}%` }}
                  />
                </div>

                {/* Search lessons filter */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search lessons..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Course switch pills on mobile/tablet */}
              <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex gap-1.5 overflow-x-auto bg-slate-100/50 dark:bg-slate-900/50">
                {sampleCourses.map((c) => {
                  const isCurrentCourse = c.id === selectedCourseId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCourseId(c.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        isCurrentCourse
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {c.category}
                    </button>
                  );
                })}
              </div>

              {/* Playlist Item List */}
              <div className="divide-y divide-slate-200 dark:divide-slate-800/60 flex-1 overflow-y-auto">
                {filteredLessons.map((lesson, index) => {
                  const isActive = lesson.id === activeLesson?.id;
                  const isCompleted = completedLessonIds.has(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => setSelectedLessonId(lesson.id)}
                      className={`p-3.5 flex items-start gap-3 transition-colors cursor-pointer group ${
                        isActive
                          ? 'bg-indigo-50/90 dark:bg-indigo-950/60 border-l-4 border-indigo-600'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-900/80'
                      }`}
                    >
                      {/* Checkbox button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLessonCompleted(lesson.id);
                        }}
                        className="mt-0.5 text-slate-400 hover:text-emerald-500 transition-colors shrink-0"
                        title={isCompleted ? 'Mark incomplete' : 'Mark complete'}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
                        ) : (
                          <Circle className="w-4 h-4 hover:text-indigo-500" />
                        )}
                      </button>

                      {/* Lesson title & time */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span
                            className={`text-[11px] font-mono font-medium ${
                              isActive
                                ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                                : 'text-slate-400'
                            }`}
                          >
                            Lesson #{index + 1}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 shrink-0">
                            <Clock className="w-3 h-3" />
                            {lesson.duration}
                          </span>
                        </div>

                        <h4
                          className={`text-xs font-semibold line-clamp-2 leading-snug transition-colors ${
                            isActive
                              ? 'text-indigo-700 dark:text-indigo-300 font-bold'
                              : 'text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                          }`}
                        >
                          {lesson.title}
                        </h4>

                        {lesson.titleKh && (
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 line-clamp-1 mt-0.5">
                            {lesson.titleKh}
                          </p>
                        )}
                      </div>

                      {/* Play icon indicator */}
                      {isActive && (
                        <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Play className="w-3 h-3 fill-white ml-0.5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Course Certificate / Instructor Badge Footer */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 shrink-0 font-bold text-xs">
                    KS
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                      {activeCourse.instructor}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                      {activeCourse.level} &bull; {activeCourse.totalDuration} total video
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
