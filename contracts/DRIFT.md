# Drift: Abweichungen zwischen Figma und Code

Hier landen alle bekannten Abweichungen zwischen eurem Figma-File und dem Code
(`src/components/ui/*`, shadcn/ui). Sie werden nach und nach aufgelöst: in Figma, im Code oder
bewusst akzeptiert. **Nie stillschweigend auf einer Seite angleichen.**

**Entscheidungen** werden zusätzlich in [DRIFT-LOG.md](DRIFT-LOG.md) protokolliert
(Ausgangslage → Entscheidung → Änderungen).

**Neue Abweichung gefunden?**
- Unten als neue Zeile mit fortlaufender ID eintragen (`D-001`, `D-002` …).
- Hat die Komponente einen Contract, im `issues`-Feld des Contracts auf die ID verweisen (`"drift": "D-001"`).
- `check-code.mjs` meldet IDs, die es hier nicht gibt.

| Status | Bedeutung |
|---|---|
| 🔴 offen | noch nicht entschieden |
| 🟡 entschieden | Lösung festgelegt, noch nicht umgesetzt |
| 🟢 gelöst | umgesetzt (Datum + wo) |
| ⚪ akzeptiert | bewusst so belassen (Begründung) |

| Typ | Bedeutung |
|---|---|
| `figma-only` | gibt es nur in Figma |
| `code-only` | gibt es nur im Code |
| `naming` | gleiche Sache, anderer Name, Tippfehler oder Schreibweise |
| `concept` | wird in Figma und Code grundsätzlich anders abgebildet |
| `layout` | Code weicht per `className` vom Figma-Aufbau ab |
| `token` | Design-Token hat in Figma und Code unterschiedliche Werte |

## Tokens

Geprüft mit `node contracts/scripts/tokens.mjs` (Figma-Werte in [tokens.json](tokens.json)).

| ID | Token | Typ | Figma | Code | Vorschlag | Status |
|---|---|---|---|---|---|---|

## Komponenten (shadcn/ui)

| ID | Komponente | Typ | Figma | Code | Vorschlag | Status |
|---|---|---|---|---|---|---|

## Screens

| ID | Screen | Typ | Figma | Code | Vorschlag | Status |
|---|---|---|---|---|---|---|

<!-- Beispielzeile (Format):
| D-0xx | button | `figma-only` | State `Loading` | gibt es nicht; Muster: `<Button disabled><Spinner /> …</Button>` | akzeptieren | ⚪ akzeptiert – siehe [Log](DRIFT-LOG.md) |
-->
