import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Github,
  Linkedin,
  RefreshCw,
  GitCommit,
  GitFork,
  Star,
  ExternalLink,
  Radio,
  Sparkles,
  ArrowUpRight,
  Clock,
  Layers,
  CheckCircle2,
  AlertCircle,
  ThumbsUp,
  MessageSquare,
  Tag,
  Code2,
} from 'lucide-react';

export interface SocialPostItem {
  id: string;
  platform: 'github' | 'linkedin';
  type: 'commit' | 'repo_create' | 'fork' | 'star' | 'release' | 'pr' | 'post' | 'article';
  author: {
    name: string;
    username: string;
    avatar: string;
    profileUrl: string;
  };
  title: string;
  content: string;
  badge?: string;
  repo?: {
    name: string;
    url: string;
    language?: string;
  };
  metrics: {
    stars?: number;
    forks?: number;
    reactions?: number;
    comments?: number;
    commitsCount?: number;
  };
  tags: string[];
  timestamp: string;
  url: string;
}

interface SocialWallFeedResponse {
  posts: SocialPostItem[];
  meta: {
    total: number;
    githubCount: number;
    linkedinCount: number;
    fetchedAt: string;
    githubStatus: {
      connected: boolean;
      username: string;
      message: string;
      rateLimitRemaining: number | null;
    };
    linkedinStatus: {
      connected: boolean;
      message: string;
    };
  };
  cached?: boolean;
  cacheAgeSeconds?: number;
}

function timeAgo(isoString: string): string {
  try {
    const diffSec = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
    if (diffSec < 60) return 'Just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}h ago`;
    const diffDay = Math.floor(diffHour / 24);
    if (diffDay < 30) return `${diffDay}d ago`;
    return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return 'Recently';
  }
}

