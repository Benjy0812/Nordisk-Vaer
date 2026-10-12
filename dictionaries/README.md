# Norsk Bokmål word lists

These are cspell word lists, not Hunspell dictionaries. cspell reads them via
`cspell.config.js`; nothing else in the project touches this directory.

- `nb_NO.txt` — 708,615 Bokmål words, one per line, UTF-8, sorted upstream
- `custom.txt` — project words that aren't in the Bokmål list (`nominatim`,
  `geokoding`, `temperaturenhet`, `partlycloudy`, …)

Source: `LibreOffice/dictionaries`, `no/` (`master` branch), converted from the
Hunspell `nb_NO.dic` by dropping the entry-count first line.
Upstream: https://github.com/LibreOffice/dictionaries/tree/master/no

Word list is pre-expanded: common joined words (sammensatte ord) such as
`værvarsel`, `værmelding`, `trafikkork` are listed explicitly.

To add a word the Bokmål list lacks, append it to `custom.txt`. Line order
carries no meaning for cspell, so neither file needs sorting — unlike a
Hunspell `.dic`/`.aff` pair, whose rule order is load-bearing.

License: GNU GPL v2 (see `no/COPYING` upstream, package `dict-no` v3.0,
maintainer Lars Bungum, origin spell-norwegian project). `nb_NO.txt` is
GPL-2.0, separate from the project's MIT code.