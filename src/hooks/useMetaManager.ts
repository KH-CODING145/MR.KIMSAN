import { useEffect, useState } from 'react';
import { SECTION_SEO_MAP, generateStructuredData } from '../utils/seo';
import { ProjectItem } from '../components/Projects';
import { portfolio } from '../data/portfolio.js';

interface UseMetaManagerProps {
  activeSection: string;
  activeProject: ProjectItem | null;
}

export function useMetaManager({ activeSection, activeProject }: UseMetaManagerProps) {
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentCanonical, setCurrentCanonical] = useState('');
  const [structuredDataJson, setStructuredDataJson] = useState('');

  useEffect(() => {
    // 1. Determine Title, Description, and Image
    let title = '';
    let description = '';
    let image = portfolio.personal.avatar;
    let keywords = '';

    if (activeProject) {
      title = `${activeProject.title} — PRO DIGITAL Portfolio`;
      description = activeProject.description.length > 155
        ? `${activeProject.description.slice(0, 152)}...`
        : activeProject.description;
      image = activeProject.image;
      keywords = `${activeProject.title}, ${activeProject.category}, ${activeProject.technologies.join(', ')}`;
    } else {
      const sectionConfig = SECTION_SEO_MAP[activeSection] || SECTION_SEO_MAP.home;
      title = sectionConfig.title;
      description = sectionConfig.description;
      keywords = sectionConfig.keywords || '';
    }

    // 2. Determine Canonical URL
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://kimsan.dev';
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    let canonicalUrl = `${origin}${path}`;
    if (activeProject) {
      canonicalUrl = `${origin}${path}#project-${activeProject.id}`;
    } else if (activeSection && activeSection !== 'home') {
      canonicalUrl = `${origin}${path}#${activeSection}`;
    }

    setCurrentTitle(title);
    setCurrentDescription(description);
    setCurrentCanonical(canonicalUrl);

    // 3. Update DOM Title
    document.title = title;

    // Helper to safely set meta tag content
    const setMetaTag = (selector: string, attr: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          if (name) element.setAttribute('name', name);
        } else if (selector.startsWith('meta[property=')) {
          const prop = selector.match(/property="([^"]+)"/)?.[1];
          if (prop) element.setAttribute('property', prop);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attr, value);
    };

    // Standard Meta Tags
    setMetaTag('meta[name="description"]', 'content', description);
    if (keywords) {
      setMetaTag('meta[name="keywords"]', 'content', keywords);
    }

    // OpenGraph Meta Tags
    setMetaTag('meta[property="og:title"]', 'content', title);
    setMetaTag('meta[property="og:description"]', 'content', description);
    setMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
    setMetaTag('meta[property="og:image"]', 'content', `${origin}${image}`);
    setMetaTag('meta[property="og:type"]', 'content', activeProject ? 'article' : 'website');
    setMetaTag('meta[property="og:site_name"]', 'content', 'PRO DIGITAL');

    // Twitter Meta Tags
    setMetaTag('meta[name="twitter:title"]', 'content', title);
    setMetaTag('meta[name="twitter:description"]', 'content', description);
    setMetaTag('meta[name="twitter:image"]', 'content', `${origin}${image}`);

    // Canonical Link Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 4. Update Schema.org Structured Data
    const structuredData = generateStructuredData(activeSection, activeProject, origin);
    const jsonString = JSON.stringify(structuredData, null, 2);
    setStructuredDataJson(jsonString);

    let scriptTag = document.getElementById('portfolio-structured-data') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'portfolio-structured-data';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = jsonString;
  }, [activeSection, activeProject]);

  return {
    currentTitle,
    currentDescription,
    currentCanonical,
    structuredDataJson,
  };
}
