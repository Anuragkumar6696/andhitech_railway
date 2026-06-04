'use client';

const items = [
  'HVAC Systems', '✦', 'Brake Components', '✦', 'Air Springs', '✦',
  'RDSO Approved', '✦', 'Vande Bharat', '✦', 'LHB Coaches', '✦',
  'Metro Rail', '✦', 'Make in India', '✦', 'ISO 9001:2015', '✦',
  'Precision Engineering', '✦', 'Rolling Stock', '✦', 'Indian Railways', '✦',
];

export default function IndustrialTicker({ inverted = false }) {
  const bg   = inverted ? '#0B1F3A' : '#0F2847';
  const text = inverted ? 'rgba(184,135,70,.5)' : 'rgba(184,135,70,.6)';
  const sep  = inverted ? 'rgba(184,135,70,.25)' : 'rgba(184,135,70,.3)';

  return (
    <div className="relative overflow-hidden py-3" style={{ background: bg, borderTop: `1px solid rgba(255,255,255,.04)`, borderBottom: `1px solid rgba(255,255,255,.04)` }}>
      <div className="flex">
        <div className={inverted ? 'ticker-rev' : 'ticker'} aria-hidden>
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="flex-shrink-0 whitespace-nowrap"
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '.65rem',
                letterSpacing: item === '✦' ? 0 : '.2em',
                textTransform: 'uppercase',
                color: item === '✦' ? sep : text,
                fontWeight: item === '✦' ? 400 : 600,
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
