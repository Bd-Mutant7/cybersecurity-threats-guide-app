'use client';
export const dynamic = 'force-dynamic';
import { useState, useRef, useEffect } from 'react';

const STARTERS = [
  "What's the difference between SQL injection and XSS?",
  "How does a DDoS attack work step by step?",
  "What should I do first when I suspect a ransomware attack?",
  "Explain CSRF and how CSRF tokens prevent it.",
  "What is Argon2 and why is it better than bcrypt for passwords?",
  "How can I detect an ARP spoofing attack on my network?",
];

export default function AskPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm the CyberGuide AI — ask me anything about the cybersecurity threats in this guide. I can explain attack techniques, detection methods, prevention strategies, and code examples." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const send = async (text) => {
    const q = text || input;
    if (!q.trim() || loading) return;
    setMessages((prev) => [...prev, { role: 'user', text: q }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', text: data.answer || 'Sorry, I could not process that.' }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Something went wrong. Please try again.' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '56px 24px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 11, letterSpacing: '0.18em', color: '#e8a030', textTransform: 'uppercase', marginBottom: 10 }}>AI Assistant</p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, color: '#f0ede8', fontWeight: 400, margin: '0 0 10px', letterSpacing: '-0.02em' }}>
          Ask anything
        </h1>
        <p style={{ fontSize: 14, color: '#6a6a7e', margin: 0 }}>
          Powered by Claude — knowledgeable about all threats in this guide.
        </p>
      </div>

      {/* Starter questions */}
      {messages.length <= 1 && (
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, color: '#3a3a4e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Suggested questions</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {STARTERS.map((s, i) => (
              <button key={i} onClick={() => send(s)} style={{
                background: '#161618', border: '1px solid #2a2a2f',
                borderRadius: 8, padding: '8px 14px', color: '#8a8790',
                fontSize: 12, cursor: 'pointer', textAlign: 'left', lineHeight: 1.4,
                transition: 'all 0.15s',
              }}
                onMouseEnter={e => { e.target.style.borderColor = 'rgba(232,160,48,0.35)'; e.target.style.color = '#e8a030'; }}
                onMouseLeave={e => { e.target.style.borderColor = '#2a2a2f'; e.target.style.color = '#8a8790'; }}
              >{s}</button>
            ))}
          </div>
        </div>
      )}

      {/* Chat window */}
      <div style={{
        background: '#161618', border: '1px solid #2a2a2f',
        borderRadius: 16, overflow: 'hidden',
      }}>
        <div style={{
          height: 440, overflowY: 'auto', padding: 24,
          display: 'flex', flexDirection: 'column', gap: 18,
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              display: 'flex', flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
              gap: 12, alignItems: 'flex-start',
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                background: m.role === 'user' ? 'rgba(232,160,48,0.15)' : 'rgba(107,140,222,0.15)',
                border: `1px solid ${m.role === 'user' ? 'rgba(232,160,48,0.3)' : 'rgba(107,140,222,0.3)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, color: m.role === 'user' ? '#e8a030' : '#6b8cde', fontWeight: 700,
              }}>{m.role === 'user' ? 'U' : '⚿'}</div>
              <div style={{
                maxWidth: '82%',
                background: m.role === 'user' ? 'rgba(232,160,48,0.07)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${m.role === 'user' ? 'rgba(232,160,48,0.15)' : '#2a2a2f'}`,
                borderRadius: 12, padding: '13px 18px',
                fontSize: 13, color: '#c8c4be', lineHeight: 1.7,
                whiteSpace: 'pre-wrap',
              }}>{m.text}</div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(107,140,222,0.15)', border: '1px solid rgba(107,140,222,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#6b8cde', fontWeight: 700 }}>⚿</div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #2a2a2f', borderRadius: 12, padding: '16px 18px', display: 'flex', gap: 6, alignItems: 'center' }}>
                {[0, 1, 2].map((j) => (
                  <div key={j} style={{ width: 6, height: 6, borderRadius: '50%', background: '#4a4a5e', animation: 'bounce 1.2s infinite', animationDelay: `${j * 0.2}s` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input bar */}
        <div style={{ borderTop: '1px solid #2a2a2f', padding: '14px 16px', display: 'flex', gap: 10 }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Ask about any cybersecurity threat... (Enter to send)"
            style={{
              flex: 1, background: '#0f0f11', border: '1px solid #2a2a2f',
              borderRadius: 10, padding: '11px 14px',
              color: '#c8c4be', fontSize: 13, resize: 'none', height: 56,
              outline: 'none', fontFamily: 'inherit', lineHeight: 1.5,
            }}
          />
          <button onClick={() => send()} disabled={loading || !input.trim()} style={{
            background: 'linear-gradient(135deg,#e8a030,#c47a18)',
            border: 'none', borderRadius: 10, padding: '0 22px',
            color: '#0f0f11', fontWeight: 700, fontSize: 18,
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            opacity: loading || !input.trim() ? 0.5 : 1,
            transition: 'opacity 0.2s',
          }}>→</button>
        </div>
      </div>

      <p style={{ fontSize: 11, color: '#3a3a4e', marginTop: 12, textAlign: 'center' }}>
        Always verify information with official security resources.
      </p>
    </div>
  );
}
