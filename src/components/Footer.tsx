import { MouseEvent } from 'react';
import { ArrowUp, Github, Linkedin, Facebook, Send, Youtube, Code2, Heart } from 'lucide-react';

interface FooterProps {
  personal: {
    name: string;
    title: string;
    email: string;
    brand?: string;
  };
  brandName?: string;
  social: {
    github: string;
    linkedin: string;
    facebook: string;
    telegram: string;
    youtube: string;
  };
}

export default function Footer({ personal, social, brandName = 'PRO DIGITAL' }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        const headerOffset = 76;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
    history.pushState(null, '', href);
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: social.github, icon: Github },
    { name: 'LinkedIn', href: social.linkedin, icon: Linkedin },
    { name: 'Facebook', href: social.facebook, icon: Facebook },
    { name: 'Telegram', href: social.telegram, icon: Send },
    { name: 'YouTube', href: social.youtube, icon: Youtube },
  ].filter((s) => Boolean(s.href));

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-100 dark:border-slate-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-500 p-0.5 flex items-center justify-center shadow-xs">
                <div className="w-full h-full bg-slate-900 rounded-[6px] flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                {brandName}
              </span>
            </div>
            <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              <span className="font-name font-normal text-base normal-case tracking-normal text-slate-900 dark:text-white mr-1">{personal.name}</span> &bull; {personal.title}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Engineered with clean React, modern Tailwind CSS, and resilient software practices. Ready for Netlify and GitHub CI/CD workflows.
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${personal.email}`}
                className="text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {personal.email}
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white font-bold mb-4">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 py-1 transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links Col */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white font-bold">
              Social Channels
            </h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200/60 dark:border-slate-800/60 transition-all duration-200"
                    aria-label={`${personal.name} on ${item.name}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-2">
              Open for technical conversations &amp; open-source collaboration.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <span>&copy; 2026 {brandName} &bull; {personal.name}. All rights reserved.</span>
          </div>

          <button
            id="footer-back-to-top-btn"
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-800 transition-colors shadow-xs"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
