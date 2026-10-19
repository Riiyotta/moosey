Source: https://mosey.com/

# Content templates: asset manifest

Fonts, logos, header/footer art and the Bottom CTA Lottie (`/lottie/footer/cta.json`) plus `bg-tablet.png` are the same files as the homepage. See `/Users/riyaghosh/V3/mosey/ASSET_MANIFEST.md`.

| Template | Asset | Source format / natural size | Rendered (u: mobile / tablet / desktop) | Clone action |
|---|---|---|---|---|
| Blog post | Featured image (first body element) | JPG 640x427 (`/assets/<slug>-<hash>.jpg`) | 272x181.5 / 522x348.3 / 596x397.6 | PLACEHOLDER 640x427, 3:2, cover, radius 8u |
| Blog post, resource "More from the blog" | Author avatar | inline base64 JPEG 80x80 | 23 / 26 / 26 square | PLACEHOLDER 80x80, 1:1, cover, radius 6u |
| Resource leaf | Blog teaser thumbnail (x3) | JPG 640x427 | full-width 16:9 (<1025) / 128x128px (desktop) | PLACEHOLDER 640x427, cover, radius 8u |
| Author detail | Author photo | JPG 600x600 | 136 / 261 / 298 square | PLACEHOLDER 600x600, 1:1, cover, radius 8u |
| Guide landing | Hero cover illustration (one file, two `<img>`) | PNG 7192x3792 | 320x168.7 fill / 768x404.9 fill / 1080x569.4 cover (cropped by next section) | PLACEHOLDER 7192x3792, 1.897:1 |
| Guide landing | Benefits icons (x3) | data-URI SVG 172x104 | 172x104 / 163x99 / 236x143 | PLACEHOLDER line pictogram 172:104 (or REDRAW as simple strokes) |
| Guide landing | FeatureGroup images (x3, stacked) | PNG 848x528, 1061x895, 1061x895 | well 272x229 / 332x280 / 530x447 | PLACEHOLDER 1061x895, cover, radius 8u |
| Guide landing | Trusted-by logos | same as homepage marquee | same | reuse |
| All list pages | Arrow icon (btn-arrow) | inline SVG 16x14 | 16x14px | REDRAW (path in content.md §1) |
| Blog index | Pagination arrows | inline SVG 16x12 | 12x12 | REDRAW |
| Post, leaf | Inline CTA glow | inline SVG circle + radial gradient | 1024px square | REDRAW (content.md §2) |
| Guide form | Check bullet | inline SVG 17x17 | 17u | REDRAW (content.md §8.3) |
| FAQ | Chevron | as homepage | | reuse |

No video, no canvas, and no new fonts on these templates.
