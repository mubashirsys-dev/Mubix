# Core Animations Directory

The animation logic, transition timing functions, scroll reveal triggers, and cyber keyframes are defined inside:

👉 **[src/base.css](../src/base.css)**
👉 **[src/components.css](../src/components.css)**
👉 **[src/sections.css](../src/sections.css)**

## Animation Features

### 1. Cyber Glitch Overrides
Triggered during theme switches. Uses CSS keyframes to skew, displace clip paths, and shift color-channels (`red` & `cyan`) to simulate a digital terminal hardware glitch.
- Location: `src/base.css` (`@keyframes cyber-glitch-skew`)

### 2. Comic Wipe paper overlay
A comic book action frame wipe. Uses an diagonal translation of high-contrast solid colors to wipe from dark/cyber theme back to bright minimalist cream layout.
- Location: `src/components/ThemeToggle.css`

### 3. Scroll Reveal Triggers
IntersectionObserver-guided class injection (`revealed`) which scales up solid card margins, slides in contact buttons, and activates progress bars as the visitor scrolls.
- Implementation: `src/App.jsx` (`useReveal()`)

### 4. Interactive Cursor Trails
Tactile micro-animations that track hover states and link triggers.
