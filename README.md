# OST VC – Base

Leeres Grundgerüst für eigene Projekte im Seminar: Next.js 16, Tailwind CSS 4 und shadcn/ui
(`base-nova`). Es enthält nur das technische Setup, keine Inhalte. Das fertige Beispielprojekt
liegt in [OST-VCW-Demo](https://github.com/zues/OST-VCW-Demo).

## Setup

Am einfachsten über die **Claude Code Desktop App**: Projekt klonen, dann im Chat

```
/setup
```

eingeben. Claude führt dich durch alles Weitere (Mac und Windows): Git und Node, Pakete, Dev-Server, figma-console MCP mit
Desktop Bridge und Projekt-Steckbrief. Der [shadcn-Skill](.claude/skills/shadcn/) ist schon
im Projekt enthalten. Die Schritte stehen in
[.claude/skills/setup/SKILL.md](.claude/skills/setup/SKILL.md).

## Inhalte für MeetCat

- `src/data/meetcat.json` – 20 Gruppen, 30 Meetups und 10 Mitglieder (Texte, Daten, Orte, Preise).
  Datumsangaben rechnen relativ zu `today` (6.11.2026). In TypeScript direkt importierbar:
  `import data from "@/data/meetcat.json"`.
- `public/images/meetcat/` – ein Bild pro Gruppe; Meetups verwenden das Bild ihrer Gruppe
  (`image.src` ist schon der Pfad für `<Image src=… />`).

## Arbeitsweise

Figma und Code werden über Contracts verbunden. Das Grundgerüst dafür ist schon da, aber leer:

- **[CLAUDE.md](CLAUDE.md):** Projekt-Steckbrief (bitte ausfüllen), Regeln und der Ablauf für eine
  neue Seite. Claude Code liest die Datei bei jeder Session.
- **[docs/pages/](docs/pages/):** ein MD-File pro Seitentyp, Vorlage in `_TEMPLATE.md`.
- **[contracts/](contracts/README.md):** Contracts pro Komponente (Vorlagen in `contracts/templates/`),
  Drift-Liste, Design-Tokens, Prüfscripts und die
  [Figma-Arbeitsweise](contracts/FIGMA-ARBEITSWEISE.md).

```bash
npm run check:contracts   # Contracts prüfen
npm run check:tokens      # Tokens prüfen
```

## Starten

```bash
npm install
npm run dev
```

Dann http://localhost:3000 öffnen. Weitere shadcn-Komponenten fügst du mit
`npx shadcn@latest add <komponente>` hinzu.
