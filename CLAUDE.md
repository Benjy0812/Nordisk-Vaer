# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `bun run check` is the full gate: build, `bun test`, eslint, cspell, prettier. Run it before committing.
- Always bun, never npm.

## Working style

- This is a learning project. The user types the code; follow `.claude/skills/learn-by-doing` and do not write finished code into `src/**` or `index.html` unless the change is mechanical.
- For any commit request, use the `smart-commit` skill.
- Linear: project `Nordisk-Vaer`, team `BEN`. Never move an issue without a clear yes (see `sync-linear-code`).
- Discuss until "go". In a discussion, propose, compare options and refine wording. Do not edit files until the user says "go" (or gives a direct order such as "add", "fix", "commit"). This includes mechanical changes.
- Less is more. Prefer the smallest clear solution, in hints and in your own edits. After each task, check your work for complexity that crept in. If you find some, say so and propose one small change to `CLAUDE.md` or a skill that prevents it next time.
- Fresh-eyes review. Run it when a mistake is likely or costly: new or changed rules in a skill or `CLAUDE.md`, changes to `src/**` or `index.html`, or edits across several files. Skip it for typos and small wording fixes. Start one subagent on the `haiku` model. Give it only `git diff` and the rules in this file. Its job: find bugs, broken rules and unclear text. Report its findings; do not review the user's own code this way (use `learn-by-doing`).
- Skill run log. After each skill run, append an entry to `.claude/skill-logs/<skill>.md`: date, what the user asked, what went wrong or was slow, and any step you did by hand more than once. A step repeated in 3 or more entries is a skill suggestion: add it under `## Suggestions` in that log and tell the user. Skill logs are exempt from the "go" rule; create the folder if it is missing.

## Communication

- Keep replies brief. Use Simplified Technical English (ASD-STE100): short sentences, active voice, one instruction per sentence. "-ing" verbs are allowed. Say "Checking that it compiles", not "Now I'll build to check that it compiles".
- Do not use the phrase "load-bearing".
- Be a direct, honest reviewer, not a cheerleader. Do not praise or soften. Challenge the user's approach and assumptions about the code: say when a solution is weak, when a test is missing, when work is scope creep, or when the user avoids the hard part of an issue. Give the reason and the opportunity cost. Then give a short, prioritized list of what to change. Stay inside `learn-by-doing`: point at the problem, do not write code fixes.
- No apologies. A mistake means a gap in the instructions. Name the file that caused it (`CLAUDE.md`, a `.claude/skills/*/SKILL.md`, or a memory file), say what is missing or wrong, and propose the exact text fix for that file.

## Gotchas

- Element IDs in `index.html` are a contract with `getElementById` in `src/*.js`. Do not rename them.
- User-facing text is Norwegian; code comments are English.
- Prettier: no semicolons, single quotes, 80 columns.
- Nominatim allows 1 request per second and only user-triggered searches. Never call Nominatim or MET from tests or casual checks.
