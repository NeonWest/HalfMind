# HalfMind Frontend Style Guide

This document defines the visual language and frontend styling conventions used throughout HalfMind.

The goal is to keep the interface visually consistent as new pages and components are added.

## 1. Design Philosophy

HalfMind uses a **minimal, technical, editorial-inspired dark interface**.

The visual language should feel:

* Calm and focused
* Technical without looking overly futuristic
* Editorial rather than heavily "SaaS"
* Minimal and intentional
* Neutral-first, with restrained use of accent color
* Structured through typography, spacing, and borders rather than heavy decoration

Avoid introducing visual patterns that significantly change this character without a deliberate design decision.

---

# 2. Design System Sources

The frontend styling system is divided into two layers.

### Design tokens

```text
src/styles/tokens.css
```

Contains reusable design decisions such as:

* Colors
* Typography
* Font sizes
* Spacing
* Layout widths
* Borders
* Radii
* Shadows
* Transitions
* Z-index values
* Shared component dimensions

### Global CSS foundation

```text
src/index.css
```

Contains global browser/application styling and imports the design tokens.

### Component CSS

Individual components own their component-specific styling.

Examples:

```text
src/components/Navbar/Navbar.css
src/components/Hero/Hero.css
src/components/Footer/Footer.css
```

**Rule:** `tokens.css` defines reusable design decisions; component CSS defines how those decisions are used.

---

# 3. Color System

HalfMind is primarily a neutral dark interface.

## Backgrounds

| Token                    | Value     | Usage                                                        |
| ------------------------ | --------- | ------------------------------------------------------------ |
| `--color-bg`             | `#0b0a0a` | Main application/page background                             |
| `--color-surface`        | `#16171d` | Secondary surfaces and elevated sections                     |
| `--color-surface-raised` | `#1f2028` | Higher-level surfaces such as menus, dropdowns, and overlays |

The main page should generally use `--color-bg`.

Surfaces should be introduced deliberately rather than turning every section into a card.

## Text

| Token                 | Value     | Usage                           |
| --------------------- | --------- | ------------------------------- |
| `--color-text`        | `#ece9e1` | Primary readable text           |
| `--color-text-muted`  | `#c9c6bd` | Secondary text and descriptions |
| `--color-text-subtle` | `#929189` | Metadata and low-emphasis text  |

Text hierarchy should generally follow:

```text
Primary → Muted → Subtle
```

Do not use the brightest text color for every element.

## Primary

| Token                      | Value     | Usage                                |
| -------------------------- | --------- | ------------------------------------ |
| `--color-primary`          | `#ffffff` | High-emphasis UI and primary actions |
| `--color-primary-contrast` | `#0b0a0a` | Content placed on primary surfaces   |

Primary white is intentionally used sparingly.

## Borders

| Token                   | Value     | Usage                         |
| ----------------------- | --------- | ----------------------------- |
| `--color-border`        | `#474740` | Standard borders and dividers |
| `--color-border-subtle` | `#2e303a` | Low-emphasis boundaries       |

Borders are an important part of HalfMind's visual language.

Prefer thin, subtle borders instead of large shadows or decorative containers.

## Accent

| Token                  | Value                       | Usage                                  |
| ---------------------- | --------------------------- | -------------------------------------- |
| `--color-accent`       | `#c084fc`                   | Interactive emphasis                   |
| `--color-accent-muted` | `rgba(192, 132, 252, 0.15)` | Accent backgrounds and selected states |

The accent color should **not** be used everywhere.

HalfMind's identity is primarily neutral. Purple should communicate interaction, selection, status, or emphasis.

---

# 4. Typography

HalfMind uses three primary font families.

## Sans-serif

```css
var(--font-sans)
```

Used for:

* Body text
* Descriptions
* Form text
* General readable content

Current family:

```text
system-ui, "Segoe UI", Roboto, sans-serif
```

## Monospace

```css
var(--font-mono)
```

Used for:

* Technical labels
* Metadata
* Navigation labels
* Buttons
* System information
* Code
* Technical UI

Current family:

```text
ui-monospace, Consolas, monospace
```

The monospace font contributes strongly to HalfMind's technical character.

## Display / serif

```css
var(--font-display)
```

Used for:

* Hero headings
* Major page titles
* Editorial-style display text
* Brand typography where appropriate

Current family:

```text
Georgia, "Times New Roman", serif
```

The serif font provides contrast against the technical monospace UI.

---

# 5. Font Scale

The project uses a predefined type scale.

