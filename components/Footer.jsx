export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #1a1a22',
      padding: '28px 40px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: 12,
      marginTop: 'auto',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 24, height: 24, borderRadius: 6,
          background: 'linear-gradient(135deg,#e8a030,#c47a18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: '#0f0f11',
        }}>⚿</div>
        <span style={{ fontSize: 13, color: '#3a3a4e' }}>
          CyberGuide — Educational use only. Do not use these techniques on systems you don't own.
        </span>
      </div>
      <div style={{ display: 'flex', gap: 20 }}>
        {['GitHub', 'Contributing', 'MIT License'].map((l) => (
          <a key={l}
            href="https://github.com/Bd-Mutant7/Cybersecurity-Threats-Guide"
            target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 12, color: '#3a3a4e', textDecoration: 'none' }}>
            {l}
          </a>
        ))}
      </div>
    </footer>
  );
}
