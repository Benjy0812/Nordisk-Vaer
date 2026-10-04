# Nordisk Vær

En enkel SPA nettside som henter værdata fra MET Norway og viser dem på en oversiktlig måte. Skriv inn et sted og se været akkurat nå.

## Funksjoner

- Søk etter sted. Stedsnavnet blir sendt til Nominatim og får bredde og lengdegrad som blir brukt for å hente værdata fra MET API
- Viser temperatur, trykk, luftfuktighet, skydekke, vind og (værsymbol ikke ferdig)
- Bytt mellom Celsius og Fahrenheit uten å søke på nytt
- Vindretningspil på canvas
- Feilmeldinger vises inline, og ingen falske data før første søk

## Kom i gang

Krav:

- Bun

Installer dependencies:

```bash
bun install
```

Start dev server:

```bash
bun run dev
```

Bygg for produksjon:

```bash
bun run build
```

Formatering:

```bash
bun run format
```

## Hvordan det virker

1. Stedsnavnet sendes til Nominatim, som svarer med bredde og lengdegrad.
2. Koordinatene sendes til MET Locationforecast, som svarer med værdata.
3. `src/ui.js` viser verdiene på siden.

Se `ROADMAP.md` for hva som gjenstår før v1.0.

## Om AI-bruk

Jeg bruker AI til repetitive oppgaver og som lærehjelp. Jeg skriver alt selv ingenting kopieres inn uforstått. Alt er gjennomgått av meg før det committes.

## Lisens

Dette prosjektet bruker tre forskjellige lisenser. Koden er min, dataene er ikke.

- Koden i dette prosjektet: MIT se [LICENSE](LICENSE)
- Værdata fra MET Norway: NLOD 2.0 og CC BY 4.0
- Stedsdata fra OpenStreetMap: ODbL

### MET Norway

Værdata fra [MET Norway](https://www.met.no), lisensiert under NLOD 2.0 og CC BY 4.0.

### OpenStreetMap

Stedssøk via [Nominatim](https://nominatim.openstreetmap.org). Stedsdata er &copy; [OpenStreetMap-bidragsytere](https://www.openstreetmap.org/copyright), lisensiert under ODbL.

Ved videre bruk gjelder [Nominatims brukspolicy](https://operations.osmfoundation.org/policies/nominatim/): maks 1 forespørsel per sekund, kun brukerutløste søk, ingen autocomplete eller bulk-geokoding.
