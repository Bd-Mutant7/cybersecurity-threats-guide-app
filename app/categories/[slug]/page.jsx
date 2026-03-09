import { notFound } from 'next/navigation';
import Link from 'next/link';
import ThreatCard from '../../../components/ThreatCard';
import { categories, getCategoryBySlug, getThreatsByCategory } from '../../../lib/data';

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) return {};
  return { title: `${cat.title} | CyberGuide`, description: cat.description };
}

export default function CategoryPage({ params }) {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) notFound();

  const threats = getThreatsByCategory(cat.slug);
  const criticalCount = threats.filter((t) => t.severity === 'critical').length;
  const highCount = threats.filter((t) => t.severity === 'high').length;

  return (
    <div style={{ maxWidth: 1040, margin: '0 auto', padding: '56px 24px 80px' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 40, fontSize: 12, color: '#5a5a6e' }}>
        <Link href="/" style={{ color: '#5a5a6e', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <span style={{ color: cat.color }}>{cat.title}</span>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 48, flexWrap: 'wrap' }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16, flexShrink: 0,
          background: cat.colorDim, border: `1px solid ${cat.colorBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, color: cat.color,
        }}>{cat.icon}</div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.16em', color: cat.color, textTransform: 'uppercase', marginBottom: 8 }}>Category</p>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif", fontSize: 42, color: '#f0ede8',
            fontWeight: 400, margin: '0 0 10px', letterSpacing: '-0.02em',
          }}>{cat.title}</h1>
          <p style={{ fontSize: 15, color: '#8a8790', margin: 0, lineHeight: 1.65 }}>{cat.description}</p>
          <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: '#5a5a6e' }}>
              <span style={{ color: cat.color, fontWeight: 600 }}>{threats.length}</span> threats
            </span>
            {criticalCount > 0 && (
              <span style={{ fontSize: 12, color: '#f87171', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: 99, padding: '2px 10px' }}>
                {criticalCount} Critical
              </span>
            )}
            {highCount > 0 && (
              <span style={{ fontSize: 12, color: '#fb923c', background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.25)', borderRadius: 99, padding: '2px 10px' }}>
                {highCount} High
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
        {categories.map((c) => (
          <Link key={c.slug} href={`/categories/${c.slug}`} style={{
            padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 500,
            textDecoration: 'none', transition: 'all 0.15s',
            background: c.slug === cat.slug ? c.colorDim : 'rgba(255,255,255,0.03)',
            border: `1px solid ${c.slug === cat.slug ? c.colorBorder : '#2a2a2f'}`,
            color: c.slug === cat.slug ? c.color : '#5a5a6e',
          }}>{c.icon} {c.title}</Link>
        ))}
      </div>

      {/* Threats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {threats.map((t) => <ThreatCard key={t.slug} threat={t} />)}
      </div>

      {/* Repo link */}
      <div style={{
        marginTop: 56, background: '#161618', border: '1px solid #2a2a2f',
        borderRadius: 14, padding: '24px 28px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
      }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#f0ede8', margin: '0 0 4px' }}>View source scripts</p>
          <p style={{ fontSize: 12, color: '#5a5a6e', margin: 0 }}>
            All detection and prevention scripts live in <code>{cat.repoPath}/</code>
          </p>
        </div>
        <a href={`https://github.com/Bd-Mutant7/Cybersecurity-Threats-Guide/tree/main/${cat.repoPath}`}
          target="_blank" rel="noopener noreferrer"
          style={{ background: 'rgba(232,160,48,0.1)', border: '1px solid rgba(232,160,48,0.3)',
            borderRadius: 9, padding: '9px 20px', color: '#e8a030',
            fontSize: 13, textDecoration: 'none', fontWeight: 600, flexShrink: 0 }}>
          Open on GitHub →
        </a>
      </div>
    </div>
  );
}
