# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `bun run check` is the full gate: build, `bun test`, eslint, cspell, prettier. Run it before committing.
- Always bun, never npm.

## Working style

- This is a learning project. The user types the code; follow `.claude/skills/learn-by-doing` and do not write finished code into `src/**` or `index.html` unless the change is mechanical.
- For any commit request, use the `smart-commit` skill.
- Linear: project `Nordisk-Vaer`, team `BEN`. Never move an issue without a clear yes (see `sync-linear-code`).

## Gotchas

- Element IDs in `index.html` are a contract with `getElementById` in `src/*.js`. Do not rename them.
- User-facing text is Norwegian; code comments are English.
- Prettier: no semicolons, single quotes, 80 columns.
- Nominatim allows 1 request per second and only user-triggered searches. Never call Nominatim or MET from tests or casual checks.
