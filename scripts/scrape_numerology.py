#!/usr/bin/env python3
"""
Scrape numerology content with BeautifulSoup and save raw text blocks for normalization.
Note: You must have permission to scrape these sources.
"""

import json
import os
import time
from typing import Dict, List

import requests
from bs4 import BeautifulSoup

USER_AGENT = "SpiritNumeralScraper/1.0 (+https://spiritnumeral.com)"

SOURCES: Dict[str, List[str]] = {
    "name_numbers": [
        "https://tokenrock.com/numerology/destiny-number/",
        "https://tokenrock.com/numerology/soul-urge-number/",
        "https://tokenrock.com/numerology/personality-number/",
        "https://tokenrock.com/numerology/expression-number/",
        "https://affinitynumerology.com/numerology-meanings/destiny-number/",
        "https://affinitynumerology.com/numerology-meanings/soul-urge-number/",
        "https://affinitynumerology.com/numerology-meanings/personality-number/",
        "https://www.worldnumerology.com/numerology-destiny-number/",
        "https://www.worldnumerology.com/numerology-soul-urge-number/",
        "https://www.worldnumerology.com/numerology-personality-number/",
    ],
    "timing_cycles": [
        "https://www.numerology.com/articles/your-numerology-chart/personal-year-number/",
        "https://www.numerology.com/articles/your-numerology-chart/personal-month-number/",
        "https://www.numerology.com/articles/your-numerology-chart/personal-day-number/",
        "https://numerologytoolbox.com/personal-year-numerology/",
        "https://numerologytoolbox.com/personal-month-numerology/",
        "https://numerologytoolbox.com/personal-day-numerology/",
        "https://www.seventhlifepath.com/personal-year-numerology/",
        "https://www.seventhlifepath.com/personal-month-numerology/",
    ],
    "lifecycle": [
        "https://affinitynumerology.com/numerology-meanings/pinnacle-number/",
        "https://affinitynumerology.com/numerology-meanings/challenge-number/",
        "https://www.worldnumerology.com/numerology-pinnacles/",
        "https://www.worldnumerology.com/numerology-challenges/",
        "https://www.numerology.com/articles/your-numerology-chart/maturity-number/",
        "https://tokenrock.com/numerology/maturity-number/",
        "https://affinitynumerology.com/numerology-meanings/birthday-number/",
        "https://numerologysecrets.net/birthday-number/",
        "https://affinitynumerology.com/master-numbers/",
        "https://www.worldnumerology.com/master-numbers/",
        "https://numerology.com/articles/about-numerology/name-numerology/",
        "https://tokenrock.com/numerology/name-number/",
    ],
}


def fetch(url: str) -> str:
    resp = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=30)
    resp.raise_for_status()
    return resp.text


def extract_blocks(html: str) -> Dict[str, List[str]]:
    soup = BeautifulSoup(html, "html.parser")
    # Remove scripts/styles
    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()

    title = soup.title.get_text(strip=True) if soup.title else ""
    h1 = soup.find("h1")
    h1_text = h1.get_text(strip=True) if h1 else ""

    headings = []
    for h in soup.find_all(["h2", "h3"]):
        text = h.get_text(" ", strip=True)
        if text:
            headings.append(text)

    paragraphs = []
    for p in soup.find_all("p"):
        text = p.get_text(" ", strip=True)
        if text and len(text) > 40:
            paragraphs.append(text)

    lists = []
    for ul in soup.find_all(["ul", "ol"]):
        items = [li.get_text(" ", strip=True) for li in ul.find_all("li")]
        items = [i for i in items if i]
        if items:
            lists.append(items)

    return {
        "title": title,
        "h1": h1_text,
        "headings": headings,
        "paragraphs": paragraphs,
        "lists": lists,
    }


def main():
    out_dir = os.path.join("data", "scraped")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "numerology_raw.json")

    results = []
    for category, urls in SOURCES.items():
        for url in urls:
            try:
                html = fetch(url)
                blocks = extract_blocks(html)
                results.append(
                    {
                        "category": category,
                        "url": url,
                        "title": blocks["title"],
                        "h1": blocks["h1"],
                        "headings": blocks["headings"],
                        "paragraphs": blocks["paragraphs"],
                        "lists": blocks["lists"],
                    }
                )
                time.sleep(1.0)
            except Exception as exc:
                results.append({"category": category, "url": url, "error": str(exc)})

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump({"sources": results}, f, ensure_ascii=False, indent=2)

    print(f"Saved {len(results)} source pages to {out_path}")


if __name__ == "__main__":
    main()
