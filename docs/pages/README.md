# Seiten-Dokumentation

Pro **Seitentyp** gibt es ein MD-File, z. B. Übersicht, Detail oder Profil. Pro einzelner Seite gibt es keins.
Es beschreibt, was auf die Seite gehört, aus welchen Komponenten sie besteht, woher die Daten kommen
und welche Zustände es gibt. Für Claude ist es die Grundlage, bevor eine Seite in Figma
oder im Code gebaut wird.

## Neue Seite anlegen

1. `_TEMPLATE.md` kopieren und nach dem Seitentyp benennen, z. B. `overview.md` oder `detail.md`.
2. Zweck, Route und Aufbau ausfüllen. Die Komponenten zuerst grob, die Contracts kommen später.
3. In Figma die Frames Desktop und Mobile bauen und ihre Node-IDs eintragen.
4. Für jede verwendete Komponente einen Contract anlegen
   (siehe [contracts/README.md](../../contracts/README.md)).
5. Code umsetzen, Abweichungen in [DRIFT.md](../../contracts/DRIFT.md) eintragen.
6. Akzeptanzkriterien abhaken und den Status in der Tabelle oben auf „Abgeglichen“ setzen.

## Seiten

| Seitentyp | Datei | Route | Status |
|---|---|---|---|
| <Übersicht> | [overview.md](overview.md) | `/` | Entwurf |
