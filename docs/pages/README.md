# Seiten-Dokumentation

Pro **Seitentyp** gibt es ein MD-File, z. B. Übersicht, Detail oder Profil. Pro einzelner Seite gibt es keins.
Es beschreibt, was auf die Seite gehört, aus welchen Komponenten sie besteht, woher die Daten kommen
und welche Zustände es gibt. Für Claude ist es die Grundlage, bevor eine Seite in Figma
oder im Code gebaut wird.

## Neue Seite anlegen

Der ganze Ablauf steht in [CLAUDE.md](../../CLAUDE.md#ablauf-für-eine-neue-seite). Für die Doku heisst das:

1. **Vor dem Bauen grob:** `_TEMPLATE.md` kopieren und nach dem Seitentyp benennen, z. B.
   `overview.md` oder `detail.md`. Nur Zweck, Route, Figma-Node-IDs und Aufbau ausfüllen.
2. **Nach dem Bauen vollständig:** Komponenten mit Verweis auf ihre Contracts
   (siehe [contracts/README.md](../../contracts/README.md)), Daten, Zustände, Interaktionen,
   Responsive und offene Drift aus [DRIFT.md](../../contracts/DRIFT.md).
3. Akzeptanzkriterien abhaken und den Status oben setzen. Die Tabelle unten ergänzen.

## Seiten

| Seitentyp | Datei | Route | Status |
|---|---|---|---|
| <Übersicht> | [overview.md](overview.md) | `/` | Entwurf |
