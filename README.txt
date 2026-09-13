MUSA3D CSP refactor package

Files:
- index.html
- styles.css
- app.js
- vercel.json

Important:
Copy these four files into your EXISTING musa3d project folder.
Do not delete your existing images, teacher photos, favicons, robots.txt, sitemap.xml, or Google verification file.

CSP:
- No 'unsafe-inline'
- No 'unsafe-eval'
- Inline event handlers removed
- Inline CSS moved to styles.css
- Main JavaScript moved to app.js
- Two JSON-LD blocks remain inline for SEO and are allowed only by SHA-256 hashes.

JSON-LD CSP hashes:
'sha256-buWSbQLmTs0oUGRcOX4VgcWU++24kvqRz48sFgMcnG4='
'sha256-NzjDcUYWJGoxWsYrgUdlPTeyOquzdnKXYdCQUwbC9yE='
