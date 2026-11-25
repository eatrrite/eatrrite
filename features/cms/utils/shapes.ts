// Helpers shared by the import (JSON → Cosmic) and the read (Cosmic → JSON shape).

// Cosmic lists (repeaters) hold objects, so a list of plain values is stored as [{ item: value }].
export const ITEM_KEY = "item";

const IMAGE_PATH = /^\/images\/.+\.(jpe?g|png|webp|avif|gif|svg)$/i;

// Site images are local paths such as "/images/hero/slide.jpg"; in Cosmic they are media files.
export function isImagePath(value: unknown): value is string {
  return typeof value === "string" && IMAGE_PATH.test(value);
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// One template that covers every item of a list: all keys any item has, with nested lists merged.
// Items differ (one FAQ item has a title, another not), so the first item alone is not enough.
export function mergeShapes(values: readonly unknown[]): unknown {
  const records = values.filter(isRecord);
  if (records.length === 0) return mergeLists(values);
  const keys = [...new Set(records.flatMap((record) => Object.keys(record)))];
  return Object.fromEntries(keys.map((key) => [key, mergeShapes(records.map((r) => r[key]).filter((v) => v !== undefined))]));
}

function mergeLists(values: readonly unknown[]): unknown {
  const lists = values.filter(Array.isArray);
  if (lists.length === 0) return values[0];
  return [mergeShapes(lists.flat())];
}
