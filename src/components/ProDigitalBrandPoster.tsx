import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  Terminal,
  Database,
  Cpu,
  Server,
  Box,
  Send,
  Sparkles,
  Globe,
  Mail,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Maximize2,
  Share2,
} from 'lucide-react';

interface ProDigitalBrandPosterProps {
  onOpenModal?: () => void;
  className?: string;
  isCompact?: boolean;
}

export default function ProDigitalBrandPoster({
  onOpenModal,
  className = '',
  isCompact = false,
}: ProDigitalBrandPosterProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTelegram, setCopiedTelegram] = useState(false);

  const copyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('pro.digital.dev@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyTelegram = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('https://t.me/pro_digital');
    setCopiedTelegram(true);
    setTimeout(() => setCopiedTelegram(false), 2000);
  };

  const skillsList = [
    {
      name: 'Laravel',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-red-500 fill-current drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">
          <path d="M21.1 8.2l-8.6-5a2.2 2.2 0 0 0-2.2 0l-7.4 4.3A2.2 2.2 0 0 0 1.8 9.4v9.2a2.2 2.2 0 0 0 1.1 1.9l8.6 5a2.2 2.2 0 0 0 2.2 0l7.4-4.3a2.2 2.2 0 0 0 1.1-1.9V10.1a2.2 2.2 0 0 0-1.1-1.9zM11.5 5l7.1 4.1-3.2 1.9-7.1-4.1zm-8 4.6l6.8 3.9v7.9l-6.8-4zm15.6 7.9l-7.1 4.1v-7.9l7.1-4.1z" />
        </svg>
      ),
      bg: 'from-red-500/10 to-red-950/40 border-red-500/40',
      glow: 'group-hover:border-red-400 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]',
    },
    {
      name: 'React',
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-cyan-400 stroke-current fill-none stroke-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)] animate-spin-slow">
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" className="fill-cyan-400" />
        </svg>
      ),
      bg: 'from-cyan-500/10 to-cyan-950/40 border-cyan-500/40',
      glow: 'group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]',
    },
    {
      name: 'Python',
      icon: (
        <div className="w-7 h-7 flex items-center justify-center font-bold text-xs bg-gradient-to-br from-blue-500 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">
          <Terminal className="w-6 h-6 text-amber-400" />
        </div>
      ),
      bg: 'from-blue-500/10 to-amber-950/40 border-amber-500/40',
      glow: 'group-hover:border-amber-400 group-hover:shadow-[0_0_15px_rgba(251,191,36,0.4)]',
    },
    {
      name: 'C#',
      icon: (
        <div className="w-7 h-7 rounded-lg bg-purple-900/60 border border-purple-500/60 flex items-center justify-center font-black text-purple-300 text-sm drop-shadow-[0_0_8px_rgba(168,85,247,0.7)] font-mono">
          C#
        </div>
      ),
      bg: 'from-purple-500/10 to-purple-950/40 border-purple-500/40',
      glow: 'group-hover:border-purple-400 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]',
    },
    {
      name: 'MySQL',
      icon: (
        <Database className="w-7 h-7 text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.6)]" />
      ),
      bg: 'from-cyan-500/10 to-blue-950/40 border-cyan-500/40',
      glow: 'group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]',
    },
    {
      name: 'Docker',
      icon: (
        <Box className="w-7 h-7 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
      ),
      bg: 'from-sky-500/10 to-sky-950/40 border-sky-500/40',
      glow: 'group-hover:border-sky-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]',
    },
    {
      name: 'Telegram Bot',
      icon: (
        <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
          <Send className="w-3.5 h-3.5 -rotate-12 translate-x-[-1px]" />
        </div>
      ),
      bg: 'from-blue-500/10 to-blue-950/40 border-blue-500/40',
      glow: 'group-hover:border-blue-400 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]',
    },
    {
      name: 'AI & LLM',
      icon: (
        <div className="w-7 h-7 flex items-center justify-center text-teal-300 drop-shadow-[0_0_10px_rgba(45,212,191,0.8)]">
          <Sparkles className="w-6 h-6 animate-pulse text-teal-400" />
        </div>
      ),
      bg: 'from-teal-500/10 to-emerald-950/40 border-teal-500/40',
      glow: 'group-hover:border-teal-400 group-hover:shadow-[0_0_15px_rgba(45,212,191,0.4)]',
    },
  ];

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#060c1c] via-[#081530] to-[#030712] border border-cyan-500/30 text-white shadow-2xl shadow-cyan-950/60 select-none ${className}`}
    >
      {/* Background Cyber Glow Gradients & Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-600/20 blur-[90px] rounded-full" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-cyan-500/20 blur-[100px] rounded-full" />
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-indigo-600/20 blur-[110px] rounded-full" />
        {/* Subtle holographic grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d4ff08_1px,transparent_1px),linear-gradient(to_bottom,#00d4ff08_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative p-5 sm:p-7 flex flex-col justify-between h-full z-10 space-y-6">
        {/* Header Ribbon & Slogan */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[13px] sm:text-sm font-handwriting italic font-bold tracking-wider text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)] flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              Code Build Create Future
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenModal && (
              <button
                type="button"
                onClick={onOpenModal}
                className="p-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:text-white hover:bg-cyan-900/60 transition-colors"
                title="Expand Poster Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}
            <span className="text-[11px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shadow-xs">
              Official Graphic
            </span>
          </div>
        </div>

        {/* Brand Headline & 3D Digital Globe */}
        <div className="text-center pt-2">
          {/* Futuristic Globe Emblem */}
          <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 mb-3 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 opacity-25 blur-md animate-pulse" />
            <div className="relative w-full h-full rounded-full border border-cyan-400/50 bg-[#071738]/80 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <Globe className="w-9 h-9 sm:w-11 sm:h-11 text-cyan-300 animate-spin-slow opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[8px] font-mono font-extrabold text-cyan-100 tracking-tighter bg-cyan-950/90 px-1 py-0.5 rounded border border-cyan-400/40">
                  DIGITAL
                </span>
              </div>
            </div>
          </div>

          {/* PRO DIGITAL Wordmark */}
          <div className="inline-flex items-center justify-center gap-2 mb-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">
              PRO DIGITAL
            </h1>
          </div>

          <h2 className="text-sm sm:text-base md:text-lg font-bold tracking-widest text-cyan-300 uppercase mb-1">
            FULL STACK DEVELOPER
          </h2>
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-slate-300 uppercase">
            &amp; AI SOFTWARE ENGINEERING
          </p>

          {/* Mission Quote Banner */}
          <div className="mt-4 mx-auto max-w-lg p-3 rounded-2xl bg-[#0b1c3e]/70 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.15)] relative">
            <span className="absolute -top-3 left-4 text-2xl font-serif text-cyan-400 leading-none">
              “
            </span>
            <p className="text-xs sm:text-sm italic font-medium text-cyan-100 text-center px-4 leading-relaxed">
              Turning ideas into powerful digital solutions with{' '}
              <span className="font-bold text-cyan-300 underline decoration-cyan-400/60 decoration-2">
                AI technology.
              </span>
            </p>
            <span className="absolute -bottom-4 right-4 text-2xl font-serif text-cyan-400 leading-none">
              ”
            </span>
          </div>
        </div>

        {/* MY SKILLS Section (2x4 Grid matching the poster) */}
        <div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
              MY SKILLS
            </span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {skillsList.map((skill) => (
              <div
                key={skill.name}
                className={`group flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-gradient-to-b ${skill.bg} border backdrop-blur-sm transition-all duration-200 ${skill.glow} hover:-translate-y-0.5 cursor-pointer`}
              >
                <div className="mb-1.5 flex items-center justify-center h-8">
                  {skill.icon}
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-200 text-center truncate max-w-full">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>

          {/* Subdomain specializations line */}
          <div className="mt-3 text-center">
            <p className="text-[9px] sm:text-[10px] font-mono tracking-wider text-cyan-400/90 font-medium">
              WEB DEVELOPMENT &nbsp;|&nbsp; API &nbsp;|&nbsp; DATABASE &nbsp;|&nbsp; AUTOMATION &nbsp;|&nbsp; AI SOLUTIONS &nbsp;|&nbsp; SYSTEM DESIGN
            </p>
          </div>
        </div>

        {/* Dual Cards: Left Checklist & Right Code/AI Dreams */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left Glass Card: Core Competencies Checklist */}
          <div className="p-3.5 rounded-2xl bg-[#091b3d]/80 border border-cyan-500/40 backdrop-blur-md shadow-lg flex flex-col justify-between">
            <div className="space-y-2">
              {[
                'Web Development',
                'Full Stack Development',
                'AI & Machine Learning',
                'Desktop & Mobile Apps',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400/70 flex items-center justify-center text-cyan-300 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-xs font-medium text-slate-100">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2.5 border-t border-cyan-500/30 flex items-center justify-between text-[10px] font-mono font-bold tracking-wider text-cyan-300">
              <span>LEARN</span>
              <span>•</span>
              <span>BUILD</span>
              <span>•</span>
              <span>INNOVATE</span>
            </div>
          </div>

          {/* Right Card: Laptop Workstation & Better Code Bigger Dreams */}
          <div className="p-3.5 rounded-2xl bg-[#091b3d]/80 border border-cyan-500/40 backdrop-blur-md shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <span>AI Engineering</span>
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                  </div>
                  <div className="text-[10px] text-cyan-300/80 font-mono">Neural Models &amp; LLMs</div>
                </div>
              </div>

              <div className="px-2 py-1 rounded bg-cyan-400/10 border border-cyan-400/30 text-[10px] font-mono font-bold text-cyan-300">
                AI
              </div>
            </div>

            <div className="mt-3 text-right">
              <p className="text-base sm:text-lg font-handwriting italic font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
                Better Code Bigger Dreams
              </p>
              <p className="text-[10px] font-mono text-slate-400">Next-Gen Software Architecture</p>
            </div>
          </div>
        </div>

        {/* Bottom Contact & Brand Bar */}
        <div className="pt-3 border-t border-cyan-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Email button with 1-click copy */}
          <button
            type="button"
            onClick={copyEmail}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-900/60 text-slate-200 hover:text-white transition-colors cursor-pointer group"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-[11px]">pro.digital.dev@gmail.com</span>
            {copiedEmail ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3 opacity-60 group-hover:opacity-100" />
            )}
          </button>

          {/* Telegram link & copy */}
          <a
            href="https://t.me/pro_digital"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-900/60 text-slate-200 hover:text-white transition-colors group"
          >
            <Send className="w-3.5 h-3.5 text-cyan-400 -rotate-12" />
            <span className="font-mono text-[11px]">t.me/pro_digital</span>
            <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
          </a>

          {/* Technology Brighter Future Tag */}
          <div className="hidden md:flex items-center gap-1.5 text-cyan-300/80 font-mono text-[10px] uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>TECHNOLOGY BRIGHTER FUTURE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
