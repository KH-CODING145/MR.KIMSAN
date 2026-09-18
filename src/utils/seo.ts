/**
 * SEO & Structured Data (JSON-LD) Generator
 * Adheres strictly to Schema.org standards and Google Search guidelines.
 */

import { portfolio } from '../data/portfolio.js';
import { ProjectItem } from '../components/Projects';

export interface SectionSeoConfig {
  title: string;
  description: string;
  keywords?: string;
  section: string;
}

export const SECTION_SEO_MAP: Record<string, SectionSeoConfig> = {
  home: {
    section: 'home',
    title: 'Mr. KIM SAN — Full-Stack Developer & AI Software Engineer',
    description:
      'Professional portfolio of PRO DIGITAL by Mr.KIM SAN, a Full-Stack Developer engineering modern web applications and building intelligent software solutions with AI.',
    keywords:
      'PRO DIGITAL, Mr.KIM SAN, Full-Stack Developer, AI Software Engineer, Build Software with AI, AI Software Engineering, Gemini, React, TypeScript, Node.js, Laravel, Portfolio',
  },
  about: {
    section: 'about',
    title: 'About PRO DIGITAL — Full-Stack & AI Software Engineering',
    description:
      'Discover the engineering journey, architectural milestones, and AI software development philosophy behind PRO DIGITAL and developer Mr.KIM SAN.',
    keywords:
      'About PRO DIGITAL, Mr.KIM SAN, Full-Stack Developer, AI Software, Software Engineer Biography, Engineering Values',
  },
  skills: {
    section: 'skills',
    title: 'Technical Stack & AI Expertise — PRO DIGITAL',
    description:
      'Explore PRO DIGITAL’s technical stack across Frontend, Backend, AI & Automation, Databases, and DevOps including React, TypeScript, Gemini, and Docker.',
    keywords:
      'Technical Skills, PRO DIGITAL, Frontend Developer, Backend Developer, AI Automation, Gemini, TypeScript, React, Docker, PostgreSQL',
  },
  services: {
    section: 'services',
    title: 'Engineering & AI Services — PRO DIGITAL',
    description:
      'High-impact software engineering services by PRO DIGITAL: AI Software Engineering, Full-Stack Web Development, Admin Dashboards, RESTful APIs, and Workflow Automation.',
    keywords:
      'AI Software Engineering, Web Development Services, PRO DIGITAL, Custom Software, REST API Consulting, SaaS Dashboard Development',
  },
  projects: {
    section: 'projects',
    title: 'Featured Projects & Architecture Showcase — PRO DIGITAL',
    description:
      'Explore real-world production web applications, SaaS dashboards, and distributed systems engineered by PRO DIGITAL with React, Laravel, Node.js, and cloud tooling.',
    keywords:
      'Portfolio Projects, PRO DIGITAL, React Applications, Laravel SaaS, Full-Stack Case Studies, Source Code',
  },
  experience: {
    section: 'experience',
    title: 'Professional Experience & Career History — PRO DIGITAL',
    description:
      'Review engineering milestones, technical leadership roles, and track record across high-concurrency production platforms at PRO DIGITAL.',
    keywords:
      'Work Experience, Career Timeline, PRO DIGITAL, Lead Developer, Software Architect, TechFlow Solutions',
  },
  education: {
    section: 'education',
    title: 'Education & Certifications — PRO DIGITAL',
    description:
      'Academic background in Computer Science, professional cloud certifications, and technical distinctions in software architecture.',
    keywords:
      'Computer Science Degree, Cloud Certifications, Software Engineering Credentials, PRO DIGITAL',
  },
  testimonials: {
    section: 'testimonials',
    title: 'Client Testimonials & Feedback — PRO DIGITAL',
    description:
      'Read verified reviews and client testimonials from engineering leaders and founders who partnered with PRO DIGITAL on web, fintech, and AI projects.',
    keywords:
      'Client Testimonials, Client Reviews, PRO DIGITAL Recommendations, Software Engineering Feedback, Verified Endorsements',
  },
  contact: {
    section: 'contact',
    title: 'Contact & Collaboration — PRO DIGITAL',
    description:
      'Get in touch with PRO DIGITAL for full-stack engineering contracts, technical consulting advisory, and software development collaboration.',
    keywords:
      'Hire Full-Stack Developer, PRO DIGITAL, Contact Mr.KIM SAN, Freelance Software Engineer, Technical Consultation',
  },
};