| Token         |   Size | Typical Usage                    |
| ------------- | -----: | -------------------------------- |
| `--text-xs`   | `11px` | Tiny metadata and compact labels |
| `--text-sm`   | `12px` | Navigation and technical UI      |
| `--text-md`   | `13px` | Small readable technical text    |
| `--text-base` | `15px` | Body and normal UI text          |
| `--text-lg`   | `20px` | Section/UI headings              |
| `--text-xl`   | `24px` | Major subsection headings        |
| `--text-2xl`  | `36px` | Page headings                    |
| `--text-3xl`  | `48px` | Large display headings           |
| `--text-4xl`  | `64px` | Maximum hero/display size        |

Use the existing scale when possible.

Do not create a new font-size token for a one-off component unless the value becomes a recurring design decision.

---

# 6. Line Height

| Token               | Value | Usage                       |
| ------------------- | ----: | --------------------------- |
| `--leading-tight`   | `1.2` | Display headings            |
| `--leading-normal`  | `1.5` | UI and compact content      |
| `--leading-relaxed` | `1.6` | Paragraphs and descriptions |

Large headings should generally use tight line height.

Long-form readable content should use relaxed line height.

---

# 7. Letter Spacing

| Token               |     Value | Usage                        |
| ------------------- | --------: | ---------------------------- |
| `--tracking-tight`  | `-0.02em` | Large display headings       |
| `--tracking-normal` |       `0` | Normal text                  |
| `--tracking-wide`   |  `0.08em` | Buttons and technical labels |
| `--tracking-widest` |   `0.2em` | Uppercase system labels      |

Uppercase technical labels should generally use wider tracking.

---

# 8. Spacing

HalfMind uses a spacing scale based primarily on multiples of 4px.

| Token        |   Value |
| ------------ | ------: |
| `--space-1`  |   `4px` |
| `--space-2`  |   `8px` |
| `--space-3`  |  `12px` |
| `--space-4`  |  `16px` |
| `--space-5`  |  `20px` |
| `--space-6`  |  `24px` |
| `--space-8`  |  `32px` |
| `--space-10` |  `40px` |
| `--space-12` |  `48px` |
| `--space-16` |  `64px` |
| `--space-20` |  `80px` |
| `--space-24` |  `96px` |
| `--space-32` | `128px` |

### Spacing rule

Use tokens for **design-system spacing**.

For example:

```css
gap: var(--space-4);
padding: var(--space-6);
margin-bottom: var(--space-8);
```

Do not create a token for every pixel value.

Component-specific geometry can remain explicit:

```css
top: 107px;
height: 26px;
```

The rule is:

> **Use tokens for repeated design decisions; use raw values for component-specific geometry when appropriate.**

Do not change an existing value solely to make it fit the spacing scale if doing so would alter the design.

---

# 9. Layout

## Main content width

```css
var(--content-width)
```

Current value:

```text
1200px
```

Used for major application content and large layouts.

## Wide content

```css
var(--content-width-wide)
```

Current value:

```text
1000px
```

Used for wide visual or interactive content.

## Text content

```css
var(--content-width-text)
```

Current value:

```text
768px
```

Used to keep readable text from becoming excessively wide.

## Page gutter

```css
var(--page-gutter)
```

Current value:

```css
clamp(24px, 5vw, 64px)
```

Used for responsive horizontal spacing against the viewport.

This is particularly useful for full-width components such as the navbar, hero, and footer.

---

# 10. Borders and Radii

## Border

```css
var(--border-width)
```

Standard border width:

```text
1px
```

HalfMind generally favors thin borders.

## Radius

| Token         | Value | Usage                    |
| ------------- | ----: | ------------------------ |
| `--radius-sm` | `2px` | Tiny technical UI        |
| `--radius-md` | `4px` | Standard controls        |
| `--radius-lg` | `8px` | Softer/larger components |

The design should generally remain restrained in its use of rounded corners.

Avoid introducing large pill-shaped elements unless the component specifically calls for them.

---

# 11. Shadows

Shadows should be used sparingly.

| Token         | Usage                         |
| ------------- | ----------------------------- |
| `--shadow-sm` | Small floating elements       |
| `--shadow-md` | Cards, menus, floating panels |
| `--shadow-lg` | Modals and major overlays     |

HalfMind relies more heavily on **contrast, spacing, and borders** than on shadows.

---

# 12. Transitions

