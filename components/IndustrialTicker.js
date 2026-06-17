'use client';

/*
 * IndustrialTicker — scrolling capability marquee
 * Used between Hero and Statistics
 */

const items = [
  'HVAC Systems', '✦', 'Brake Components', '✦', 'Air Springs', '✦',
  'RDSO Approved', '✦', 'Vande Bharat', '✦', 'LHB Coaches', '✦',
  'Metro Rail', '✦', 'Make in India', '✦', 'ISO 9001:2015', '✦',
  'Precision Engineering', '✦', 'Rolling Stock', '✦', 'Indian Railways', '✦',
];

export default function IndustrialTicker({ inverted = false }) {
  const bg   = inverted ? '#0B1F3A' : '#0F2847';
  const text = 'rgba(184,135,70,.55)';
  const sep  = 'rgba(184,135,70,.28)';

  return (
    <div
      style={{
        background: bg,
        borderTop: '1px solid rgba(255,255,255,.04)',
        borderBottom: '1px solid rgba(255,255,255,.04)',
        padding: '11px 0',
        overflow: 'hidden',
        position: 'relative',
      }}
      aria-hidden="true"
    >
      <div style={{ display: 'flex' }}>
        {/* Duplicate items for seamless loop */}
        <div className={inverted ? 'ticker-rev' : 'ticker'}>
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '.62rem',
                letterSpacing: item === '✦' ? 0 : '.2em',
                textTransform: 'uppercase',
                color: item === '✦' ? sep : text,
                fontWeight: item === '✦' ? 400 : 600,
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
