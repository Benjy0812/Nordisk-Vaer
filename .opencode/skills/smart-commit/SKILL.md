---
name: smart-commit
description: Use when the user asks to commit, split a commit, or write commit messages. Group changed files into logical commits by dependency and similarity, then commit each group separately.
---

# Smart Commit

Split working-tree changes into one logical change per commit instead of
one big commit. Inspect, group, verify, commit, report. Keep it simple.

## 1. Inspect

Run from the repo root:

```sh
git status --short
git diff --stat
git log --oneline -5
```

First column = staged, second = unstaged. A `D` or `M` in the first column was
staged by someone else — never commit staged surprises blindly. Check with
`git diff --cached`. Include untracked files in the survey. Never commit files
the user did not ask about (secrets, `.env`, unrelated scratch files).

## 2. Group

Build groups using these rules, in order:

1. **Used by each other → same commit.** A HTML element ID referenced in
   JS (`index.html` ↔ `src/*.js`), an import pair (`main.js` → `ui.js`),
   config consumed by code. Changing one side without the other breaks the
   build, so they commit together.
2. **Nearly identical → same commit.** The same mechanical edit repeated
   across files or hunks: a class rename in 6 places, placeholder text
   cleared from 6 tags, typo fixed in 3 files. One commit, even if the
   files are otherwise unrelated.
3. **Unrelated concerns → separate commits.** Docs, dictionary data,
   config, UI, and logic each get their own commit. When in doubt, split.
4. **Order commits foundation-first:** config/data → logic → UI/docs, so
   each commit leaves the tree working.

## 3. Propose before committing

List the planned groups with files and a draft message per group, then
wait for approval. Never push. Commit only after the user approves the
plan (or explicitly asked for auto-commit).

**If the user scopes the request** ("commit only X", "just the README",
"only that file"), treat it as the complete plan: no proposal round, no
mention of other changed or untracked files. Touch nothing else — not even
in the report. Scope means scope.

## 4. Message style

Match this repo: short imperative, no prefix, no scope.

- Good: `Show initial search message`, `Replace custom shadow with shadow-md`
- Bad: `feat(ui): ...`, `fixed stuff`, `WIP`

One behavior per message. If a message needs "and", it is probably two
commits. A stranger reading the log should understand every message — no
insider references, no backstory only you know. Add `Refs: GIT-n` when the
commit advances a Linear issue — never invent IDs.

## 5. Verify per group

After staging each group (`git add <files>`), run the cheapest relevant
check before committing — at minimum `bun run build` for code/UI/config
changes, `bunx prettier --check <files>` for formatting. Both must pass.
Always bun, no npm variants. Prettier failing right after a checkout
usually means CRLF — fix with `prettier --write`, never commit
line-ending noise. Stage, verify, commit, repeat for the next group.

## 6. Split

`amend` cannot split — it only edits the tip. Unmake and re-commit with
staged patches:

```sh
git reset --soft HEAD~1
git restore --staged <file>
```

Local unpushed commits only. Never `--hard`, `--force`, or push unasked.

## 7. Report

Show `git log --oneline -3` and `git status --short`. Name what's left out
and why. Flag anything odd (mystery deletions, untracked files).
