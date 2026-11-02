# Design-System

Was im Figma-File liegt und wie es zum Code passt. Claude liest diese Datei, bevor es in Figma
arbeitet oder eine Komponente baut. Wie man mit Figma arbeitet (Regeln, Stolpersteine) steht in
[contracts/FIGMA-ARBEITSWEISE.md](contracts/FIGMA-ARBEITSWEISE.md).

## Figma-File

- **Figma-File:** die importierte Seminar-Datei (`.fig`), Link im
  [Projekt-Steckbrief](CLAUDE.md#projekt-steckbrief).
- **File-Key:** `<FIGMA_FILE_KEY>`
- Den Key setzt `npm run figma:key -- <Figma-Link>` in dieser Datei, in allen Contracts und in
  `contracts/tokens.json`. `/setup` macht das beim Einrichten.

Jede importierte Kopie hat einen eigenen File-Key. Alles andere in dieser Datei gilt für jede Kopie:

| Bleibt beim Import gleich | Ist in jeder Kopie neu |
|---|---|
| Node-IDs von Pages, Screens, Komponenten und Ebenen (auch in Slots, z. B. `I123:4;56:7`) | File-Key |
| Property-Keys mit `#id`, z. B. `Button Text#37:10` | Component Keys |
| Varianten und ihre Werte | Variable Keys |
| Variablen-IDs und Collection-IDs | Textstil-IDs (`S:…`) |

Deshalb: Komponenten und Variablen über ihre **Node-ID** bzw. **Variablen-ID** ansprechen.
Keys und Textstil-IDs nie fest eintragen, Textstile über den Namen suchen.

## Pages

| Page | ID | Inhalt |
|---|---|---|
| MeetCat | `27459:595938` | Screens, eigene Komponenten, Overlays |
| Style Guide | `21275:5` | Übersicht des Kits |
| Lucide Icons | `1:433` | Icons (Lucide, wie im Code) |
| Cat Imapes | `27508:5669` | Bilder der Gruppen (Name mit Tippfehler) |
| je eine Page pro Kit-Komponente | z. B. Button `34:6` | shadcn/ui-Kit, siehe unten |

## Screens (Page MeetCat)

| Screen | Desktop (1440 px) | Mobile (390 px) |
|---|---|---|
| Übersicht | `27459:595939` | `27477:617775` |
| Übersicht – Gruppen | `27477:608285` | `27511:628703` |
| Detail | `27462:597891` | `27477:620468` |

**Overlays** (Section `27462:601792`):
- Frame „Dialoge“ `27462:601793`: AttendDialog `27473:10806`, AlertDialog / Teilnahme absagen
  `27462:603090`, Dialog / Teilnehmende `27462:603355`.
- Frame „MeetupActionBar – Zustände“ `27462:606065`: MeetupActionBar `27473:11612`,
  Tooltip / Gemerkt `27462:606066`.

## Eigene Komponenten in Figma

Section „MeetCat Komponenten“ `27459:596894`. Diese Komponenten gibt es in Figma schon, im Code
baut ihr sie als Kompositionen aus shadcn/ui. Ihre Contracts legt ihr selbst an
(Vorlage: [contracts/templates/composition.contract.json](contracts/templates/composition.contract.json)).

| Komponente | ID | Varianten |
|---|---|---|
| SiteHeader | `27477:611704` | Breakpoint |
| MeetCat Logo | `27477:623867` | – (im Code `public/logo.svg`) |
| MeetupCard | `27477:608133` | State |
| GroupCard | `27473:11847` | – |
| CategoryCarousel | `27477:613339` | Breakpoint |
| MeetupFilterBar | `27477:608075` | Filter, Breakpoint |
| MeetupAttendees | `27477:613602` | Breakpoint |
| MeetupChatTeaser | `27477:607362` | Teilnahme |
| MeetupActionBar | `27473:11846` | Teilnahme, Gemerkt, Plätze, Breakpoint |
| AttendDialog | `27477:607953` | Plätze |

Dazu der Frame „SiteHeader – Mobile, Menü offen“ `27477:611725`.

## Kit-Komponenten mit Contract

Für diese shadcn-Komponenten liegt der Contract schon in
[contracts/components/](contracts/components/): welche Figma-Komponente, welche Property-Keys,
welche Variante welchem Prop im Code entspricht. Nach `npx shadcn@latest add <name>` prüft
`npm run check:contracts` den Contract gegen den Code. Vorher steht er als „noch nicht installiert“.

| Contract | Page | Figma-Komponenten |
|---|---|---|
| `alert-dialog` | Alert Dialog (`22:307`) | Alert Dialog `83:122` |
| `aspect-ratio` | Aspect Ratio (`21:535`) | Aspect Ratio `28:1540` |
| `avatar` | Avatar (`23:988`) | Avatar `17100:29935`, Avatar Group `17100:83077`, Avatar / Group Count `27477:604100`, Avatar / Avatar Badge `21122:16180`, Avatar / Form Field `18692:42355` |
| `badge` | Badge (`23:995`) | Badge `26:169`, Badge Number `17100:10130` |
| `button` | Button (`34:6`) | Button `37:931` |
| `card` | Card (`46:65`) | Card `21123:292666` |
| `carousel` | Carousel (`46:66`) | Carousel `241:1368`, Carousel / CarouselItem `239:1214`, Carousel / Arrow Button `239:851`, Carousel / Basic `239:1300` |
| `dialog` | Dialog (`112:477`) | Dialog `112:601`, Dialog / Close Icon `5056:13504` |
| `dropdown-menu` | Dropdown Menu (`89:189`) | DropdownMenu `336:5077`, DropdownMenu / Menu `21469:1621`, DropdownMenu / Item `330:8549`, DropdownMenu / Label `330:24589`, DropdownMenu / Separator `91:272`, DropdownMenu / SubTrigger `330:24002` |
| `empty` | Empty (`18672:1039`) | Empty `18672:2962`, Empty / Media `18672:1781` |
| `input-group` | Input Group (`18677:11182`) | InputGroup `18672:226415`, InputGroup / Addon Inline `18677:9902`, InputGroup / Addon Block `18677:10743` |
| `item` | Item (`18672:6033`) | Item `18672:198607`, Item / Media `18672:6043`, Item / Actions `18672:218310`, ItemGroup `18672:218902`, Item / Separator `27477:605109` |
| `scroll-area` | Scroll Area (`296:207`) | Scroll Area / Vertical `18597:81811`, Scroll Area / Horizontal `18597:81812` |
| `select` | Select (`118:1264`) | Select `345:11530`, Select / Menu `21473:104411`, Select Menu / Item `118:1541`, Select Menu / Label `118:1542`, Select Menu / Separator `21141:30439` |
| `separator` | Separator (`118:2682`) | Separator `118:2690` |
| `sonner` | Sonner (`118:2756`) | Sonner `18482:48401`, Sonner / Icon `17375:198096`, Sonner / Action `17375:198044` |
| `tabs` | Tabs (`183:417`) | Tabs `21133:27311`, Tabs / Trigger `183:532` |
| `toggle` | Toggle (`132:1671`) | Toggle `124:27` |
| `tooltip` | Tooltip (`122:10`) | Tooltip `17103:809` |

Für alle anderen Kit-Komponenten (z. B. Field `18684:15122`, Input `65:520`, Textarea `177:367`,
Toggle Group `123:75`) gibt es eine Page mit demselben Namen, aber noch keinen Contract. Den legt
ihr bei Bedarf aus [contracts/templates/shadcn-component.contract.json](contracts/templates/shadcn-component.contract.json) an.

## Eigenheiten des Kits

Im Beispielprojekt geprüft und bewusst so belassen. Details stehen im jeweiligen Contract unter `issues`.

- **Schreibweise:** Variantenwerte in Figma teils gross (`Default`), im Code immer klein. Das
  Mapping steht im Contract.
- **Nur in Figma, nicht verwenden:** Avatar `xl`/`xs`, Select- und Dropdown-Varianten `Inverted`,
  `Translucent`, `Hover (Translucent)`, Select-Item `Size`, Item-Media `Icon` (gehört zu einem anderen Stil,
  `Icon (Simple)` verwenden).
- **Anders abgebildet:**
  - Button `State=Loading` → im Code `disabled` plus `Spinner`.
  - Dropdown `Variant=Shortcut` → Kind-Element `DropdownMenuShortcut`.
  - Carousel `Breakpoint` → responsive `basis-*`-Klassen.
  - Sonner ist in Figma eine Komponente, im Code ein Aufruf `toast()` mit `<Toaster />`.
- **Kit-Fehler mit Workaround:**
  - Item: `Show Actions=false` blendet die Aktionen nicht aus → Ebene von Hand ausblenden.
  - Card: Abstand oben und unten sitzt im `Card Header`. Ohne Header den Abstand am Slot setzen.
  - Card-Slots sind immer vertikal → für eine Zeile einen horizontalen Frame in den Slot legen.
  - ItemGroup: Abstand fest 16 px, im Code bei kleinen Items 10 px → im Slot überschreiben.

## Theme und Variablen

| Collection | ID | Inhalt | Im Code |
|---|---|---|---|
| 1. TailwindCSS | `VariableCollectionId:1:2` | Tailwind-Palette, Spacing | Tailwind |
| 2. Theme | `VariableCollectionId:1:412` | `radius/*`, `font/*` | `--radius`, `--font-sans` |
| 3. Mode | `VariableCollectionId:1:444` | `base/*` mit Modes Light und Dark | `:root` und `.dark` in `globals.css` |
| 4. Custom | `VariableCollectionId:17548:88924` | kit-intern | – |
| 5. Icon Library | `VariableCollectionId:21003:91179` | kit-intern | – |

- Die Farben in `3. Mode` verweisen meist auf die Palette in `1. TailwindCSS`, z. B. `neutral-900`.
- Abgleich: [contracts/tokens.json](contracts/tokens.json) ↔ `src/app/globals.css` mit `npm run check:tokens`.
- Theme ändern und nach Figma übertragen: siehe [CLAUDE.md](CLAUDE.md#theme) und
  [FIGMA-ARBEITSWEISE.md](contracts/FIGMA-ARBEITSWEISE.md#theme-nach-figma).
