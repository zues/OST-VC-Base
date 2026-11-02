# Seitentyp: <Name>

<!--
Vorlage für ein MD-File pro Seitentyp (z. B. overview.md, detail.md, profile.md).
Kopieren, umbenennen und alle <Platzhalter> ersetzen. Abschnitte, die nicht passen,
nicht löschen, sondern mit „–“ markieren. So sieht man, dass sie bedacht wurden.
-->

| | |
|---|---|
| **Status** | Entwurf · In Figma · Im Code · Abgeglichen |
| **Route** | `/<pfad>` bzw. `/<pfad>/[slug]` |
| **Datei** | `src/app/<pfad>/page.tsx` |
| **Figma Desktop** | <Frame-Name> (`<node-id>`) |
| **Figma Mobile** | <Frame-Name> (`<node-id>`) |
| **Zuletzt geprüft** | TT.MM.JJJJ |

## Zweck

Wer kommt auf diese Seite, mit welchem Ziel, und was soll danach passieren? Zwei bis drei Sätze.

## Aufbau

Sections von oben nach unten. Pro Section die Komponenten, die dort stehen.

| # | Section | Komponenten (Contract) | Inhalt / Daten |
|---|---|---|---|
| 1 | Header | `<komponente>` | <was wird angezeigt> |
| 2 | <Section> | `<komponente>`, `<komponente>` | <…> |

## Komponenten

Alle Komponenten dieser Seite mit Verweis auf ihren Contract in `contracts/components/`.

- **shadcn/ui:** `button`, `card`, … (jeweils `contracts/components/<id>.contract.json`)
- **Eigene Kompositionen:** `<komponente>` (aus `card`, `badge`, …)

## Daten

- **Quelle:** <Datei, API oder Funktion, z. B. `src/data/…` bzw. `getItems()`>
- **Felder:** <welche Felder die Seite braucht>
- **Sortierung / Filter:** <Standardwerte, z. B. „nach Datum aufsteigend“>
- **URL-Parameter / Cookies:** <z. B. `?q=` für die Suche>

## Zustände

| Zustand | Wann | Darstellung | Figma |
|---|---|---|---|
| Standard | Daten vorhanden | <…> | <Frame / Variante> |
| Leer | keine Treffer | `Empty` mit Hinweis und Aktion | <…> |
| Lädt | Daten werden geladen | `Skeleton` | <…> |
| Fehler | <z. B. unbekannter Slug> | 404-Seite | <…> |

## Interaktionen

| Auslöser | Ergebnis | Komponente |
|---|---|---|
| <Klick auf Karte> | <Navigation zu /…> | `<komponente>` |
| <Filter ändern> | <Liste aktualisiert, URL-Parameter gesetzt> | `<komponente>` |

## Responsive

Was ist auf Mobile (390 px) anders als auf Desktop (1440 px)? In Figma als Variante
`Breakpoint=Desktop/Mobile`, im Code über Tailwind-Breakpoints.

- <z. B. Raster 4 → 1 Spalte>
- <z. B. Navigation im Menü statt in der Leiste>

## Texte und Sprache

- Seitentitel / `<title>`: <…>
- Wichtige Texte und Übersetzungsschlüssel: <…>

## Drift

Offene Abweichungen zwischen Figma und Code für diese Seite, mit Verweis auf
[DRIFT.md](../../contracts/DRIFT.md).

- <D-0xx – Kurzbeschreibung – Status>

## Akzeptanzkriterien

- [ ] Aufbau und Abstände entsprechen dem Figma-Frame (Desktop und Mobile).
- [ ] Alle Zustände aus der Tabelle oben sind umgesetzt.
- [ ] Nur shadcn/ui-Komponenten bzw. Kompositionen daraus. `src/components/ui/*` ist unverändert.
- [ ] `npm run lint` und `npm run check:contracts` sind grün.
- [ ] <seitenspezifisches Kriterium>
