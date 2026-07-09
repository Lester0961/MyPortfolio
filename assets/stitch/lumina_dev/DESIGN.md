---
name: Lumina Dev
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#464555'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#5a5e69'
  on-secondary: '#ffffff'
  secondary-container: '#dee2ef'
  on-secondary-container: '#60646f'
  tertiary: '#7e3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a44100'
  on-tertiary-container: '#ffd2be'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#dee2ef'
  secondary-fixed-dim: '#c2c6d3'
  on-secondary-fixed: '#171c25'
  on-secondary-fixed-variant: '#424751'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb695'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7b2f00'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

This design system is built for a developer portfolio that balances technical precision with a welcoming, approachable personality. The aesthetic is **Neo-Minimalist**, characterized by vast whitespace, high-quality typography, and a "soft professional" atmosphere.

The goal is to evoke a sense of clarity, reliability, and modern craftsmanship. Unlike traditional dark-themed developer sites, this system uses a bright, high-key light mode to emphasize transparency and openness. It relies on subtle depth markers—soft shadows and light blue tinted surfaces—rather than heavy borders or dark dividers to organize content.

## Colors

The palette is rooted in a pure white background to maximize perceived brightness and cleanliness.

- **Primary (#4F46E5):** A vibrant Indigo used exclusively for primary actions, active states, and critical brand highlights.
- **Surface (#F9FAFB):** A very light gray used for section backgrounds to provide a subtle shift from the pure white page background.
- **Accents (#EEF2FF):** A soft blue tint used for card backgrounds and container fills to create a "tech-forward" feel without the harshness of high-contrast borders.
- **Typography:** Deep Slate is reserved for headlines to ensure strong hierarchy, while Gray is used for body text to reduce eye strain on bright backgrounds.

## Typography

The design system utilizes **Inter** for all UI and editorial content to maintain a systematic, neutral look. Weights have been slightly increased for light-mode legibility, specifically targeting semi-bold and bold for headers to ensure they anchor the page against the white background.

For technical content and code snippets, **JetBrains Mono** is introduced as a secondary typeface to provide the necessary "developer" context while remaining legible and modern. Headline tracking is slightly tightened to create a more "editorial" and premium feel.

## Layout & Spacing

The layout follows a **fluid grid** model with a maximum container width of 1200px to ensure readability on ultra-wide monitors. 

- **Spacing Rhythm:** Based on an 8px linear scale. All padding and margins should be multiples of 8 (e.g., 16, 24, 32, 64).
- **Desktop:** A 12-column grid with 24px gutters. Use wide 64px or 80px vertical padding between major sections to emphasize the minimalist aesthetic.
- **Mobile:** Transition to a 4-column grid with 16px margins. Elements should stack vertically, maintaining the same 8px-based rhythm for internal padding.

## Elevation & Depth

This design system avoids heavy borders in favor of **Ambient Shadows** and **Tonal Layering**.

- **Level 0 (Background):** Pure #FFFFFF.
- **Level 1 (Cards/Containers):** Soft blue tint (#EEF2FF) or Surface gray (#F9FAFB) with a very thin (1px) border in a slightly darker shade (#E5E7EB).
- **Level 2 (Elevated):** White background with a soft, diffused shadow: `0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)`.
- **Level 3 (Interactive/Hover):** Increased shadow spread and a slight upward translation (-2px) to simulate physical lift.

## Shapes

The shape language is defined as **Rounded (Level 2)**. 

Standard components like buttons and input fields utilize a 0.5rem (8px) radius. Larger containers, such as project cards or code blocks, should use `rounded-xl` (1.5rem / 24px) to emphasize the "soft" nature of the design system. This avoids the clinical feel of sharp corners while remaining more professional than fully pill-shaped "playful" designs.

## Components

- **Buttons:** Primary buttons use a solid Indigo (#4F46E5) fill with white text. Secondary buttons use the soft blue tint (#EEF2FF) with Indigo text. Both use 8px rounded corners and a medium font weight.
- **Project Cards:** Use a Level 2 elevation (white background + soft shadow). Images within cards should have a subtle 1px inner stroke to define edges against the white card surface.
- **Chips/Tags:** Used for tech stacks (e.g., "React", "TypeScript"). These should have a light gray background (#F3F4F6) and small, uppercase typography for high scannability.
- **Input Fields:** Use the surface color (#F9FAFB) for the fill with a 1px border (#E5E7EB). On focus, the border transitions to Primary Indigo with a soft glow effect.
- **Code Blocks:** Use a slightly darker slate background (#1F2937) to provide a high-contrast focal point within the light UI, utilizing JetBrains Mono for the content.