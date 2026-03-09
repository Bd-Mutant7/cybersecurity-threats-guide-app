'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/categories/network-security', label: 'Categories', matchPrefix: '/categories' },
    { href: '/ask', label: 'AI Assistant' },
  ];

  const isActive = (link) => {
    if (link.matchPrefix) return pathname.startsWith(link.matchPrefix);
    return pathname === link.href;
  };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(15,15,17,0.9)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid #1e1e26',
      padding: '0 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: 60,
    }}>
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: 'linear-gradient(135deg,#e8a030,#c47a18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 700, color: '#0f0f11',
        }}>⚿</div>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#f0ede8', letterSpacing: '-0.02em' }}>
          CyberGuide
        </span>
      </Link>

      {/* Desktop nav */}
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} style={{
            padding: '6px 14px', borderRadius: 7,
            fontSize: 13, fontWeight: 500, textDecoration: 'none',
            transition: 'all 0.15s',
            background: isActive(link) ? 'rgba(232,160,48,0.1)' : 'transparent',
            border: `1px solid ${isActive(link) ? 'rgba(232,160,48,0.25)' : 'transparent'}`,
            color: isActive(link) ? '#e8a030' : '#8a8790',
          }}>{link.label}</Link>
        ))}
        <a
          href="https://github.com/Bd-Mutant7/Cybersecurity-Threats-Guide"
          target="_blank" rel="noopener noreferrer"
          style={{
            marginLeft: 8, padding: '7px 16px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid #2a2a2f', borderRadius: 8,
            color: '#8a8790', fontSize: 12, fontWeight: 600,
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
          }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </div>
    </nav>
  );
}
