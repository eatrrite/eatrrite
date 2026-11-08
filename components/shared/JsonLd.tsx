// Structured data (JSON-LD) for Google (brief §6.4). "<" is escaped so the data can never
// close the script tag early.
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
