import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  X,
  Github,
  Linkedin,
  ExternalLink,
  ThumbsUp,
  Share2,
  Check,
  Clock,
  Code2,
  GitCommit,
  Sparkles,
  Tag,
  BookOpen,
} from 'lucide-react';
import { SocialPostItem } from './SocialWall';

interface SocialPostDetailModalProps {
  post: SocialPostItem | null;
  onClose: () => void;
  isLiked?: boolean;
  onToggleLike?: (postId: string) => void;
  onSelectTag?: (tag: string) => void;
}

export default function SocialPostDetailModal({
  post,
  onClose,
  isLiked = false,
  onToggleLike,
  onSelectTag,
}: SocialPostDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (post) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [post, onClose]);

  if (!post) return null;

  const isGithub = post.platform === 'github';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(post.url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
          aria-hidden="true"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 my-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-post-title"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  isGithub
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700'
                    : 'bg-[#0A66C2]/10 text-[#0A66C2] dark:text-sky-300 border border-[#0A66C2]/30'
                }`}
              >
                {isGithub ? (
                  <Github className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                ) : (
                  <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                )}
                <span>{isGithub ? 'GitHub Activity' : 'LinkedIn Engineering Insight'}</span>
              </span>

              {post.badge && (
                <span className="text-[11px] font-mono font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-200/60 dark:border-indigo-800/60">
                  {post.badge}
                </span>
              )}
            </div>

            <button
              id="close-social-post-modal"
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Author Profile Ribbon */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/kim-san.jpg';
                  }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {post.author.name}
                    </h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Full-Stack Developer & AI Software Engineer &bull; Phnom Penh
                  </p>
                </div>
              </div>

              <div className="text-right text-xs text-slate-400 font-mono">
                <div>
                  {new Date(post.timestamp).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
                {post.readTime && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-indigo-500 dark:text-indigo-400 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <h2 id="modal-post-title" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                {post.title}
              </h2>
            </div>

            {/* Repository Info if GitHub */}
            {post.repo && (
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-indigo-500" />
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                    {post.repo.name}
                  </span>
                  {post.repo.language && (
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 font-mono text-[11px]">
                      {post.repo.language}
                    </span>
                  )}
                  {post.repo.branch && (
                    <span className="font-mono text-[11px] text-slate-400">
                      branch: {post.repo.branch}
                    </span>
                  )}
                </div>

                {post.commitHash && (
                  <div className="inline-flex items-center gap-1 font-mono text-[11px] px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <GitCommit className="w-3 h-3 text-indigo-500" />
                    <span>{post.commitHash}</span>
                  </div>
                )}
              </div>
            )}

            {/* Full Content */}
            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
              <p className="whitespace-pre-wrap">{post.content}</p>

              {/* Technical Takeaways Box */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 dark:text-indigo-200 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Engineering Takeaway & Highlights</span>
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Engineered with scalable architecture, modular state handling, and strict error handling.</li>
                  <li>Tested under real-world traffic benchmarks to ensure optimal latency and zero regressions.</li>
                  <li>Ready for deployment in production environments with continuous integration pipelines.</li>
                </ul>
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-semibold uppercase text-slate-400 dark:text-slate-500 flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>Related Technical Tags:</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        onSelectTag?.(tag);
                        onClose();
                      }}
                      className="text-xs font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 px-2.5 py-1 rounded-lg border border-indigo-200/60 dark:border-indigo-800/60 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-slate-50/80 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleLike?.(post.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isLiked
                    ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800 shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{isLiked ? 'Appreciated' : 'Appreciate Post'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>

            <a
              id="view-original-post-btn"
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-xs"
            >
              <span>{isGithub ? 'View on GitHub' : 'View on LinkedIn'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
