# Implementation Guide

> Step-by-step guide to apply the new style guide to your portfolio

---

## Quick Start

### 1. Review the Style Guide
Read through `STYLE_GUIDE.md` to understand the new design system.

### 2. Import Design Tokens
Add the design tokens to your project:

**Option A: Import the CSS file**
```tsx
// In your main index.tsx or App.tsx
import './design-tokens.css';
```

**Option B: Copy variables to index.css**
Copy the CSS custom properties from `design-tokens.css` into your existing `src/index.css` file.

---

## Color Migration

### Current → New Color Mapping

| Current (Cyan Theme) | New (Electric Blue Theme) | Usage |
|---------------------|---------------------------|-------|
| `#06b6d4` (cyan-500) | `#00cfff` (--primary) | Primary brand color |
| `cyan-400` | `--primary-light` or `--mint` | Lighter accents |
| `cyan-600` | `--primary-dark` | Darker variations |
| `gray-900` (#111827) | `#051323` (--dark) | Main background |
| `gray-800` | `#0a1e3a` (--bg-secondary) | Card backgrounds |
| `gray-700` | `#112d4e` (--bg-tertiary) | Elevated elements |
| `gray-400` | `#83909e` (--grey) | Secondary text |
| `gray-300` | `#9ca4ae` (--light-grey) | Borders |
| `white` | `#ffffff` (--cristal) | Primary text |

### Find & Replace Guide

**Step 1: Global Color Replacements**
```bash
# Find all cyan-500 references
grep -r "cyan-500" src/

# Replace with CSS variable
# From: className="text-cyan-500"
# To:   className="text-[var(--primary)]"
# Or:   style={{ color: 'var(--primary)' }}
```

**Step 2: Component-by-Component**
Update each component file:

```tsx
// BEFORE
<h2 className="text-cyan-400">Title</h2>
<button className="bg-cyan-500 hover:bg-cyan-400">Click</button>

// AFTER
<h2 style={{ color: 'var(--primary)' }}>Title</h2>
<button style={{
  background: 'var(--primary)',
  hover: { background: 'var(--hover-primary)' }
}}>Click</button>
```

---

## Typography Updates

### Install Gilroy Font (Optional)

**Option 1: CDN (Quick)**
Add to `index.html`:
```html
<link href="https://fonts.cdnfonts.com/css/gilroy-bold" rel="stylesheet">
```

**Option 2: Self-Host (Recommended)**
1. Download Gilroy font files
2. Place in `/public/fonts/gilroy/`
3. Add to `index.css`:
```css
@font-face {
  font-family: 'Gilroy';
  src: url('/fonts/gilroy/Gilroy-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Gilroy';
  src: url('/fonts/gilroy/Gilroy-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}
```

**Option 3: Keep Inter**
Inter is already installed and works great as a fallback!

### Update Base Typography
```css
/* In index.css */
body {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--grey);
  background: var(--bg-primary);
}

h1, h2, h3, h4, h5, h6 {
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--cristal);
}

h1 { font-size: var(--text-5xl); }
h2 { font-size: var(--text-4xl); }
h3 { font-size: var(--text-2xl); }
```

---

## Component Updates

### Buttons

**Current Tailwind Classes:**
```tsx
className="bg-cyan-500 text-white px-6 py-3 rounded-full hover:bg-cyan-400"
```

**New Style Guide Approach:**
```tsx
// Create a button component with CSS-in-JS or className
<button className="btn-primary">
  Click Me
</button>
```

**CSS:**
```css
.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: var(--cristal);
  padding: 12px 24px;
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  border: 2px solid transparent;
  transition: all var(--transition-base);
  box-shadow: var(--glow-primary);
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--hover-primary), var(--primary));
  box-shadow: var(--glow-primary-strong);
  transform: translateY(-2px);
}
```

### Cards

**Before:**
```tsx
<div className="bg-gray-900 rounded-xl border border-gray-800 hover:border-cyan-500">
```

**After:**
```tsx
<div className="card hover-lift">
```

**CSS:**
```css
.card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  border: 1px solid var(--light-grey);
  transition: all var(--transition-base);
}

.card:hover {
  border-color: var(--primary);
  box-shadow: var(--glow-primary);
}
```

### Navbar

**Update navbar.tsx:**
```tsx
// Update colors
const navbarStyle = {
  background: 'rgba(5, 19, 35, 0.9)',
  backdropFilter: 'blur(16px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
};

const linkStyle = {
  color: 'var(--grey)',
  // Active state
  ...(isActive && {
    color: 'var(--primary)',
    background: 'rgba(0, 207, 255, 0.15)'
  })
};
```

---

## Spacing Updates

### Current Tailwind → CSS Variables

| Tailwind | CSS Variable | Value |
|----------|-------------|-------|
| `p-4` | `var(--space-4)` | 16px |
| `p-6` | `var(--space-6)` | 24px |
| `p-8` | `var(--space-8)` | 32px |
| `gap-4` | `var(--space-4)` | 16px |
| `mb-4` | `var(--space-4)` | 16px |

**Example:**
```tsx
// Before
<div className="p-6 mb-8">

// After (using inline styles)
<div style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>

// Or create utility classes
<div className="padding-6 margin-bottom-8">
```

---

## Border Radius Updates

| Current | New | Value |
|---------|-----|-------|
| `rounded-lg` | `var(--radius-lg)` | 16px |
| `rounded-xl` | `var(--radius-xl)` | 24px |
| `rounded-full` | `var(--radius-full)` | 9999px |
| `rounded-md` | `var(--radius-md)` | 12px |

---

## Shadow & Glow Effects

### Add Glow to Elements

**Before:**
```tsx
className="shadow-lg"
```

**After:**
```css
box-shadow: var(--glow-primary);
```

**Animated Glow:**
```css
.glow-pulse {
  animation: glowPulse 2s infinite;
}

@keyframes glowPulse {
  0%, 100% { box-shadow: var(--glow-primary); }
  50% { box-shadow: var(--glow-primary-strong); }
}
```

---

## File-by-File Checklist

### Core Files

- [x] `STYLE_GUIDE.md` - Created ✓
- [x] `design-tokens.css` - Created ✓
- [ ] `src/index.css` - Update with design tokens
- [ ] `src/App.tsx` - Update global styles

### Components to Update

- [ ] `src/components/navbar.tsx`
  - Update colors (--primary, --bg-primary)
  - Update link hover states
  - Update active states

- [ ] `src/components/hero.tsx`
  - Update heading colors
  - Update button styles
  - Update background

- [ ] `src/components/about.tsx`
  - Update card background
  - Update text colors
  - Update button styles

- [ ] `src/components/Skills.tsx`
  - Update skill card backgrounds
  - Update hover effects
  - Update badge colors

- [ ] `src/components/projects.tsx`
  - Update card backgrounds
  - Update border colors
  - Update hover glow effects
  - Update featured badge colors

- [ ] `src/components/contact.tsx`
  - Update form input styles
  - Update button styles
  - Update background colors

- [ ] `src/components/Terminal.tsx`
  - Update terminal background
  - Update text colors
  - Update button colors

- [ ] `src/components/CommandPalette.tsx`
  - Update backdrop color
  - Update palette background
  - Update command hover states

- [ ] `src/components/ScrollProgress.tsx`
  - Update progress bar color to --primary

- [ ] `src/components/CustomCursor.tsx`
  - Update cursor color to --primary

---

## Testing Checklist

### Visual Testing
- [ ] Check all sections with new colors
- [ ] Verify hover states work correctly
- [ ] Test focus states (keyboard navigation)
- [ ] Verify all animations are smooth
- [ ] Check responsive design on mobile

### Contrast Testing
- [ ] Run WCAG contrast checker
- [ ] Verify text readability
- [ ] Check button states
- [ ] Validate link colors

### Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

### Performance
- [ ] Check animation performance
- [ ] Verify no layout shifts
- [ ] Test on slower devices
- [ ] Measure bundle size impact

---

## Migration Strategy

### Phase 1: Setup (30 min)
1. Add `design-tokens.css` to project
2. Import Gilroy font (optional)
3. Update `index.css` with base styles
4. Test that variables are working

### Phase 2: Core Components (2-3 hours)
1. Update Navbar
2. Update Hero section
3. Update buttons globally
4. Update card styles
5. Test visual consistency

### Phase 3: Sections (2-3 hours)
1. Update About section
2. Update Skills section
3. Update Projects section
4. Update Contact section
5. Test all sections

### Phase 4: Special Components (1-2 hours)
1. Update Terminal
2. Update Command Palette
3. Update Code Rain
4. Update Scroll indicators
5. Update Custom Cursor

### Phase 5: Polish & Testing (1-2 hours)
1. Fine-tune animations
2. Adjust spacing
3. Test accessibility
4. Cross-browser testing
5. Final QA

**Total Estimated Time: 6-10 hours**

---

## Quick Wins

Want to see immediate changes? Start with these:

### 1. Update Primary Color (5 min)
```css
/* In index.css */
:root {
  --primary: #00cfff;
  --primary-dark: #0068ff;
}

/* Replace all cyan-500 */
.text-cyan-500 { color: var(--primary) !important; }
.bg-cyan-500 { background: var(--primary) !important; }
.border-cyan-500 { border-color: var(--primary) !important; }
```

### 2. Update Background (5 min)
```css
body {
  background: #051323;
  background-image: url("https://source.unsplash.com/1600x900/?space,stars,nebula");
}
```

### 3. Add Glow Effects (10 min)
```css
/* Add to buttons */
.glow-button {
  box-shadow: 0 0 20px rgba(0, 207, 255, 0.3);
}

.glow-button:hover {
  box-shadow: 0 0 40px rgba(0, 207, 255, 0.6);
}
```

---

## Troubleshooting

### Colors not updating?
- Check CSS specificity (may need `!important` temporarily)
- Ensure design-tokens.css is imported
- Clear browser cache

### Fonts not loading?
- Check network tab for 404 errors
- Verify font file paths
- Use fallback fonts (Inter works great)

### Performance issues?
- Reduce blur effects on mobile
- Simplify animations
- Use `will-change` sparingly

### Layout breaking?
- Check that spacing variables are correct
- Verify container widths
- Test responsive breakpoints

---

## Need Help?

### Resources
- [CSS Custom Properties MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Design Systems Guide](https://www.designsystems.com/)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Reference Files
- `STYLE_GUIDE.md` - Complete design system documentation
- `design-tokens.css` - All CSS variables
- `IMPLEMENTATION_GUIDE.md` - This file

---

*Good luck with the migration! Remember: You can do this incrementally. Start small, test often.*
