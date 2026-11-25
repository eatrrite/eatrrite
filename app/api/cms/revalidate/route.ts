import { revalidateTag } from "next/cache";
import { env } from "@/config/env";
import { CMS_TAG } from "@/features/cms/services/cmsContent";

// Cosmic calls this after every publish, edit or delete (Bucket → Settings → Webhooks, with
// header x-webhook-secret: COSMIC_WEBHOOK_SECRET). The next visit then loads the new copy.
export async function POST(request: Request) {
  const secret = env.cosmicWebhookSecret();
  if (!secret || request.headers.get("x-webhook-secret") !== secret) {
    return Response.json({ ok: false, error: "Not allowed" }, { status: 401 });
  }
  revalidateTag(CMS_TAG, "max");
  return Response.json({ ok: true });
}
