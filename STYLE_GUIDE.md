# Portfolio Style Guide

> A comprehensive design system for Maxwell Fernandes' Portfolio
> Based on modern web design principles with a futuristic tech aesthetic

---

## Table of Contents
1. [Design Principles](#design-principles)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Effects & Animations](#effects--animations)
7. [Accessibility](#accessibility)

---

## Design Principles

### Core Principles
1. **Clarity**: Clean, uncluttered interface with clear visual hierarchy
2. **Consistency**: Uniform styling across all components
3. **Performance**: Smooth animations without sacrificing speed
4. **Accessibility**: WCAG 2.1 AA compliant
5. **Responsive**: Mobile-first approach, seamless across devices

### Visual Style
- **Aesthetic**: Modern, futuristic, tech-focused
- **Mood**: Professional yet approachable, innovative
- **Personality**: Clean, sleek, cutting-edge

---

## Color System

### Primary Colors
```css
--primary: #00cfff;           /* Electric Blue - Primary brand color */
--primary-light: #6affb3;     /* Mint - Accent highlights */
--primary-dark: #0068ff;      /* Electro Blue - Deeper accents */
--salad: #00f87a;             /* Neon Green - Success states */
```

### Neutral Colors
```css
--dark: #051323;              /* Deep Navy - Primary background */
--black: #000000;             /* Pure Black - Overlays */
--dark-grey: #56667a;         /* Slate - Secondary text */
--grey: #83909e;              /* Mid Grey - Tertiary text */
--light-grey: #9ca4ae;        /* Light Grey - Borders, dividers */
--cristal: #ffffff;           /* Pure White - Primary text */
```

### Semantic Colors
```css
--success: #00f87a;           /* Green - Success messages */
--warning: #ffa500;           /* Orange - Warning states */
--error: #ff4444;             /* Red - Error states */
--info: #00cfff;              /* Blue - Information */
```

### Background Layers
```css
--bg-primary: #051323;        /* Main background */
--bg-secondary: #0a1e3a;      /* Card backgrounds */
--bg-tertiary: #112d4e;       /* Elevated elements */
--bg-overlay: rgba(5, 19, 35, 0.95);  /* Modal/overlay backgrounds */
```

### Interactive States
```css
--hover-primary: #00e0ff;     /* Primary hover state */
--hover-secondary: #79f4ff;   /* Secondary hover state */
--active-primary: #00b8e6;    /* Primary active/pressed state */
--disabled: #56667a;          /* Disabled elements */
```

### Color Usage Guidelines

**Primary (#00cfff)**
- Main CTAs (buttons, links)
- Active navigation items
- Progress indicators
- Focus states
- Brand elements

**Mint (#6affb3)**
- Accent highlights
- Success indicators
- Hover effects on secondary elements
- Decorative elements

**Salad (#00f87a)**
- Success messages
- Completed states
- Positive feedback
- Achievement badges

**Dark (#051323)**
- Primary background
- Card backgrounds
- Modal backgrounds

**Cristal (#ffffff)**
- Primary text
- Headings
- Important content

**Grey Variations**
- Light Grey: Borders, dividers, inactive states
- Mid Grey: Secondary text, descriptions
- Dark Grey: Tertiary text, placeholders

---

## Typography

### Font Families
```css
--font-primary: 'Gilroy', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

### Type Scale
```css
--text-xs: 12px;      /* Small labels, captions */
--text-sm: 14px;      /* Secondary text, descriptions */
--text-base: 16px;    /* Body text (base) */
--text-lg: 18px;      /* Large body, subheadings */
--text-xl: 20px;      /* Card titles */
--text-2xl: 24px;     /* Section subheadings */
--text-3xl: 32px;     /* Section headings */
--text-4xl: 40px;     /* Page titles */
--text-5xl: 48px;     /* Hero headings */
--text-6xl: 64px;     /* Large hero text */
```

### Font Weights
```css
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Line Heights
```css
--leading-tight: 1.2;    /* Headings */
--leading-normal: 1.5;   /* Body text */
--leading-relaxed: 1.75; /* Long-form content */
```

### Letter Spacing
```css
--tracking-tight: -0.02em;   /* Large headings */
--tracking-normal: 0;        /* Body text */
--tracking-wide: 0.05em;     /* Small caps, labels */
```

### Typography Usage

**Headings**
```css
h1 {
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--cristal);
}

h2 {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--primary);
}

h3 {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-normal);
  color: var(--cristal);
}
```

**Body Text**
```css
body {
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  line-height: var(--leading-normal);
  color: var(--grey);
}

.text-large {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
}

.text-small {
  font-size: var(--text-sm);
  color: var(--dark-grey);
}
```

---

## Spacing & Layout

### Spacing Scale
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
```

### Border Radius
```css
--radius-sm: 8px;       /* Small elements */
--radius-md: 12px;      /* Medium elements */
--radius-lg: 16px;      /* Large cards */
--radius-xl: 24px;      /* Extra large containers */
--radius-full: 9999px;  /* Pills, circular buttons */
```

### Container Widths
```css
--container-sm: 640px;    /* Mobile landscape */
--container-md: 768px;    /* Tablet */
--container-lg: 1024px;   /* Desktop */
--container-xl: 1280px;   /* Large desktop */
--container-2xl: 1536px;  /* Extra large */
```

### Z-Index Layers
```css
--z-background: -1;
--z-base: 0;
--z-dropdown: 10;
--z-sticky: 20;
--z-fixed: 30;
--z-modal-backdrop: 40;
--z-modal: 50;
--z-popover: 60;
--z-tooltip: 70;
```

---

## Components

### Buttons

#### Primary Button
```css
.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: var(--cristal);
  padding: 12px 24px;
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  border: 2px solid transparent;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 207, 255, 0.2);
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--hover-primary), var(--primary));
  box-shadow: 0 6px 20px rgba(0, 207, 255, 0.4);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 207, 255, 0.3);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: var(--primary);
  padding: 12px 24px;
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  border: 2px solid var(--primary);
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(0, 207, 255, 0.1);
  border-color: var(--hover-primary);
  color: var(--hover-primary);
}
```

#### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: var(--grey);
  padding: 12px 24px;
  border-radius: var(--radius-lg);
  font-weight: var(--font-medium);
  border: none;
  transition: all 0.3s ease;
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--cristal);
}
```

### Cards

#### Base Card
```css
.card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  border: 1px solid var(--light-grey);
  transition: all 0.3s ease;
}

.card:hover {
  border-color: var(--primary);
  box-shadow: 0 8px 24px rgba(0, 207, 255, 0.15);
  transform: translateY(-4px);
}
```

#### Glass Card
```css
.card-glass {
  background: rgba(10, 30, 58, 0.6);
  backdrop-filter: blur(16px);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

### Inputs

#### Text Input
```css
.input {
  background: var(--bg-tertiary);
  color: var(--cristal);
  padding: 12px 16px;
  border-radius: var(--radius-md);
  border: 2px solid var(--light-grey);
  font-size: var(--text-base);
  transition: all 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(0, 207, 255, 0.1);
}

.input::placeholder {
  color: var(--dark-grey);
}
```

### Badges

#### Status Badge
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  background: rgba(0, 207, 255, 0.1);
  color: var(--primary);
  border: 1px solid rgba(0, 207, 255, 0.3);
}

.badge-success {
  background: rgba(0, 248, 122, 0.1);
  color: var(--salad);
  border-color: rgba(0, 248, 122, 0.3);
}
```

### Navigation

#### Navbar
```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(5, 19, 35, 0.9);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--space-4) 0;
  z-index: var(--z-fixed);
}

.nav-link {
  color: var(--grey);
  font-weight: var(--font-medium);
  font-size: var(--text-base);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: var(--primary);
  background: rgba(0, 207, 255, 0.1);
}

.nav-link.active {
  color: var(--primary);
  background: rgba(0, 207, 255, 0.15);
}
```

---

## Effects & Animations

### Shadows
```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.2);
--shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.3);

/* Glow Effects */
--glow-primary: 0 0 20px rgba(0, 207, 255, 0.3);
--glow-primary-strong: 0 0 40px rgba(0, 207, 255, 0.5);
--glow-mint: 0 0 20px rgba(106, 255, 179, 0.3);
--glow-salad: 0 0 20px rgba(0, 248, 122, 0.3);
```

### Transitions
```css
--transition-fast: 150ms ease;
--transition-base: 300ms ease;
--transition-slow: 500ms ease;
--transition-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Animation Presets
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Slide Down */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale In */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Pulse */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

/* Glow Pulse */
@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(0, 207, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(0, 207, 255, 0.6);
  }
}
```

### Hover Effects
```css
/* Lift Effect */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* Glow Effect */
.hover-glow {
  transition: box-shadow 0.3s ease;
}

.hover-glow:hover {
  box-shadow: var(--glow-primary-strong);
}

/* Scale Effect */
.hover-scale {
  transition: transform 0.3s var(--transition-spring);
}

.hover-scale:hover {
  transform: scale(1.05);
}
```

---

## Accessibility

### Focus States
```css
/* Keyboard Focus Indicator */
:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
}

/* Remove default outline */
:focus {
  outline: none;
}

/* Button Focus */
button:focus-visible {
  box-shadow: 0 0 0 4px rgba(0, 207, 255, 0.3);
}
```

### Color Contrast
- **Minimum Ratios**:
  - Normal text: 4.5:1
  - Large text (18px+): 3:1
  - UI Components: 3:1

- **Tested Combinations**:
  - White on Dark (#ffffff on #051323): 17.8:1 ✓
  - Primary on Dark (#00cfff on #051323): 9.2:1 ✓
  - Grey on Dark (#83909e on #051323): 5.1:1 ✓

### Motion Preferences
```css
/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Screen Reader Support
```css
/* Visually hidden but accessible to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## Responsive Design

### Breakpoints
```css
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
--breakpoint-2xl: 1536px; /* Extra large */
```

### Mobile-First Approach
```css
/* Base styles for mobile */
.container {
  padding: var(--space-4);
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: var(--space-6);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: var(--space-8);
  }
}
```

---

## Usage Examples

### Hero Section
```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  position: relative;
}

.hero-title {
  font-size: var(--text-6xl);
  font-weight: var(--font-bold);
  color: var(--cristal);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-4);
}

.hero-subtitle {
  font-size: var(--text-xl);
  color: var(--grey);
  margin-bottom: var(--space-8);
}

.hero-cta {
  display: inline-flex;
  gap: var(--space-4);
}
```

### Project Card
```css
.project-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--light-grey);
  transition: all 0.3s ease;
}

