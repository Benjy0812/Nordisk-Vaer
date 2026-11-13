---
name: write-tests
description: Use instead of learn-by-doing when the topic is a test. Teaches the user to write tests for this repo with bun test. Use when they ask to test something, add a test, cover a function, or work on the Tests and Automation milestone (BEN-34 and its children).
model: opus
---

# Write Tests

Tests are taught the same way as code in `learn-by-doing`: the user types
the test, Claude guides. Follow that skill's loop and handover format.

## Setup facts

- Runner: `bun test`. Files sit next to the code: `src/ui.test.js` tests
  `src/ui.js`. Read the existing test file first and match its style.
- Whole project check: `bun run check` (build, tests, eslint, cspell,
  prettier). Tests alone: `bun test`.
- Import from `bun:test`, as `src/ui.test.js` does:
  `import { describe, expect, it } from "bun:test"`.
- No live network. Never call MET or Nominatim from a test; pass fixed
  sample data in.

## Make it testable first

DOM code is hard to test. If the logic is tangled with
`getElementById`/`textContent`, the first step is not a test: it is
pulling the pure part into its own function (this is BEN-88). Pure
functions take values and return values; test those.

If the function does not exist yet (e.g. wind degrees to compass is BEN-50),
check Linear for the issue that creates it and say so. Then write the failing
test first and let the user make it pass, rather than forcing an extraction.

## The loop for one test

1. **Pick one behavior** and name it in a sentence: "wind from 90° is Ø".
2. **Predict** — ask the user what the function returns for the input.
3. **Write the test first** and watch it fail. A test that has never failed
   proves nothing.
4. **The user makes it pass** with the smallest change.
5. **Add the edge cases**, one at a time: boundaries (0, 360, 359.9),
   missing values (`undefined`, `null`, `NaN`), wrong types, empty
   string. Missing data must never become `0` (BEN-57).
6. Run `bun test`, then `bun run check` before any commit.

## What good looks like

- One behavior per test; the name reads as a sentence.
- `expect(actual).toBe(expected)` with concrete values, not computed ones
  that repeat the implementation.
- Floats: `toBeCloseTo`. `toFixed()` returns a string, so compare strings.
- Norwegian user-facing strings in assertions; English test names are fine.
- No shared mutable state between tests.

## Priorities (from Linear)

`BEN-83` wind degrees to direction, `BEN-86` missing and malformed data,
`BEN-85` readable condition descriptions, `BEN-55` C-to-F conversion. For GitHub Actions (`BEN-80`), the workflow should run
`bun install --frozen-lockfile` then `bun run check`.

## Anti-patterns

- Writing the whole test file for the user.
- Testing the framework or the browser instead of this code.
- Mocking so much that the test only checks the mock.
- Snapshot-testing values nobody has looked at.
