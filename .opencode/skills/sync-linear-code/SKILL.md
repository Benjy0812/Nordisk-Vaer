---
name: sync-linear-code
description: Use when the user asks to compare Linear issues against the code — what is done, what is still open, or what to work on next. Also use when they ask to mark, update, or check issue statuses.
---

# Sync Linear Code

Check Linear issue statuses against what the code actually does, then
propose the moves. The agent has write access to Linear, but never moves an
issue without asking first — the user's answer is what authorises the change.

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
- Status drift from team renames (IDs change prefix when a team is renamed)

## Report two lists

1. **Done in Linear, checked against code** — confirm each with evidence,
   or flag mismatches immediately.
2. **Done in code, not Done in Linear** — with file:line evidence per item.

## Offer the moves

Do not stop at the report. Close with a direct question naming the exact
IDs and the exact target status, so the user can answer with one word:

> `BEN-70` and `BEN-99` are done in the code but still Todo.
> Shall I mark both Done?

Then stop. Report the finding, ask, and wait for the answer. Do not treat
the original request to run the sync as permission to move anything, and
do not bundle the moves into the same turn as the report.

The same pattern applies to In Progress: if work has clearly started,
offer to move it and wait.

## Moving issues

- Ask first, always: exact IDs plus target status, then wait for a yes.
- Move only what the user named in their reply. No opportunistic changes,
  even for issues that obviously look done.
- After moving, list what changed and what was left alone.
- Never close an issue whose Done is unverified, and never open a
  discussion you cannot support with code evidence.

## Suggest next work

Order by: finish In Progress first, coupled UI behaviors together, quick
wins (one-liners) before epics. Never invent issue IDs and never claim
code you have not read.
