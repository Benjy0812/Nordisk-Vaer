---
name: start-issue
description: Start work on a Linear issue. Reads the issue and its comments, shows the branch name, and proposes the smallest first step. Use when the user says "start BEN-n", "let's work on BEN-n", or "pick up the next issue". Never moves the issue.
model: sonnet
---

# Start Issue

Turn a Linear issue into a concrete, small first step. Read-only against
Linear: moving statuses belongs to `sync-linear-code`, and teaching the code
belongs to `learn-by-doing`.

## 1. Find the issue

- User named an ID: use it. Never invent IDs.
- User said "next": list open issues for the project with
  `mcp__linear-server__list_issues` (`project: Nordisk-Vaer`, exclude
  completed and canceled). If the result is saved to a file, extract id,
  priority, status, and title with `jq`. Pick by: In Progress first, then
  High priority, then quick wins before milestone epics. Offer the top
  pick plus one alternative; wait for the answer.

## 2. Read it fully

- `get_issue` (with relations) and `list_comments`. The description is not
  the whole story; comments often change the scope.
- Check the parent milestone issue (`BEN-30` to `BEN-35`) for context.
- Check blockers: if a `blockedBy` issue is open, say so and suggest
  starting there instead.

## 3. Look at the code

Read the files the issue touches (`src/*.js`, `index.html`). Trust the code
on disk over the issue text. If it looks already done, say so with
`file:line` evidence and suggest `sync-linear-code`. Do not move it.

For an error-handling issue, list each failure path and the branch that
handles it (`file:line`) before you propose a step.

Name side findings as possible new issues. Do not create them, and do not
add them to this issue's scope.

## 4. Present the start

Keep it to this shape:

- **Goal** — one sentence, plain words.
- **Branch** — the issue's `gitBranchName` from Linear. Create it only
  after the user says yes, and never on top of uncommitted work: check
  `git status --short` first. If anything is modified, offer `smart-commit`
  or staying on the current branch; never stash or reset.
- **Smallest first step** — one edit, with `file:line`.
- **Done when** — the observable check from the issue's acceptance
  criteria, or one you propose.
- **Related issues** — coupled ones to do in the same sitting (e.g. a
  loading state and a disabled button).

Then stop. Hand the step to `learn-by-doing` rules: the user types it.
