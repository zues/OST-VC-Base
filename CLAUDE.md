@AGENTS.md

# Projekt (Seminar OST)

Web-App, die aus einem Figma-Design mit Next.js und shadcn/ui umgesetzt wird. Figma und Code
werden über **Contracts** verbunden. Abweichungen werden dokumentiert, nicht stillschweigend
angeglichen.

## Projekt-Steckbrief

Bitte ausfüllen. Claude liest diese Angaben bei jeder Session.

| | |
|---|---|
| **Name der App** | <Name> |
| **Kurzbeschreibung** | <ein Satz: wer nutzt die App wofür?> |
| **Figma-File** | <Link> (Key `<FIGMA_FILE_KEY>`) |
| **Figma-Kit** | <z. B. shadcn/ui-Kit, Version> |
| **Page mit den Screens** | <Page-Name> |
| **Dev-Server** | `npm run dev` → http://localhost:3000 |
| **Team** | <Namen> |

## Technischer Rahmen

- **Next.js 16** (App Router), **React 19**, **TypeScript**. Vor dem Schreiben von Code die
  Hinweise in [AGENTS.md](AGENTS.md) beachten. Diese Next-Version unterscheidet sich vom Trainingsstand.
- **Tailwind CSS 4** und **shadcn/ui** im Stil **`base-nova`**. Der Unterbau ist **Base UI** statt Radix,
  deshalb heisst es z. B. `render` statt `asChild`.
- Icons: **Lucide**.
- Komponenten hinzufügen: `npx shadcn@latest add <name>`.
- Der offizielle **shadcn-Skill** liegt in `.claude/skills/shadcn/` und gilt für allen UI-Code
  (Komposition, Formulare, Icons, Styling). Aktualisieren mit `npx skills update`.

## Regeln

1. **shadcn/ui strikt.**
   - Die UI besteht aus shadcn-Komponenten in `src/components/ui/*`.
   - Diese Dateien bleiben so, wie die CLI sie installiert.
2. **Eigene Komponenten sind Kompositionen** aus shadcn-Komponenten in `src/components/`.
   `className` nur für Layout, nicht für einen anderen Look.
3. **Figma ist die Vorlage.**
   - Responsive ist eine Variante `Breakpoint=Desktop/Mobile`, Zustände sind Varianten.
   - Mehr dazu in [contracts/FIGMA-ARBEITSWEISE.md](contracts/FIGMA-ARBEITSWEISE.md).
4. **Abweichungen dokumentieren.**
   - Unterschiede zwischen Figma und Code kommen nach [contracts/DRIFT.md](contracts/DRIFT.md).
   - Entscheidungen kommen nach [contracts/DRIFT-LOG.md](contracts/DRIFT-LOG.md).
   - Nicht eigenmächtig eine Seite angleichen. Erst fragen.
5. **Figma-Zugriff** über die figma-console MCP (Desktop Bridge). Vor jedem Aufruf prüfen, dass
   das richtige File verbunden ist (`figma_list_open_files`).

## Ablauf für eine neue Seite

1. **Seiten-Doku:** [docs/pages/_TEMPLATE.md](docs/pages/_TEMPLATE.md) kopieren und ausfüllen
   (Zweck, Aufbau, Daten, Zustände).
2. **Figma:** Frames Desktop und Mobile bauen bzw. prüfen, Node-IDs in die Seiten-Doku eintragen.
3. **Contracts:**
   - Für jede verwendete Komponente einen Contract anlegen oder ergänzen.
   - Die Vorlagen liegen in [contracts/templates/](contracts/templates/), die Anleitung in
     [contracts/README.md](contracts/README.md).
4. **Code:** shadcn-Komponenten installieren, Kompositionen bauen, Seite zusammensetzen.
5. **Prüfen:** Befehle siehe unten. Abweichungen in DRIFT.md eintragen und in der Seiten-Doku verlinken.

## Prüfen

```bash
npm run lint
npm run check:contracts   # Contracts gegen Schema, DRIFT.md und Code
npm run check:tokens      # Design-Tokens (contracts/tokens.json) gegen src/app/globals.css
npm run build
```

## Wo steht was?

| Datei / Ordner | Inhalt |
|---|---|
| `docs/pages/` | ein MD-File pro Seitentyp |
| `contracts/components/` | ein Contract pro Komponente |
| `contracts/DRIFT.md`, `DRIFT-LOG.md` | Abweichungen und Entscheidungen |
| `contracts/tokens.json` | Design-Tokens aus Figma |
| `contracts/FIGMA-ARBEITSWEISE.md` | Aufbau des Figma-Files, Regeln, Stolpersteine mit figma-console |
| `src/data/` | Inhalte (JSON) |