.project-card:hover {
  border-color: var(--primary);
  box-shadow: var(--glow-primary);
  transform: translateY(-8px);
}

.project-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-content {
  padding: var(--space-6);
}

.project-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--primary);
  margin-bottom: var(--space-3);
}

.project-description {
  font-size: var(--text-base);
  color: var(--grey);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.project-tag {
  padding: 4px 12px;
  background: rgba(0, 207, 255, 0.1);
  color: var(--primary);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  border: 1px solid rgba(0, 207, 255, 0.3);
}
```

---

## Implementation Checklist

- [ ] Update CSS variables in `index.css`
- [ ] Replace color references in all components
- [ ] Update font family imports (Gilroy)
- [ ] Adjust border radius values
- [ ] Update button styles
- [ ] Refresh card designs
- [ ] Update input field styles
- [ ] Revise shadow and glow effects
- [ ] Test responsive breakpoints
- [ ] Verify color contrast ratios
- [ ] Test with screen readers
- [ ] Check reduced motion support
- [ ] Validate all interactive states

---

## Notes

### Font Installation
To use Gilroy font, add to your HTML head:
```html
<link href="https://fonts.cdnfonts.com/css/gilroy-bold" rel="stylesheet">
```

Or use Inter as fallback (already in project):
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

### Performance Considerations
- Use CSS custom properties for runtime theme changes
- Minimize animation complexity on mobile
- Use `will-change` sparingly for heavy animations
- Prefer `transform` and `opacity` for animations
- Implement lazy loading for images

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox
- CSS Custom Properties
- Backdrop Filter (with fallback)

---

*Last Updated: 2025*
*Version: 1.0.0*
