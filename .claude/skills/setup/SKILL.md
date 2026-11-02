---
name: setup
description: Richtet das Projekt auf einem neuen Rechner ein (Mac oder Windows), Schritt für Schritt mit Prüfung. Git, Node und Pakete, Dev-Server, figma-console MCP mit Desktop Bridge, Projekt-Steckbrief. Verwenden, wenn jemand „Richte das Projekt ein“, „Setup“ oder /setup sagt, oder wenn etwas aus dem Setup fehlt.
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

## 1. Git, Node.js und Pakete

1. `git --version` und `node -v` prüfen. Nötig ist Node 20 oder neuer.
   - Fehlt etwas, selbst installieren, wenn das geht: auf dem Mac mit `brew`, falls vorhanden,
     auf Windows mit `winget` (`Git.Git`, `OpenJS.NodeJS.LTS`).
   - Sonst: Download von https://git-scm.com bzw. https://nodejs.org (LTS) verlinken, Schritt für
     Schritt durchführen, warten, erneut prüfen.
   - Wurde etwas neu installiert: Die Studierenden müssen die App danach ganz beenden und neu öffnen.
2. `npm install` im Projektordner ausführen.
3. Prüfen: `npm run check:contracts` und `npm run lint` laufen ohne Fehler.

## 2. Dev-Server

1. Den Dev-Server über die Vorschau der Desktop App starten. Die Konfiguration liegt in
   `.claude/launch.json` (`npm run dev`, Port 3000).
   - Ohne Vorschau: `npm run dev` im Hintergrund starten.
2. Prüfen: http://localhost:3000 antwortet. Den Link nennen.

## 3. Figma-Token

Für die figma-console MCP braucht es ein persönliches Figma-Token. Anleitung für die Studierenden:

1. In Figma auf die Startseite wechseln (weg aus der Datei) → oben links auf den Account →
   **Settings** → Tab **Security** → **Personal access tokens** → **Generate new token**.
2. Name: `Figma Console MCP`. Ablauf: die längste Dauer wählen.
3. Diese Rechte anhaken, alles andere bleibt leer:
   - Users: `current_user:read`
   - Files: `file_comments:read`, `file_comments:write`, `file_content:read`, `file_versions:read`
   - Design systems: `library_assets:read`, `library_content:read`
   - Nur falls angeboten (Enterprise): `file_variables:read`
4. **Generate token**, Token sofort kopieren (wird nur einmal angezeigt) und hier in den Chat einfügen.

Das Token beginnt mit `figd_`. Andernfalls nachfragen. Fehler 403 heisst: Ein Recht fehlt, neues
Token erstellen.

## 4. figma-console MCP einrichten

1. Prüfen, ob `figma-console` schon eingerichtet ist (`claude mcp list` bzw. `~/.claude.json`,
   Abschnitt `mcpServers` auf oberster Ebene).
2. Wenn nicht, für den Benutzer (nicht nur dieses Projekt) einrichten:
   - **Mac:**
     ```bash
     claude mcp add figma-console -s user -e FIGMA_ACCESS_TOKEN=<token> -e ENABLE_MCP_APPS=true -- npx -y figma-console-mcp@latest
     ```
     Ist der Befehl `claude` nicht vorhanden: denselben Eintrag per Node-Skript in `~/.claude.json`
     unter `mcpServers` ergänzen (bestehende Einträge behalten):
     `{"command":"npx","args":["-y","figma-console-mcp@latest"],"env":{"FIGMA_ACCESS_TOKEN":"<token>","ENABLE_MCP_APPS":"true"}}`
   - **Windows:** per Node-Skript in `%USERPROFILE%\.claude.json` unter `mcpServers` ergänzen,
     mit `cmd /c`, weil `npx` dort ein Skript ist:
     `{"command":"cmd","args":["/c","npx","-y","figma-console-mcp@latest"],"env":{"FIGMA_ACCESS_TOKEN":"<token>","ENABLE_MCP_APPS":"true"}}`
3. Das Token **nie** in `.mcp.json` oder eine andere Datei im Projekt schreiben und nicht noch
   einmal anzeigen.
4. Den Studierenden sagen: **Claude ganz beenden und neu öffnen** (Mac: ⌘ Q; Windows: Fenster
   schliessen, dann Claude-Symbol bei der Uhr → Rechtsklick → Beenden). Danach im Projektordner
   `/setup` erneut aufrufen. Die MCP wird nur beim Start geladen.

## 5. Desktop Bridge Plugin in Figma

Voraussetzung: Schritt 4 ist erledigt und Claude wurde neu gestartet.

1. Anleitung für die Studierenden:
   1. **Figma Desktop** öffnen (nicht im Browser) und das Projekt-File öffnen.
   2. Das Plugin aus der Lektion herunterladen (`figma-desktop-bridge.zip`), entpacken und den
      Ordner `figma-desktop-bridge` nach `Dokumente/OST` verschieben. **Nicht** in den Projektordner,
      sonst landet er in Git.
   3. Rechtsklick auf die Arbeitsfläche → **Plugins → Development → Import plugin from manifest…**
      → `manifest.json` im Ordner `figma-desktop-bridge` wählen.
   4. **Plugins → Development → Figma Desktop Bridge** starten. Das Fenster offen lassen.
   - Ohne ZIP: Die MCP legt das Plugin beim Start auch unter `~/.figma-console-mcp/plugin/` ab
     (Pfad sonst mit `npx figma-console-mcp@latest --print-path`). Der Ordner ist versteckt, im
     Dateidialog auf dem Mac mit `⌘ ⇧ G` öffnen.
2. Prüfen mit `figma_get_status` und `figma_list_open_files`: verbunden, und das richtige File ist aktiv.
3. Bei Problemen `figma_diagnose` aufrufen. Häufig: Plugin läuft nicht im File, Figma im Browser
   statt Desktop, oder Claude seit dem MCP-Eintrag nicht neu gestartet.

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
(grob erfassen → bauen → testen → nachjustieren → dokumentieren → committen).
