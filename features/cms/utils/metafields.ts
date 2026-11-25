import { isImagePath, isRecord, ITEM_KEY, mergeShapes } from "./shapes";

// Builds a Cosmic content model (metafields) from a JSON template: groups become "parent"
// fields, lists become "repeater" fields, image paths become media fields.

export interface Metafield {
  type: string;
  title: string;
  key: string;
  required: boolean;
  options?: string;
  media_validation_type?: string;
  children?: Metafield[];
  repeater_fields?: Metafield[];
}

// Text longer than this gets a multi-line box in the Cosmic editor.
const LONG_TEXT = 90;

// Clearer editor labels for short JSON keys.
const LABELS: Record<string, string> = {
  q: "Question",
  a: "Answer",
  href: "Link",
  num: "Number",
  pill: "Eyebrow",
  cta: "Button",
  [ITEM_KEY]: "Item",
};

function labelFor(key: string): string {
  if (LABELS[key]) return LABELS[key];
  const words = key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]/g, " ").toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function buildMetafields(template: Record<string, unknown>): Metafield[] {
  return Object.entries(template).map(([key, value]) => buildField(key, value));
}

function buildField(key: string, value: unknown): Metafield {
  const base = { key, title: labelFor(key), required: false };
  if (Array.isArray(value)) return { ...base, type: "repeater", repeater_fields: listFields(value) };
  if (isRecord(value)) return { ...base, type: "parent", children: buildMetafields(value) };
  if (isImagePath(value)) return { ...base, type: "file", media_validation_type: "image" };
  if (typeof value === "boolean") return { ...base, type: "switch", options: "true,false" };
  if (typeof value === "number") return { ...base, type: "number" };
  const isLong = String(value).length > LONG_TEXT || String(value).includes("\n");
  return { ...base, type: isLong ? "textarea" : "text" };
}

// Fields of one list item. Lists of plain values get a single "item" field.
function listFields(list: readonly unknown[]): Metafield[] {
  const itemShape = mergeShapes(list);
  if (isRecord(itemShape)) return buildMetafields(itemShape);
  return [buildField(ITEM_KEY, itemShape)];
}
