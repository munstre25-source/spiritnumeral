# Spirituality pSEO Platform

A high-performance Programmatic SEO (pSEO) platform built with Next.js 15 for the spirituality/numerology niche. Generates 1,000+ unique, SEO-optimized pages targeting long-tail keywords like "Angel Number [X] meaning [Modifier] 2026".

## Features

- **90+ Angel Numbers**: Complete dataset covering all triple-digit numbers (111-999)
- **9 Life Path Numbers**: Full numerology life path meanings
- **Multiple URL Patterns**: Intent-based routing for maximum SEO coverage
- **JSON-LD Schema**: Rich snippets for FAQ and Article schema
- **Interactive Calculator**: Numerology calculator for life path calculation
- **FAQ Components**: Expandable FAQ sections on every page
- **ClickBank Integration**: Automated affiliate link management
- **Dynamic Sitemap**: Auto-generated sitemap for all 1,000+ pages
- **Pinterest Templates**: 20 pin templates for organic traffic

## Project Structure

```
src/
├── app/
│   ├── meaning/[category]/[slug]/page.tsx  # Main meaning pages
│   ├── why-am-i-seeing/[number]/page.tsx   # "Why am I seeing" pages
│   ├── is-[number]-a-warning/[number]/page.tsx  # Warning debunk pages
│   ├── [number]-twin-flame/[number]/page.tsx  # Twin flame pages
│   ├── calculator/page.tsx                 # Calculator page
│   ├── sitemap.ts                          # Dynamic sitemap
│   └── page.tsx                            # Homepage
├── components/
│   ├── Calculator.tsx                      # Numerology calculator
│   └── FAQ.tsx                             # FAQ accordion component
├── lib/
│   ├── data/
│   │   └── spirituality-dataset.json      # Complete dataset (90+ numbers)
│   └── utils/
│       ├── pseo.ts                         # PSEO utilities
│       ├── schema.ts                       # JSON-LD schema generator
│       └── clickbank.ts                    # ClickBank affiliate integration
└── assets/
    └── pinterest/                          # Pinterest pin templates
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Generate the expanded dataset (if not already generated):
```bash
node generate-dataset.js
```

4. Set up environment variables:
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://spiritnumeral.com
NEXT_PUBLIC_CLICKBANK_AFFILIATE_ID=your_affiliate_id
# For daily number emails (cron + Resend)
RESEND_API_KEY=re_xxx
RESEND_FROM=reports@spiritnumeral.com
CRON_SECRET=your_random_secret  # e.g. openssl rand -hex 32 (required for /api/cron/daily-number)
```

5. Run the development server:
```bash
npm run dev
```

6. Build for production:
```bash
npm run build
```

## Configuration

### ClickBank Integration

Update `src/lib/utils/clickbank.ts` with your ClickBank affiliate ID:

1. Replace `YOUR_AFFILIATE_ID` with your actual ClickBank affiliate ID
2. Or set `NEXT_PUBLIC_CLICKBANK_AFFILIATE_ID` in your environment variables

### Site URL

Set `NEXT_PUBLIC_SITE_URL` in your environment variables for proper sitemap generation and schema markup.

## URL Patterns

The platform generates multiple URL patterns for maximum SEO coverage:

1. **Main Pages**: `/meaning/angel-number/[number]` and `/meaning/life-path/[path]`
2. **Intent-Based**: `/why-am-i-seeing/[number]`
3. **Debunking**: `/is-[number]-a-warning/[number]`
4. **Twin Flame**: `/[number]-twin-flame/[number]`

## SEO Features

- **JSON-LD Schema**: FAQ and Article schema on every page
- **Dynamic Metadata**: Unique titles and descriptions for each page
- **Sitemap**: Auto-generated sitemap with all URLs
- **Internal Linking**: Strategic internal links between related pages

## Monetization

### ClickBank Offers

The platform automatically selects the best ClickBank offer based on page category:

- **Numerology/Life Path pages**: Numerologist ($10.34 APV, 1.19% conversion)
- **Twin Flame pages**: Soulmate Reading ($16.95 APV, 1.46% conversion)
- **Manifestation pages**: Wealth DNA Code ($48.30 APV, 0.82% conversion)

### Customization

Edit `src/lib/utils/clickbank.ts` to:
- Add new offers
- Change offer selection logic
- Customize CTA text

## Pinterest Marketing

20 Pinterest pin templates are included in `assets/pinterest/pin-templates.md`. Use these to:

1. Create visual pins (1000x1500px)
2. Drive organic traffic
3. Build brand awareness
4. Increase conversions

## Data Expansion

The dataset currently includes:
- 90+ angel numbers (111-999)
- 9 life paths (1-9)

To expand further:
1. Edit `generate-dataset.js`
2. Add more content variations
3. Run `node generate-dataset.js`

## Performance

- **Static Generation**: All pages are statically generated at build time
- **Fast Loading**: Optimized for Core Web Vitals
- **SEO Optimized**: Rich snippets, proper metadata, sitemap

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Other Platforms

The project uses standard Next.js features and can be deployed to:
- Netlify
- AWS Amplify
- Any Node.js hosting

## Next Steps

1. **Content Enhancement**: Add more unique content variations
2. **Image Assets**: Create actual Pinterest pins from templates
3. **Email List**: Set up email capture for the calculator
4. **Analytics**: Add Google Analytics and conversion tracking
5. **A/B Testing**: Test different CTAs and page layouts

## Support

For questions or issues, refer to the plan document or create an issue in the repository.

## License

This project is for your use. Customize as needed for your spirituality pSEO site.
