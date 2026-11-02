#!/usr/bin/env node
// Trägt den Key eures Figma-Files überall ein, wo er gebraucht wird:
// Contracts (contracts/components/*), contracts/tokens.json und DESIGN-SYSTEM.md.
//
//   npm run figma:key -- <Figma-Link oder Key>
//
// Nötig nach dem Import der .fig-Datei: Node-IDs und Property-Keys bleiben gleich,
// der File-Key ist in jeder Kopie neu.

import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const arg = process.argv[2]
const key = arg?.match(/figma\.com\/(?:design|file)\/([0-9a-zA-Z]{22,128})/)?.[1] ?? arg
if (!key || !/^[0-9a-zA-Z]{22,128}$/.test(key)) {
  console.error("Aufruf: npm run figma:key -- <Figma-Link oder Key>")
  process.exit(1)
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..")
const componentsDir = join(root, "contracts/components")
const files = [
  ...readdirSync(componentsDir).filter((f) => f.endsWith(".contract.json")).map((f) => join(componentsDir, f)),
  join(root, "contracts/tokens.json"),
]

let changed = 0
for (const file of files) {
  const json = JSON.parse(readFileSync(file, "utf8"))
  if (!json.figma || json.figma.fileKey === key) continue
  json.figma.fileKey = key
  writeFileSync(file, JSON.stringify(json, null, 2) + "\n")
  changed++
}

const dsPath = join(root, "DESIGN-SYSTEM.md")
const ds = readFileSync(dsPath, "utf8")
const ds2 = ds.replace(/(\*\*File-Key:\*\* `)[^`]*(`)/, `$1${key}$2`)
if (ds2 !== ds) {
  writeFileSync(dsPath, ds2)
  changed++
}

console.log(`File-Key ${key} eingetragen (${changed} Dateien geändert).`)
