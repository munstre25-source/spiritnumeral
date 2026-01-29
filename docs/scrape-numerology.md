# Scrape numerology sources (BeautifulSoup)

This script pulls raw text blocks from approved sources so we can normalize and rewrite them into unique, SEO-safe content.

Important:
- You must have permission to scrape these sites.
- Do not publish scraped text verbatim. Use it for structure + summary only.

## Install deps

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install requests beautifulsoup4
```

## Run

```bash
python3 scripts/scrape_numerology.py
```

## Output

`data/scraped/numerology_raw.json`

## Next step

Normalize and rewrite the extracted content into your JSON schema before importing into Supabase.
