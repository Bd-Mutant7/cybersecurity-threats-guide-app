import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'CyberGuide — Cybersecurity Threats & Vulnerabilities',
  description:
    'A comprehensive resource covering cybersecurity threats, detection scripts, and prevention strategies across network security, web applications, malware, social engineering, cryptography, and incident response.',
  keywords: 'cybersecurity, threats, vulnerabilities, DDoS, SQL injection, XSS, malware, phishing, cryptography',
  openGraph: {
    title: 'CyberGuide — Cybersecurity Threats & Vulnerabilities',
    description: 'Cybersecurity guide covering 20+ threats with detection and prevention strategies.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0f0f11' }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
