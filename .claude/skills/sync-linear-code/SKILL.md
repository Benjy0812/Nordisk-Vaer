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

Do not stop at the report. Close with a yes or no question naming the exact
IDs and the exact target status:

> `BEN-x` and `BEN-y` are done in the code but still Todo.
> Shall I mark `BEN-x` and `BEN-y` Done? Answer yes or no.

Name every ID again in the question itself, never "both" or "all of them".

Only a clear yes authorises a move. Never treat silence, a question back, or
a reply naming different issues as approval. If the answer is ambiguous, ask
again and move nothing.

Then stop and wait. The original request to run the sync is not permission
to move anything, and the moves never go in the same turn as the report.
The same applies to In Progress: if work has clearly started, offer the move
and wait.

## Moving issues

- No yes, no move — not even when the status is obviously right.
- Move only what the user named in their reply. No opportunistic changes,
  even for issues that obviously look done.
- After moving, list what changed and what was left alone.
- Never close an issue whose Done is unverified, and never open a
  discussion you cannot support with code evidence.

## Suggest next work

Order by: finish In Progress first, coupled UI behaviors together, quick
wins (one-liners) before epics. Never invent issue IDs and never claim
code you have not read.
