// One-time import of the site copy (the JSON files in features/cms/sources.ts) into Cosmic:
// uploads the images, creates one object type per page or collection, and publishes the content.
// Usage: bun run cms:import
// It stops if any of these object types already exist, so it never overwrites edits made in
// Cosmic. To start over, delete those object types in the Cosmic dashboard first.
import { createBucketClient } from "@cosmicjs/sdk";
import { CMS_COLLECTIONS, CMS_PAGES } from "@/features/cms/sources";
import { isRecord, mergeShapes } from "@/features/cms/utils/shapes";
import { buildMetafields } from "@/features/cms/utils/metafields";
import { toCosmic, toCosmicItem } from "@/features/cms/utils/toCosmic";
import { collectImagePaths, uploadImages } from "./cms/uploadImages";

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG ?? "",
  readKey: process.env.COSMIC_READ_KEY ?? "",
  writeKey: process.env.COSMIC_WRITE_KEY ?? "",
});

const TYPE_SLUGS = [...Object.keys(CMS_PAGES), ...Object.keys(CMS_COLLECTIONS)];

// Cosmic answers 404 when the bucket has no object types at all.
async function existingTypes(): Promise<{ slug: string }[]> {
  try {
    const { object_types } = (await cosmic.objectTypes.find()) as { object_types?: { slug: string }[] };
    return object_types ?? [];
  } catch (error) {
    if (isRecord(error) && error.status === 404) return [];
    throw error;
  }
}

async function assertTypesAreNew(): Promise<void> {
  const existing = await existingTypes();
  const clashes = existing.map((type) => type.slug).filter((slug) => TYPE_SLUGS.includes(slug));
  if (clashes.length > 0) throw new Error(`Already in Cosmic: ${clashes.join(", ")}. Nothing was imported.`);
}

async function importPages(media: Map<string, string>): Promise<void> {
  for (const [slug, page] of Object.entries(CMS_PAGES)) {
    const metafields = buildMetafields(page.content);
    await cosmic.objectTypes.insertOne({ title: page.title, singular: page.title, slug, emoji: page.emoji, singleton: true, metafields });
    await cosmic.objects.insertOne({ title: page.title, type: slug, slug, status: "published", metadata: toCosmic(page.content, media) });
    console.log(`  page   ${slug}`);
  }
}

async function importCollections(media: Map<string, string>): Promise<void> {
  for (const [slug, collection] of Object.entries(CMS_COLLECTIONS)) {
    const metafields = buildMetafields(mergeShapes(collection.items) as Record<string, unknown>);
    await cosmic.objectTypes.insertOne({ title: collection.title, singular: collection.singular, slug, emoji: collection.emoji, metafields });
    for (const item of collection.items) {
      const fields = item as Record<string, unknown>;
      const title = String(fields[collection.titleKey]);
      const objectSlug = typeof fields.slug === "string" ? { slug: fields.slug } : {};
      await cosmic.objects.insertOne({ title, type: slug, ...objectSlug, status: "published", metadata: toCosmicItem(item, collection.items, media) });
    }
    console.log(`  list   ${slug} (${collection.items.length})`);
  }
}

function describe(error: unknown): string {
  if (error instanceof Error) return error.message;
  return JSON.stringify(error);
}

try {
  await assertTypesAreNew();
  const images = collectImagePaths([Object.values(CMS_PAGES).map((p) => p.content), Object.values(CMS_COLLECTIONS).map((c) => c.items)]);
  console.log(`Uploading ${images.length} images…`);
  const media = await uploadImages(cosmic, images);
  console.log("Creating object types and content…");
  await importPages(media);
  await importCollections(media);
  console.log("Done. Open Cosmic → Objects to check.");
} catch (error) {
  console.error(`Import failed: ${describe(error)}`);
  process.exitCode = 1;
}
