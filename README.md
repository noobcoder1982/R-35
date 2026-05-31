<div align="center">

# R-35

**Discover and own certified collectible physical 35mm film reels.**  
Fully verified silent archives, theatrical cuts, and classic cinema treasures — preserved for the next generation.

<br/>

<!-- Primary badges (repo + stack) -->
![Made with React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![Built with Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-111111?style=for-the-badge&logo=javascript)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint)

<!-- Optional workflow/status-style badges without requiring CI -->
![Status](https://img.shields.io/badge/Status-Active-0A0A0A?style=for-the-badge)
![UI](https://img.shields.io/badge/UI-Dark%20Theme-0A0A0A?style=for-the-badge)
![HMR](https://img.shields.io/badge/Vite-HMR-646CFF?style=for-the-badge&logo=vite)

<br/>
<br/>

<img src="readme%20image/home.png" alt="R-35 home screen" width="900" />

<br/>
<br/>

</div>

---

## ✨ Overview

R-35 is a modern React + Vite web experience built around a cinematic, archive-inspired design system.  
The UI embraces a **dark, immersive single-viewport layout**, with high-contrast typography, editorial spacing, and polished micro-interactions.

---

## 🎬 Experience & UI Direction

- **Immersive single viewport** layout and design system
- **Dark theme** presentation with film-archive aesthetics
- **Bold display typography** and clean editorial hierarchy
- Subtle motion + hover affordances for a premium browsing experience

> Design system cues can be found throughout the CSS (e.g., layout grid, hero, featured cards, and preloader reveal sequences).

---

## 🧱 Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![React DOM](https://img.shields.io/badge/React%20DOM-20232A?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite)

### Tooling / Quality
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint)

---

## 🗂 Project Structure

```text
R-35/
├── dist/                # Production build output
├── public/              # Static assets (incl. favicon)
├── readme image/        # README images (e.g., home.png)
├── src/                 # App source
│   ├── assets/          # App assets
│   ├── App.jsx          # Main application UI
│   ├── App.css          # App-level styles
│   ├── index.css        # Design system + global styles
│   └── main.jsx         # React entry point
├── index.html           # App HTML shell + metadata
├── vite.config.js       # Vite configuration
├── package.json         # Scripts and dependencies
└── README.md
```

---

## 🧭 Architecture / Workflow

```text
index.html
  └── src/main.jsx
        └── <App /> (src/App.jsx)
              └── global styling + design system (src/index.css)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (recommended: recent LTS)

### Install
```bash
npm install
```

### Run (development)
```bash
npm run dev
```

### Lint
```bash
npm run lint
```

### Build (production)
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

---

## 🔎 Notes

- The app uses a polished **global CSS design system** (`src/index.css`) featuring:
  - Layout grid (sidebar + main panel)
  - Hero showcase section
  - Featured card grid
  - Curtain split preloader + blur reveal animations
- The HTML shell includes typography + metadata configuration (`index.html`).

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## 📄 License

No license is currently specified.

---

<div align="center">

**R-35** — built with React + Vite.

</div>
