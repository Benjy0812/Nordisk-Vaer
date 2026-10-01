---
name: Smart Commit
description: Group changed files into logical commits by dependency and similarity, then commit each group separately
---

# Smart Commit

Split working-tree changes into one logical change per commit instead of
one big commit. Two files belong in the same commit when they are **used by
each other** or their changes are **nearly identical**.

## 1. Survey

Run from the repo root:

```sh
git status --short
git diff --stat
git diff
```

Include untracked files with `git status` output. Never commit files the
user did not ask about (secrets, `.env`, unrelated scratch files) — ask
first.

## 2. Group

Build groups using these rules, in order:

1. **Used by each other → same commit.** A HTML element ID referenced in
   JS (`index.html` ↔ `src/*.js`), an import pair (`main.js` → `ui.js`),
   config consumed by code (`vite.config.js` ↔ build output). Changing one
   side without the other breaks the build, so they commit together.
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

## 4. Message style

Match this repo: short imperative, no prefix, no scope.

- Good: `Show initial search message`, `Replace custom shadow with shadow-md`
- Bad: `feat(ui): ...`, `fixed stuff`, `WIP`

One behavior per message. If a message needs "and", it is probably two
commits.

## 5. Verify per group

After staging each group (`git add <files>`), run the cheapest relevant
check before committing — at minimum `bun run build` for code/UI/config
changes, `bun run format:check` for formatting. Stage, verify, commit,
repeat for the next group.
