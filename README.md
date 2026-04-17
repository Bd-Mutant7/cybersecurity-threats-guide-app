# CyberGuide App

A Next.js web application for the [Cybersecurity Threats & Vulnerabilities Guide](https://github.com/Bd-Mutant7/Cybersecurity-Threats-Guide).




[![Support](https://img.shields.io/badge/Support-Paystack-00C3F7?style=for-the-badge&logo=paypal&logoColor=white)](https://paystack.shop/pay/bd-mutant7)




## Features

- 📚 **20+ threat pages** across 6 security categories
- 🔍 Browse by category with severity indicators
- 💻 Code examples for detection and prevention
- 🤖 **AI Assistant** powered by Claude (Anthropic)
- 🌙 Professional dark theme
- ⚡ Static generation for fast load times

## Getting Started

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com) (for the AI assistant)

### Installation

```bash
git clone https://github.com/Bd-Mutant7/cybersecurity-threats-guide-app
cd cybersecurity-threats-guide-app
npm install
```

### Environment Variables

Create a `.env.local` file:

```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Deploying to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add environment variable: `ANTHROPIC_API_KEY`
4. Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Project Structure

```
app/
  page.jsx              # Homepage
  layout.jsx            # Root layout + Navbar/Footer
  categories/[slug]/    # Category pages
  threats/[slug]/       # Individual threat pages
  ask/                  # AI assistant
  api/ask/              # Claude API route
components/
  Navbar.jsx
  Footer.jsx
  CategoryCard.jsx
  ThreatCard.jsx
  SeverityBadge.jsx
lib/
  data.js               # All threat data (20+ threats)
```

## Source Repository

All Python detection/prevention scripts come from the original guide:
[Bd-Mutant7/Cybersecurity-Threats-Guide](https://github.com/Bd-Mutant7/Cybersecurity-Threats-Guide)

## Disclaimer

For **educational and defensive purposes only**. Do not apply these techniques to systems you don't own or have explicit permission to test.

## License

MIT