export default function SocialWall() {
  const [data, setData] = useState<SocialWallFeedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'github' | 'linkedin'>('all');
  const [error, setError] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const fetchFeed = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/social-wall/feed${isRefresh ? '?refresh=true' : ''}`);
      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }
      const json: SocialWallFeedResponse = await res.json();
      setData(json);
    } catch (err: any) {
      console.error('Social wall fetch error:', err);
      setError(err.message || 'Failed to sync with API endpoints');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed(false);
  }, [fetchFeed]);

  const filteredPosts = useMemo(() => {
    if (!data?.posts) return [];
    if (activeFilter === 'all') return data.posts;
    return data.posts.filter((p) => p.platform === activeFilter);
  }, [data, activeFilter]);

  const githubCount = data?.meta.githubCount ?? 0;
  const linkedinCount = data?.meta.linkedinCount ?? 0;
  const totalCount = data?.meta.total ?? 0;

  return (
    <section
      id="social-wall"
      className="py-20 lg:py-28 relative bg-slate-50/70 dark:bg-slate-950/40"
      aria-label="Social Wall and Professional Feed"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-medium mb-3">
            <Radio className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
            <span>Live Professional Stream</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Professional Social Wall
          </h2>
          <div className="w-12 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            A live feed of engineering activity, commits, repository launches, and technical insights synced dynamically from GitHub and LinkedIn.
          </p>
        </div>

        {/* Real-time Status & Sync Bar */}
        <div className="mb-8 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* API Connectivity Badges */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            {/* GitHub Status */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <Github className="w-3.5 h-3.5 text-slate-900 dark:text-white shrink-0" />
              <span className="font-semibold">GitHub API:</span>
              {data?.meta.githubStatus.connected ? (
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live (@{data.meta.githubStatus.username})
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-mono font-medium">
                  Connecting...
                </span>
              )}
            </div>

            {/* LinkedIn Status */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <Linkedin className="w-3.5 h-3.5 text-[#0A66C2] shrink-0" />
              <span className="font-semibold">LinkedIn:</span>
              <span className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-mono font-medium">
                <CheckCircle2 className="w-3 h-3 text-indigo-500" />
                Verified Network Stream
              </span>
            </div>

            {data?.meta.githubStatus.rateLimitRemaining !== null && (
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden xl:inline-block">
                Quota: {data?.meta.githubStatus.rateLimitRemaining} calls remaining
              </span>
            )}
          </div>

          {/* Action: Refresh & Timestamp */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {data?.meta.fetchedAt && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <span>Synced {timeAgo(data.meta.fetchedAt)}</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => fetchFeed(true)}
              disabled={refreshing || loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors disabled:opacity-50 cursor-pointer shadow-xs active:scale-95"
              title="Trigger real-time pull from GitHub and LinkedIn APIs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Syncing...' : 'Refresh Feed'}</span>
            </button>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 inline-flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Updates</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                activeFilter === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}
            >
              {totalCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('github')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 inline-flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'github'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md shadow-slate-900/25 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Feed</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                activeFilter === 'github'
                  ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}
            >
              {githubCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('linkedin')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 inline-flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'linkedin'
                ? 'bg-[#0A66C2] text-white shadow-md shadow-[#0A66C2]/25 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn Feed</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                activeFilter === 'linkedin' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}
            >
              {linkedinCount}
            </span>
          </button>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
                    <div className="space-y-1.5">
                      <div className="w-24 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
                      <div className="w-16 h-2.5 bg-slate-200 dark:bg-slate-800 rounded" />
                    </div>
                  </div>
                  <div className="w-16 h-5 bg-slate-200 dark:bg-slate-800 rounded-full" />
                </div>
                <div className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="w-5/6 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="w-2/3 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="pt-2 flex justify-between">
                  <div className="w-20 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="w-14 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error Fallback */}
        {!loading && error && (
          <div className="p-8 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-center max-w-lg mx-auto">
            <AlertCircle className="w-8 h-8 text-amber-600 dark:text-amber-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Could Not Fetch Social Stream
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">{error}</p>
            <button
              type="button"
              onClick={() => fetchFeed(true)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Retry Sync
            </button>
          </div>
        )}

        {/* Post Grid */}
        {!loading && !error && (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, idx) => {
                const isGithub = post.platform === 'github';

                return (
                  <motion.article
                    key={post.id}
                    layout
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.35,
                      delay: shouldReduceMotion ? 0 : Math.min(idx * 0.05, 0.25),
                    }}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Post Header */}
                      <div className="flex items-start justify-between gap-2 mb-3.5">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                            loading="lazy"
                            onError={(e) => {
                              // Fallback to initial if avatar fails
                              (e.currentTarget as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop';
                            }}
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-semibold text-xs text-slate-900 dark:text-white leading-snug">
                                {post.author.name}
                              </h3>
                              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                                {timeAgo(post.timestamp)}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                              @{post.author.username}
                            </span>
                          </div>
                        </div>

                        {/* Platform Indicator & Type Badge */}
                        <div className="flex flex-col items-end gap-1">
                          <div
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              isGithub
                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                                : 'bg-[#0A66C2]/10 text-[#0A66C2] dark:text-sky-300 border border-[#0A66C2]/30'
                            }`}
                          >
                            {isGithub ? (
                              <Github className="w-3 h-3 text-slate-900 dark:text-white" />
                            ) : (
                              <Linkedin className="w-3 h-3 text-[#0A66C2]" />
                            )}
                            <span>{isGithub ? 'GitHub' : 'LinkedIn'}</span>
                          </div>

                          {post.badge && (
                            <span className="text-[10px] font-mono font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70 px-1.5 py-0.2 rounded border border-indigo-200/60 dark:border-indigo-800/60">
                              {post.badge}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title / Headline */}
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {post.title}
                      </h4>

                      {/* Content / Commentary */}
                      <p className="text-xs text-slate-600 dark:text-slate-300/90 leading-relaxed mb-4 line-clamp-3">
                        {post.content}
                      </p>

                      {/* Repository Badge if GitHub */}
                      {post.repo && (
                        <div className="mb-4 p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 truncate">
                            <Code2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                            <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300 truncate">
                              {post.repo.name}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/70 px-2 py-0.5 rounded-md"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer Metrics & Direct URL */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                      {/* Metrics */}
                      <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {post.metrics.commitsCount !== undefined && (
                          <span className="inline-flex items-center gap-1" title="Commits pushed">
                            <GitCommit className="w-3 h-3 text-indigo-500" />
                            <span>{post.metrics.commitsCount}</span>
                          </span>
                        )}
                        {post.metrics.reactions !== undefined && (
                          <span className="inline-flex items-center gap-1" title="Reactions">
                            <ThumbsUp className="w-3 h-3 text-[#0A66C2]" />
                            <span>{post.metrics.reactions}</span>
                          </span>
                        )}
                        {post.metrics.comments !== undefined && (
                          <span className="inline-flex items-center gap-1" title="Comments">
                            <MessageSquare className="w-3 h-3 text-slate-400" />
                            <span>{post.metrics.comments}</span>
                          </span>
                        )}
                      </div>

                      {/* External Link */}
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>{isGithub ? 'View Commit' : 'View Post'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
