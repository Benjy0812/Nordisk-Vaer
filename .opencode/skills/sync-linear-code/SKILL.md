---
name: sync-linear-code
description: Use when the user asks to compare Linear issues against the code — what is done, what is still open, or what to work on next. Read-only unless moving issues is explicitly requested.
---

# Sync Linear Code

Check Linear issue statuses against what the code actually does. Default is
read-only: report, never move issues. The user marks statuses themselves
unless they explicitly ask otherwise.

## Inspect

List all issues in the project (paginated dumps truncate — delegate
extraction to a subagent, never paste the whole dump):

```sh
# via Linear tools: list_issues with project, limit 250
```

Read the current code files the issues touch (`src/*.js`, `index.html`).
Trust the code on disk over issue descriptions and over memory.

## Verify every Done

For each issue marked Done/Completed in Linear, confirm it in code with
file and line evidence. One unverified Done is worth less than ten open
honest Todos. Watch for:

- Claims that were true once but regressed (placeholders re-added, typo back)
- Partial completions (format exists but lint missing — report as half-done)
- Status drift from team moves (IDs change prefix when issues move teams)

## Report two lists

1. **Done in Linear, checked against code** — confirm each with evidence,
   or flag mismatches immediately.
2. **Done in code, not Done in Linear** — with file:line evidence per item,
   so the user can mark them.

Then suggest next work ordered by: finish In-Progress first, coupled UI
behaviors together, quick wins (one-liners) before epics. Never invent
issue IDs and never claim code you have not read.

## Moving issues

Only with explicit request. Confirm the exact IDs and target status back
to the user first, then move, then show the updated board.
