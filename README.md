<div align="center">

# BMW M440i Digital Experience

### The Art of Performance

A cinematic, interactive automotive experience built around the BMW M440i Gran Coupé.

[![Live Demo](https://img.shields.io/badge/Live-Demo-D71920?style=for-the-badge)](https://bmw-m440i-experience.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge&logo=three.js)](https://threejs.org)

<br />

[🚀 Live Experience](https://bmw-m440i-experience.vercel.app)
&nbsp;·&nbsp;
[💻 Source Code](https://github.com/HarutoFX/bmw-m440i-experience)

</div>

---

## 🌐 Live Demo

Experience the project live:

### 🚀 https://bmw-m440i-experience.vercel.app

The experience is designed as a cinematic digital showcase featuring interactive 3D rendering, smooth motion, performance storytelling, vehicle configuration, and responsive design.

---

# 🚗 About The Project

The **BMW M440i Digital Experience** is an immersive automotive showcase built to explore the potential of modern web technologies in creating premium digital product experiences.

Rather than functioning as a traditional automotive website, the project focuses on creating a cinematic journey through the vehicle's:

- Performance
- Exterior design
- Digital technology
- Interactive configuration
- 3D presentation

The experience combines modern frontend development, WebGL rendering, animation, and responsive design to create a premium automotive-inspired interface.

---

# ✨ Features

## 🏎️ Interactive 3D Experience

The BMW M440i is presented through an interactive 3D environment powered by modern WebGL technologies.

Features include:

- 3D vehicle rendering
- Dynamic camera positioning
- Cinematic lighting
- Smooth scene transitions
- Loading states
- Responsive canvas rendering

---

## 🎬 Cinematic Motion Design

The interface uses smooth animations and scroll-driven interactions to guide the user through the experience.

Animations include:

- Scroll-triggered content reveals
- Staggered animations
- Parallax movement
- Animated typography
- Smooth transitions
- Interactive hover states
- Cinematic section entrances

---

## ⚡ Performance Showcase

The performance section highlights the key characteristics of the BMW M440i.

| Specification | Value |
|---|---|
| **0–100 km/h** | 4.5 seconds |
| **Top Speed** | 250 km/h |
| **Power Output** | 374 hp |
| **Torque** | 500 Nm |
| **Engine** | 3.0L Inline-6 TwinPower Turbo |
| **Drivetrain** | xDrive AWD |
| **Transmission** | 8-Speed Steptronic Sport |

---

## 🎨 Design Experience

The design section focuses on the visual identity and M Performance character of the vehicle.

Highlights include:

- M Aerodynamic Package
- Sculpted bodywork
- Performance-focused proportions
- Adaptive LED headlights
- 19" M Alloy Wheels
- Premium visual storytelling

---

## 🖥️ Digital Technology

The technology section showcases the digital cockpit and connected driving experience.

### BMW Curved Display

A driver-focused combination of:

- 12.3" instrument cluster
- 14.9" central information display

### Operating System 8

Features include:

- Advanced voice interaction
- Intelligent navigation
- Cloud-connected services
- Digital connectivity

### BMW Intelligent Personal Assistant

Voice-based interaction for:

- Navigation
- Climate controls
- Communication
- Entertainment

---

## ⚙️ Interactive Configurator

The configurator allows users to personalize the vehicle experience.

Configuration options include:

### Exterior Finish

- Sapphire Black
- Alpine White
- Portimao Blue
- Toronto Red
- Frozen Grey
- Skyscraper Grey

### Wheel Design

- 19" M Alloy Wheels
- 20" Performance Wheels

### Interior Upholstery

- Black Vernasca Leather
- Cognac Leather
- Red / Black M Sport Interior

---

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js** | Application framework |
| **React** | User interface development |
| **TypeScript** | Type safety |
| **Three.js** | 3D rendering |
| **React Three Fiber** | React renderer for Three.js |
| **React Three Drei** | Three.js utilities and abstractions |
| **Framer Motion** | Animations and transitions |
| **Tailwind CSS** | Styling and responsive design |
| **GLTF / GLB** | 3D vehicle model |

---

# 📂 Project Structure

```text
src
│
├── app
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components
│   │
│   ├── canvas
│   │   ├── CarModel.tsx
│   │   ├── DynamicHeroScene.tsx
│   │   ├── HeroScene.tsx
│   │   └── SceneLoader.tsx
│   │
│   ├── layout
│   │   └── Navbar.tsx
│   │
│   └── ui
│       ├── ConfigureSection.tsx
│       ├── DesignSection.tsx
│       ├── FinalCtaSection.tsx
│       ├── HeroContent.tsx
│       ├── PerformanceSection.tsx
│       ├── SpecsBar.tsx
│       └── TechnologySection.tsx
│
├── hooks
│   └── useScrollProgress.ts
│
├── lib
│   ├── constants.ts
│   └── utils.ts
│
└── types
    └── index.ts