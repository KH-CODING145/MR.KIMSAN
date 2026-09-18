import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Mail,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Printer,
  ArrowLeft,
  Sparkles,
  CreditCard,
  Send,
  ShieldCheck,
  Clock,
  MessageSquare,
} from 'lucide-react';

export interface SubmittedInquiryData {
  name: string;
  email: string;
  subject: string;
  message: string;
  selectedPlan?: {
    name: string;
    price: string;
  } | null;
  referenceId: string;
  timestamp: string;
}

interface SimulatedEmailConfirmationProps {
  data: SubmittedInquiryData;
  developerName?: string;
  developerEmail?: string;
  telegramUrl?: string;
  onReset: () => void;
}

export default function SimulatedEmailConfirmation({
  data,
  developerName = 'Mr. KIM SAN',
  developerEmail = 'kimsan.dev@gmail.com',
  telegramUrl = 'https://t.me/kim_san145',
  onReset,
}: SimulatedEmailConfirmationProps) {
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleCopySummary = async () => {
    const text = `Inquiry Confirmation #${data.referenceId}\nTo: ${data.name} (${data.email})\nPlan: ${data.selectedPlan ? `${data.selectedPlan.name} - ${data.selectedPlan.price}` : 'Custom Inquiry'}\nSubject: ${data.subject}\nMessage: ${data.message}\nReceived: ${data.timestamp}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
      aria-label="Automated Confirmation Email Simulation"
    >
      {/* Top Simulated Email Client Header Bar */}
      <div className="bg-slate-100/90 dark:bg-slate-800/90 px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 dark:bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 dark:bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 dark:bg-emerald-500/80" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-mono font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Simulated Inbox &bull; Auto-Confirmation Sent</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 transition-colors shadow-2xs cursor-pointer text-[11px] font-medium"
            title="Copy confirmation details"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 transition-colors shadow-2xs cursor-pointer text-[11px] font-medium"
            title="Print or Save confirmation"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Email Meta Envelope Header */}
      <div className="p-5 sm:p-6 bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800 space-y-2 text-xs sm:text-sm">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div className="font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
            <span>Re: {data.subject}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
              #{data.referenceId}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            {data.timestamp}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400 dark:text-slate-500 font-mono text-[11px] uppercase">From:</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {developerName}{' '}
              <span className="text-slate-400 dark:text-slate-500 font-mono">&lt;{developerEmail}&gt;</span>
            </span>
            <span className="inline-flex items-center text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-200/50 dark:border-emerald-800/50">
              Verified
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400 dark:text-slate-500 font-mono text-[11px] uppercase">To:</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {data.name}{' '}
              <span className="text-slate-400 dark:text-slate-500 font-mono">&lt;{data.email}&gt;</span>
            </span>
          </div>
        </div>
      </div>

      {/* Email Body Content */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Warm Greeting */}
        <div>
          <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Hi {data.name},
          </h4>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Thank you for reaching out through my portfolio. This automated confirmation acknowledges that your message and technical specifications have been received into my priority project queue.
          </p>
        </div>

        {/* Highlighted Project Specification Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
            <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-500" />
              <span>Inquiry Details</span>
            </span>
            <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Received & Logged</span>
            </span>
          </div>

          {data.selectedPlan && (
            <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 text-xs">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="font-semibold text-slate-900 dark:text-white">Target Package:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{data.selectedPlan.name}</span>
              </div>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                {data.selectedPlan.price}
              </span>
            </div>
          )}

          <div>
            <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase">Subject:</div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
              {data.subject}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase">Your Message:</div>
            <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 whitespace-pre-wrap leading-relaxed font-sans">
              "{data.message}"
            </div>
          </div>
        </div>

        {/* Instant Payment Option if Plan Selected */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-200/70 dark:border-indigo-800/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-900 dark:text-indigo-200 font-mono">
              <CreditCard className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Ready to Kickoff Milestone Immediately?</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Lock in your sprint schedule instantly using secure online checkout via ABA PayWay.
            </p>
          </div>

          <a
            id="simulated-email-payway-btn"
            href="https://link.payway.com.kh/aba?id=18E2ED0EE307&code=461423&acc=093949145&dynamic=true"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm shrink-0 w-full sm:w-auto"
          >
            <span>Pay via ABA PayWay</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Next Steps RoadMap */}
        <div className="space-y-3 pt-2">
          <h5 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400 dark:text-slate-500">
            What Happens Next:
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
              <div className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 mb-1">
                01. Review
              </div>
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Requirements Assessment
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                I'll inspect your feature scope, architecture stack, and timeline within 6 hours.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
              <div className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 mb-1">
                02. Discovery
              </div>
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Technical Sync
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Complimentary 30-min call or Telegram chat to finalize milestones & deliverables.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
              <div className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 mb-1">
                03. Kickoff
              </div>
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Sprint Launch
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Git repo handoff, daily sprint updates, and milestone deployment tracking.
              </p>
            </div>
          </div>
        </div>

        {/* Developer Sign-off */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <p className="font-semibold text-slate-900 dark:text-white">{developerName}</p>
            <p>Full-Stack Developer & AI Software Engineer</p>
            <p className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400 mt-0.5">
              {developerEmail} &bull; Phnom Penh, Cambodia
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs transition-colors shadow-2xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat on Telegram</span>
            </a>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Send Another</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
