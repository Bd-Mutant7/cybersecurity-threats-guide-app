import Link from 'next/link';
import { getThreatsByCategory } from '../lib/data';

export default function CategoryCard({ category, index = 0 }) {
  const threats = getThreatsByCategory(category.slug);
  const criticalCount = threats.filter((t) => t.severity === 'critical').length;

  return (
    <Link href={`/categories/${category.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#161618', border: '1px solid #2a2a2f', borderRadius: 16,
        padding: '28px', cursor: 'pointer',
        transition: 'border-color 0.2s, transform 0.2s',
        animationDelay: `${index * 0.07}s`,
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = category.color; e.currentTarget.style.transform = 'translateY(-3px)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2f'; e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        <div style={{
          width: 44, height: 44, borderRadius: 12, marginBottom: 18,
          background: category.colorDim, border: `1px solid ${category.colorBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, color: category.color,
        }}>{category.icon}</div>

        <h2 style={{
          fontSize: 18, fontWeight: 600, color: '#f0ede8', margin: '0 0 6px',
          fontFamily: "'DM Serif Display', serif",
        }}>{category.title}</h2>
        <p style={{ fontSize: 13, color: '#6a6a7e', lineHeight: 1.6, margin: '0 0 18px' }}>
          {category.description}
        </p>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#5a5a6e' }}>
            <span style={{ color: category.color, fontWeight: 600 }}>{threats.length}</span> threats
          </span>
          {criticalCount > 0 && (
            <span style={{
              fontSize: 10, fontWeight: 600, color: '#f87171',
              background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)',
              borderRadius: 99, padding: '2px 9px',
            }}>{criticalCount} Critical</span>
          )}
          <span style={{ marginLeft: 'auto', color: category.color, fontSize: 16 }}>→</span>
        </div>
      </div>
    </Link>
  );
}
