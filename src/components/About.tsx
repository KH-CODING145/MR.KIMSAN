import { motion, useReducedMotion } from 'motion/react';
import { MapPin, Briefcase, Award, Compass, Target, Code, CheckCircle2 } from 'lucide-react';

interface AboutProps {
  personal: {
    name: string;
    location: string;
    avatar: string;
    googleDriveAvatar?: string;
    yearsOfExperience: number;
    title: string;
  };
  about: {
    intro: string;
    background: string;
    philosophy: string;
    careerGoals: string;
  };
  statistics: Array<{
    value: string;
    label: string;
    subtext?: string;
  }>;
}

export default function About({ personal, about, statistics }: AboutProps) {
  const shouldReduceMotion = useReducedMotion();

  const highlights = [
    {
      icon: Compass,
      title: 'Development Philosophy',
      text: about.philosophy,
    },
    {
      icon: Target,
      title: 'Career Goals',
      text: about.careerGoals,
    },
    {
      icon: Briefcase,
      title: 'Professional Background',
      text: about.background,
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative" aria-label="About Me">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
            Get to Know Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            About <span className="font-name font-normal text-2xl sm:text-3xl text-indigo-600 dark:text-indigo-400 tracking-normal inline-block">{personal.name}</span>
          </h2>
          <div className="w-12 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full mt-3" />
        </div>

        {/* Statistics Cards - Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">
                  {stat.value}
                </span>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                {stat.label}
              </h3>
              {stat.subtext && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {stat.subtext}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bio Card with Avatar & Quick Meta */}
          <motion.div
            className="lg:col-span-5"
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  className="w-20 h-20 rounded-2xl object-cover object-top border-2 border-indigo-500/30 shadow-md"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (personal.googleDriveAvatar && e.currentTarget.src !== personal.googleDriveAvatar) {
                      e.currentTarget.src = personal.googleDriveAvatar;
                    }
                  }}
                />
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {personal.name}
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    {personal.title}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{personal.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300">
                <p className="leading-relaxed">{about.intro}</p>
              </div>

              {/* Verified Competencies */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-3">
                  Engineering Principles
                </span>
                <ul className="space-y-2">
                  {[
                    'Clean, testable & documented architecture',
                    'Zero-compromise performance & accessibility',
                    'Proactive communication & agile mindset',
                    'Automated testing & CI/CD deployment',
                  ].map((principle) => (
                    <li key={principle} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{principle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Detailed Highlights */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
