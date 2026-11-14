---
name: sync-linear-code
description: Compare Linear issues against the code to find what is done and what is still open, or check, mark, or update issue statuses. For picking what to work on next, use start-issue.
model: opus
---

# Sync Linear Code

Check Linear issue statuses against what the code actually does, then
propose the moves. Claude has write access to Linear (`save_issue`), but never
moves an issue without asking first — the user's answer is what authorises the
change.

## Inspect

List the project's issues with `mcp__linear-server__list_issues` (`project:
Nordisk-Vaer`, team `BEN`, `limit` 250, follow `cursor` while `hasNextPage`). Large results get saved to
a file: extract only id, status, and title with `jq` instead of reading the
whole dump. Skip completed and canceled issues unless verifying Dones.

Read the current code files the issues touch (`src/*.js`, `index.html`).
Trust the code on disk over issue descriptions and over memory.

## Verify every Done

For each issue marked Done/Completed in Linear, confirm it in code with
file and line evidence. One unverified Done is worth less than ten open
honest Todos. Watch for:

- Claims that were true once but regressed (placeholders re-added, typo back)
- Partial completions (a check exists but is not wired into `bun run check`
  or CI — report as half-done)

## Report two lists

1. **Done in Linear, checked against code** — confirm each with evidence,
   or flag mismatches immediately.
2. **Done in code, not Done in Linear** — with file:line evidence per item.

## Offer the moves

Do not stop at the report. Turn it into a table of proposed moves, one row
per issue whose Linear status differs from what the code shows:

| Issue | Title | Now  | Proposed    | Evidence                              |
| ----- | ----- | ---- | ----------- | ------------------------------------- |
| BEN-x | ...   | Todo | Done        | `src/a.js:12`                         |
| BEN-y | ...   | Todo | In Progress | `src/b.js:30` (started, not wired up) |

Rules for what may appear in the table:

- **Done** only when the code does everything the issue says, confirmed with
  file:line evidence. If the code does less than the issue says, it is not
  Done. If it is partly there, propose **In Progress** instead, and say what
  is missing. Never ask the user to approve a Done the code does not back up.
- **In Progress** when work has clearly started but is not finished.
- A Done in Linear that the code no longer backs up goes in the report as a
  mismatch. Propose moving it back (e.g. In Progress) in the table, never
  leave it silently.
- Leave out issues that already match the code. Name every ID in the table,
  never "the rest".

Close with one question under the table:

> Continue and mark these? Answer **yes**, or tell me what is wrong or what
> you are unsure about.

Only a clear yes authorises the moves. Silence, a question back, or a reply
naming different issues is not approval. If the user says a row is wrong or
they are unsure, re-check that row in the code, fix the table, and ask again.
Move nothing until a yes.

Then stop and wait. The original request to run the sync is not permission to
move anything, and the moves never go in the same turn as the table.

## Moving issues

- No yes, no move, even when the status is obviously right.
- After a yes, move exactly the rows in the table, nothing else. If the user
  corrected a row, move it as corrected.
- After moving, list what changed and what was left alone.
- Never close an issue whose Done is unverified, and never open a
  discussion you cannot support with code evidence.

## Suggest next work

Order by: finish In Progress first, coupled UI behaviors together, quick
wins (one-liners) before epics. Never invent issue IDs and never claim
code you have not read.
