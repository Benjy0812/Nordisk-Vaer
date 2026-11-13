---
name: a11y-check
description: Check the page for accessibility problems and report them with file:line evidence. Use for keyboard focus, contrast, screen reader announcements, form labels, or the accessibility milestone (BEN-32, BEN-63, BEN-65, BEN-66). Reports only; fixes go through learn-by-doing.
model: sonnet
---

# A11y Check

Audit `index.html`, `style.css`, and `src/ui.js`/`src/main.js` against the
list below. Report findings; do not fix silently. Each finding gets
`file:line`, the problem, and the smallest fix as a one-line description.

## Checklist

**Structure and labels**

- `<html lang="no">` is set and matches the visible text.
- Every input and select has a `<label for>` that matches its `id`.
- One `<h1>`; headings do not skip levels.
- Buttons are `<button>`, not clickable divs.

**Announcements (BEN-66)**

- Loading, info, and error messages sit in elements with `role="alert"`
  or `aria-live`. `role="alert"` interrupts: use it for errors, and
  `role="status"`/`aria-live="polite"` for loading and info.
- Messages are in the DOM before their text changes. A region inserted
  together with its text is often not announced.
- Showing/hiding uses the `hidden` attribute, not only colour.
- Meaning is never colour alone: states need text or an icon too.

**Keyboard (BEN-63)**

- Tab reaches every control in a sensible order; Enter submits the form.
- Focus is visible on input, button, and select. Flag any
  `outline: none` / `outline-none` without a replacement ring.
- Controls disabled during a search (BEN-40) are not the only way the
  user learns something is happening.

**Contrast (BEN-65)**

- Normal text needs 4.5:1, large text (18.66px bold or 24px) 3:1, UI
  borders and focus rings 3:1.
- Check actual Tailwind colours in use, e.g. `text-blue-600` on
  `bg-blue-500/25`; translucent backgrounds depend on the page colour, so
  compute against the real background.
- Placeholder text is not a label and often fails contrast.

**Responsive**

- Viewport meta is present; no fixed widths that force horizontal scroll
  at about 390px.
- Tap targets are at least 24px, ideally 44px.

## How to check

1. Read the files and grep for the patterns above.
2. Compute contrast ratios from the hex values; show the numbers.
3. For live checks, ask the user to run a keyboard-only pass and report
   what they see. Do not fire live weather requests for testing.

## Report

Group by severity: **Hindrer bruk** (no keyboard path, unannounced errors),
**Bør fikses** (contrast, missing focus ring), **Fint å ha**. Map each to
its Linear issue when one exists (`BEN-63`, `BEN-65`, `BEN-66`).
End with the single most valuable fix to do first.

Write the report in Norwegian prose with English technical terms, like
`learn-by-doing`.