| Token                 | Value        | Usage                   |
| --------------------- | ------------ | ----------------------- |
| `--transition-fast`   | `0.15s ease` | Small visual feedback   |
| `--transition-normal` | `0.2s ease`  | Buttons, links, borders |
| `--transition-slow`   | `0.3s ease`  | Larger UI movement      |

Interactive states should feel subtle rather than animated for decoration.

---

# 13. Navbar

The navbar uses:

* Dark application background
* Thin bottom border
* Serif italic HalfMind branding
* Monospace navigation/actions
* Minimal spacing
* Restrained bordered registration action

The navbar should remain visually quiet.

The primary navigation hierarchy is:

```text
HalfMind → brand
Log In → secondary action
Get Started! → primary navigation action
```

On smaller screens, spacing and typography are reduced while preserving the same hierarchy.

---

# 14. Hero

The landing-page hero is the primary editorial/marketing section.

It uses:

* Large serif display heading
* Monospace technical metadata
* Uppercase technical label
* Sans-serif supporting description
* Minimal primary/secondary actions
* Large vertical whitespace
* Responsive viewport gutters

The hero combines the two main sides of HalfMind's identity:

```text
Editorial / human
        +
Technical / system-oriented
```

### Hero hierarchy

```text
Technical label
        ↓
Large serif headline
        ↓
Supporting description
        ↓
Primary + secondary actions
```

Technical metadata is intentionally low contrast and should not compete with the main headline.

---

# 15. Buttons and Actions

Primary actions use:

* High-contrast white background
* Dark text
* Thin border
* Monospace uppercase typography

Secondary actions use:

* Transparent background
* Subtle border
* White/high-emphasis text

Buttons should generally use:

```css
font-family: var(--font-mono);
text-transform: uppercase;
letter-spacing: var(--tracking-wide);
```

Avoid excessive rounded corners or heavy gradients.

---

# 16. Footer

The footer is intentionally quiet.

It uses:

* Thin top border
* Monospace typography
* Primary brand text
* Muted navigation links
* Subtle metadata

The footer hierarchy is:

```text
Brand → Navigation → Metadata
```

Metadata should use:

```css
var(--color-text-subtle)
```

rather than a border token.

---

# 17. Responsive Design

The frontend currently uses responsive breakpoints primarily around:

```text
640px
768px
1024px
```

These are used where component behavior actually changes.

Responsive design should prioritize:

1. Preserving hierarchy
2. Maintaining readable spacing
3. Preventing horizontal overflow
4. Keeping interactive elements usable
5. Reducing typography where necessary

Do not introduce breakpoint-specific changes unless the layout actually requires them.

---

# 18. Component Ownership

Each component should own its styling.

For example:

```text
Navbar.tsx
Navbar.css

Hero.tsx
Hero.css

Footer.tsx
Footer.css
```

Global files should remain focused.

### `tokens.css`

Defines the design system.

### `index.css`

Defines global application/browser foundations.

### Component CSS

Defines component-specific presentation.

Avoid putting component-specific styles into `index.css`.

---

# 19. Hardcoded Values

Hardcoded CSS values are not automatically bad.

### Good candidates for tokens

Repeated:

* Colors
* Typography
* Spacing
* Borders
* Radii
* Transitions
* Layout widths

### Good candidates for explicit values

Component-specific:

* Image dimensions
* Artwork positioning
* Transform values
* Unique offsets
* Geometry calculations
* Values that have no meaningful reuse

The goal is not to eliminate every number from CSS.

The goal is to make **repeated design decisions consistent**.

---

# 20. Design Rules

### Prefer

* Neutral dark backgrounds
* Thin borders
* High-quality typography
* Serif/monospace contrast
* Restrained accent usage
* Generous whitespace
* Clear hierarchy
* Subtle transitions
* Consistent spacing
* Semantic design tokens

### Avoid

* Excessive gradients
* Excessive purple
* Large decorative shadows
* Generic SaaS card layouts everywhere
* Excessive rounded corners
* Random font families
* Arbitrary colors
* Unnecessary animation
* Creating tokens for one-off values
* Changing established visual values solely to fit the token scale

---

# 21. Source of Truth

When styling a new component:

1. Check `tokens.css`.
2. Reuse an existing token if it represents the design decision.
3. Check existing components for established patterns.
4. Keep component-specific geometry local to the component.
5. Only introduce a new token when the design decision is genuinely reusable.
6. Update this style guide when a new global design rule is intentionally introduced.

The implementation remains the final source of truth for actual values:

```text
frontend/src/styles/tokens.css
```

This document explains **how and why those values should be used**.
