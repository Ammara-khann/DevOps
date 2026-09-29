# Bloom — UI/UX Guide

A small, calm to-do list for one task at a time. This document captures the design system, interaction patterns, and rationale behind Bloom's interface so the look and feel stay consistent as the project grows.

---

## 1. Design Principles

- **Calm over busy.** One card, one focus. No dashboards, no clutter.
- **Soft, not saccharine.** Pink is the accent, not the whole palette — most of the UI is neutral cream and plum text.
- **Small delights.** Micro-interactions (bloom-in animation, checkmark fill, hover-reveal delete) reward the user without demanding attention.
- **Forgiving.** Every destructive action (delete, clear done) is low-friction to reach but never automatic or accidental.

---

## 2. Color System

| Token | Hex | Usage |
|---|---|---|
| `--blush` | `#FBEEF2` | Page background |
| `--card` | `#FFF8FA` | Card surface |
| `--rose` | `#D6487A` | Primary accent — buttons, active states, links |
| `--rose-deep` | `#B23360` | Hover/pressed states, strong accent |
| `--petal` | `#F6C9D9` | Borders, dividers, decorative accents |
| `--petal-light` | `#FBE3EC` | Hover fills, soft background washes |
| `--plum` | `#3E2430` | Primary text |
| `--plum-soft` | `#8A6673` | Secondary/muted text |
| `--line` | `#EFCADA` | Hairline dividers, input borders |

**Contrast notes:** `--plum` on `--card`/`--blush` passes WCAG AA for body text. `--rose` on white passes AA for large text/icons but should not be used for small body copy.

---

## 3. Typography

| Role | Font stack | Notes |
|---|---|---|
| Display (`h1`) | Georgia, Iowan Old Style, Palatino Linotype, serif | Italic, regular weight — gives the wordmark a handwritten warmth |
| Body / UI | -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif | All buttons, labels, inputs |

**Scale:**
- H1 (logo): 40px / 34px on mobile, line-height 1
- Eyebrow label: 12.5px, letter-spacing 0.03em
- Body / task text: 15px, line-height 1.4
- Meta text (count, filters, footer): 12.5–13px

---

## 4. Spacing & Layout

- Card max-width: **420px**, centered in viewport
- Card padding: `30px 28px 22px` (desktop) → `24px 18px 18px` (≤420px)
- Base radius: **18px** on the card, **12px** on inputs/buttons, **10px** on the filter pill group
- Vertical rhythm: 22px between header and form, 20px between form and list, 18px above footer

**Elevation:** a single soft, warm-toned shadow (`rgba(178,51,96,0.35)` blurred) — no harsh drop shadows anywhere else in the UI.

---

## 5. Components

### 5.1 Add-task bar
- Text input + circular "+" button, side by side
- Input: white fill, 1.5px `--line` border → focuses to `--rose` border with a soft glow ring
- Button: solid `--rose`, darkens to `--rose-deep` on hover, scales down slightly on press (tactile feedback)

### 5.2 Task row
- Checkbox (circle) → label → delete icon, left to right
- Unchecked: outlined circle in `--rose`
- Checked: fills solid `--rose`, white checkmark fades in, label gets a soft strikethrough in `--petal`
- Delete icon is **hidden until hover** to reduce visual noise — appears only when the user's attention is already on that row
- New rows animate in with a subtle upward fade ("bloom-in")

### 5.3 Empty state
- Italic serif line, centered, muted plum-soft color
- Changes copy contextually: encouraging message when the whole list is empty vs. a neutral "nothing in this view" when a filter hides everything

### 5.4 Filters
- Segmented pill control (All / Active / Done)
- Active filter: white background, `--rose-deep` text, soft shadow — mimics a physical toggle
- Inactive: transparent, muted text, hover shifts text color only (no background change) to keep it subtle

### 5.5 Footer
- Left: live task count ("N left")
- Center: filter pills
- Right: "Clear done" text-link, underlined in `--petal`, only visually meaningful once completed tasks exist (JS toggles visibility)

---

## 6. Interaction & Motion

| Interaction | Behavior |
|---|---|
| Add task | Enter or tap "+" → row animates in at top of list, input clears and refocuses |
| Complete task | Tap circle → fills + checkmark fades in (~120ms), label strikes through |
| Delete task | Hover reveals delete icon → tap removes row immediately (no undo — kept intentionally lightweight) |
| Filter | Tap pill → list re-renders instantly, active pill state updates |
| Clear done | Tap → removes all completed rows at once |
| Reduced motion | All entrance animation is disabled via `prefers-reduced-motion` |

Motion is short (≤200ms) and eases in — nothing bounces or overshoots, keeping the "calm" principle intact.

---

## 7. Accessibility

- All icon-only buttons (`add`, `check`, `delete`) have `aria-label`s
- Checkbox exposes state via `aria-pressed`
- Filter group uses `role="group"` with an `aria-label`
- Focus states use a visible 2px `--rose-deep` outline (`:focus-visible`) — never removed, only restyled
- Color is never the only signal: completed tasks also get a strikethrough, not just a color change
- Reduced-motion preference is respected

---

## 8. Responsive Behavior

- Single breakpoint at **420px**: card padding tightens and the H1 shrinks from 40px → 34px
- Layout otherwise stays identical — this is a single-column, single-card app by design, so there's no grid to reflow

---

## 9. Content & Voice

- Copy is warm, brief, and slightly poetic ("the day is still a blank stem") without becoming twee in functional labels (buttons stay plain: "Clear done," not "Tidy up ✨")
- Placeholder text asks a question ("What needs doing today?") rather than issuing an instruction, to keep the tone conversational

---

## 10. Future Considerations

- **Undo for delete** — currently instant/irreversible; a toast-based undo would reduce risk without adding visual weight
- **Drag-to-reorder** — would need a drag handle affordance consistent with the existing minimal icon set
- **Dark mode** — would require a parallel token set (e.g., deep plum background, muted rose accent) rather than simply inverting lightness, to preserve the warm feel
- **Persistence beyond localStorage** — sync indicator would need a very quiet visual treatment to match the app's low-noise footer
