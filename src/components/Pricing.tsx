import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  CreditCard,
  Layers,
  Bot,
  Calendar,
  DollarSign,
} from 'lucide-react';
import { PRICING_PLANS, PRICING_ADDONS, PRICING_GUARANTEES, PricingPlan } from '../data/pricingData';

interface PricingProps {
  onSelectPlan?: (planName: string, price: string) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  const [billingMode, setBillingMode] = useState<'project' | 'retainer'>('project');
  const shouldReduceMotion = useReducedMotion();

  const handleChoosePlan = (plan: PricingPlan) => {
    const priceFormatted =
      billingMode === 'project'
        ? `${plan.currency}${plan.fixedPrice.toLocaleString()} (Fixed Project)`
        : `${plan.currency}${plan.retainerPrice.toLocaleString()}/month (Retainer)`;

    if (onSelectPlan) {
      onSelectPlan(plan.name, priceFormatted);
    }

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="pricing"
      className="py-20 lg:py-28 relative bg-slate-50/50 dark:bg-slate-950/30"
      aria-label="Pricing Plans and Rates"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-medium mb-3">
            <CreditCard className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Investment & Plans</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Transparent Plans & Pricing
          </h2>
          <div className="w-12 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Choose between fixed-scope milestone deliverables or dedicated ongoing development retainers. Simple, transparent pricing with no hidden charges.
          </p>

          {/* Billing Switcher Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <button
              type="button"
              onClick={() => setBillingMode('project')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                billingMode === 'project'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Fixed Project Milestone
            </button>
            <button
              type="button"
              onClick={() => setBillingMode('retainer')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                billingMode === 'retainer'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Monthly Retainer</span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  billingMode === 'retainer'
                    ? 'bg-white/20 text-white'
                    : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60'
                }`}
              >
                Dedicated Sprints
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {PRICING_PLANS.map((plan, index) => {
            const isPopular = Boolean(plan.popular);
            const activePrice = billingMode === 'project' ? plan.fixedPrice : plan.retainerPrice;
            const periodLabel = billingMode === 'project' ? '/ project' : '/ month';

            return (
              <motion.div
                key={plan.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 transition-all duration-300 ${
                  isPopular
                    ? 'bg-white dark:bg-slate-900 border-2 border-indigo-600 dark:border-indigo-500 shadow-xl shadow-indigo-600/10 lg:-translate-y-2'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md'
                }`}
              >
                {/* Popular / Highlight Pill */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold font-mono tracking-wide uppercase bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm">
                      <Sparkles className="w-3 h-3" />
                      <span>{plan.badge}</span>
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mt-1">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price Tag */}
                  <div className="flex items-baseline gap-1.5 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {plan.currency}
                      {activePrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {periodLabel}
                    </span>
                  </div>

                  {/* Turnaround Time */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-mono mb-5 border border-slate-200/60 dark:border-slate-700/60">
                    <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>Est. Turnaround: {plan.turnaround}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400 dark:text-slate-500">
                      What's Included:
                    </div>
                    {plan.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button / Payment Link */}
                {plan.paymentUrl ? (
                  <div className="space-y-2.5">
                    <a
                      id={`cta-plan-${plan.id}`}
                      href={plan.paymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 active:scale-98 group"
                    >
                      <span>{plan.ctaText}</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>

                    <div className="flex items-center justify-between px-1 text-[11px]">
                      <span className="inline-flex items-center gap-1 font-mono font-medium text-emerald-600 dark:text-emerald-400">
                        <CreditCard className="w-3 h-3" />
                        <span>Pay via ABA PayWay</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleChoosePlan(plan)}
                        className="font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                      >
                        or discuss scope &rarr;
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    id={`cta-plan-${plan.id}`}
                    type="button"
                    onClick={() => handleChoosePlan(plan)}
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                      isPopular
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 active:scale-98'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700 active:scale-98'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Add-ons & Hourly Services */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Specialized Add-ons & Hourly Services
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Flexible support options you can add to any package or book standalone.
              </p>
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                if (onSelectPlan) {
                  onSelectPlan('Custom Consulting / Add-on', 'Flexible Rate');
                }
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              <span>Request Custom Add-on</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_ADDONS.map((addon) => (
              <div
                key={addon.title}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {addon.title}
                    </h4>
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-200/50 dark:border-indigo-800/50">
                      {addon.rate}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {addon.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confidence Guarantees Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_GUARANTEES.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900/60">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
