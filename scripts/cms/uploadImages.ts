import { readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import type { createBucketClient } from "@cosmicjs/sdk";
import { isImagePath, isRecord } from "@/features/cms/utils/shapes";

type Cosmic = ReturnType<typeof createBucketClient>;

// Every local image path ("/images/…") in the content, once each.
export function collectImagePaths(value: unknown): string[] {
  return [...new Set(findImagePaths(value))];
}

function findImagePaths(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(findImagePaths);
  if (isRecord(value)) return Object.values(value).flatMap(findImagePaths);
  return isImagePath(value) ? [value] : [];
}

// Uploads each image from public/ to Cosmic Media, one at a time (gentle on the rate limit).
// Returns local path → Cosmic media name, the value a media field stores.
export async function uploadImages(cosmic: Cosmic, paths: readonly string[]): Promise<Map<string, string>> {
  const names = new Map<string, string>();
  for (const path of paths) {
    const buffer = await readFile(join(process.cwd(), "public", path));
    const { media } = await cosmic.media.insertOne({ media: { buffer, originalname: basename(path) } });
    names.set(path, media.name);
    console.log(`  image  ${path}`);
  }
  return names;
}
