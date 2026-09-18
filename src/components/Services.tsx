import { motion, useReducedMotion } from 'motion/react';
import {
  Globe,
  Layers,
  LayoutDashboard,
  Network,
  Sparkles,
  Cpu,
  ArrowRight,
  CheckCircle2,
  LucideIcon,
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  startingPrice?: string;
}

interface ServicesProps {
  services: ServiceItem[];
}

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Layers,
  LayoutDashboard,
  Network,
  Sparkles,
  Cpu,
};

export default function Services({ services }: ServicesProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="py-20 lg:py-28 relative" aria-label="Services Offered">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
            What I Deliver
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Specialized Services
          </h2>
          <div className="w-12 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">
            From technical discovery to production deployment, offering high-standard full-stack and frontend engineering.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <motion.div
                key={service.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                className="flex flex-col justify-between p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  {/* Top Bar: Service Icon & Starting Price */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-xs">
                      <Icon className="w-7 h-7 transition-colors duration-300" />
                    </div>
                    {service.startingPrice && (
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80">
                        From <span className="text-indigo-600 dark:text-indigo-400 font-bold">{service.startingPrice}</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800/80 mb-6">
                    {service.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60">
                  <a
                    href="#pricing"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('pricing');
                      if (el) {
                        const headerOffset = 76;
                        const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                        history.pushState(null, '', '#pricing');
                      }
                    }}
                    className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                  >
                    View Plans &rarr;
                  </a>

                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('contact');
                      if (el) {
                        const headerOffset = 76;
                        const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                        history.pushState(null, '', '#contact');
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 cursor-pointer"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
