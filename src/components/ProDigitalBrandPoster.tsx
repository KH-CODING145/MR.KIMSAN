import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Phone,
  LayoutGrid,
  Minimize2,
  Layers,
} from 'lucide-react';
import { portfolio } from '../data/portfolio';
import CodeBuildCreateFutureCard from './CodeBuildCreateFutureCard';

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
  const [copiedSecondaryEmail, setCopiedSecondaryEmail] = useState(false);
  const [copiedTelegram, setCopiedTelegram] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [viewMode, setViewMode] = useState<'full' | 'small'>(isCompact ? 'small' : 'full');

  if (viewMode === 'small') {
    return (
      <CodeBuildCreateFutureCard
        onOpenModal={onOpenModal}
        onSwitchToFull={() => setViewMode('full')}
        className={className}
      />
    );
  }

  const primaryEmail = portfolio.personal?.email || 'pro.digital.dev@gmail.com';
  const secondaryEmail = portfolio.personal?.secondaryEmail || 'kimsan.dev@gmail.com';
  const telegramUrl = portfolio.social?.telegram || 'https://t.me/pro_digital';
  const phone = portfolio.personal?.phone || '+855 (016/093/012) 949 145';

  const copyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(primaryEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copySecondaryEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(secondaryEmail);
    setCopiedSecondaryEmail(true);
    setTimeout(() => setCopiedSecondaryEmail(false), 2000);
  };

  const copyTelegram = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(telegramUrl);
    setCopiedTelegram(true);
    setTimeout(() => setCopiedTelegram(false), 2000);
  };

  const copyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
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
        {/* Holographic grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d4ff08_1px,transparent_1px),linear-gradient(to_bottom,#00d4ff08_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative p-4 sm:p-6 flex flex-col justify-between h-full z-10 space-y-5">
        {/* Header Ribbon: Slogan + Size Switcher (Full vs Small) + Modal Expand */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-handwriting italic font-bold tracking-wider text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)] flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              Code Build Create Future
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Size Switcher: Full vs Small Poster */}
            <div className="inline-flex p-0.5 rounded-lg bg-[#071738] border border-cyan-500/30 text-[10px] font-mono">
              <button
                type="button"
                onClick={() => setViewMode('full')}
                className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'full'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                    : 'text-cyan-300/80 hover:text-white'
                }`}
                title="Full Detailed Brand Poster"
              >
                Full
              </button>
              <button
                type="button"
                onClick={() => setViewMode('small')}
                className="px-2 py-0.5 rounded-md text-cyan-300/80 hover:text-white transition-colors cursor-pointer"
                title="Switch to 'Code Build Create Future' Small Card"
              >
                Small Card
              </button>
            </div>

            {onOpenModal && (
              <button
                type="button"
                onClick={onOpenModal}
                className="p-1 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:text-white hover:bg-cyan-900/60 transition-colors cursor-pointer"
                title="Expand Poster Fullscreen Modal"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            )}

            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shadow-xs hidden sm:inline-block">
              {viewMode === 'small' ? 'Small Poster' : 'Official Graphic'}
            </span>
          </div>
        </div>

        {/* Brand Headline & 3D Digital Globe */}
        <div className="text-center pt-1">
          {/* Futuristic Globe Emblem */}
          <div className="relative mx-auto w-14 h-14 sm:w-16 sm:h-16 mb-2.5 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 opacity-25 blur-md animate-pulse" />
            <div className="relative w-full h-full rounded-full border border-cyan-400/50 bg-[#071738]/80 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <Globe className="w-8 h-8 sm:w-9 sm:h-9 text-cyan-300 animate-spin-slow opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[7px] font-mono font-extrabold text-cyan-100 tracking-tighter bg-cyan-950/90 px-1 py-0.5 rounded border border-cyan-400/40">
                  DIGITAL
                </span>
              </div>
            </div>
          </div>

          {/* PRO DIGITAL Wordmark */}
          <div className="inline-flex items-center justify-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">
              {portfolio.brand || 'PRO DIGITAL'}
            </h1>
          </div>

          <h2 className="text-xs sm:text-sm md:text-base font-bold tracking-widest text-cyan-300 uppercase mb-0.5">
            FULL STACK DEVELOPER
          </h2>
          <p className="text-[11px] sm:text-xs font-semibold tracking-wider text-slate-300 uppercase">
            &amp; AI SOFTWARE ENGINEERING
          </p>

          <p className="text-[10px] font-mono text-cyan-400/80 mt-1">
            <span className="font-name font-normal text-slate-200 text-xs mr-1">{portfolio.personal?.name || 'Mr. KIM SAN'}</span>
            &bull; {portfolio.personal?.location || 'Cambodia KH'}
          </p>

          {/* Mission Quote Banner */}
          <div className="mt-3 mx-auto max-w-lg p-2.5 rounded-2xl bg-[#0b1c3e]/70 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.15)] relative">
            <span className="absolute -top-2.5 left-3 text-xl font-serif text-cyan-400 leading-none">
              “
            </span>
            <p className="text-[11px] sm:text-xs italic font-medium text-cyan-100 text-center px-3 leading-relaxed">
              Turning ideas into powerful digital solutions with{' '}
              <span className="font-bold text-cyan-300 underline decoration-cyan-400/60 decoration-2">
                AI technology.
              </span>
            </p>
            <span className="absolute -bottom-3 right-3 text-xl font-serif text-cyan-400 leading-none">
              ”
            </span>
          </div>
        </div>

            {/* MY SKILLS Section (2x4 Grid matching the poster) */}
            <div>
              <div className="flex items-center justify-center gap-2 mb-2.5">
                <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
                <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
                  MY SKILLS
                </span>
                <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                {skillsList.map((skill) => (
                  <div
                    key={skill.name}
                    className={`group flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b ${skill.bg} border backdrop-blur-sm transition-all duration-200 ${skill.glow} hover:-translate-y-0.5 cursor-pointer`}
                  >
                    <div className="mb-1 flex items-center justify-center h-7">
                      {skill.icon}
                    </div>
                    <span className="text-[10px] font-semibold text-slate-200 text-center truncate max-w-full">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Subdomain specializations line */}
              <div className="mt-2.5 text-center">
                <p className="text-[9px] font-mono tracking-wider text-cyan-400/90 font-medium">
                  WEB DEVELOPMENT &bull; API &bull; DATABASE &bull; AUTOMATION &bull; AI SOLUTIONS &bull; SYSTEM DESIGN
                </p>
              </div>
            </div>

            {/* Dual Cards: Left Checklist & Right Code/AI Dreams */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Left Glass Card: Core Competencies Checklist */}
              <div className="p-3 rounded-2xl bg-[#091b3d]/80 border border-cyan-500/40 backdrop-blur-md shadow-lg flex flex-col justify-between">
                <div className="space-y-1.5">
                  {[
                    'Web Development',
                    'Full Stack Development',
                    'AI & Machine Learning',
                    'Desktop & Mobile Apps',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/20 border border-cyan-400/70 flex items-center justify-center text-cyan-300 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-[11px] font-medium text-slate-100">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-2.5 pt-2 border-t border-cyan-500/30 flex items-center justify-between text-[9px] font-mono font-bold tracking-wider text-cyan-300">
                  <span>LEARN</span>
                  <span>&bull;</span>
                  <span>BUILD</span>
                  <span>&bull;</span>
                  <span>INNOVATE</span>
                </div>
              </div>

              {/* Right Card: Laptop Workstation & Better Code Bigger Dreams */}
              <div className="p-3 rounded-2xl bg-[#091b3d]/80 border border-cyan-500/40 backdrop-blur-md shadow-lg flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-400">
                      <Cpu className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-white flex items-center gap-1">
                        <span>AI Engineering</span>
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                      </div>
                      <div className="text-[9px] text-cyan-300/80 font-mono">Neural Models &amp; LLMs</div>
                    </div>
                  </div>

                  <div className="px-1.5 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/30 text-[9px] font-mono font-bold text-cyan-300">
                    AI
                  </div>
                </div>

                <div className="mt-2 text-right">
                  <p className="text-sm sm:text-base font-handwriting italic font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
                    Better Code Bigger Dreams
                  </p>
                  <p className="text-[9px] font-mono text-slate-400">Next-Gen Software Architecture</p>
                </div>
              </div>
            </div>

        {/* Bottom Communication Channels & Email Bar (Comprehensive & Interactive) */}
        <div className="pt-3 border-t border-cyan-500/30 space-y-2">
          {/* Main Action Buttons: Primary Email & Telegram */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            {/* Primary Email with 1-click copy */}
            <button
              type="button"
              onClick={copyEmail}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cyan-950/70 border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-900/70 text-slate-200 hover:text-white transition-all cursor-pointer group shadow-xs"
              title={`Click to copy primary email: ${primaryEmail}`}
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="font-mono text-[11px] truncate max-w-[170px] sm:max-w-none">{primaryEmail}</span>
              {copiedEmail ? (
                <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold font-mono">
                  <Check className="w-3 h-3" />
                  <span>Copied!</span>
                </span>
              ) : (
                <Copy className="w-3 h-3 opacity-60 group-hover:opacity-100 shrink-0" />
              )}
            </button>

            {/* Telegram Direct Channel */}
            <div className="flex items-center gap-1">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cyan-950/70 border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-900/70 text-slate-200 hover:text-white transition-all cursor-pointer group shadow-xs"
                title="Open Official Telegram Channel"
              >
                <Send className="w-3.5 h-3.5 text-cyan-400 -rotate-12 shrink-0" />
                <span className="font-mono text-[11px]">@pro_digital</span>
                <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 shrink-0" />
              </a>

              <button
                type="button"
                onClick={copyTelegram}
                className="p-1.5 rounded-xl bg-cyan-950/70 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white transition-colors cursor-pointer"
                title="Copy Telegram Link"
              >
                {copiedTelegram ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Secondary Row: Phone Channel & Secondary Email & Technology Motto */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[10px] font-mono text-cyan-300/80">
            {/* Phone Channel with copy */}
            <button
              type="button"
              onClick={copyPhone}
              className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
              title="Click to copy phone number"
            >
              <Phone className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>{phone}</span>
              {copiedPhone && <span className="text-emerald-400 font-bold">Copied!</span>}
            </button>

            {/* Secondary Email */}
            {secondaryEmail && (
              <button
                type="button"
                onClick={copySecondaryEmail}
                className="hidden sm:flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                title="Click to copy backup email"
              >
                <Mail className="w-3 h-3 text-slate-500" />
                <span>Alt: {secondaryEmail}</span>
                {copiedSecondaryEmail && <span className="text-emerald-400 font-bold">Copied!</span>}
              </button>
            )}

            {/* Tagline */}
            <div className="flex items-center gap-1 text-cyan-400/90 font-bold tracking-wider uppercase">
              <Globe className="w-3 h-3" />
              <span>TECHNOLOGY BRIGHTER FUTURE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
