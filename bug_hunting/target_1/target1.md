Today i chose my next target on hackerone.

It is a social platform and today i m going to do recon on ********.*********.com



Welcome to the ultimate recon roadmap for bug bounty hunting. This document is designed for bug bounty hunters who already have a target domain and want to extract every bit of information possible using expert-level reconnaissance techniques.

Each step answers three critical questions:

What is this step?

Why is it important?

What can it uncover?





---

1. Passive DNS Recon

What: This step involves looking up the domain’s public DNS records such as A (IPv4), AAAA (IPv6), MX (mail), NS (name servers), TXT (textual), and CNAME (canonical names).

Why: These records show how the domain is architected and reveal key infrastructure components like mail servers, alternative domains, or external providers.

Findings:

Target's IP address



SPF/DKIM settings in TXT records (can reveal email infrastructure)


Tools: dig, host, nslookup, DNSDumpster, SecurityTrails


---

2. WHOIS Lookup

What: WHOIS records contain metadata about domain ownership and registration.

Why: Understanding who owns the domain, when it was created, and when it expires can give insights into how long the target has been operational and possible pivot points like related domains.

Findings:

Contact emails

Organization details

Domain creation and expiration


Tools: DomainTools, WhoisXML, whois CLI tool


---

3. IP & Network Recon

What: Investigate the IP address linked to the domain for open ports and services.

Why: Different services expose different attack surfaces. Knowing which ports and services are open allows you to narrow down your testing scope.

Findings:

SSH, FTP, SMTP, and other exposed services

Server versions (possible CVEs)


Tools: Nmap, Masscan, Shodan, Censys


---

4. TLS/SSL Analysis

What: This involves checking the target's SSL certificate and cipher suite configuration.

Why: Weak or expired certificates and deprecated protocols like SSLv3 or TLS 1.0 may expose the target to man-in-the-middle or downgrade attacks.

Findings:

Weak cipher support

Misconfigured or expired certs

SANs (Subject Alternative Names) that might lead to subdomains


Tools: SSL Labs, testssl.sh, sslscan


---

5. HTTP Header Analysis

What: Analyze the response headers returned by the web server.

Why: Headers reveal security policies or the lack thereof, which could lead to XSS, clickjacking, or misconfiguration attacks.

Findings:

Missing or weak Content Security Policy

Server information disclosure

Session cookie configuration issues


Tools: httpx, curl, browser DevTools


---

6. Web Technology Fingerprinting

What: Identify technologies used on the web app such as front-end libraries, back-end languages, and frameworks.

Why: Technologies can have known CVEs. Knowing what tech the app uses gives direction for vulnerability scanning or logic testing.

Findings:

jQuery, React, Angular, etc.

WordPress, Django, Laravel, etc.


Tools: WhatWeb, Wappalyzer, Nuclei


---

7. Directory and File Bruteforcing

What: Bruteforce the web server to find hidden directories or files.

Why: Developers often leave backup folders, test environments, or admin panels accessible via unlinked URLs.

Findings:

/admin, /login, /backup.zip

Internal dashboards or staging environments


Tools: ffuf, gobuster, dirsearch


---

8. JavaScript Recon

What: Examine client-side JavaScript files for hints about app logic and backend APIs.

Why: Developers frequently leave internal API calls, keys, or debugging comments in JS.

Findings:

Internal API endpoints

Secret tokens or credentials

Debugging endpoints


Tools: LinkFinder, JSParser, browser DevTools


---

9. Cookie Analysis

What: Inspect browser cookies for security flags and possible vulnerabilities.

Why: Improperly configured cookies can lead to session hijacking or CSRF.

Findings:

Missing Secure or HttpOnly flags

Insecure SameSite configuration

JWTs or tokens for manipulation


Tools: Browser DevTools, Burp Suite


---

10. robots.txt and sitemap.xml

What: Check robots.txt and sitemap.xml for indexed or hidden URLs.

Why: Developers may unintentionally reveal non-public areas through these files.

Findings:

Restricted admin paths

Testing endpoints


Tools: Browser, curl, search engines


---

11. Parameter Discovery

What: Find GET/POST parameters used by the web app.

Why: Parameters are the entry point for almost all injection and logic-based vulnerabilities.

Findings:

user_id, file, redirect

Reflection points for XSS


Tools: Arjun, ParamSpider, Burp Suite


---

12. Archive & Cache Recon

What: Look for historical versions of the target’s web content.

Why: Legacy endpoints may still work but no longer be linked publicly.

Findings:

Old APIs

Unauthenticated admin panels


Tools: Wayback Machine, waybackurls, gau


---

13. Public Leak & Source Code Hunting

What: Search GitHub, Pastebin, and other sites for code or credentials.

Why: Developers sometimes accidentally leak credentials, internal URLs, or source code.

Findings:

Hardcoded API keys

Slack tokens, AWS secrets

Internal documentation


Tools: GitHub dorking, gitrob, truffleHog





---

14. Recon Automation Frameworks

What: Use all-in-one tools that combine many of the above steps.

Why: Save time and catch low-hanging fruit with automation.

Findings: Depends on the tool’s capability; mostly surface-level recon but efficient for wide scope.

Tools: reconftw, Osmedeus, bbrecon, BugBountyScanner



