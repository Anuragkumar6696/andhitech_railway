// pages/api/proxy/site-settings.js
//
// FIX: Explicit Content-Type + strict JSON guard prevents RSC header bleed.

export default async function handler(req, res) {
  const base = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/+$/, '');
  const upstream = `${base}/site-settings/`;

  // Prevent Next.js RSC from reinterpreting this as an RSC stream
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('x-content-type-options', 'nosniff');

  try {
    const r = await fetch(upstream, { cache: 'no-store' });

    let json = {};
    const text = await r.text();
    try {
      json = JSON.parse(text);
    } catch {
      console.error('[proxy/site-settings] Non-JSON response:', text.slice(0, 200));
    }

    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json(r.ok ? json : {});
  } catch (e) {
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400');
    return res.status(200).json({});
  }
}
