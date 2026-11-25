// Checks that site copy survives the trip into Cosmic and back unchanged: every page and
// collection is converted to Cosmic metadata, read back as Cosmic returns it (a media field
// becomes { url }), and must equal its JSON file. Run: bun run check:cms
import assert from "node:assert/strict";
import { CMS_COLLECTIONS, CMS_PAGES } from "@/features/cms/sources";
import { fromCosmic, fromCosmicItem } from "@/features/cms/utils/fromCosmic";
import { isImagePath, isRecord } from "@/features/cms/utils/shapes";
import { toCosmic, toCosmicItem } from "@/features/cms/utils/toCosmic";
import { collectImagePaths } from "./cms/uploadImages";

function asCosmicRead(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(asCosmicRead);
  if (isRecord(value)) return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, asCosmicRead(v)]));
  return isImagePath(value) ? { url: value } : value;
}

// Each image "uploads" under its own path, so a read-back URL equals the original path.
function roundTrip(content: unknown): unknown {
  const media = new Map(collectImagePaths(content).map((path) => [path, path]));
  return asCosmicRead(toCosmic(content, media));
}

function roundTripItem(item: unknown, items: readonly unknown[]): unknown {
  const media = new Map(collectImagePaths(items).map((path) => [path, path]));
  return asCosmicRead(toCosmicItem(item, items, media));
}

for (const [key, page] of Object.entries(CMS_PAGES)) {
  assert.deepEqual(fromCosmic(roundTrip(page.content), page.content), page.content, `page ${key}`);
}

for (const [key, collection] of Object.entries(CMS_COLLECTIONS)) {
  const read = collection.items.map((item) => fromCosmicItem(roundTripItem(item, collection.items), collection.items));
  assert.deepEqual(read, [...collection.items], `collection ${key}`);
}

// A list item field the editor left empty is left out, never filled from the JSON.
const template = { items: [{ name: "A", image: "/images/a.jpg" }, { name: "B" }] };
const emptied = fromCosmic({ items: [{ name: "C", image: null }, { name: "D", image: "" }] }, template);
assert.deepEqual(emptied, { items: [{ name: "C" }, { name: "D" }] }, "empty list item fields");

// A page field Cosmic does not return keeps the JSON value.
assert.deepEqual(fromCosmic({}, { title: "Hi" }), { title: "Hi" }, "missing page field");

console.log("CMS content checks passed.");
