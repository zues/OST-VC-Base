# Contracts: Figma ↔ shadcn/ui

Ein Contract pro Komponente beschreibt, wie eine Figma-Komponente und ihr Gegenstück im Code
(`src/components/ui/*.tsx` bzw. eigene Kompositionen in `src/components/`) zusammenhängen.
Das Format ist angelehnt an [southleft/ds-contracts-poc](https://github.com/southleft/ds-contracts-poc),
aber bewusst schlank. Es ist an kein bestimmtes Figma-File gebunden: `figma.fileKey`, Node-IDs und
Keys tragt ihr aus eurem eigenen File ein.

```
contracts/
├── contract.schema.json        ← JSON-Schema (geschlossen: unbekannte Felder sind Fehler)
├── components/*.contract.json  ← eure Contracts (anfangs leer)
├── templates/                  ← Vorlagen zum Kopieren
│   ├── shadcn-component.contract.json   (Beispiel: Button)
│   └── composition.contract.json        (eigene Komponente aus shadcn-Teilen)
├── tokens.json                 ← Design-Tokens aus Figma (vorbelegt mit shadcn-Default)
├── DRIFT.md                    ← Abweichungen Figma ↔ Code (ID, Typ, Status)
├── DRIFT-LOG.md                ← Protokoll der Entscheidungen
├── FIGMA-ARBEITSWEISE.md       ← Regeln und Stolpersteine für die Arbeit in Figma
└── scripts/
    ├── check-code.mjs          ← prüft die Contracts gegen Schema, DRIFT.md und Code
    ├── figma-check.mjs         ← erzeugt ein Prüfscript für die Figma-Seite (figma-console MCP)
    └── tokens.mjs              ← vergleicht tokens.json mit globals.css
```

## Neuen Contract anlegen

1. **shadcn-Komponente installieren:** `npx shadcn@latest add <name>`.
2. **Vorlage kopieren** nach `contracts/components/<name>.contract.json`. Für eine shadcn-Komponente
   `templates/shadcn-component.contract.json`, für eine eigene Komponente
   `templates/composition.contract.json`.
3. **Figma-Seite ausfüllen:** `fileKey`, Page, Node-ID, Component Key, Property-Namen inkl. `#id`
   und Variantenwerte. Am einfachsten liest Claude sie mit figma-console aus
   (`componentPropertyDefinitions`, `variantOptions`).
4. **Code-Seite ausfüllen:** Export, Prop und Werte-Mapping. Bei Kompositionen kommen `uses` und
   `layers` dazu.
5. **Abweichungen** in [DRIFT.md](DRIFT.md) eintragen und im Contract unter `issues` per `drift`-ID
   verweisen.
6. **Prüfen:** `npm run check:contracts`.

## Aufbau eines Contracts

- `parts[]`: je eine Figma-Komponente bzw. ein Component Set (mit `id` und `key`) und ihr
  Gegenstück im Code (`export`).
- `parts[].props[]`: je eine Figma-Property und wie sie im Code umgesetzt wird:
  - `prop` – React-Prop, `values` bildet Figma-Werte auf Code-Werte ab
  - `part` – Unterkomponente (z. B. `CardTitle`)
  - `children` / `child` – Inhalt bzw. JSX-Muster
  - `state` – Interaktionszustand (Hover, Focus …), im Code CSS/ARIA statt Prop
  - `composition` – Wert wählt eine andere Zusammensetzung
  - `inherited` – Wert ergibt sich aus der Eltern-Komponente
  - `code: null` bzw. Wert `null` – gibt es nur in Figma
- `codeOnly`: Exports ohne eigene Figma-Komponente
- `kind: "composition"` (eigene Komponenten): zusätzlich `uses` (IDs der
  verwendeten shadcn-Contracts) und `layers[]` – je Figma-Ebene das shadcn-Teil im Code
  (`code.part`, feste `code.props`), die Datenquelle (`data`) und ggf. eine Bedingung (`when`)
- `issues`: bekannte Abweichungen (`info`, `warn`, `error`), mit Verweis `drift` auf die ID in [DRIFT.md](DRIFT.md)

Das Schema ist geschlossen (`additionalProperties: false`): Neue Felder erst im Schema
beschreiben, sonst meldet `check-code.mjs` sie als Fehler.

## Prüfen

```bash
npm run check:contracts        # = node contracts/scripts/check-code.mjs
npm run check:tokens           # = node contracts/scripts/tokens.mjs
node contracts/scripts/tokens.mjs --write   # Figma-Werte in globals.css übernehmen
```

`check-code.mjs` prüft:
- jeden Contract gegen `contract.schema.json` (Typen, Pflichtfelder, unbekannte Felder)
- ob jede `drift`-ID in `DRIFT.md` existiert
- ob alle referenzierten Exports existieren
- ob jeder gemappte Wert eine echte Variante ist (`cva`-Varianten bzw. String-Union im Prop-Typ).
  Umgekehrt prüft es, ob jede Code-Variante gemappt ist oder in `codeOnlyValues` steht.
- bei Kompositionen, ob die shadcn-Teile importiert und feste Props gesetzt sind. Fehlt die Datei
  noch, gilt die Komposition als „noch nicht umgesetzt“ und nicht als Fehler.

`tokens.json` verweist auf die Tailwind-Palette (`neutral-100`, `red-600` …). Das Script übersetzt
das über die `theme.css` des Projekts in exakte oklch-Werte. `--write` ändert nur Variablen, die es
in `globals.css` schon gibt.

### Figma-Seite prüfen

```bash
node contracts/scripts/figma-check.mjs > /tmp/figma-check.js
```

Die Ausgabe im figma-console MCP mit `figma_execute` ausführen (Desktop Bridge in eurem File).
Geprüft werden Node-IDs, Keys, Namen, Typen, Property-Namen (inkl. `#id`), Variantenwerte und
die `figmaId` jeder Ebene. `problems` muss leer sein.

## Stand

| Komponente | Figma-Komponenten | Code | Bemerkung |
|---|---|---|---|
