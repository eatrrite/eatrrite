import { isImagePath, isRecord, ITEM_KEY, mergeShapes } from "./shapes";

// Turns JSON content into Cosmic metadata values. Image paths become the Cosmic media name
// that the import uploaded for them (`mediaNames`: local path → media name).
export function toCosmic(value: unknown, mediaNames: ReadonlyMap<string, string>): unknown {
  if (Array.isArray(value)) return toList(value, mediaNames);
  if (isRecord(value)) return mapValues(value, mediaNames);
  if (isImagePath(value)) return mediaNameFor(value, mediaNames);
  return value;
}

function toList(list: readonly unknown[], mediaNames: ReadonlyMap<string, string>): unknown[] {
  const itemShape = mergeShapes(list);
  if (!isRecord(itemShape)) return list.map((item) => ({ [ITEM_KEY]: toCosmic(item, mediaNames) }));
  return list.map((item) => toItem(isRecord(item) ? item : {}, itemShape, mediaNames));
}

// Every list item sends every field. A field the item does not have is sent as null: when it
// is left out, Cosmic fills a media field with the image of the item before it (a testimonial
// without a photo would show another client's photo).
function toItem(item: Record<string, unknown>, shape: Record<string, unknown>, mediaNames: ReadonlyMap<string, string>): Record<string, unknown> {
  return Object.fromEntries(Object.keys(shape).map((key) => [key, key in item ? toCosmic(item[key], mediaNames) : null]));
}

// One object of a collection (one program), filled like a list item.
export function toCosmicItem(item: unknown, items: readonly unknown[], mediaNames: ReadonlyMap<string, string>): unknown {
  const shape = mergeShapes(items);
  if (!isRecord(item) || !isRecord(shape)) return toCosmic(item, mediaNames);
  return toItem(item, shape, mediaNames);
}

function mapValues(record: Record<string, unknown>, mediaNames: ReadonlyMap<string, string>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, toCosmic(value, mediaNames)]));
}

function mediaNameFor(path: string, mediaNames: ReadonlyMap<string, string>): string {
  const name = mediaNames.get(path);
  if (!name) throw new Error(`Image not uploaded to Cosmic: ${path}`);
  return name;
}
