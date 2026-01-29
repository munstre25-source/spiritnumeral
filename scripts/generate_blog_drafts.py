#!/usr/bin/env python3
"""
Scrape whitelisted numerology sources, normalize facts, and generate SEO-ready blog drafts.
Outputs JSON (and optional CSV) with 50+ posts per section.

Usage:
  python scripts/generate_blog_drafts.py --out data/blog/blog_drafts.json --csv data/blog/blog_drafts.csv
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import os
import re
import time
from collections import defaultdict
from datetime import datetime
from typing import Dict, List, Optional, Tuple

import requests
from bs4 import BeautifulSoup


USER_AGENT = "SpiritNumeralBot/1.0 (+https://spiritnumeral.com)"
HEADERS = {"User-Agent": USER_AGENT}
TIMEOUT = 20
MAX_PAGES_PER_DOMAIN = 400
MAX_SOURCE_PAGES_PER_SECTION = 30

WHITELIST_DOMAINS = [
    "numerology.com",
    "affinitynumerology.com",
    "worldnumerology.com",
    "tokenrock.com",
    "numerologytoolbox.com",
    "seventhlifepath.com",
    "numerologysecrets.net",
]

SECTIONS = [
    ("life-path", ["life path", "life-path"]),
    ("name-numerology", ["name numerology", "expression number", "soul urge", "personality number"]),
    ("destiny-number", ["destiny number", "expression number"]),
    ("soul-urge-number", ["soul urge", "hearts desire"]),
    ("personality-number", ["personality number"]),
    ("birthday-number", ["birthday number"]),
    ("maturity-number", ["maturity number"]),
    ("personal-year", ["personal year"]),
    ("personal-month", ["personal month"]),
    ("personal-day", ["personal day"]),
    ("pinnacles", ["pinnacle number", "pinnacles"]),
    ("challenges", ["challenge number", "challenges"]),
    ("angel-numbers", ["angel number", "angel numbers"]),
    ("twin-flame", ["twin flame"]),
    ("dream-meaning", ["dream", "dream meaning"]),
    ("breakup", ["breakup", "heartbreak", "ex back"]),
    ("love-compatibility", ["compatibility", "love", "relationship"]),
    ("money", ["money", "wealth", "abundance"]),
    ("career", ["career", "purpose", "job"]),
]

NUMBERS_CORE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33]
ANGEL_NUMBERS = [111, 222, 333, 444, 555, 666, 777, 888, 999, 1111, 2222]

TOPIC_TEMPLATES = {
    "life-path": [
        "Life Path {n}: Meaning in Love and Career",
        "Life Path {n}: Strengths, Challenges, and Purpose",
        "How Life Path {n} Shows Up in Relationships",
        "Life Path {n} Compatibility: Best Matches and Red Flags",
    ],
    "name-numerology": [
        "Name Numerology: What Your Full Name Reveals",
        "Expression Number {n}: Meaning, Love, and Career",
        "Soul Urge {n}: Inner Desires and Relationship Needs",
        "Personality Number {n}: First Impressions and Social Energy",
    ],
    "destiny-number": [
        "Destiny Number {n}: Meaning and Life Themes",
        "Destiny Number {n} in Love, Money, and Career",
    ],
    "soul-urge-number": [
        "Soul Urge {n}: Deep Desires and Emotional Needs",
        "Soul Urge {n} in Love and Compatibility",
    ],
    "personality-number": [
        "Personality Number {n}: How Others See You",
        "Personality Number {n} in Career and Relationships",
    ],
    "birthday-number": [
        "Birthday Number {n}: Natural Gifts and Talents",
        "Birthday Number {n} Meaning in Love and Work",
    ],
    "maturity-number": [
        "Maturity Number {n}: Your Later-Life Purpose",
        "Maturity Number {n} and Long-Term Success",
    ],
    "personal-year": [
        "Personal Year {n}: What to Expect This Year",
        "Personal Year {n} in Love, Money, and Career",
    ],
    "personal-month": [
        "Personal Month {n}: Focus, Timing, and Action",
        "Personal Month {n} for Love and Career Decisions",
    ],
    "personal-day": [
        "Personal Day {n}: Your Daily Numerology Forecast",
        "Personal Day {n} Advice for Love and Work",
    ],
    "pinnacles": [
        "Pinnacle Number {n}: Life Phase Meaning",
        "Pinnacle {n}: Career and Relationship Focus",
    ],
    "challenges": [
        "Challenge Number {n}: Lessons and Growth Areas",
        "How to Work With Challenge Number {n}",
    ],
    "angel-numbers": [
        "Angel Number {n}: Meaning in Love and Career",
        "Why You Keep Seeing {n} and What to Do Next",
        "Angel Number {n} and Twin Flame Signals",
    ],
    "twin-flame": [
        "Twin Flame Signs: What {n} Means for Reunion",
        "Twin Flame Separation and {n}: Guidance and Timing",
    ],
    "dream-meaning": [
        "Dream Meaning of {n}: Messages and Action Steps",
        "Why You See {n} in Dreams and What It Means",
    ],
    "breakup": [
        "Breakup Healing and {n}: What the Number Reveals",
        "{n} After a Breakup: Signs You’re on the Right Path",
    ],
    "love-compatibility": [
        "Numerology Compatibility: {n} in Love",
        "Love Compatibility with {n}: Strengths and Challenges",
    ],
    "money": [
        "{n} Meaning for Money and Abundance",
        "Money Number {n}: How to Build Wealth",
    ],
    "career": [
        "{n} Meaning for Career and Purpose",
        "Career Path with {n}: Roles and Strengths",
    ],
}

DISCLAIMERS = [
    "This reading is for reflection and spiritual insight, not professional advice.",
    "Use these insights as guidance and pair them with your own judgment.",
    "Spiritual interpretations are symbolic and should be used with personal discernment.",
]


def slugify(text: str) -> str:
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", text.strip().lower())
    slug = re.sub(r"-+", "-", slug).strip("-")
    return slug


def sha1(text: str) -> str:
    return hashlib.sha1(text.encode("utf-8")).hexdigest()


def fetch_url(url: str) -> Optional[str]:
    try:
        res = requests.get(url, headers=HEADERS, timeout=TIMEOUT)
        if res.status_code != 200:
            return None
        return res.text
    except Exception:
        return None


def parse_sitemap(xml_text: str) -> List[str]:
    urls = []
    if not xml_text:
        return urls
    try:
        soup = BeautifulSoup(xml_text, "xml")
        for loc in soup.find_all("loc"):
            if loc.text:
                urls.append(loc.text.strip())
    except Exception:
        return []
    return urls


def discover_sitemap_urls(domain: str) -> List[str]:
    candidates = [
        f"https://{domain}/sitemap.xml",
        f"https://{domain}/sitemap_index.xml",
        f"https://{domain}/sitemap-index.xml",
    ]
    urls: List[str] = []
    for sm in candidates:
        xml = fetch_url(sm)
        if not xml:
            continue
        found = parse_sitemap(xml)
        if found:
            urls.extend(found)
    # If sitemap index, it may include nested sitemaps.
    nested = [u for u in urls if u.endswith(".xml")]
    for sm in nested[:10]:
        xml = fetch_url(sm)
        if xml:
            urls.extend(parse_sitemap(xml))
    # Deduplicate and keep domain-only URLs
    clean = []
    for u in urls:
        if domain in u and u.startswith("http"):
            clean.append(u)
    return list(dict.fromkeys(clean))


def extract_facts(html: str) -> Dict[str, List[str]]:
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()

    title = ""
    if soup.title and soup.title.text:
        title = soup.title.text.strip()
    h1 = soup.find("h1")
    if h1 and h1.text:
        title = h1.text.strip() or title

    paragraphs = []
    for p in soup.find_all("p"):
        text = " ".join(p.get_text(" ").split())
        if len(text) > 60:
            paragraphs.append(text)

    bullets = []
    for li in soup.find_all("li"):
        text = " ".join(li.get_text(" ").split())
        if 20 < len(text) < 180:
            bullets.append(text)

    headings = []
    for hx in soup.find_all(["h2", "h3"]):
        text = " ".join(hx.get_text(" ").split())
        if 10 < len(text) < 80:
            headings.append(text)

    # De-duplicate
    def uniq(items):
        seen = set()
        out = []
        for it in items:
            key = it.lower()
            if key in seen:
                continue
            seen.add(key)
            out.append(it)
        return out

    return {
        "title": [title] if title else [],
        "headings": uniq(headings),
        "paragraphs": uniq(paragraphs),
        "bullets": uniq(bullets),
    }


def build_intro(topic: str, facts: Dict[str, List[str]]) -> str:
    lead = facts["paragraphs"][:1]
    if lead:
        base = lead[0]
        base = re.sub(r"\s+", " ", base).strip()
        if len(base) > 180:
            base = base[:180].rsplit(" ", 1)[0] + "."
        return f"{topic} is one of the most searched numerology questions right now. {base} Use this guide for insight, clarity, and practical next steps."
    return f"{topic} is a high-intent numerology topic. This guide gives a grounded, practical interpretation for love, money, career, and next actions."


def pick_lines(items: List[str], max_items: int = 4) -> List[str]:
    return items[:max_items] if items else []


def draft_from_facts(section: str, topic: str, facts: Dict[str, List[str]]) -> str:
    intro = build_intro(topic, facts)
    bullets = pick_lines(facts["bullets"], 7)
    paragraphs = pick_lines(facts["paragraphs"], 10)

    core_points = bullets or paragraphs[:4]
    love = paragraphs[0] if paragraphs else "In relationships, focus on balance, honesty, and emotional clarity."
    career = paragraphs[1] if len(paragraphs) > 1 else "Career momentum grows when you align your strengths with your goals."
    money = paragraphs[2] if len(paragraphs) > 2 else "Financial progress improves with steady habits and aligned decisions."
    mindset = paragraphs[3] if len(paragraphs) > 3 else "A grounded mindset helps you interpret signals without overreacting."
    timing = paragraphs[4] if len(paragraphs) > 4 else "Timing improves when you take small, consistent actions."

    faq_items = [
        f"What does {topic} mean?",
        f"How does {topic} affect love?",
        f"How does {topic} affect money and career?",
        f"What should I do when this theme shows up?",
        f"Is {topic} a sign I should take action now?",
    ]

    body = []
    body.append(f"## Overview\n\n{intro}\n")
    body.append("## Core Meaning\n")
    if core_points:
        body.append("\n".join([f"- {p}" for p in core_points]))
        body.append("")
    else:
        body.append("This theme emphasizes alignment, clarity, and purposeful action.")
        body.append("")
    body.append("## Emotional & Mindset Themes\n\n" + mindset)
    body.append("\n## Love & Relationships\n\n" + love)
    body.append("\n## Money & Career\n\n" + money + "\n\n" + career)
    body.append("\n## Timing & Next Steps\n\n" + timing)
    body.append("\n## Practical Actions\n")
    body.append("- Notice when this theme appears and what you were thinking about.")
    body.append("- Focus on one clear decision and follow through for 7–14 days.")
    body.append("- Use the insight as guidance, not as a fixed prediction.")
    body.append("- Track small wins to reinforce the pattern you want.")
    body.append("\n## FAQs\n")
    for q in faq_items:
        body.append(f"### {q}\n{DISCLAIMERS[0]}")
    body.append("\n## Soft CTA\n")
    body.append("Want a personalized reading based on your exact numbers? Try the free calculator or quiz to generate a tailored report.")
    body.append("\n_Disclaimer: " + DISCLAIMERS[2] + "_")
    return "\n".join(body)


def generate_topics(section: str, per_section: int) -> List[str]:
    templates = TOPIC_TEMPLATES.get(section, [])
    topics: List[str] = []
    number_set = ANGEL_NUMBERS if section in ("angel-numbers", "twin-flame", "dream-meaning") else NUMBERS_CORE

    for n in number_set:
        for tpl in templates:
            topics.append(tpl.format(n=n))

    # Add generic long-tail variations
    extra = [
        f"{section.replace('-', ' ').title()} Guide for Beginners",
        f"{section.replace('-', ' ').title()} Meaning and How It Affects Love",
        f"Common Mistakes in {section.replace('-', ' ').title()} Readings",
        f"{section.replace('-', ' ').title()} Signs You Should Pay Attention",
        f"{section.replace('-', ' ').title()}: Practical Steps for Real Life",
        f"{section.replace('-', ' ').title()} FAQs: Quick Answers",
        f"{section.replace('-', ' ').title()} vs Life Path: Key Differences",
        f"When {section.replace('-', ' ').title()} Shows Up: What to Do Next",
    ]
    topics.extend(extra)

    modifiers = [
        "for love",
        "for money",
        "for career",
        "for relationships",
        "for personal growth",
        "for spiritual growth",
        "for beginners",
        "in 2026",
        "in 2027",
        "quick guide",
        "deep dive",
        "meaning and signs",
        "actions to take",
    ]

    base_phrases = [
        f"{section.replace('-', ' ').title()} meaning",
        f"{section.replace('-', ' ').title()} signs",
        f"{section.replace('-', ' ').title()} message",
        f"{section.replace('-', ' ').title()} advice",
    ]

    for base in base_phrases:
        for mod in modifiers:
            topics.append(f"{base} {mod}".strip())

    # Deduplicate and ensure we can reach per_section
    uniq = list(dict.fromkeys(topics))
    if len(uniq) < per_section:
        # Expand with numbered variants to fill remaining slots
        fill_count = per_section - len(uniq)
        for i in range(fill_count):
            uniq.append(f"{section.replace('-', ' ').title()} insight #{i + 1}")
    return uniq[:per_section]


def filter_urls_for_section(urls: List[str], keywords: List[str]) -> List[str]:
    hits = []
    for url in urls:
        low = url.lower()
        if any(k.replace(" ", "-") in low or k in low for k in keywords):
            hits.append(url)
    return hits


def load_or_fetch_cache(cache_dir: str, url: str) -> Optional[Dict[str, List[str]]]:
    os.makedirs(cache_dir, exist_ok=True)
    key = sha1(url)
    path = os.path.join(cache_dir, f"{key}.json")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    html = fetch_url(url)
    if not html:
        return None
    facts = extract_facts(html)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(facts, f, ensure_ascii=False, indent=2)
    time.sleep(1.0)
    return facts


def build_source_pool() -> Dict[str, List[str]]:
    section_sources: Dict[str, List[str]] = {s[0]: [] for s in SECTIONS}
    domain_urls: Dict[str, List[str]] = {}

    for domain in WHITELIST_DOMAINS:
        urls = discover_sitemap_urls(domain)
        domain_urls[domain] = urls[:MAX_PAGES_PER_DOMAIN]

    for section, keywords in SECTIONS:
        pool: List[str] = []
        for domain, urls in domain_urls.items():
            matches = filter_urls_for_section(urls, keywords)
            pool.extend(matches)
        section_sources[section] = pool[:MAX_SOURCE_PAGES_PER_SECTION]

    return section_sources


def generate_posts(cache_dir: str, per_section: int) -> List[Dict[str, str]]:
    section_sources = build_source_pool()
    posts: List[Dict[str, str]] = []

    for section, _keywords in SECTIONS:
        topics = generate_topics(section, per_section)
        sources = section_sources.get(section, [])
        source_idx = 0

        for topic in topics[:per_section]:
            slug = slugify(topic)
            facts = {"title": [], "headings": [], "paragraphs": [], "bullets": []}
            source_url = ""
            if sources:
                source_url = sources[source_idx % len(sources)]
                source_idx += 1
                cached = load_or_fetch_cache(cache_dir, source_url)
                if cached:
                    facts = cached
            content = draft_from_facts(section, topic, facts)
            posts.append(
                {
                    "section": section,
                    "topic": topic,
                    "slug": slug,
                    "intent": "high",
                    "source_url": source_url,
                    "content": content,
                    "created_at": datetime.utcnow().isoformat() + "Z",
                }
            )

    return posts


def write_csv(path: str, posts: List[Dict[str, str]]) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f, fieldnames=["section", "topic", "slug", "intent", "source_url", "created_at"]
        )
        writer.writeheader()
        for post in posts:
            writer.writerow({k: post.get(k, "") for k in writer.fieldnames})


def write_json(path: str, posts: List[Dict[str, str]]) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", required=True, help="Output JSON path")
    parser.add_argument("--csv", default="", help="Optional CSV path")
    parser.add_argument("--cache", default="data/cache/scrape", help="Cache directory")
    parser.add_argument("--per-section", type=int, default=50, help="Posts per section")
    args = parser.parse_args()

    posts = generate_posts(args.cache, args.per_section)
    write_json(args.out, posts)
    if args.csv:
        write_csv(args.csv, posts)
    print(f"Wrote {len(posts)} posts to {args.out}")
    if args.csv:
        print(f"Wrote CSV summary to {args.csv}")


if __name__ == "__main__":
    main()
