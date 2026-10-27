export interface ImageAsset {
  base: string
  width: number
  height: number
  widths: number[]
  alt: string
  credit: string
}

const image = (
  base: string,
  width: number,
  height: number,
  widths: number[],
  alt: string,
  credit: string,
): ImageAsset => ({ base, width, height, widths, alt, credit })

export const IMAGES = {
  heroPortrait: image(
    'hero-portrait',
    993,
    1584,
    [480, 800, 993],
    'Wijdane Daif wearing a red Moroccan football jersey and traditional jewellery, photographed against a clear blue sky.',
    'Official press portrait, 2026',
  ),
  heroDesert: image(
    'hero-desert',
    1272,
    1700,
    [480, 800, 1272],
    'Wijdane Daif seated in the desert at golden hour, wearing a blue silk caftan with red embroidery and a traditional jewelled headpiece.',
    'Official press portrait, 2026',
  ),
  aboutPortrait: image(
    'about-portrait',
    960,
    1280,
    [480, 800, 960],
    'Wijdane Daif seated in a burgundy embroidered caftan and a large ivory necklace, surrounded by stacked Moroccan textiles.',
    'Official press portrait, 2026',
  ),
  slowMotionCover: image(
    'slow-motion-cover',
    1000,
    1000,
    [480, 800, 1000],
    'Slow Motion single cover: Wijdane Daif in a white caftan, wearing a traditional headpiece and holding a brass lantern.',
    'Official release artwork',
  ),
  bombaCover: image(
    'bomba-cover',
    1000,
    1000,
    [480, 800, 1000],
    'Bomba single cover: Wijdane Daif in a pink jersey against a neon-lit backdrop.',
    'Official release artwork',
  ),
  slowMotionStill: image(
    'slow-motion-still',
    1280,
    720,
    [640, 960, 1280],
    'Wijdane Daif in a red caftan beside a camel under a blue desert sky, a still from the Slow Motion music video.',
    'Still from the official Slow Motion music video',
  ),
  bombaNeon: image(
    'bomba-neon',
    583,
    530,
    [583],
    'Wijdane Daif in a pink dress against pink and blue neon light.',
    'Official Bomba visual',
  ),
  caftanDetail: image(
    'caftan-detail',
    720,
    900,
    [720],
    "Detail of the embroidery and traditional jewellery on Wijdane Daif's burgundy caftan.",
    'Official press portrait, detail',
  ),
} as const

export type ImageKey = keyof typeof IMAGES

export const imageSrc = (asset: ImageAsset, width?: number) => {
  const chosen = width ?? asset.widths[asset.widths.length - 1]
  return `/media/${asset.base}-${chosen}.webp`
}

export const imageSrcSet = (asset: ImageAsset) =>
  asset.widths.map((width) => `${imageSrc(asset, width)} ${width}w`).join(', ')

export const SITE = {
  name: 'Wijdane Daif',
  firstName: 'WIJDANE',
  lastName: 'DAIF',
  arabicName: 'وجدان ضايف',
  tagline: 'A voice between heritage and modernity.',
  role: 'Moroccan singer & songwriter',
  description:
    'The official world of Wijdane Daif — Moroccan singer and songwriter. Slow Motion, Bomba, and a visual language of heritage in motion.',
  instagram: 'https://www.instagram.com/wijdanedaif/',
  email: null as string | null,
  nav: [
    { label: 'The Artist', href: '#about' },
    { label: 'The Sound', href: '#music' },
    { label: 'Visuals', href: '#visuals' },
    { label: 'Roots', href: '#roots' },
    { label: 'Contact', href: '#contact' },
  ],
}

export const SOCIALS = [
  {
    label: 'Instagram',
    handle: '@wijdanedaif',
    href: 'https://www.instagram.com/wijdanedaif/',
    note: 'Primary',
  },
  {
    label: 'YouTube',
    handle: '@Wijdanedaif',
    href: 'https://www.youtube.com/@Wijdanedaif',
    note: 'Official films',
  },
  {
    label: 'TikTok',
    handle: '@wijdane.daif',
    href: 'https://www.tiktok.com/@wijdane.daif',
    note: 'Short form',
  },
  {
    label: 'X',
    handle: '@wijdanedaif',
    href: 'https://x.com/wijdanedaif',
    note: 'Updates',
  },
  {
    label: 'Apple Music',
    handle: 'Wijdane Daif',
    href: 'https://music.apple.com/ma/artist/wijdane-daif/1896328371',
    note: 'Listen',
  },
]

export interface Release {
  id: 'slow-motion' | 'bomba'
  index: string
  title: string
  year: string
  format: string
  description: string
  cover: ImageAsset
  backdrop: ImageAsset
  videoId: string
  youtubeUrl: string
  appleMusicUrl: string
  credits: { label: string; value: string }[]
}

