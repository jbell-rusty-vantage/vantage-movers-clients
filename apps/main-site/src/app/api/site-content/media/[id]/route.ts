import { getPreviewSiteMedia } from "@vantage/api-client";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const media = await getPreviewSiteMedia(id);
  if (!media) return new Response(null, { status: 404 });
  return new Response(media.body, { headers: {
    "Content-Type": media.headers.get("content-type")!,
    "Cache-Control": "public, max-age=31536000, immutable",
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "default-src 'none'; sandbox",
  } });
}
