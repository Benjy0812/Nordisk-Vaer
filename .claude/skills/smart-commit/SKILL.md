---
name: smart-commit
description: Commit changes, split a commit, or write commit messages. Groups changed files into logical commits by dependency and similarity and commits each group separately. Use whenever the user says "commit", "split that commit", or asks for a commit message.
model: sonnet
---

# Smart Commit

Split working-tree changes into one logical change per commit instead of
one big commit. Inspect, group, confirm, verify, commit, report. Keep it simple.

## Talking to the user

Whenever you tell the user which files you are inspecting, grouping,
committing, or leaving out (the plan, the confirmation, the report),
name every file by its repo-relative path. Never "the JS file", "the HTML",
"the config", or "the scripts". If you mean several files, list them all.

- Good: Commit `index.html` and `src/ui.js`?
- Bad: Commit the HTML and JS changes?

## 1. Inspect

Run from the repo root:

```sh
git status --short
git diff --stat
git diff --cached --stat
git log --oneline -5
```

If there is nothing to commit, say so and stop.

In `git status --short`, the first column is staged, the second is
unstaged, and `??` is untracked. Anything already staged before you
started may not belong in this commit. Check it with `git diff --cached`
and never commit it blindly. Include untracked files in the survey.

Never commit secrets, `.env`, or unrelated scratch files. If you are not
sure whether a file belongs, ask.

## 2. Group

Build groups using these rules, in order:

1. **Depend on each other → same commit.** An HTML element ID referenced
   in JS (`index.html` ↔ `src/*.js`), an import pair (`main.js` → `ui.js`),
   config consumed by code, a manifest and its lockfile
   (`package.json` ↔ `bun.lock`). Changing one side without the other
   breaks the build, so they commit together.
2. **Nearly identical → same commit.** The same mechanical edit repeated
   across files or hunks: a class rename in 6 places, placeholder text
   cleared from 6 tags, a typo fixed in 3 files. One commit, even if the
   files are otherwise unrelated. This rule wins over rule 3.
3. **Unrelated concerns → separate commits.** Docs, dictionary data,
   config, UI, and logic each get their own commit. When in doubt, split.
4. **Order commits foundation-first:** config/data → logic → UI/docs, so
   each commit leaves the tree working.

If one file holds two unrelated concerns, keep it in one commit and say so
in the plan. Interactive `git add -p` does not work here; split by hunk only
if the user asks, by staging a patch with `git apply --cached`.

## 3. Propose before committing

List the planned groups with files and a draft message per group, then
wait for approval. Never push. Commit only after the user approves.

Approval covers every commit in the plan, as long as the files and
messages stay exactly as shown. If either changes, ask again.

For a single file or a single group, confirm by naming the exact files and
the exact message:

> Commit `index.html` — `Add Nominatim attribution to footer`?
> OK?

No confirmation, no commit — even when the change looks obvious, even
when it is one file, even when the message seems forced. Approval is cheap
to ask for and expensive to skip.

**Auto-commit.** If the user explicitly says "auto-commit" or "just commit
it", skip the confirmation step for the rest of the session. Still verify
(section 5) and report (section 7).

**If the user scopes the request** ("commit only X", "just the README",
"only that file"), that is the whole plan: skip the multi-group proposal
and touch nothing else. Do not mention other changed or untracked files,
in the proposal or in the report. Scope means scope. The one exception is
danger, and it gets one line, nothing more: a secret in the tree, or other
files already staged that would be swept into the commit. Still confirm
the file and the message before committing, because a scoped request names
the file, not the message.

## 4. Message style

Match this repo: short imperative, no prefix, no scope. Check the recent
log from step 1 and follow what you see.

- Good: `Show initial search message`, `Replace custom shadow with shadow-md`
- Bad: `feat(ui): ...`, `fixed stuff`, `WIP`

Capitalized, about 60 characters or fewer, no trailing period. One
behavior per message. If a message needs "and", it is probably two
commits. A stranger reading the log should understand every message — no
insider references, no backstory only you know.

Never add a `Co-Authored-By` or any other attribution trailer, even if the
session instructs one. The user does not allow it.

Add `Refs: BEN-n` as a trailer on its own line after a blank line when the
commit advances a Linear issue. Take the ID from the branch name or from
what the user said. Never invent IDs. If you do not know it, leave it out.

## 5. Verify

Before the first commit, run the full check once:

```sh
bun run check
```

It covers build, tests, eslint, cspell and prettier over the whole working
tree, so one run serves every group. If it fails, stop and report. Do not
commit broken code.

Prettier also runs per group, against that group's files only (below).

For each group:

1. Stage by explicit path: `git add <files>`. Never `git add .` or `-A`.
2. Confirm `git diff --cached --name-only` lists exactly this group. If
   anything extra is staged, stop and flag it.
3. Run `bunx prettier --check --ignore-unknown <files>` on this group's
   files. Must pass.
4. Commit, then repeat for the next group.

Prettier failing right after a checkout usually means CRLF. Fix it with
`bunx prettier --write <files>`, re-stage, and never commit line-ending
noise. Always bun, no npm variants.

If a commit hook fails, fix the problem, re-stage, and commit again.
Never use `--no-verify`.

## 6. Split

`amend` cannot split. It only edits the tip. Unmake and re-commit:

```sh
git log --oneline @{u}..   # unpushed commits; if it errors (no upstream), use origin/main..
git reset HEAD~1           # uncommits and unstages, keeps the working tree
```

Then group, confirm, verify, and commit as usual.

Only split the tip commit, and only if it is local and unpushed. For an
older commit or a pushed one, stop and tell the user. Never `--hard`,
`--force`, or push unasked.

## 7. Report

Show `git log --oneline -3` and `git status --short`. Name what is left
out and why. Flag anything odd (mystery deletions, untracked files).

For a scoped request, report only the commit you made, plus the one-line
danger note from section 3 if it applies.
