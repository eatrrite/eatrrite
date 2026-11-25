import { createBucketClient } from "@cosmicjs/sdk";
import { cacheLife, cacheTag } from "next/cache";
import { env } from "@/config/env";
import { CMS_COLLECTIONS, CMS_PAGES, type CmsCollectionKey, type CmsItem, type CmsPage, type CmsPageKey } from "../sources";
import { fromCosmic, fromCosmicItem } from "../utils/fromCosmic";

// Site copy from Cosmic, read on the server only (the read key never reaches the browser).
// Results are cached; a publish in Cosmic refreshes them through /api/cms/revalidate, and
// "hours" is the safety net if that webhook is not set up. If Cosmic fails, the page shows
// the JSON copy instead.
export const CMS_TAG = "cms";

function cosmic() {
  return createBucketClient({ bucketSlug: env.cosmicBucketSlug(), readKey: env.cosmicReadKey() });
}

export async function getPage<K extends CmsPageKey>(key: K): Promise<CmsPage<K>> {
  "use cache";
  cacheTag(CMS_TAG);
  cacheLife("hours");
  const fallback = CMS_PAGES[key].content;
  try {
    const slug: string = key;
    const { object } = await cosmic().objects.findOne({ type: slug, slug }).props("metadata");
    return fromCosmic(object.metadata, fallback) as CmsPage<K>;
  } catch (error) {
    console.error(`Cosmic: could not load "${key}", showing the JSON copy.`, error);
    return fallback;
  }
}

export async function getCollection<K extends CmsCollectionKey>(key: K): Promise<CmsItem<K>[]> {
  "use cache";
  cacheTag(CMS_TAG);
  cacheLife("hours");
  const fallback: readonly CmsItem<K>[] = CMS_COLLECTIONS[key].items;
  try {
    const { objects } = await cosmic().objects.find({ type: key }).props("metadata").sort("order");
    return objects.map((object: { metadata: unknown }) => fromCosmicItem(object.metadata, fallback) as CmsItem<K>);
  } catch (error) {
    console.error(`Cosmic: could not load "${key}", showing the JSON copy.`, error);
    return [...fallback];
  }
}
