export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // Server-rendered from our own trusted content; JSON.stringify escapes it.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
