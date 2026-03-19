

## UI Redesign Plan for Interview Coach

### Current State
The app has three phases (home, practice, results) with a navy + amber theme, DM Sans/DM Serif fonts, and a minimal card-based layout. It works but feels flat and generic.

### New Design Direction
A modern, glassmorphism-inspired design with gradient backgrounds, more visual depth, micro-interactions, and a bolder layout.

### Changes

**1. New Color System & Background (index.css)**
- Replace flat background with a subtle gradient mesh background (deep indigo to slate)
- Add glassmorphism utility classes (backdrop-blur, semi-transparent cards)
- Introduce a vibrant gradient accent (teal-to-violet) for interactive elements
- Add new keyframe animations: slide-in, scale-up, shimmer

**2. Home Screen Redesign (Index.tsx)**
- Full-viewport hero with animated gradient background
- Larger, bolder typography with gradient text for the title
- Category pills redesigned as rounded glassmorphic chips with icons
- Animated "Start Practice" button with gradient background and hover glow effect
- Add a subtle animated pattern or floating shapes in the background

**3. Practice Screen Redesign (QuestionCard.tsx, Timer.tsx, StarGuide.tsx, RatingPanel.tsx)**
- QuestionCard: Glassmorphic card with frosted border, question text larger and bolder
- Timer: Redesign as a sleeker ring with gradient stroke and pulsing glow when low
- StarGuide: Horizontal pill layout instead of grid, with colored letter badges
- RatingPanel: Replace star buttons with larger, animated emoji-style or filled-star buttons with scale-on-hover
- Progress bar: Gradient fill with rounded ends

**4. Results Screen Redesign (ResultsSummary.tsx)**
- Confetti or celebration animation on load
- Large gradient score circle instead of plain text
- Question list as sleek rows with colored rating dots instead of tiny stars
- Gradient "Practice Again" button

**5. Tailwind Config (tailwind.config.ts)**
- Add glassmorphism utilities
- Update animation keyframes
- Add gradient color stops

### Technical Details
- All changes are CSS/component-level — no new dependencies needed
- Existing data model and state management remain unchanged
- All 6 component files + index.css + tailwind.config.ts will be modified

