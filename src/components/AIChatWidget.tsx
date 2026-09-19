import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Send,
  X,
  RotateCcw,
  Bot,
  User,
  ChevronDown,
  Loader2,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';
import Tooltip from './Tooltip';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  source?: string;
  timestamp: string;
}

interface AIChatWidgetProps {
  brandName?: string;
  developerName?: string;
}

const QUICK_PROMPTS = [
  '🛠️ What is your tech stack?',
  '🚀 What are your top projects?',
  '💼 Tell me about your work experience',
  '💰 What are your service rates?',
  '📬 How can I contact or hire you?',
];

export default function AIChatWidget({
  brandName = 'PRO DIGITAL',
  developerName = 'Mr. KIM SAN',
}: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      content: `Hello! 👋 I am **${developerName}'s AI Portfolio Assistant** (${brandName}).\n\nI can answer any questions about Kim San's 3+ years of full-stack engineering, technical skills (React, Laravel, Node, Python, Gemini AI), notable projects, service pricing, and how to get in touch. How can I help you today?`,
      source: 'gemini-3.8-flash',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom whenever messages or loading state changes
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMessageId = `usr-${Date.now()}`;
    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMsg: Message = {
      id: userMessageId,
      role: 'user',
      content: text,
      timestamp: userTimestamp,
    };

    // Update conversation with user query immediately
    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Prepare history formatted for Gemini backend
      const historyPayload = updatedMessages
        .slice(-10) // last 10 messages for context
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      const replyContent =
        data.reply ||
        `Thank you for asking! Kim San specializes in React, Laravel, Node.js, and Gemini AI software engineering with over 50+ completed projects. Reach out directly at pro.digital.dev@gmail.com or Telegram @pro_digital.`;

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: 'model',
        content: replyContent,
        source: data.source || 'gemini-3.8-flash',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('Failed to communicate with AI chat API:', err);
      // Helpful fallback response
      const fallbackMsg: Message = {
        id: `ai-err-${Date.now()}`,
        role: 'model',
        content: `**Mr. KIM SAN** is a Full-Stack Developer & AI Software Engineer based in Cambodia.\n\n• **Core Stack**: React, TypeScript, Laravel, Node.js, Python, PostgreSQL, Gemini AI\n• **Experience**: 3+ years, 50+ completed projects\n• **Contact**: [pro.digital.dev@gmail.com](mailto:pro.digital.dev@gmail.com) | Telegram: [@pro_digital](https://t.me/pro_digital)`,
        source: 'portfolio-data-offline',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-reset-${Date.now()}`,
        role: 'model',
        content: `Chat history cleared! 👋 How can I help you explore **${developerName}'s** background, skills, or projects today?`,
        source: 'gemini-3.8-flash',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Simple formatting helper for markdown bold and bullet lists
  const renderFormattedText = (raw: string) => {
    const lines = raw.split('\n');
    return lines.map((line, lineIdx) => {
      // Process bold formatting **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={partIdx} className="font-semibold text-slate-900 dark:text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        // Link matching [text](url)
        const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
          return (
            <a
              key={partIdx}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 underline underline-offset-2 hover:text-indigo-700 dark:hover:text-indigo-300"
            >
              {linkMatch[1]}
            </a>
          );
        }
        return part;
      });

      // Handle bullets
      const trimmed = line.trim();
      const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-');
      const isNumbered = /^\d+\.\s/.test(trimmed);

      return (
        <span
          key={lineIdx}
          className={`block ${lineIdx > 0 ? (line === '' ? 'h-2' : 'mt-1') : ''} ${
            isBullet || isNumbered ? 'pl-2 text-slate-800 dark:text-slate-200' : ''
          }`}
        >
          {renderedParts}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Corner Trigger Button */}
      <div className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6">
        <Tooltip
          content={isOpen ? 'Minimize AI Chat' : 'Ask Kim San AI'}
          iconName="Sparkles / Bot icon"
          description="Interactive assistant using Gemini API to answer questions about Kim San's professional background."
          position="left"
        >
          <motion.button
            id="ai-chat-launcher-btn"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-expanded={isOpen}
            aria-controls="ai-chat-panel"
            aria-label={isOpen ? 'Close AI Portfolio Chat' : 'Open AI Portfolio Chat'}
            className={`group relative flex items-center gap-2.5 px-3.5 py-3 sm:px-4 sm:py-3 rounded-full shadow-xl transition-all duration-200 cursor-pointer ${
              isOpen
                ? 'bg-slate-900 dark:bg-slate-800 text-white border border-slate-700/80 shadow-slate-900/30'
                : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:from-indigo-500 hover:to-cyan-400'
            }`}
          >
            {/* Ambient pulse ring when closed */}
            {!isOpen && (
              <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 opacity-60 blur-xs group-hover:opacity-100 transition-opacity animate-pulse pointer-events-none" />
            )}

            <div className="relative flex items-center justify-center">
              {isOpen ? (
                <X className="w-5 h-5 transition-transform duration-200" />
              ) : (
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-5 h-5 text-cyan-200 group-hover:rotate-12 transition-transform duration-200" />
                  {/* Status Indicator Dot */}
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-indigo-600 animate-pulse" />
                </div>
              )}
            </div>

            <div className="relative hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold tracking-wide uppercase text-indigo-100/90 leading-tight">
                {isOpen ? 'Close Chat' : 'Ask AI'}
              </span>
              <span className="text-[10px] text-cyan-200/80 leading-none">
                {isOpen ? 'Kim San Assistant' : 'Gemini Powered'}
              </span>
            </div>
          </motion.button>
        </Tooltip>
      </div>

      {/* Floating Chat Modal / Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-chat-panel"
            role="region"
            aria-label="Kim San AI Portfolio Chat"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6.5rem)] rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xl shadow-slate-900/20 dark:shadow-indigo-950/40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50/90 dark:bg-slate-900/90 border-b border-slate-200/70 dark:border-slate-800/70 select-none">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 p-0.5 shadow-sm shadow-indigo-500/20">
                  <div className="w-full h-full bg-slate-900 rounded-[6px] flex items-center justify-center">
                    <Bot className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                      Kim San AI
                    </h3>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                      Gemini
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Grounded in portfolio data</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Tooltip
                  content="Restart Conversation"
                  iconName="Clockwise circular arrow icon"
                  description="Clears current chat history and re-initializes with the welcome greeting."
                  position="bottom"
                >
                  <button
                    type="button"
                    onClick={handleResetChat}
                    aria-label="Restart chat conversation"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </Tooltip>

                <Tooltip
                  content="Minimize Chat"
                  iconName="Cross / Minimize icon"
                  description="Closes the chat window while preserving your conversation."
                  position="bottom"
                >
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close chat window"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </Tooltip>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div
              className="flex-1 p-3.5 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 text-sm"
              aria-live="polite"
            >
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar Icon */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                        isUser
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-cyan-400 border border-slate-700'
                      }`}
                    >
                      {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    {/* Bubble Content */}
                    <div className={`max-w-[82%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`p-3 rounded-2xl leading-relaxed ${
                          isUser
                            ? 'bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white rounded-tr-xs shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 rounded-tl-xs border border-slate-200/60 dark:border-slate-700/60 shadow-xs'
                        }`}
                      >
                        <div className="text-[13px]">{renderFormattedText(msg.content)}</div>
                      </div>

                      <div className="flex items-center gap-1.5 mt-1 px-1 text-[10px] text-slate-400 dark:text-slate-500">
                        <span>{msg.timestamp}</span>
                        {!isUser && msg.source && (
                          <>
                            <span>&bull;</span>
                            <span className="text-[9px] uppercase tracking-wider text-indigo-500 dark:text-indigo-400 font-mono">
                              {msg.source.includes('gemini') ? 'Gemini 3.8' : 'Verified Data'}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-cyan-400 border border-slate-700 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-3 rounded-2xl rounded-tl-xs bg-slate-100 dark:bg-slate-800/90 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                    <span className="text-xs">Formulating response...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Carousel */}
            {messages.length <= 2 && !isLoading && (
              <div className="px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200/60 dark:border-slate-800/60">
                <div className="flex items-center gap-1 mb-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <HelpCircle className="w-3 h-3 text-indigo-500" />
                  <span>Suggested questions:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {QUKCK_PROMPTS_LIST(handleSendMessage)}
                </div>
              </div>
            )}

            {/* Input Bar Form */}
            <form
              onSubmit={handleSubmit}
              className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/70 dark:border-slate-800/70"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Ask about Kim San's skills, projects, pricing..."
                  disabled={isLoading}
                  className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 disabled:opacity-60 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  aria-label="Send message to AI Assistant"
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition-all shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 px-1">
                <span>Press Enter to send</span>
                <span className="flex items-center gap-1">
                  Powered by <span className="font-semibold text-indigo-500 dark:text-indigo-400">Gemini 3.8 Flash</span>
                </span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function QUKCK_PROMPTS_LIST(onSelect: (prompt: string) => void) {
  return QUICK_PROMPTS.map((prompt, idx) => (
    <button
      key={idx}
      type="button"
      onClick={() => onSelect(prompt)}
      className="px-2.5 py-1 rounded-full text-[11px] bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors cursor-pointer text-left"
    >
      {prompt}
    </button>
  ));
}
