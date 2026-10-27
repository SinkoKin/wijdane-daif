# Asset Credits & Licensing

All photography, release artwork, film stills, and video imagery remain the property of **Wijdane Daif** and the respective rights holders. They are included here to present the artist's official visual world. **Inclusion in this repository is not a licence for reuse in any other project.**

Before a public launch, confirm written permission for every image with the artist or her representatives, and keep the credit text visible where appropriate.

## Shipped images

Files live in `public/media/`. Each is a responsive WebP derivative; the original JPEG/PNG is retained in `assets-src/` where noted.

| Shipped file | Used in | Description | Provenance |
| --- | --- | --- | --- |
| `hero-desert-480.webp` `hero-desert-800.webp` `hero-desert-1272.webp` | Hero | Wijdane in a blue silk caftan and jewelled headpiece, seated in the desert at golden hour | Official press portrait, 2026. Downloaded from the artist's official promotional material; the original post URL was not retained. |
| `hero-portrait-480.webp` `hero-portrait-800.webp` `hero-portrait-993.webp` | Gallery — "The artist" | Wijdane in a red Moroccan football jersey against a blue sky | Official press portrait, 2026. Derived from `assets-src/wijdane-press-02.jpg`. |
| `about-portrait-480.webp` `about-portrait-800.webp` `about-portrait-960.webp` | About | Wijdane seated in a burgundy caftan with an ivory necklace and stacked textiles | Official press portrait, 2026. Derived from `assets-src/wijdane-press-01.jpg`. |
| `caftan-detail-720.webp` | About (detail) | Cropped detail of the burgundy caftan and embroidery | Crop of `about-portrait` / `assets-src/wijdane-press-01.jpg`. |
| `slow-motion-cover-480.webp` `slow-motion-cover-800.webp` `slow-motion-cover-1000.webp` | Music, gallery | *Slow Motion* single cover — white caftan, headpiece, brass lantern | Official release artwork via the [Apple Music single](https://music.apple.com/ma/album/slow-motion/6771788255). Derived from `assets-src/slow-motion-cover.jpg`. |
| `bomba-cover-480.webp` `bomba-cover-800.webp` `bomba-cover-1000.webp` | Music, gallery | *Bomba* single cover — pink jersey under neon light | Official release artwork via the [Apple Music single](https://music.apple.com/ma/album/bomba/6808808061). Derived from `assets-src/bomba-cover.jpg`. |
| `slow-motion-still-640.webp` `slow-motion-still-960.webp` `slow-motion-still-1280.webp` | Music backdrop, gallery, social card | Wijdane in a red caftan beside a camel in the desert | Still from the official *Slow Motion* video, [youtube.com/watch?v=xtVYlHp-MhM](https://www.youtube.com/watch?v=xtVYlHp-MhM). Derived from `assets-src/slowmotion-video-maxresdefault.jpg`, the official YouTube thumbnail. |
| `bomba-neon-583.webp` | Gallery | Wijdane in pink against pink and blue neon | Official *Bomba* promotional visual. Derived from `assets-src/bomba-press-01.jpg`. |
| `og.jpg` | Social sharing | 1200×630 social card: Wijdane beside a camel in the desert | Composed for this site from the official *Slow Motion* video still. |

Reference material that is **not** shipped in `dist/`:

- `assets-src/bomba-video-sddefault.jpg` — official *Bomba* YouTube thumbnail, retained as reference.
- `assets-src/bomba-press-02.jpg` — alternate *Bomba* promotional visual, retained as reference.
- `images/IMG_*.PNG` — working reference captures from the artist's public channels, not used by the site.

## Official source pages

- *Slow Motion* — [YouTube](https://www.youtube.com/watch?v=xtVYlHp-MhM) · [Apple Music](https://music.apple.com/ma/album/slow-motion/6771788255?i=6771788256)
- *Bomba* — [YouTube](https://www.youtube.com/watch?v=_imEdtAxKKg) · [Apple Music](https://music.apple.com/ma/album/bomba/6808808061?i=6808808062)
- Artist on Apple Music — [music.apple.com/ma/artist/wijdane-daif/1896328371](https://music.apple.com/ma/artist/wijdane-daif/1896328371)
- Instagram — [@wijdanedaif](https://www.instagram.com/wijdanedaif/)
- YouTube — [@Wijdanedaif](https://www.youtube.com/@Wijdanedaif)
- TikTok — [@wijdane.daif](https://www.tiktok.com/@wijdane.daif)
- X — [@wijdanedaif](https://x.com/wijdanedaif)

## Fonts, code, and marks

- **Instrument Serif**, **Inter Tight**, and **Aref Ruqaa** are served through Google Fonts and distributed under the [SIL Open Font License](https://openfontlicense.org/).
- **GSAP** and ScrollTrigger are used under the [GSAP standard licence](https://gsap.com/licensing/). **Lenis** is MIT licensed. **React** and **Vite** are MIT licensed.
- Interface icons and decorative star patterns are original SVG work created for this site.
- The circular Arabic seal, the `WDLogo` component, and `public/favicon.svg` are original artwork created for this project. They are not an official Wijdane Daif logo and should be replaced if an official mark is supplied.

## Pre-launch checklist

- [ ] Obtain written approval for the press portraits (hero, about, gallery) and keep the photographer credit if one is supplied.
- [ ] Confirm cover-art usage with the artist's label or distributor.
- [ ] Confirm use of the *Slow Motion* and *Bomba* video stills; both videos are embedded from YouTube, not hosted on this site.
- [ ] Replace the project seal/favicon if an official logo is available.
- [ ] Add the production canonical URL, `og:url`, and absolute social image URLs.
- [ ] Add Spotify (or any other platform) only after verifying an official artist URL.
