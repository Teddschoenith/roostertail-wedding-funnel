#!/usr/bin/env python3
"""
Categorize Roostertail Google reviews by event type.

Reads the Review Audit CSV, filters for 5-star reviews with substantive content,
and tags each one with matching event categories based on keywords in the review.
"""
import csv
import json
import re
import sys
from pathlib import Path

CSV_PATH = Path(__file__).parent / 'roostertail-reviews.csv'
OUTPUT_PATH = Path(__file__).parent / 'categorized-reviews.json'

# Keyword patterns per funnel type (case-insensitive)
CATEGORIES = {
    'corporate': [
        r'\bcorporate\b', r'\bcompany\b', r'\bbusiness\b',
        r'\bconference\b', r'\bgala\b', r'\bboard\b',
        r'\bexecutive\b', r'\bclient event\b', r'\bteam building\b',
        r'\bproduct launch\b', r'\bnetworking\b', r'\bannual\b',
        r'\bemployees\b', r'\bstaff\b', r'\bcoworker',
    ],
    'holiday': [
        r'\bchristmas\b', r'\bholiday\b', r'\bnew year\b', r'\bnye\b',
        r'\bfestive\b', r'\bseasonal\b', r'\bdecember\b',
    ],
    'prom': [
        r'\bprom\b', r'\bhigh school\b', r'\bgraduation\b',
        r'\bstudents\b', r'\bsenior\b', r'\bhomecoming\b',
        r'\bdance\b.*\bschool\b', r'\bschool\b.*\bdance\b',
    ],
    'birthday': [
        r'\bbirthday\b', r'\bsweet 16\b', r'\bsweet sixteen\b',
        r'\b(?:16th|18th|21st|30th|40th|50th|60th|70th|80th|90th)\s+(?:birthday|bday|b-day)',
        r'\bmilestone\b',
    ],
    'shower': [
        r'\bbridal shower\b', r'\bbaby shower\b', r'\bshower\b',
        r'\bengagement party\b', r'\bbridesmaid\b',
    ],
    'other': [
        r'\breunion\b', r'\bfundraiser\b', r'\bmemorial\b',
        r'\bretirement\b', r'\bquinceañera\b', r'\bquinceanera\b',
        r'\banniversary\b', r'\bfamily gathering\b',
    ],
    'wedding': [
        r'\bwedding\b', r'\breception\b', r'\bbride\b', r'\bgroom\b',
        r'\bceremony\b', r'\bnuptial\b', r'\b(?:our|my)\s+big day\b',
    ],
}

# Staff mention patterns (for highlighting reviews that name our team)
STAFF_NAMES = [
    'nicole', 'shawna', 'chantal', 'colleen', 'spicuzza',
    'eaton', 'peplinski', 'cavaletto'
]


def normalize_quote(text: str) -> str:
    """Clean up review text for use as a testimonial quote."""
    if not text:
        return ''
    # Collapse whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def truncate_quote(text: str, max_len: int = 280) -> str:
    """Truncate at sentence boundary if possible."""
    if len(text) <= max_len:
        return text
    # Find last sentence ending before max_len
    cutoff = text[:max_len]
    last_period = max(cutoff.rfind('. '), cutoff.rfind('! '), cutoff.rfind('? '))
    if last_period > max_len * 0.6:
        return cutoff[:last_period + 1].strip()
    return cutoff.rsplit(' ', 1)[0].strip() + '...'


def categorize(review_text: str) -> list[str]:
    """Return all matching category slugs for a review.

    Uses 'primary event' logic: a review is only tagged with a non-wedding
    category if it's clearly NOT a wedding review. Wedding keywords (bride,
    groom, ceremony, reception, etc.) are strong signals that override
    incidental mentions of other events.
    """
    text_lower = review_text.lower()

    # Check wedding match first and weight it heavily
    wedding_matches = sum(
        1 for p in CATEGORIES['wedding'] if re.search(p, text_lower)
    )
    is_primarily_wedding = wedding_matches >= 2 or (
        wedding_matches >= 1 and (
            'our wedding' in text_lower or
            'my wedding' in text_lower or
            'the wedding' in text_lower or
            'wedding reception' in text_lower or
            'wedding day' in text_lower
        )
    )

    matches = []
    for slug, patterns in CATEGORIES.items():
        if slug == 'wedding':
            if is_primarily_wedding:
                matches.append(slug)
            continue

        # For non-wedding categories, require that the review is NOT
        # primarily about a wedding
        if is_primarily_wedding:
            continue

        for pattern in patterns:
            if re.search(pattern, text_lower):
                matches.append(slug)
                break
    return matches


def mentions_staff(review_text: str) -> list[str]:
    """Return any Roostertail staff names mentioned."""
    text_lower = review_text.lower()
    return [name for name in STAFF_NAMES if name in text_lower]


def parse_csv():
    """Load and filter reviews."""
    reviews = []
    with CSV_PATH.open(newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                rating = int(row.get('Star rating', '0').strip())
            except ValueError:
                continue
            content = row.get('Review content', '').strip()
            author = row.get('Author name', '').strip()
            date = row.get('Review date', '').strip()

            # Filter: 5 stars, substantive content, author name present
            if rating != 5 or not content or len(content) < 80 or not author:
                continue

            categories = categorize(content)
            staff = mentions_staff(content)

            reviews.append({
                'date': date,
                'author': author,
                'rating': rating,
                'content_full': normalize_quote(content),
                'content_short': truncate_quote(normalize_quote(content), 220),
                'content_medium': truncate_quote(normalize_quote(content), 320),
                'categories': categories,
                'staff_mentioned': staff,
                'word_count': len(content.split()),
            })
    return reviews


def main():
    reviews = parse_csv()
    print(f'Parsed {len(reviews)} 5-star reviews with content')

    # Group by category
    by_category = {slug: [] for slug in CATEGORIES}
    uncategorized = []
    for r in reviews:
        if r['categories']:
            for slug in r['categories']:
                by_category[slug].append(r)
        else:
            uncategorized.append(r)

    # Summary
    print('\nReviews per category:')
    for slug, items in by_category.items():
        print(f'  {slug:>12}: {len(items)}')
    print(f'  {"uncategorized":>12}: {len(uncategorized)}')

    # Sort each category by quality (longer + staff mention = better)
    for slug in by_category:
        by_category[slug].sort(
            key=lambda r: (len(r['staff_mentioned']) * 50 + min(r['word_count'], 200)),
            reverse=True
        )

    # Write output
    output = {
        'generated_at': __import__('datetime').datetime.now().isoformat(),
        'total_reviews': len(reviews),
        'by_category': by_category,
        'uncategorized_sample': uncategorized[:10],
    }
    with OUTPUT_PATH.open('w') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print(f'\nWrote {OUTPUT_PATH}')

    # Print top 3 per category
    print('\n' + '=' * 70)
    print('TOP 3 PER CATEGORY (excluding wedding)')
    print('=' * 70)
    for slug in ['corporate', 'holiday', 'prom', 'birthday', 'shower', 'other']:
        items = by_category[slug]
        print(f'\n### {slug.upper()} ({len(items)} total)')
        for i, r in enumerate(items[:3], 1):
            print(f'\n{i}. {r["author"]} ({r["date"]}, {r["word_count"]}w)')
            if r['staff_mentioned']:
                print(f'   Mentions: {", ".join(r["staff_mentioned"])}')
            print(f'   "{r["content_short"]}"')


if __name__ == '__main__':
    main()
