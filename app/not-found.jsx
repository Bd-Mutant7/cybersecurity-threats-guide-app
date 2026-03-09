export default function NotFound() {
  return (
    <div style={{
      minHeight: '60vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24,
    }}>
      <div style={{ fontSize: 64, marginBottom: 24, opacity: 0.2 }}>⚿</div>
      <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 48, color: '#f0ede8', fontWeight: 400, margin: '0 0 12px' }}>
        404
      </h1>
      <p style={{ fontSize: 16, color: '#6a6a7e', margin: '0 0 32px' }}>
        This page doesn't exist in the guide.
      </p>
      <a href="/" style={{
        background: 'linear-gradient(135deg,#e8a030,#c47a18)',
        borderRadius: 10, padding: '12px 28px', color: '#0f0f11',
        fontWeight: 700, fontSize: 14, textDecoration: 'none',
      }}>Back to Home</a>
    </div>
  );
}
