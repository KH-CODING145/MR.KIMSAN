import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Download, ExternalLink } from 'lucide-react';
import ProDigitalBrandPoster from './ProDigitalBrandPoster';

interface ProDigitalBrandPosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProDigitalBrandPosterModal({
  isOpen,
  onClose,
}: ProDigitalBrandPosterModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-2xl z-10 my-auto"
        >
          {/* Top Actions Bar */}
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-bold font-mono shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>PRO DIGITAL BRAND GRAPHIC</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://t.me/pro_digital"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-xs"
              >
                <span>Telegram</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close brand poster modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Render the full interactive brand poster */}
          <ProDigitalBrandPoster />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
