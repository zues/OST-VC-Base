---
name: setup
description: Richtet das Projekt auf einem neuen Rechner ein, Schritt für Schritt mit Prüfung. Node und Pakete, Dev-Server, figma-console MCP mit Desktop Bridge, Projekt-Steckbrief. Verwenden, wenn jemand „Richte das Projekt ein“, „Setup“ oder /setup sagt, oder wenn etwas aus dem Setup fehlt.
---

# Projekt-Setup

Du führst Studierende durch das Setup. Sie arbeiten in der Claude Code Desktop App und kennen
das Terminal kaum.

## So führst du

- Arbeite die Schritte der Reihe nach ab. Prüfe zuerst, ob ein Schritt schon erledigt ist.
  Ist er erledigt, melde das kurz und gehe weiter.
- Erledige alles selbst, was per Befehl geht. Die Studierenden sollen nichts im Terminal tippen.
- Was nur von Hand geht (Figma, Token, Browser-Login): genau eine kurze, nummerierte Anleitung
  geben, dann warten und danach selbst prüfen.
- Nach jedem Schritt eine Zeile Status: ✅ erledigt, ⏳ wartet auf dich, ❌ Problem.
- Am Schluss die Checkliste unten mit dem Stand ausgeben.
- Keine Tokens oder Passwörter ins Repo schreiben. Nichts committen, ausser die Studierenden
  fragen danach.

## 1. Node.js und Pakete

1. `node -v` prüfen. Nötig ist Version 20 oder neuer.
   - Fehlt Node: ist `brew` vorhanden, mit `brew install node` installieren.
   - Sonst: Download von https://nodejs.org (LTS) verlinken, warten, erneut prüfen.
2. `npm install` im Projektordner ausführen.
3. Prüfen: `npm run check:contracts` und `npm run lint` laufen ohne Fehler.

## 2. Dev-Server

1. Den Dev-Server über die Vorschau der Desktop App starten. Die Konfiguration liegt in
   `.claude/launch.json` (`npm run dev`, Port 3000).
   - Ohne Vorschau: `npm run dev` im Hintergrund starten.
2. Prüfen: http://localhost:3000 antwortet. Den Link nennen.

## 3. Figma-Token

Für die figma-console MCP braucht es ein persönliches Figma-Token. Anleitung für die Studierenden:

1. Figma öffnen → Menü oben links → **Settings** → **Security** → **Personal access tokens** →
   **Generate new token**.
2. Name: `Figma Console MCP`. Ablaufdatum: Ende des Semesters.
3. Scopes auf **Read** setzen: File content, File versions, Library content, Library assets,
   Current user. **Comments** auf Read und Write. Alles andere bleibt „No access“.
4. Token kopieren (wird nur einmal angezeigt) und hier in den Chat einfügen.

Das Token beginnt mit `figd_`. Andernfalls nachfragen.

## 4. figma-console MCP einrichten

1. Prüfen, ob `figma-console` schon eingerichtet ist (`claude mcp list` bzw. `~/.claude.json`,
   Abschnitt `mcpServers`).
2. Wenn nicht, für den Benutzer (nicht nur dieses Projekt) einrichten:
   ```bash
   claude mcp add figma-console -s user -e FIGMA_ACCESS_TOKEN=<token> -e ENABLE_MCP_APPS=true -- npx -y figma-console-mcp@latest
   ```
   - Ist der Befehl `claude` nicht vorhanden: den gleichen Eintrag per Node-Skript in
     `~/.claude.json` unter `mcpServers` ergänzen (bestehende Einträge behalten):
     `{"command":"npx","args":["-y","figma-console-mcp@latest"],"env":{"FIGMA_ACCESS_TOKEN":"<token>","ENABLE_MCP_APPS":"true"}}`
3. Das Token **nie** in `.mcp.json` oder eine andere Datei im Projekt schreiben.
4. Den Studierenden sagen: **Jetzt eine neue Session starten** (neuer Chat im selben Ordner)
   und dort `/setup` erneut aufrufen. Erst dann sind die Figma-Werkzeuge verfügbar.

## 5. Desktop Bridge Plugin in Figma

Voraussetzung: Schritt 4 ist erledigt und die neue Session läuft. Die MCP kopiert das Plugin beim
Start nach `~/.figma-console-mcp/plugin/`.

1. Prüfen, dass `~/.figma-console-mcp/plugin/manifest.json` existiert.
   Sonst: `npx figma-console-mcp@latest --print-path`.
2. Anleitung für die Studierenden:
   1. **Figma Desktop** öffnen (nicht im Browser).
   2. Das Projekt-File öffnen.
   3. Menü **Plugins → Development → Import plugin from manifest…**
   4. Die Datei `manifest.json` wählen. Der Ordner ist versteckt: im Dialog `⌘ ⇧ G` drücken
      und `~/.figma-console-mcp/plugin/` eingeben.
   5. **Plugins → Development → Figma Desktop Bridge** starten. Das Fenster offen lassen.
3. Prüfen mit `figma_get_status` und `figma_list_open_files`: verbunden, und das richtige File ist aktiv.
4. Bei Problemen `figma_diagnose` aufrufen. Häufig: Plugin läuft nicht im File, Figma im Browser
   statt Desktop, oder alte Session ohne MCP.

## 6. shadcn-Skill

Der Skill ist im Projekt schon enthalten (`.claude/skills/shadcn/`, Version in `skills-lock.json`).
Nichts installieren.

1. Prüfen: `.claude/skills/shadcn/SKILL.md` existiert. Er wirkt, weil `components.json` existiert.
2. Fehlt er: `npx -y skills add shadcn/ui -a claude-code -s shadcn -y --copy`.

## 7. Projekt-Steckbrief

1. In [CLAUDE.md](../../../CLAUDE.md) den Abschnitt „Projekt-Steckbrief“ mit den Studierenden
   ausfüllen: Name der App, Kurzbeschreibung, Figma-Link und Key, Kit, Page, Team.
2. Den Figma-Key aus dem Link nehmen: `figma.com/design/<KEY>/…`.
3. In [contracts/FIGMA-ARBEITSWEISE.md](../../../contracts/FIGMA-ARBEITSWEISE.md) den Abschnitt
   „Aufbau des Figma-Files“ ausfüllen, soweit bekannt.

## Checkliste am Schluss

```
Setup
✅/❌ Node.js und npm install
✅/❌ Dev-Server auf http://localhost:3000
✅/❌ figma-console MCP eingerichtet
✅/❌ Desktop Bridge verbunden, richtiges File aktiv
✅/❌ shadcn-Skill vorhanden
✅/❌ Projekt-Steckbrief ausgefüllt
```

Danach den nächsten Schritt vorschlagen: erste Seite nach dem Ablauf in CLAUDE.md
(Seiten-Doku → Figma → Contracts → Code → Prüfen).
