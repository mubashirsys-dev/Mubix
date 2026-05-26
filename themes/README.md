# Themes & Design System

The dual-theme token tokens, custom cyberpunk styling variables, and solid border ratios are managed in:

👉 **[src/base.css](../src/base.css)**

## Design System Tokens

### 🎨 Color Palettes

| Token | Light/Minimal Mode Value | Cyberpunk Mode Value | Description |
| :--- | :--- | :--- | :--- |
| `--neo-bg` | `#fdfbf7` (Warm Cream) | `#0d0b11` (Matte Cyber Black) | Base page backdrop color |
| `--neo-white` | `#ffffff` (Solid White) | `#14121a` (Deep Slate Purple) | Card base fill colors |
| `--neo-dark` | `#111111` (Pitch Black) | `#00ffcc` (Neon Turquoise) | High-contrast text & outlines |
| `--neo-accent` | `#7c3aed` (Royal Purple) | `#ff007f` (Cyberpunk Pink) | CTA buttons & brand triggers |
| `--neo-yellow` | `#ffde4d` (Warm Yellow) | `#181524` (Muted Purple Shadow) | Highlight labels |
| `--neo-border` | `#111111` | `#00ffcc` | Dynamic outline color |

### 📐 Structural Ratios
- `--border-heavy`: `4px solid var(--neo-border)` (Brutalist style borders)
- `--shadow-large`: `6px 6px 0px var(--neo-border)` (Brutalist flat offset shadows)
- `--shadow-small`: `3px 3px 0px var(--neo-border)`