export const RELEASES: Release[] = [
  {
    id: 'slow-motion',
    index: '01',
    title: 'Slow Motion',
    year: '2026',
    format: 'Debut single',
    description:
      'A slow-burning debut. Amazigh rebab and Haït al-Gharbawi rhythms meet pop melody, with a visual world of caftans, riads, and desert light.',
    cover: IMAGES.slowMotionCover,
    backdrop: IMAGES.slowMotionStill,
    videoId: 'xtVYlHp-MhM',
    youtubeUrl: 'https://www.youtube.com/watch?v=xtVYlHp-MhM',
    appleMusicUrl: 'https://music.apple.com/ma/album/slow-motion/6771788255?i=6771788256',
    credits: [
      { label: 'Written by', value: 'Anas Saoudi & Wijdane Daif' },
      { label: 'Arranged, mixed & mastered by', value: 'Karim Loukili' },
    ],
  },
  {
    id: 'bomba',
    index: '02',
    title: 'Bomba',
    year: '2026',
    format: 'Single',
    description:
      'A sharper, brighter turn. Pop energy, pink neon, and a confidence that fills the room. The video was directed by Hassan ElKourfti.',
    cover: IMAGES.bombaCover,
    backdrop: IMAGES.bombaNeon,
    videoId: '_imEdtAxKKg',
    youtubeUrl: 'https://www.youtube.com/watch?v=_imEdtAxKKg',
    appleMusicUrl: 'https://music.apple.com/ma/album/bomba/6808808061?i=6808808062',
    credits: [
      { label: 'Written by', value: 'Anas Saoudi & Wijdane Daif' },
      { label: 'Composed by', value: 'Anas Saoudi' },
      { label: 'Arranged by', value: 'Karim Loukili' },
      { label: 'Video directed by', value: 'Hassan ElKourfti' },
    ],
  },
]

export interface GalleryItem {
  id: string
  image: ImageAsset
  title: string
  meta: string
  credit: string
  size: 'wide' | 'square' | 'portrait'
  align: 'start' | 'center' | 'end'
}

export const GALLERY: GalleryItem[] = [
  {
    id: 'slow-motion-film',
    image: IMAGES.slowMotionStill,
    title: 'Slow Motion',
    meta: 'Official film still',
    credit: 'Official music video, 2026',
    size: 'wide',
    align: 'center',
  },
  {
    id: 'slow-motion-cover',
    image: IMAGES.slowMotionCover,
    title: 'Slow Motion',
    meta: 'Cover artwork',
    credit: 'Official release artwork, 2026',
    size: 'square',
    align: 'start',
  },
  {
    id: 'hero-portrait',
    image: IMAGES.heroPortrait,
    title: 'The artist',
    meta: 'Press portrait',
    credit: 'Official press image, 2026',
    size: 'portrait',
    align: 'end',
  },
  {
    id: 'bomba-neon',
    image: IMAGES.bombaNeon,
    title: 'Bomba',
    meta: 'Official visual',
    credit: 'Official Bomba visual, 2026',
    size: 'square',
    align: 'center',
  },
  {
    id: 'bomba-cover',
    image: IMAGES.bombaCover,
    title: 'Bomba',
    meta: 'Cover artwork',
    credit: 'Official release artwork, 2026',
    size: 'square',
    align: 'start',
  },
  {
    id: 'about-portrait',
    image: IMAGES.aboutPortrait,
    title: 'The artist',
    meta: 'Press portrait',
    credit: 'Official press image, 2026',
    size: 'portrait',
    align: 'end',
  },
]

export const HERITAGE = [
  {
    index: '01',
    title: 'Rebab',
    label: 'Sound',
    body: 'The Amazigh bowed instrument is threaded through Slow Motion — an old voice inside a new pop architecture.',
  },
  {
    index: '02',
    title: 'Haït al-Gharbawi',
    label: 'Rhythm',
    body: 'A Moroccan rhythm tradition, folded into a contemporary frame. The pulse stays; the context moves.',
  },
  {
    index: '03',
    title: 'Caftan & riad',
    label: 'Image',
    body: 'Hand-worked cloth, courtyard light, and the rooms that hold a family’s memory. The visual grammar of her films.',
  },
  {
    index: '04',
    title: 'Desert & tea',
    label: 'Ritual',
    body: 'The desert beyond the door, the tea poured for a guest: hospitality as image, and as a way of belonging.',
  },
]

export const MANIFESTO = {
  lines: ['Heritage is not', 'a backdrop.', 'It is the instrument.'],
  body: 'Rebab, Haït al-Gharbawi, caftan and courtyard light. A contemporary pop voice that remembers where it comes from.',
  marquee: [
    'Rebab',
    'Haït al-Gharbawi',
    'Caftan',
    'Desert light',
    'Courtyard',
    'Tea',
    'Family',
    'Morocco',
  ],
}

export const ABOUT = {
  title: ['A voice that carries', 'where it comes from.'],
  lead:
    'Wijdane Daif is a Moroccan singer and songwriter working where inherited sound meets the present tense.',
  paragraphs: [
    'She introduced her artistic world in 2026 with Slow Motion, a debut single that places the Amazigh rebab and Haït al-Gharbawi rhythms inside a slow-burning pop frame. Its accompanying film draws on caftans, courtyard light and desert landscape — a visual language built from home.',
    'Bomba followed later that year: brighter, sharper, and made for movement. Across both releases the idea holds. Moroccan heritage is not a costume or a backdrop, but a living material.',
  ],
  facts: [
    { label: 'Based', value: 'Morocco' },
    { label: 'Practice', value: 'Singer & songwriter' },
    { label: 'Debut', value: 'Slow Motion, 2026' },
    { label: 'Latest', value: 'Bomba, 2026' },
  ],
  quote:
    'Modernity doesn’t mean abandoning identity. It can be a new way of presenting it to the world.',
  quoteNote: 'Wijdane Daif — translated from Arabic.',
}

export const CONTACT_NOTE =
  'No public email, phone number or management agency is listed here because none has been verified. Instagram is the official channel for enquiries.'
