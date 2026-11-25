import { isImagePath, isRecord, ITEM_KEY, mergeShapes } from "./shapes";

// Reads Cosmic metadata back into the exact shape of the JSON template, so components keep
// the types they had. The template decides every field: lists of plain values are unwrapped
// from [{ item }], media fields become their URL, and a field Cosmic does not return keeps the
// template value.
export function fromCosmic(value: unknown, template: unknown): unknown {
  if (Array.isArray(template)) return readList(value, template);
  if (isRecord(template)) return readRecord(value, template);
  if (isImagePath(template)) return readImage(value);
  if (value === undefined || value === null) return template;
  if (typeof template === "boolean") return value === true || value === "true";
  if (typeof template === "number") return Number(value);
  return String(value);
}

function readRecord(value: unknown, template: Record<string, unknown>): Record<string, unknown> {
  const source = isRecord(value) ? value : {};
  return Object.fromEntries(Object.entries(template).map(([key, inner]) => [key, fromCosmic(source[key], inner)]));
}

function readList(value: unknown, template: readonly unknown[]): unknown[] {
  if (!Array.isArray(value)) return [...template];
  const itemTemplate = mergeShapes(template);
  if (!isRecord(itemTemplate)) return value.map((item) => fromCosmic(isRecord(item) ? item[ITEM_KEY] : item, itemTemplate));
  return value.map((item) => readItem(item, itemTemplate));
}

// A list item leaves out fields the editor left empty, like the JSON did (a testimonial
// without a photo has no "image" key at all). It never borrows a value from the template.
function readItem(value: unknown, template: Record<string, unknown>): Record<string, unknown> {
  const source = isRecord(value) ? value : {};
  const filled = Object.entries(template).filter(([key]) => !isEmpty(source[key]));
  const read = filled.map(([key, inner]) => [key, fromCosmic(source[key], inner)] as const);
  return Object.fromEntries(read.filter(([, result]) => result !== ""));
}

function isEmpty(value: unknown): boolean {
  return value === undefined || value === null || value === "";
}

// Cosmic returns a media field as { url, imgix_url }; the site wants the plain URL.
function readImage(value: unknown): string {
  if (isRecord(value) && typeof value.url === "string") return value.url;
  return "";
}

// A collection item (one program) has the same shape as a list item.
export function fromCosmicItem(metadata: unknown, items: readonly unknown[]): unknown {
  const itemTemplate = mergeShapes(items);
  return isRecord(itemTemplate) ? readItem(metadata, itemTemplate) : {};
}
