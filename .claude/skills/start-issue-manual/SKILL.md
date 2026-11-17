---
name: start-issue-manual
description: Practice mode of start-issue. Picks the issue and retells it like a friend, then the user plans the first step before Claude shows its own plan. Use when the user says "start-issue-manual", "start BEN-n manually", or "let me plan BEN-n first". Never moves the issue.
model: sonnet
---

# Start Issue (manual)

Same job as `start-issue`, but the user plans first. Read-only against
Linear.

## 1. Prepare in silence

Do steps 1 to 3 of `.claude/skills/start-issue/SKILL.md`: find the issue,
read it fully, look at the code. Build your own plan in the
`start-issue` step 4 shape, but do not show it yet. "In silence" covers
only the plan: if the user said "next", still offer the pick and wait.

## 2. Retell the issue

Explain the issue like a friend reading it aloud, in a few short
paragraphs:

- What it asks, in plain words. Explain any term the user may not know.
- Why it matters for someone using the app.
- What the comments add or change.
- Blockers or related issues, if any.
- One or two small useful facts: a browser behavior, a gotcha from
  `CLAUDE.md`, or which feature it touches (by name, not by file).

Do not give the first step, a `file:line`, or code. Those are the
user's job.

## 3. User goes first

Ask the user to write three lines:

- **Goal** — one sentence.
- **First step** — one edit, with the file (a line number is a bonus).
- **Done when** — an observable check.

Then stop and wait.

## 4. Compare

Show your plan from step 1 next to theirs. For each line, say what
matches and what they missed, with `file:line` evidence. Be direct; do
not praise. If their plan is better, say so and use it.

Give the branch name (`gitBranchName`). The user creates it with
`git switch -c <name>`. Check `git status --short` first. If work is
uncommitted, offer `smart-commit` or staying on the current branch. Never
stash or reset.

Then stop. The user types the code under `learn-by-doing` rules.
