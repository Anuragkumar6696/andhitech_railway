// pages/api/proxy/[...path].js
//
// FIX: Added explicit Content-Type response header and strict JSON guard.
// Next.js 16 RSC mode can cause the browser to receive an RSC payload
// (a streaming text format, not JSON) when client-side fetch() hits an
// API route at the same time as an RSC navigation prefetch. Adding
// 'Content-Type: application/json' on the response ensures Next.js
// never treats this route's response as an RSC stream.

export default async function handler(req, res) {
  const { path } = req.query;
  const endpoint = Array.isArray(path) ? path.join('/') : path;

  // Build upstream URL safely (no double slashes)
  const base = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/+$/, '');
  const upstream = `${base}/${endpoint}/`;

  // Disable SSL verification for self-signed certs on the upstream API
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  // Prevent Next.js RSC from caching or reinterpreting this response
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('x-content-type-options', 'nosniff');

  try {
    const r = await fetch(upstream, {
      cache: 'no-store',
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    let json = {};
    const text = await r.text();
    try {
      json = JSON.parse(text);
    } catch {
      // Upstream returned non-JSON — log and return empty object
      console.error(`[proxy] Non-JSON response from ${upstream}:`, text.slice(0, 200));
      return res.status(200).json({});
    }

    return res.status(r.status).json(json);
  } catch (e) {
    console.error(`[proxy] Error for ${endpoint}:`, e.message);
    return res.status(500).json({ error: 'Proxy error' });
  }
}
