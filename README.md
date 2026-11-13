# ✨ Ankit Kumar - Clean Modern Developer Portfolio (React + Tailwind CSS + Vite)

A high-performance, ultra-clean personal developer portfolio website for **Ankit Kumar** (Pre-Final Year CSE at Chandigarh University), built with **React 18**, **Tailwind CSS**, and **Vite**.

- **GitHub Repository:** [https://github.com/Ankit372004/-My-Portfoilo](https://github.com/Ankit372004/-My-Portfoilo)
- **Developer:** [Ankit Kumar](https://github.com/Ankit372004)

---

## 🚀 Live Local Server

The development server is running and accessible at:
- **Local:** [http://localhost:5173/](http://localhost:5173/)

---

## 🌟 Key Features & Interactive Capabilities

### 1. 🎯 Fully Working Buttons & Interactive Systems
- **Theme Toggle:** Instant Light / Dark mode switcher with smooth transitions, persistent `localStorage` synchronization, and high contrast typography.
- **Interactive Developer Terminal (CLI):** Built-in browser terminal emulator supporting commands (`help`, `bio`, `skills`, `projects`, `experience`, `contact`, `theme light|dark`, `time`, `clear`, and `sudo hire` for an easter egg confetti burst).
- **Interactive Project Filtering:** Filter projects by category (*All*, *Full Stack*, *Frontend*, *Cloud & AI*, *Dev Tools*), live keyword search, or by clicking individual tech tags.
- **Detailed Project Case Study Modal:** Deep-dive modal for each project with engineering challenges, architectural solutions, key highlights, and live demo / GitHub links.
- **Resume / CV Modal & Export:** Complete interactive curriculum vitae viewer with **Print / Save as PDF** (`window.print()`), **Download .txt resume**, and **Copy plain-text** to clipboard.
- **Interactive Contact Form:** Live form validation, character counter, animated loading state, celebration confetti (`canvas-confetti`), and success card reset.
- **Interactive Skills System:** Proficiency meters with category tabs, search filter, and instant "View projects using this skill" cross-navigation.
- **Career & Education Timeline:** Accordion timeline with *Expand All* / *Collapse* controls and tech stack tags.
- **Testimonials Carousel:** Auto-sliding feedback carousel with *Play/Pause*, *Next*, *Previous*, and pagination dot navigation.
- **Floating Back-to-Top Button:** Appears automatically on scroll with a circular SVG progress indicator.
- **Global Toast Notification System:** Non-intrusive feedback toast for clipboard copies, theme toggling, and message transmissions.

---

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Effects:** [Canvas-Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Typography:** Inter & JetBrains Mono

---

## 💻 Available Scripts

In the project directory:

```bash
# Start development server
npm run dev

# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
PORTFILO/
├── index.html                   # HTML entry with custom favicon & fonts
├── package.json                 # Dependencies and scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind theme configuration
├── vite.config.js               # Vite bundler configuration
└── src/
    ├── App.jsx                  # Main application orchestrator
    ├── index.css                # Global styles, glassmorphism & scrollbar
    ├── main.jsx                 # React root mount
    ├── data/
    │   └── portfolioData.js     # Structured portfolio information
    └── components/
        ├── Navbar.jsx           # Floating glass navbar with active spy
        ├── Hero.jsx             # Hero section with stats & actions
        ├── About.jsx            # Bio, pillars & live Bangalore clock
        ├── Skills.jsx           # Categorized skills & proficiency meters
        ├── Projects.jsx         # Filterable project showcase & search
        ├── ProjectModal.jsx     # Deep-dive architecture modal
        ├── Experience.jsx       # Career & education timeline
        ├── Testimonials.jsx     # Endorsements slider with controls
        ├── InteractiveTerminal.jsx # Developer CLI shell drawer
        ├── Contact.jsx          # Contact form with confetti celebration
        ├── ResumeModal.jsx      # Printable & downloadable CV viewer
        ├── BackToTop.jsx        # Floating progress action button
        ├── Toast.jsx            # Global toast notifications
        └── Footer.jsx           # Clean footer with quick links
```

