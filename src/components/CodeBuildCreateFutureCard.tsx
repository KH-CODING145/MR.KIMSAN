import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Globe,
  Mail,
  Send,
  Phone,
  Copy,
  Check,
  Maximize2,
  ExternalLink,
  Terminal,
  Database,
  Box,
  Cpu,
  Layers,
} from 'lucide-react';
import { portfolio } from '../data/portfolio';

interface CodeBuildCreateFutureCardProps {
  onOpenModal?: () => void;
  onSwitchToFull?: () => void;
  className?: string;
}

export default function CodeBuildCreateFutureCard({
  onOpenModal,
  onSwitchToFull,
  className = '',
}: CodeBuildCreateFutureCardProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTelegram, setCopiedTelegram] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const primaryEmail = portfolio.personal?.email || 'pro.digital.dev@gmail.com';
  const telegramUrl = portfolio.social?.telegram || 'https://t.me/pro_digital';
  const phone = portfolio.personal?.phone || '+855 (016/093/012) 949 145';

  const copyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(primaryEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
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

  const techChips = [
    {
      name: 'Laravel',
      color: 'border-red-500/40 text-red-300 bg-red-950/30',
      icon: (
        <svg viewBox="0 0 24 24" className="w-3 h-3 text-red-400 fill-current">
          <path d="M21.1 8.2l-8.6-5a2.2 2.2 0 0 0-2.2 0l-7.4 4.3A2.2 2.2 0 0 0 1.8 9.4v9.2a2.2 2.2 0 0 0 1.1 1.9l8.6 5a2.2 2.2 0 0 0 2.2 0l7.4-4.3a2.2 2.2 0 0 0 1.1-1.9V10.1a2.2 2.2 0 0 0-1.1-1.9z" />
        </svg>
      ),
    },
    {
      name: 'React',
      color: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/30',
      icon: (
        <svg viewBox="0 0 24 24" className="w-3 h-3 text-cyan-400 stroke-current fill-none stroke-2 animate-spin-slow">
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" className="fill-cyan-400" />
        </svg>
      ),
    },
    {
      name: 'Python',
      color: 'border-amber-500/40 text-amber-300 bg-amber-950/30',
      icon: <Terminal className="w-3 h-3 text-amber-400" />,
    },
    {
      name: 'Docker',
      color: 'border-sky-500/40 text-sky-300 bg-sky-950/30',
      icon: <Box className="w-3 h-3 text-sky-400" />,
    },
    {
      name: 'Telegram Bot',
      color: 'border-blue-500/40 text-blue-300 bg-blue-950/30',
      icon: <Send className="w-3 h-3 text-blue-400 -rotate-12" />,
    },
    {
      name: 'AI & LLM',
      color: 'border-teal-500/40 text-teal-300 bg-teal-950/30',
      icon: <Sparkles className="w-3 h-3 text-teal-300 animate-pulse" />,
    },
  ];

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#050b18] via-[#08152e] to-[#030611] border border-cyan-500/35 text-white shadow-xl shadow-cyan-950/50 select-none ${className}`}
    >
      {/* Ambient Cyber Grid & Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-16 -left-16 w-60 h-60 bg-blue-600/20 blur-[75px] rounded-full" />
        <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-cyan-500/20 blur-[75px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d4ff07_1px,transparent_1px),linear-gradient(to_bottom,#00d4ff07_1px,transparent_1px)] bg-[size:18px_18px]" />
      </div>

      <div className="relative p-4 sm:p-5 flex flex-col justify-between h-full z-10 space-y-3.5">
        {/* Top Header Ribbon: "Code Build Create Future" highlighted badge */}
        <div className="flex items-center justify-between gap-2 border-b border-cyan-500/20 pb-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.25)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[11px] sm:text-xs font-handwriting italic font-bold tracking-wider text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]">
              Code Build Create Future
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {onSwitchToFull && (
              <button
                type="button"
                onClick={onSwitchToFull}
                className="px-2 py-0.5 rounded-md bg-[#071738] border border-cyan-500/30 text-[10px] font-mono text-cyan-300 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
                title="Switch to Full Detailed Poster"
              >
                Full Poster
              </button>
            )}

            {onOpenModal && (
              <button
                type="button"
                onClick={onOpenModal}
                className="p-1 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 hover:text-white hover:bg-cyan-900/70 transition-colors cursor-pointer"
                title="Expand Fullscreen Modal"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Central Brand Emblem & Identity */}
        <div className="flex items-center gap-3.5 pt-0.5">
          {/* 3D Holographic Globe Badge */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-cyan-400/50 bg-[#071738]/90 backdrop-blur-xs flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.3)] group">
            <Globe className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-300 animate-spin-slow opacity-95" />
            <div className="absolute -bottom-1 text-[6px] font-mono font-black uppercase text-cyan-100 bg-cyan-950/90 px-1 py-0.2 rounded border border-cyan-400/40 tracking-wider">
              DIGITAL
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                {portfolio.brand || 'PRO DIGITAL'}
              </h2>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                AI DEV
              </span>
            </div>

            <p className="text-[10px] sm:text-[11px] font-bold tracking-wider text-cyan-300 uppercase truncate">
              Full Stack Developer &amp; AI
            </p>

            <p className="text-[10px] font-mono text-slate-300/80 truncate">
              <span className="text-slate-100 font-medium">{portfolio.personal?.name || 'Mr. KIM SAN'}</span> &bull; {portfolio.personal?.location || 'Cambodia KH'}
            </p>
          </div>
        </div>

        {/* Mission Motto Micro Banner */}
        <div className="px-3 py-1.5 rounded-xl bg-[#0b1c3e]/80 border border-cyan-500/30 backdrop-blur-xs shadow-inner">
          <p className="text-[11px] italic text-cyan-100 text-center leading-tight">
            “Turning ideas into powerful digital solutions with{' '}
            <span className="font-bold text-cyan-300 underline decoration-cyan-400/60">
              AI technology
            </span>
            ”
          </p>
        </div>

        {/* Tech Stack Chips (2x3 Compact Grid) */}
        <div>
          <div className="flex items-center justify-between mb-1.5 px-0.5">
            <span className="text-[9px] font-mono font-bold tracking-wider text-cyan-300 uppercase flex items-center gap-1">
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span>Core Tech Stack</span>
            </span>
            <span className="text-[8px] font-mono text-slate-400">Better Code Bigger Dreams</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {techChips.map((tech) => (
              <div
                key={tech.name}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[10px] font-medium backdrop-blur-xs transition-colors hover:border-cyan-400 ${tech.color}`}
              >
                <div className="shrink-0">{tech.icon}</div>
                <span className="truncate">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Fast Communication Action Pills */}
        <div className="pt-2 border-t border-cyan-500/25 space-y-1.5">
          <div className="flex items-center justify-between gap-1.5 text-xs">
            {/* 1-click Email copy */}
            <button
              type="button"
              onClick={copyEmail}
              className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-xl bg-cyan-950/70 border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-900/70 text-slate-200 hover:text-white transition-all cursor-pointer text-[10px] font-mono truncate"
              title={`Click to copy: ${primaryEmail}`}
            >
              <Mail className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate">{primaryEmail}</span>
              {copiedEmail ? (
                <Check className="w-3 h-3 text-emerald-400 shrink-0" />
              ) : (
                <Copy className="w-2.5 h-2.5 opacity-60 shrink-0" />
              )}
            </button>

            {/* Telegram Link */}
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-cyan-950/70 border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-900/70 text-slate-200 hover:text-white transition-all cursor-pointer text-[10px] font-mono shrink-0"
              title="Open Official Telegram Channel"
            >
              <Send className="w-3 h-3 text-cyan-400 -rotate-12 shrink-0" />
              <span>@pro_digital</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60 shrink-0" />
            </a>
          </div>

          {/* Pillars Bar */}
          <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400/90 px-1 font-semibold">
            <button
              type="button"
              onClick={copyPhone}
              className="flex items-center gap-1 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
              title="Click to copy phone"
            >
              <Phone className="w-2.5 h-2.5 text-cyan-400" />
              <span>{phone}</span>
              {copiedPhone && <span className="text-emerald-400 font-bold">Copied!</span>}
            </button>

            <div className="flex items-center gap-1.5">
              <span>LEARN</span>
              <span>&bull;</span>
              <span>BUILD</span>
              <span>&bull;</span>
              <span>INNOVATE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
