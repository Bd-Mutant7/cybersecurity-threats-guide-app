import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are CyberGuide AI — an expert cybersecurity educator embedded in the Cybersecurity Threats & Vulnerabilities Guide (https://github.com/Bd-Mutant7/Cybersecurity-Threats-Guide).

Your knowledge covers:
- Network Security: DDoS, MITM, Port Scanning, DNS Spoofing
- Web Application Security: SQL Injection, XSS, CSRF, Session Hijacking
- Malware Analysis: Ransomware, Trojans, Rootkits, Keyloggers
- Social Engineering: Phishing, Pretexting, Baiting, Tailgating
- Cryptography: AES, RSA, Hashing (Argon2/bcrypt), Digital Signatures
- Incident Response: Digital Forensics, Containment, Recovery, Post-Incident Analysis

Guidelines:
- Explain clearly for students and developers, with practical examples
- Always emphasise defensive/detection/prevention perspectives
- Reference Python code patterns where relevant
- Keep answers concise but complete (3-6 paragraphs max)
- Add a disclaimer for offensive techniques that they are for educational purposes only
- Never provide step-by-step attack instructions against real systems`;

export async function POST(req) {
  try {
    const { question } = await req.json();

    if (!question || question.trim().length === 0) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: question }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic API error:', err);
      return NextResponse.json({ error: 'AI service error' }, { status: 500 });
    }

    const data = await response.json();
    const answer = data.content?.map((c) => c.text || '').join('') || 'No response generated.';

    return NextResponse.json({ answer });
  } catch (err) {
    console.error('Ask API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
