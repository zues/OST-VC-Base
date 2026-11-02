# Figma-Arbeitsweise

So wird in diesem Projekt mit Figma gearbeitet, egal ob von Hand oder mit Claude Code über die
**figma-console MCP (Desktop Bridge)**. Die Regeln gelten für jedes Figma-File. Das konkrete File
tragt ihr in [CLAUDE.md](../CLAUDE.md#projekt-steckbrief) ein.

## Aufbau des Figma-Files

Wo was liegt (Pages, Screens, Komponenten, Variablen mit IDs), steht in
[DESIGN-SYSTEM.md](../DESIGN-SYSTEM.md). Neue Screens und Komponenten dort nachtragen.

Grundsätze:
- **Responsive** ist immer eine Variante `Breakpoint=Desktop/Mobile` im selben Component Set.
  Für Mobile wird keine eigene Komponente angelegt.
- **Zustände** wie aktiv, ausgewählt, voll, leer oder Fehler sind Varianten und keine Component Properties.
- Screens verwenden **Instanzen** der Komponenten. Losgelöste Kopien (detached) vermeiden.

## Regeln

- **Code folgt shadcn/ui strikt.** `src/components/ui/*` bleibt so, wie die CLI die Dateien installiert.
  Eigene Komponenten sind nur Kompositionen aus shadcn-Komponenten.
- **Abweichungen zwischen Figma und Code** werden nicht stillschweigend angeglichen.
  - Sie kommen als neue Zeile in [DRIFT.md](DRIFT.md).
  - Die Entscheidung kommt als Runde in [DRIFT-LOG.md](DRIFT-LOG.md).
  - Der Contract verweist im Feld `issues` auf die Drift-ID.
- **Ergänzungen am Kit** werden in der Figma-Beschreibung markiert:
  „Hinzugefügt am <Datum> per Claude Code (Drift D-0xx)“.
- **Vor einer Drift-Entscheidung** gegen das offizielle shadcn-Registry und das Live-Figma gegenprüfen.
- **Lizenz:** Kits mit eingeschränkter Lizenz nicht weitergeben und nicht öffentlich teilen.

## Theme nach Figma

Das Theme ändert sich im Code nur über die Variablen in `src/app/globals.css`, siehe
[CLAUDE.md](../CLAUDE.md#theme). So überträgt Claude es nach Figma:

1. Die Variablen in `globals.css` (`:root` = Light, `.dark` = Dark) mit den Figma-Variablen
   vergleichen. Im shadcn-Kit liegen sie in einer Collection mit den Modes Light und Dark,
   dazu Radius und Schrift in eigenen Collections. Mit `figma_get_variables` auslesen.
2. **Nur die geänderten Variablen** anpassen, mit `figma_batch_update_variables` in einem Aufruf.
   - Verweist die Figma-Variable auf eine Palette-Farbe (z. B. `neutral-900`) und der neue Wert
     liegt in der Palette, den Verweis umhängen. Sonst den Rohwert setzen.
   - `oklch` aus dem Code vorher in Hex umrechnen, Figma kennt kein `oklch`.
3. Die neuen Werte in [tokens.json](tokens.json) eintragen und mit `npm run check:tokens` prüfen.
4. Screenshots von einem Desktop- und einem Mobile-Screen machen. Die Screens übernehmen das Theme
   automatisch, wenn die Kit-Komponenten an den Variablen hängen.
5. Was sich nicht übertragen lässt (z. B. fest eingestellte Farben im Kit), kommt nach DRIFT.md.

## Code → Figma

Für eine Seite, die es nur im Code gibt:

1. Neue Frames `<Seite> / Desktop` (1440 px) und `<Seite> / Mobile` (390 px) auf der Page mit den
   Screens anlegen, mit Abstand neben den bestehenden.
2. **Nur Instanzen** aus dem Kit und aus der Section mit den eigenen Komponenten verwenden.
   Nichts von Hand nachzeichnen.
3. Abschnitt für Abschnitt arbeiten, nach jedem Abschnitt ein Screenshot. Kleine Skripte statt
   eines grossen.
4. Fehlt etwas im Kit, nicht nachbauen, sondern nach DRIFT.md eintragen.
5. Die Node-IDs der Frames in die Seiten-Doku eintragen.
6. Hängt oder stürzt das Plugin ab: aufhören und den Stand melden.

## figma-console MCP (Desktop Bridge)

Voraussetzung: Figma Desktop ist offen, und im richtigen File läuft das Plugin „Desktop Bridge“.

- **Vor jedem Aufruf** mit `figma_list_open_files` prüfen, dass euer File aktiv ist.
  Die Bridge kann mit mehreren Files gleichzeitig verbunden sein.
- Das Plugin läuft mit `documentAccess: dynamic-page`.
  - Immer `await node.getMainComponentAsync()` verwenden, nie `node.mainComponent`.
  - Vor der Suche über mehrere Pages `await figma.loadAllPagesAsync()` aufrufen.
- `clone()` legt den Klon auf `figma.currentPage`.
  - Liegt das Original woanders, schlägt `combineAsVariants` fehl („same page“).
  - Vorher `figma.setCurrentPageAsync(page)` aufrufen.
- **Grosse Skripte** pro Variante oder Instanz ausführen, nicht über ganze Component Sets
  mit Tausenden Knoten. Lange Läufe blockieren das Plugin oder bringen es zum Absturz.
- `findOne`/`findAll` und das Lesen von `fills` können auf Instanzen mit getauschten Icons abstürzen.
  - Deshalb mit einem eigenen Walker mit try/catch durchlaufen.
  - Icon-Instanzen dabei überspringen.
- **Text ändern:** vorher `figma.loadFontAsync()` für alle Schriften des Textes aufrufen
  (`getRangeAllFontNames`).

### Bilder

- `figma.createImageAsync(url)` scheitert an externen URLs.
- `figma_set_image_fill` nimmt Base64 an. Langes Base64 wird bei der Übertragung aber leicht beschädigt.
- **Zuverlässiger Weg:** offizielles Figma-MCP (`upload_assets`).
  1. `create_session` aufrufen.
  2. `upload_assets` mit `count` und `currentPageId` aufrufen.
  3. Jede Datei per `curl -F "file=@bild.jpg;type=image/jpeg" <submitUrl>` hochladen.
  4. Die Antwort enthält den `imageHash`. Den setzt man in figma-console per
     `node.fills = [{ type: 'IMAGE', imageHash, scaleMode: 'FILL' }]`.
- Hashes wiederverwenden und z. B. in `contracts/figma-images.json` notieren.
- Bilder vorher verkleinern, ca. 800 px reichen für Figma.

### Kit-Struktur (shadcn-Kits)

- Bilder sind meist der Fill der `Aspect Ratio`-Instanz, Avatare tragen den Fill auf der `Avatar`-Instanz.
- Card, Tabs, Avatar Group oder Empty haben oft echte SLOT-Nodes.
  - Ebenen in Slots haben Pfad-IDs, z. B. `I12:34;56:78;90:12`. Normale IDs liefern dafür `null`.
  - Zum Finden die Instanz durchlaufen und die Pfad-ID speichern (im Contract `layers[].figmaId`).
- Property-Keys haben ein `#id`-Suffix, z. B. `Button Text#37:10`. Im Contract heisst das Feld `figmaKey`.
- **Icons** in einer Instanz werden per `swapComponent()` getauscht. Danach kann `findOne` abstürzen,
  deshalb Icons zuletzt tauschen.

### Auto-Layout

- **`layoutMode` lässt sich auf Instanzen und Slot-Kindern nicht ändern.** Das wird stillschweigend ignoriert.
  Padding, Gap und Ausrichtung lassen sich dagegen ändern.
  - Für eine andere Richtung im Slot einen neuen Frame anlegen und die Unterebenen hineinverschieben.
  - Nach jedem Verschieben die Ebenen neu aus der Instanz holen, weil die Pfad-IDs veralten.
  - Alternativ eine neue Variante anlegen, z. B. `Layout=Vertical`.
- Beim `clone()` einer Variante gehen die `componentPropertyReferences` verloren. Danach wieder setzen.
- Ist der Slot-Inhalt einer Instanz überschrieben, erbt sie keine Änderungen der Hauptkomponente mehr.
- Nach `combineAsVariants` und Auto-Layout auf dem Set können Varianten auf FILL springen.
  Die Breite dann wieder auf FIXED setzen.
- Wird ein Frame von horizontal auf vertikal umgestellt, `primaryAxisAlignItems` prüfen.
  `SPACE_BETWEEN` verschluckt sonst das `itemSpacing`.

### Prüfen nach jeder Änderung

1. Screenshot mit `figma_capture_screenshot` erstellen.
2. Abstände, Ausrichtung und abgeschnittene Texte prüfen.
3. Bei Bedarf korrigieren, höchstens drei Runden.
4. Am Schluss die Figma-Seite der Contracts prüfen, siehe [README.md](README.md#figma-seite-prüfen).
