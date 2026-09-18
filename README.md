# PRO DIGITAL — Professional Developer Portfolio Website

A modern, high-performance developer portfolio website for **PRO DIGITAL** built with **React**, **Vite**, **Tailwind CSS**, and **Motion**, engineered for deployment on **Netlify** and version control on **GitHub**.

---

## 🌟 Key Features

- **Modern Responsive Design**: Optimized across mobile (320px+), tablet, laptop, and desktop displays.
- **Dark / Light / System Theme**: Fully persistent theme switcher via `localStorage` with zero theme flashing.
- **Centralized Data Model**: All content, projects, skills, and links are configured in `src/data/portfolio.js`.
- **Interactive Project Showcase**: Dynamic category filtering (All, React, Laravel, Full Stack, Web, Software) and modal detail view with safe empty-URL handling.
- **Interactive Skills Section**: Categorized tech stack (Frontend, Backend, Database, Programming, Tools) with explicit self-assessed indicators.
- **Career & Education Timelines**: Clean responsive milestone nodes highlighting responsibilities and tech stacks.
- **Netlify-Ready Contact Form**: Form validation, loading spinners, success state alerts, and hidden `form-name` support for Netlify Forms.
- **Accessible & Motion-Optimized**: Respects `prefers-reduced-motion` and WCAG AA contrast standards.
- **Floating 'Back to Top' Navigation**: Dynamic button with entrance/exit transitions that activates once scrolled past the hero section, offering smooth, one-click return to the top.
- **IntersectionObserver Scroll-Spy Navigation**: High-performance `useIntersectionObserver` custom hook that tracks visible viewport sections without jank, updating `activeSection` in real time to highlight desktop and mobile navigation links with an animated indicator.
- **Print & PDF-Ready Styling**: Dedicated `@page` and `@media print` CSS media query that removes web chrome, hides interactive forms, prevents awkward page breaks across cards, and enforces high-contrast ink-efficient document layouts.
- **Initialization Loading Skeleton Screen**: Fluid, layout-matched skeleton screen with pulse animations and smooth exit transitions (`AnimatePresence`) that provides instant visual feedback while the portfolio data initializes and components mount.
- **Full SEO & Dynamic Meta-Tag Manager**: Automatically updates `<title>`, `<meta name="description">`, Open Graph (`og:*`), Twitter Cards, and canonical `<link>` tags in real-time as users scroll between sections (`#home`, `#about`, `#skills`, `#services`, `#projects`, `#experience`, `#education`, `#contact`) or open project modals.
- **Comprehensive Schema.org (@graph JSON-LD)**: Rich structured data encompassing `Person`, `WebSite`, `WebApplication` entities for each portfolio project (with licenses, technologies, category, repositories), and context-aware `BreadcrumbList`.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Typography**: Plus Jakarta Sans (Body), Peach Club Script by HansCo (Signature Script for Developer Name & Brand), JetBrains Mono (Code)
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Deployment Target**: Netlify / Vercel / Cloud Run

---

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development Server

Run the local development server at `http://localhost:3000`:

```bash
npm run dev
```

### Production Build

Compile and bundle the production-ready static assets to the `dist/` directory:

```bash
npm run build
```

### Preview Production Build

Preview the compiled distribution locally:

```bash
npm run preview
```

---

## 📦 Project Structure

```
portfolio/
├── public/
│   ├── images/
│   │   ├── profile.svg
│   │   ├── project-1.svg ... project-6.svg
│   ├── favicon.svg
│   ├── robots.txt
│   └── resume.pdf
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Services.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Education.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── ThemeToggle.tsx
│   ├── data/
│   │   └── portfolio.js
│   ├── hooks/
│   │   └── useTheme.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── .gitignore
├── netlify.toml
├── package.json
└── README.md
```

---

## 🐙 Pushing to GitHub

1. Initialize git (if not already initialized):
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of developer portfolio"
   ```

2. Create a new repository on GitHub.

3. Link your remote repository and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```

---

## 🌐 Deploying to Netlify

1. Push your project to your GitHub repository.
2. Log in to [Netlify](https://www.netlify.com/).
3. Click **"Add new site"** &rarr; **"Import an existing project"**.
4. Authorize and select your GitHub portfolio repository.
5. Configure the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Deploy site"**.

*The included `netlify.toml` file automatically configures the single-page application (SPA) routing redirects and Netlify Forms processing.*

---

## 📄 License

MIT License &copy; 2026 PRO DIGITAL &bull; Mr.KIM SAN.
