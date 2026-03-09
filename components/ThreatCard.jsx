import Link from 'next/link';
import SeverityBadge from './SeverityBadge';
import { categories } from '../lib/data';

export default function ThreatCard({ threat }) {
  const cat = categories.find((c) => c.slug === threat.category);
  return (
    <Link href={`/threats/${threat.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#161618', border: '1px solid #2a2a2f', borderRadius: 14,
        padding: '22px 24px', cursor: 'pointer',
        transition: 'border-color 0.2s, transform 0.2s',
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = cat?.color || '#e8a030'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2f'; e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <span style={{
            fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: cat?.color || '#e8a030',
            background: cat?.colorDim || 'rgba(232,160,48,0.1)',
            border: `1px solid ${cat?.colorBorder || 'rgba(232,160,48,0.25)'}`,
            borderRadius: 99, padding: '2px 10px',
          }}>{cat?.title || threat.category}</span>
          <SeverityBadge severity={threat.severity} />
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: '#f0ede8', margin: '0 0 4px', fontFamily: "'DM Serif Display', serif" }}>{threat.title}</h3>
        <p style={{ fontSize: 12, color: '#5a5a6e', margin: '0 0 12px' }}>{threat.subtitle}</p>
        <p style={{ fontSize: 13, color: '#6a6a7e', lineHeight: 1.6, margin: 0,
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>{threat.description}</p>
        <div style={{ marginTop: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {threat.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{
              fontSize: 10, color: '#3a3a4e', background: 'rgba(255,255,255,0.04)',
              border: '1px solid #2a2a2f', borderRadius: 6, padding: '2px 8px',
            }}>#{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