/**
 * Builds comprehensive Schema.org JSON-LD graph with:
 * - Person schema
 * - WebSite schema
 * - WebApplication schemas for all portfolio projects
 * - BreadcrumbList for current active section or project
 */
export function generateStructuredData(
  activeSection: string,
  activeProject: ProjectItem | null,
  origin: string
): object {
  const baseUrl = origin || 'https://kimsan.dev';

  // 1. Person entity
  const personSchema = {
    '@type': 'Person',
    '@id': `${baseUrl}/#person`,
    name: portfolio.personal.name,
    jobTitle: portfolio.personal.title,
    description: portfolio.personal.description,
    url: baseUrl,
    image: portfolio.personal.avatar.startsWith('http')
      ? portfolio.personal.avatar
      : `${baseUrl}${portfolio.personal.avatar}`,
    email: `mailto:${portfolio.personal.email}`,
    telephone: portfolio.personal.phone,
    sameAs: [
      portfolio.social.github,
      portfolio.social.linkedin,
      portfolio.social.telegram,
      portfolio.social.facebook,
      portfolio.social.youtube,
    ].filter(Boolean),
    worksFor: portfolio.experience.map((exp) => ({
      '@type': 'Organization',
      name: exp.company,
      location: exp.location,
    })),
    alumniOf: portfolio.education.map((edu) => ({
      '@type': 'EducationalOrganization',
      name: edu.institution,
    })),
    knowsAbout: portfolio.skills.map((s) => s.name),
  };

  // 2. WebSite entity
  const websiteSchema = {
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'PRO DIGITAL — Full-Stack Developer Portfolio',
    alternateName: 'PRO DIGITAL',
    description: portfolio.personal.description,
    inLanguage: 'en-US',
    publisher: {
      '@id': `${baseUrl}/#person`,
    },
    author: {
      '@id': `${baseUrl}/#person`,
    },
  };

  // 3. Project WebApplication schemas
  const projectSchemas = portfolio.projects.map((proj) => {
    return {
      '@type': 'WebApplication',
      '@id': `${baseUrl}/#project-${proj.id}`,
      name: proj.title,
      headline: proj.title,
      description: proj.description,
      image: `${baseUrl}${proj.image}`,
      applicationCategory:
        proj.category === 'Full Stack' ? 'BusinessApplication' : 'DeveloperApplication',
      operatingSystem: 'Web Browser, Cross-Platform',
      programmingLanguage: proj.technologies,
      author: {
        '@id': `${baseUrl}/#person`,
      },
      url: proj.demoUrl || proj.githubUrl || baseUrl,
      codeRepository: proj.githubUrl || undefined,
      installUrl: proj.demoUrl || undefined,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    };
  });

  // 4. ItemList of Projects
  const projectItemList = {
    '@type': 'ItemList',
    '@id': `${baseUrl}/#projects-list`,
    name: 'PRO DIGITAL Portfolio Projects',
    description: 'Curated list of software engineering applications and platforms by PRO DIGITAL.',
    itemListElement: portfolio.projects.map((proj, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@id': `${baseUrl}/#project-${proj.id}`,
      },
    })),
  };

  // 5. BreadcrumbList reflecting active context
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${baseUrl}/#home`,
    },
  ];

  if (activeProject) {
    breadcrumbItems.push(
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projects',
        item: `${baseUrl}/#projects`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: activeProject.title,
        item: `${baseUrl}/#project-${activeProject.id}`,
      }
    );
  } else if (activeSection && activeSection !== 'home') {
    const secName = activeSection.charAt(0).toUpperCase() + activeSection.slice(1);
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: secName,
      item: `${baseUrl}/#${activeSection}`,
    });
  }

  const breadcrumbsSchema = {
    '@type': 'BreadcrumbList',
    '@id': `${baseUrl}/#breadcrumb`,
    itemListElement: breadcrumbItems,
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema,
      websiteSchema,
      ...projectSchemas,
      projectItemList,
      breadcrumbsSchema,
    ],
  };
}
