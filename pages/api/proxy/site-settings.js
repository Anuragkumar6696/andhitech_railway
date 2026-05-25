export default async function handler(req, res) {
  // build upstream safely (no double slashes)
  const base = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/+$/,'');
  const upstream = `${base}/site-settings/`;

  try {
    const r = await fetch(upstream, { cache: 'no-store' });

    // Try to parse JSON even on non-200 so we never 500 here
    let json = {};
    try { json = await r.json(); } catch {}

    // Always respond 200 to the client; log status for debugging
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json(r.ok ? json : {});
  } catch (e) {
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400');
    return res.status(200).json({});
  }
}
