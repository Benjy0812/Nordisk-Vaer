# Norsk Bokmål dictionaries (Hunspell)

- `nb_NO.dic` — 708,615 words, UTF-8, first line is the entry count (Hunspell format)
- `nb_NO.aff` — affix/compound rules (`SET UTF-8`, `COMPOUNDFLAG z`, `COMPOUNDMIN 4`)

Source: `LibreOffice/dictionaries`, `no/` (`master` branch).
Upstream: https://github.com/LibreOffice/dictionaries/tree/master/no

Word list is pre-expanded: common joined words (sammensatte ord) such as
`værvarsel`, `værmelding`, `trafikkork` are listed explicitly.

Do not re-sort or reformat these files. The `.dic` body (after line 1)
is upstream-sorted; the `.aff` rule order is load-bearing for Hunspell.

License: GNU GPL v2 (see `no/COPYING` upstream, package `dict-no` v3.0,
maintainer Lars Bungum, origin spell-norwegian project).
These two files are GPL-2.0, separate from the project's MIT code.
