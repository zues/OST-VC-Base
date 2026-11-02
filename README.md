# OST VC – Base

Leeres Grundgerüst für eigene Projekte im Seminar: Next.js 16, Tailwind CSS 4 und shadcn/ui
(`base-nova`). Es enthält nur das technische Setup, keine Inhalte. Das fertige Beispielprojekt
liegt in [OST-VCW-Demo](https://github.com/zues/OST-VCW-Demo).

## Inhalte für MeetCat

- `src/data/meetcat.json` – 20 Gruppen, 30 Meetups und 10 Mitglieder (Texte, Daten, Orte, Preise).
  Datumsangaben rechnen relativ zu `today` (6.11.2026). In TypeScript direkt importierbar:
  `import data from "@/data/meetcat.json"`.
- `public/images/meetcat/` – ein Bild pro Gruppe; Meetups verwenden das Bild ihrer Gruppe
  (`image.src` ist schon der Pfad für `<Image src=… />`).

## Starten

```bash
npm install
npm run dev
```

Dann http://localhost:3000 öffnen. Weitere shadcn-Komponenten fügst du mit
`npx shadcn@latest add <komponente>` hinzu.
