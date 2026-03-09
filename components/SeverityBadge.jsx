const config = {
  critical: { label: 'Critical', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.3)', color: '#f87171' },
  high:     { label: 'High',     bg: 'rgba(251,146,60,0.1)',  border: 'rgba(251,146,60,0.3)',  color: '#fb923c' },
  medium:   { label: 'Medium',   bg: 'rgba(232,160,48,0.1)', border: 'rgba(232,160,48,0.3)', color: '#e8a030' },
  low:      { label: 'Low',      bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.3)', color: '#4ade80' },
};

export default function SeverityBadge({ severity, size = 'sm' }) {
  const c = config[severity] || config.low;
  const fs = size === 'lg' ? 13 : 10;
  const pad = size === 'lg' ? '5px 14px' : '3px 10px';
  return (
    <span style={{
      fontSize: fs, fontWeight: 600, letterSpacing: '0.06em',
      color: c.color, background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: 99, padding: pad, textTransform: 'uppercase',
      display: 'inline-block',
    }}>{c.label}</span>
  );
}
