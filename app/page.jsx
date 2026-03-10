export const dynamic = 'force-dynamic';

import Link from 'next/link';
import CategoryCard from '../components/CategoryCard';
import ThreatCard from '../components/ThreatCard';
import { categories, threats, severityOrder } from '../lib/data';

const topThreats = [...threats]
  .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])
  .slice(0, 6);

const stats = [
  { n: '6', l: 'Categories' },
  { n: '20+', l: 'Threats Covered' },
  { n: '45+', l: 'Python Scripts' },
  { n: '100%', l: 'Free & Open Source' },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: '90px 48px 72px',
        maxWidth: 780, margin: '0 auto', textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-block', fontSize: 11, fontWeight: 600,
          letterSpacing: '0.18em', color: '#e8a030',
          background: 'rgba(232,160,48,0.1)', border: '1px solid rgba(232,160,48,0.25)',
          borderRadius: 99, padding: '5px 16px', marginBottom: 32, textTransform: 'uppercase',
        }}>Educational Resource · MIT Licensed</div>

        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 'clamp(38px,6vw,68px)', fontWeight: 400,
          color: '#f0ede8', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 24px',
        }}>
          Understand every<br />
          <span style={{
            background: 'linear-gradient(135deg,#e8a030 0%,#f5c870 50%,#e8a030 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>cyber threat</span>
        </h1>

        <p style={{
          fontSize: 17, color: '#8a8790', lineHeight: 1.75,
          maxWidth: 540, margin: '0 auto 40px',
        }}>
          A comprehensive guide to cybersecurity threats — covering detection techniques,
          prevention strategies, and real code examples for defenders, developers, and students.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/categories/network-security" style={{
            background: 'linear-gradient(135deg,#e8a030,#c47a18)', border: 'none',
            borderRadius: 10, padding: '13px 28px', color: '#0f0f11',
            fontWeight: 700, fontSize: 14, textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(232,160,48,0.25)',
          }}>Explore Categories →</Link>
          <Link href="/ask" style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10, padding: '13px 28px', color: '#c8c4be',
            fontSize: 14, textDecoration: 'none', fontWeight: 500,
          }}>Ask AI Assistant</Link>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        maxWidth: 740, margin: '0 auto 72px',
        background: '#161618', border: '1px solid #2a2a2f',
        borderRadius: 16, overflow: 'hidden',
        display: 'flex',
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            flex: 1, padding: '26px 16px', textAlign: 'center',
            borderRight: i < stats.length - 1 ? '1px solid #2a2a2f' : 'none',
          }}>
            <div style={{
              fontSize: 28, fontWeight: 700, color: '#f0ede8',
              fontFamily: "'DM Serif Display', serif",
            }}>{s.n}</div>
            <div style={{ fontSize: 11, color: '#5a5a6e', marginTop: 4, letterSpacing: '0.06em' }}>{s.l}</div>
          </div>
        ))}
      </section>

      {/* Categories grid */}
      <section style={{ maxWidth: 1040, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.16em', color: '#e8a030', textTransform: 'uppercase', marginBottom: 10 }}>All Categories</p>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif", fontSize: 36, color: '#f0ede8',
            fontWeight: 400, margin: 0, letterSpacing: '-0.02em',
          }}>Six domains of security</h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {categories.map((cat, i) => (
            <CategoryCard key={cat.slug} category={cat} index={i} />
          ))}
        </div>
      </section>

      {/* Top threats */}
      <section style={{
        maxWidth: 1040, margin: '0 auto 80px', padding: '0 24px',
        borderTop: '1px solid #1e1e26', paddingTop: 64,
      }}>
        <div style={{ marginBottom: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.16em', color: '#e8a030', textTransform: 'uppercase', marginBottom: 10 }}>Priority Threats</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: '#f0ede8', fontWeight: 400, margin: 0 }}>Highest severity</h2>
          </div>
          <Link href="/categories/network-security" style={{ fontSize: 13, color: '#e8a030', textDecoration: 'none' }}>View all threats →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
          {topThreats.map((t) => <ThreatCard key={t.slug} threat={t} />)}
        </div>
      </section>

      {/* Disclaimer banner */}
      <section style={{ maxWidth: 1040, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{
          background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.2)',
          borderRadius: 14, padding: '20px 28px',
          display: 'flex', gap: 16, alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>⚠</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#f87171', margin: '0 0 4px' }}>Educational Purposes Only</p>
            <p style={{ fontSize: 12, color: '#6a6a7e', margin: 0, lineHeight: 1.6 }}>
              All content in this guide is for educational and defensive security purposes only. Do not apply these
              techniques to systems you do not own or have explicit written permission to test. The authors are not
              responsible for any misuse of this information.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
