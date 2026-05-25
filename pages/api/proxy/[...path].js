export default async function handler(req, res) {
  const { path } = req.query;
  const endpoint = Array.isArray(path) ? path.join('/') : path;
  
  // build upstream safely (no double slashes)
  const base = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/+$/,'');
  const upstream = `${base}/${endpoint}/`;

  // Disable SSL verification for the proxy if needed (since it was done in getStaticProps)
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  try {
    const r = await fetch(upstream, { 
      cache: 'no-store',
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    let json = {};
    try { json = await r.json(); } catch {}

    return res.status(r.status).json(json);
  } catch (e) {
    console.error(`Proxy error for ${endpoint}:`, e);
    return res.status(500).json({ error: 'Proxy error' });
  }
}
