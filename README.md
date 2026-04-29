# Gunabhiram Billa — Portfolio

A static site. No build step, no dependencies. Just HTML, CSS, JS, and one image.

## Files

```
portfolio/
├── index.html              # Main page
├── styles.css              # Shared styles (nav, cursor, layout, footer)
├── article.css             # Article-page-specific styles
├── script.js               # Interactivity (cursor, counters, reveal)
├── headshot.jpg            # Profile photo
└── articles/               # 8 article pages
    ├── multi-tenant-warehouse.html
    ├── idempotent-etl.html
    ├── snowflake-cost.html
    ├── cdc-vs-snapshot.html
    ├── fact-dimension-modeling.html
    ├── reconciliation-layer.html
    ├── analytics-workflow.html
    └── sms-optimization.html
```

## Run locally

```bash
cd portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Static-host friendly. Works on GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, etc.
No environment variables, no secrets, no build command.
