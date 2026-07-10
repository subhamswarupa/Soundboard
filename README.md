# Soundboard

An interactive browser Soundboard with 12 unique sounds, built with React, TypeScript, Framer Motion, and Tailwind CSS. Features a playful cartoon-inspired interface with smooth animations, dark mode, and full keyboard support.

> All sounds are generated programmatically using the Web Audio API — no audio files needed, works completely offline.

## Features

- **12 Unique Sounds** — Bell, Dog Bark, Cat Meow, Rain, Thunder, Ocean, Keyboard, Camera, Applause, Laugh, Whistle, Drum Beat
- **Play All Demo** — Plays every sound in sequence with confetti animation
- **Global Controls** — Volume slider, mute, stop all, random sound
- **Search & Filter** — Search by name or filter by category (Animals, Nature, Music, Comedy, Household)
- **Favorites** — Save favorite sounds (persisted in LocalStorage)
- **Recently Played** — Track recently played sounds (persisted in LocalStorage)
- **Keyboard Shortcuts** — Keys 1-9, Q, W, E to trigger sounds instantly
- **Dark Mode / Light Mode** — Toggle with smooth transitions
- **Animated UI** — Splash screen, floating particles, clouds, stars, confetti, equalizer, sound waves
- **Accessible** — Keyboard navigation, ARIA labels, visible focus, high contrast support
- **Responsive** — Desktop, tablet, and mobile layouts
- **Settings Drawer** — Volume, animations toggle, dark mode, favorites management

## Tech Stack

| Technology | Purpose |
|---|---|
| [React 18](https://react.dev) | UI framework |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Vite 6](https://vitejs.dev) | Build tool |
| [Tailwind CSS 3](https://tailwindcss.com) | Utility-first styling |
| [Framer Motion 11](https://www.framer.com/motion) | Animations |
| [Radix UI](https://radix-ui.com) | Accessible primitives (Slider, Switch, Slot) |
| [Lucide React](https://lucide.dev) | Icons |
| [shadcn/ui](https://ui.shadcn.com) | Component patterns |

## Installation

```bash
git clone <repository-url>
cd soundboard
npm install
```

## Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
soundboard/
├── public/
├── src/
│   ├── assets/audio/       # Audio placeholders
│   ├── components/
│   │   ├── ui/             # shadcn-style primitives
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── slider.tsx
│   │   │   └── switch.tsx
│   │   ├── AnimatedBackground.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── Confetti.tsx
│   │   ├── Equalizer.tsx
│   │   ├── FloatingCloud.tsx
│   │   ├── FloatingStars.tsx
│   │   ├── Header.tsx
│   │   ├── Mascot.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SettingsDrawer.tsx
│   │   ├── SoundCard.tsx
│   │   ├── SoundWave.tsx
│   │   └── SplashScreen.tsx
│   ├── hooks/
│   │   ├── useKeyboardShortcuts.ts
│   │   ├── useLocalStorage.ts
│   │   └── useSoundBoard.ts
│   ├── pages/
│   │   └── Home.tsx
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── soundEngine.ts    # Web Audio API synthesis
│   │   └── sounds.ts         # Sound definitions
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── components.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Keyboard Shortcuts

| Key | Sound |
|---|---|
| `1` | Bell |
| `2` | Dog Bark |
| `3` | Cat Meow |
| `4` | Rain |
| `5` | Thunder |
| `6` | Ocean |
| `7` | Keyboard |
| `8` | Camera |
| `9` | Applause |
| `Q` | Laugh |
| `W` | Whistle |
| `E` | Drum Beat |

## Screenshots

*Screenshots coming soon.*

## Future Improvements

- Sound recording and custom sound uploads
- More sound categories and effects
- Sound mixing (play multiple sounds simultaneously with individual volumes)
- Shareable soundboard presets
- PWA support (installable offline app)
- Audio visualizations

## License

MIT
