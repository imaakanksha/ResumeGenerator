# 🔥 ResuForge Pro — AI Career Intelligence Platform

> Upload your career folder. Paste a job description. Get a perfectly tailored, ATS-optimized resume with skill gap analysis — in seconds.

![ResuForge Pro](https://img.shields.io/badge/ResuForge-Pro-6366f1?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik0xMyAySDZhMiAyIDAgMDAtMiAydjE2YTIgMiAwIDAwMiAyaDEyYTIgMiAwIDAwMi0yVjlsLTctN3oiIGZpbGw9IiM2MzY2ZjEiLz48L3N2Zz4=)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![PWA](https://img.shields.io/badge/PWA-Ready-06b6d4?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square)

---

## ✨ Features

| Feature | Description |
|---|---|
| 📁 **Career Vault** | Upload career files (txt, md, json, pdf, html) — auto-extracts skills, experience, education, projects |
| ⚡ **Forge Resume** | One-click tailored resume generation matched to any job description |
| 🔍 **Skill Gap Analysis** | Visual dashboard: ✅ matched, 🟡 added (learn these!), ❌ missing — with learning paths |
| 🎯 **ATS Scoring** | Keyword match %, format score, impact words analysis, actionable recommendations |
| ✏️ **Smart Editor** | Drag-drop sections, strength meters, templates, color picker, keyboard shortcuts |
| 📄 **Cover Letter** | AI-generated cover letters with tone control (professional, creative, enthusiastic) |
| 📤 **Multi-Export** | PDF, LaTeX (.tex for Overleaf), JSON, clipboard copy |
| 💾 **Persistent Storage** | IndexedDB for career vault + LocalStorage for resume — survives browser restarts |
| 📱 **PWA** | Installable as desktop/mobile app with offline support via Service Worker |

## 🚀 Quick Start

```bash
# Clone & serve
git clone https://github.com/yourusername/ResuForge-Pro.git
cd ResuForge-Pro
python -m http.server 8080
# Open http://localhost:8080
```

## 🐳 Docker Deployment

```bash
# Build & run
docker build -t resuforge-pro .
docker run -d -p 80:80 resuforge-pro

# Access at http://localhost
```

## ☁️ Hosting Options

| Platform | Command |
|---|---|
| **Vercel** | `npx vercel --prod` |
| **Netlify** | Drag & drop the project folder |
| **GitHub Pages** | Push to `gh-pages` branch |
| **Google Cloud Run** | `gcloud run deploy --source .` |
| **AWS S3 + CloudFront** | Upload static files to S3 bucket |

## 🏗️ Architecture

```
ResuForge Pro (Client-Side SPA)
├── Career Vault Engine     → File upload, parsing, skill extraction
├── Skill Matching Engine   → Fuzzy matching against JD keywords
├── Skill Gap Analyzer      → Match %, learning recommendations
├── Resume Generator        → Auto-populate editor from vault data
├── ATS Scoring Engine      → Keyword analysis, format scoring
├── Cover Letter Generator  → Tone-aware professional letters
├── Export Engine           → PDF, LaTeX, JSON, clipboard
├── IndexedDB Persistence   → Career vault data across sessions
├── Service Worker          → Offline-first caching strategy
└── PWA Manifest           → Installable app experience
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + K` | Command Palette |
| `Ctrl + S` | Save |
| `Ctrl + P` | Export PDF |
| `Ctrl + E` | Toggle split preview |

## 📁 Project Structure

```
ResumeGenerator/
├── index.html        # SPA structure (600+ lines)
├── index.css         # Design system (980+ lines)
├── app.js            # Application logic (1770+ lines)
├── manifest.json     # PWA manifest
├── sw.js             # Service worker
├── icon-192.png      # PWA icon (192x192)
├── icon-512.png      # PWA icon (512x512)
├── Dockerfile        # Production container
├── nginx.conf        # Production web server config
├── .dockerignore     # Docker build exclusions
└── README.md         # This file
```

## 🔒 Privacy

All processing happens **100% client-side**. Your career data never leaves your browser. No server, no API calls, no tracking.

## 📄 License

MIT License — Use freely for personal and commercial projects.
