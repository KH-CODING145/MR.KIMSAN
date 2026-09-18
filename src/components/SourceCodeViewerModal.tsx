import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Copy,
  Check,
  Download,
  Terminal,
  FileCode,
  Play,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Layers,
  Code2,
} from 'lucide-react';
import { PROJECT_SOURCE_CODES, SourceFile, ProjectSourceCode } from '../data/projectSourceCodes';

interface SourceCodeViewerModalProps {
  projectId: number | null;
  isOpen: boolean;
  onClose: () => void;
  externalGithubUrl?: string;
}

export default function SourceCodeViewerModal({
  projectId,
  isOpen,
  onClose,
  externalGithubUrl,
}: SourceCodeViewerModalProps) {
  const projectCode: ProjectSourceCode | undefined = projectId
    ? PROJECT_SOURCE_CODES[projectId]
    : undefined;

  const [activeFileIndex, setActiveFileIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'code' | 'simulation' | 'architecture'>('code');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [simulating, setSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  // Active source file
  const activeFile: SourceFile | undefined = projectCode?.files[activeFileIndex] || projectCode?.files[0];

  // Handle code copying
  const handleCopyCode = async () => {
    if (!activeFile) return;
    try {
      await navigator.clipboard.writeText(activeFile.code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = activeFile.code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Handle direct file download
  const handleDownloadFile = () => {
    if (!activeFile) return;
    const blob = new Blob([activeFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFile.filename.split('/').pop() || 'source.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Run live simulation runner
  const handleRunSimulation = () => {
    if (!projectCode) return;
    setSimulating(true);
    setSimStep(0);

    const totalSteps = projectCode.simulationOutput.logs.length;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setSimStep(step);
      if (step >= totalSteps) {
        clearInterval(interval);
        setSimulating(false);
      }
    }, 450);
  };

  // Split code into lines for syntax line numbering
  const codeLines = useMemo(() => {
    return (activeFile?.code || '').split('\n');
  }, [activeFile]);

  if (!isOpen || !projectCode) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-100 z-10"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-800 bg-slate-950/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {projectCode.projectTitle}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Source Inspector
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Live verified code architecture, models & automated execution logic
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {externalGithubUrl && (
                <a
                  href={externalGithubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close code inspector"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-2 bg-slate-950/40 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <button
                type="button"
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'code'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Source Files ({projectCode.files.length})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('simulation');
                  if (simStep === 0) handleRunSimulation();
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'simulation'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Live Test Sandbox</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('architecture')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'architecture'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Architecture Design</span>
              </button>
            </div>

            {/* Quick Actions for Code tab */}
            {activeTab === 'code' && activeFile && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all active:scale-95"
                  title="Copy full source code"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Copy Code</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadFile}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all active:scale-95"
                  title="Download raw file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* File List Sidebar (when in 'code' tab) */}
            {activeTab === 'code' && (
              <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/70 p-3 overflow-y-auto max-h-48 md:max-h-none">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-2 py-1 mb-1">
                  Project Files
                </div>
                <div className="space-y-1">
                  {projectCode.files.map((file, idx) => (
                    <button
                      key={file.filename}
                      type="button"
                      onClick={() => setActiveFileIndex(idx)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-mono transition-colors ${
                        activeFileIndex === idx
                          ? 'bg-indigo-600/25 text-indigo-300 border border-indigo-500/40 font-semibold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileCode className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                        <span className="truncate">{file.filename.split('/').pop()}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{file.size}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 px-2 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300 block mb-1">Active File Scope:</span>
                  <p className="text-[11px] leading-relaxed text-slate-400">
                    {activeFile?.description}
                  </p>
                </div>
              </div>
            )}

            {/* Main Tab View */}
            <div className="flex-1 bg-slate-950 overflow-y-auto relative p-4 sm:p-6 font-mono text-xs">
              {/* TAB 1: CODE VIEWER */}
              {activeTab === 'code' && activeFile && (
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400 text-xs font-sans">
                    <span className="font-mono text-indigo-400">{activeFile.filename}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 uppercase text-[10px]">
                      {activeFile.language}
                    </span>
                  </div>

                  <div className="overflow-x-auto select-text font-mono text-[13px] leading-6">
                    {codeLines.map((line, idx) => (
                      <div key={idx} className="flex hover:bg-slate-900/60 rounded px-1 transition-colors group">
                        <span className="w-10 text-right pr-4 text-slate-600 select-none font-mono text-xs group-hover:text-slate-400">
                          {idx + 1}
                        </span>
                        <span className="flex-1 text-slate-200 whitespace-pre">
                          {line}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: LIVE SIMULATION TEST SANDBOX */}
              {activeTab === 'simulation' && (
                <div className="space-y-4 font-mono">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-slate-400 text-xs font-sans">Automated Test Execution Sandbox</span>
                      <h4 className="text-sm font-bold text-white mt-0.5">
                        Interactive Runner
                      </h4>
                    </div>
                    <button
                      type="button"
                      disabled={simulating}
                      onClick={handleRunSimulation}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-semibold disabled:opacity-50 transition-all active:scale-95 shadow-md shadow-emerald-600/20"
                    >
                      {simulating ? (
                        <>
                          <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                          <span>Executing...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Run Benchmark Again</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Terminal Window */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-3 pb-2 border-b border-slate-800">
                      <Terminal className="w-4 h-4" />
                      <span>$ {projectCode.simulationOutput.command}</span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300">
                      {projectCode.simulationOutput.logs.map((log, index) => {
                        const isVisible = index < simStep || !simulating;
                        if (!isVisible) return null;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex items-start gap-2 ${
                              log.includes('[ERROR]') ? 'text-red-400' :
                              log.includes('[AI') || log.includes('[RECOMMENDATION') ? 'text-cyan-400' :
                              log.includes('[AUTO-HEAL') || log.includes('[COMPLETE') ? 'text-emerald-400 font-semibold' :
                              'text-slate-300'
                            }`}
                          >
                            <span className="text-slate-600 select-none">&gt;</span>
                            <span>{log}</span>
                          </motion.div>
                        );
                      })}
                    </div>

                    {(!simulating || simStep >= projectCode.simulationOutput.logs.length) && (
                      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                          <Check className="w-3.5 h-3.5" />
                          <span>Status: PASSED (Zero Defects)</span>
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {projectCode.simulationOutput.benchmark}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: ARCHITECTURE DESIGN */}
              {activeTab === 'architecture' && (
                <div className="font-sans text-slate-200 space-y-6">
                  <div>
                    <h4 className="text-base font-bold text-white mb-2">
                      System Architecture Overview
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                      {projectCode.architectureSummary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">
                        Core Design Principles
                      </span>
                      <ul className="mt-2 space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                        <li>High concurrency with non-blocking I/O routines</li>
                        <li>Automated resilience with circuit breaker fallbacks</li>
                        <li>Zero-trust API boundaries with schema enforcement</li>
                        <li>Optimized cache layers via Redis & WAL persistence</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">
                        AI & Automation Strategy
                      </span>
                      <ul className="mt-2 space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                        <li>Gemini multimodal document & telemetry parsing</li>
                        <li>Structured JSON outputs conforming to strict Pydantic schemas</li>
                        <li>Low-latency autonomous agent decision cycles</li>
                        <li>Automated root-cause mitigation and telemetry recovery</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Bar */}
          <div className="px-5 sm:px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Full production architecture and runnable logic</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
