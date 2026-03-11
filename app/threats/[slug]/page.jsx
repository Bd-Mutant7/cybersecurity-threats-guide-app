export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import SeverityBadge from '../../components/SeverityBadge';
import { threats, getThreatBySlug, getCategoryBySlug } from '../../lib/data';

export async function generateStaticParams() {
  return threats.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const t = getThreatBySlug(params.slug);
  if (!t) return {};
  return {
    title: `${t.title} | CyberGuide`,
    description: t.description.slice(0, 155),
  };
}

export default function ThreatPage({ params }) {
  const threat = getThreatBySlug(params.slug);
  if (!threat) notFound();

  const cat = getCategoryBySlug(threat.category);

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '56px 24px 100px' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 40, fontSize: 12, color: '#5a5a6e' }}>
        <Link href="/" style={{ color: '#5a5a6e', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <Link href={`/categories/${cat?.slug}`} style={{ color: cat?.color || '#e8a030', textDecoration: 'none' }}>
          {cat?.title}
        </Link>
        <span>›</span>
        <span style={{ color: '#8a8790' }}>{threat.title}</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
          <SeverityBadge severity={threat.severity} size="lg" />
          <span style={{
            fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: cat?.color || '#e8a030', background: cat?.colorDim,
            border: `1px solid ${cat?.colorBorder}`, borderRadius: 99, padding: '4px 12px',
          }}>{cat?.icon} {cat?.title}</span>
        </div>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(32px,5vw,52px)',
          color: '#f0ede8', fontWeight: 400, margin: '0 0 8px', letterSpacing: '-0.02em',
        }}>{threat.title}</h1>
        <p style={{ fontSize: 16, color: '#6b8cde', margin: '0 0 20px', fontStyle: 'italic' }}>{threat.subtitle}</p>
        <p style={{ fontSize: 16, color: '#8a8790', lineHeight: 1.75, margin: 0, maxWidth: 680 }}>{threat.description}</p>
        <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {threat.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: 11, color: '#3a3a4e', background: 'rgba(255,255,255,0.04)',
              border: '1px solid #2a2a2f', borderRadius: 6, padding: '3px 9px',
            }}>#{tag}</span>
          ))}
        </div>
      </div>

      {/* How it works */}
      <Section title="How It Works" icon="◈" color="#6b8cde">
        <ol style={{ paddingLeft: 20, margin: 0 }}>
          {threat.howItWorks.map((step, i) => (
            <li key={i} style={{
              fontSize: 14, color: '#8a8790', lineHeight: 1.75, marginBottom: 10,
              paddingLeft: 6,
            }}>
              <span style={{ color: '#c8c4be' }}>{step}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* Types */}
      {threat.types && (
        <Section title="Attack Types" icon="⬡" color="#fb923c">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {threat.types.map((type, i) => (
              <div key={i} style={{
                background: '#0f0f11', border: '1px solid #2a2a2f', borderRadius: 10,
                padding: '14px 18px',
              }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fb923c' }}>{type.name}</span>
                <span style={{ fontSize: 13, color: '#6a6a7e', marginLeft: 10 }}>— {type.desc}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Detection */}
      <Section title="Detection Methods" icon="◉" color="#4ade80">
        <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}>
          {threat.detection.map((d, i) => (
            <li key={i} style={{
              fontSize: 14, color: '#8a8790', lineHeight: 1.7, marginBottom: 10,
              paddingLeft: 22, position: 'relative',
            }}>
              <span style={{ position: 'absolute', left: 0, color: '#4ade80', fontWeight: 700 }}>✓</span>
              <span style={{ color: '#c8c4be' }}>{d}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Prevention */}
      <Section title="Prevention Strategies" icon="⊕" color="#e8a030">
        <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}>
          {threat.prevention.map((p, i) => (
            <li key={i} style={{
              fontSize: 14, color: '#8a8790', lineHeight: 1.7, marginBottom: 10,
              paddingLeft: 22, position: 'relative',
            }}>
              <span style={{ position: 'absolute', left: 0, color: '#e8a030', fontWeight: 700 }}>→</span>
              <span style={{ color: '#c8c4be' }}>{p}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Code example */}
      {threat.codeExample && (
        <Section title="Code Example" icon="⬢" color="#a78bfa">
          <pre style={{ margin: 0 }}><code>{threat.codeExample}</code></pre>
        </Section>
      )}

      {/* Source link */}
      <div style={{
        marginTop: 48, background: '#161618', border: '1px solid #2a2a2f',
        borderRadius: 14, padding: '22px 28px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
      }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#f0ede8', margin: '0 0 3px' }}>Explore the full source code</p>
          <p style={{ fontSize: 12, color: '#5a5a6e', margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>
            {threat.repoPath}/
          </p>
        </div>
        <a href={`https://github.com/Bd-Mutant7/Cybersecurity-Threats-Guide/tree/main/${threat.repoPath}`}
          target="_blank" rel="noopener noreferrer"
          style={{ background: 'rgba(232,160,48,0.1)', border: '1px solid rgba(232,160,48,0.3)',
            borderRadius: 9, padding: '9px 20px', color: '#e8a030',
            fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>
          View on GitHub →
        </a>
      </div>

      {/* Next/prev-like: other threats in category */}
      <div style={{ marginTop: 32, paddingTop: 32, borderTop: '1px solid #1e1e26' }}>
        <p style={{ fontSize: 11, color: '#3a3a4e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
          More in {cat?.title}
        </p>
        <Link href={`/categories/${cat?.slug}`} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 13, color: cat?.color || '#e8a030', textDecoration: 'none', fontWeight: 500,
        }}>← Back to {cat?.title}</Link>
      </div>
    </div>
  );
}

function Section({ title, icon, color, children }) {
  return (
    <div style={{
      marginBottom: 40, paddingBottom: 40,
      borderBottom: '1px solid #1e1e26',
    }}>
      <h2 style={{
        fontSize: 14, fontWeight: 600, color: color,
        letterSpacing: '0.08em', textTransform: 'uppercase',
        marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span>{icon}</span> {title}
      </h2>
      {children}
    </div>
  );
}
