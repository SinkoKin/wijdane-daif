import { imageSrc, imageSrcSet, type ImageAsset } from '../data/site'

interface ArtImageProps {
  asset: ImageAsset
  sizes: string
  className?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  width?: number
  objectPosition?: string
  draggable?: boolean
}

export function ArtImage({
  asset,
  sizes,
  className,
  loading = 'lazy',
  fetchPriority = 'auto',
  width,
  objectPosition,
  draggable = false,
}: ArtImageProps) {
  const fallbackWidth = width ?? asset.widths[Math.min(1, asset.widths.length - 1)]

  return (
    <img
      src={imageSrc(asset, fallbackWidth)}
      srcSet={imageSrcSet(asset)}
      sizes={sizes}
      width={asset.width}
      height={asset.height}
      alt={asset.alt}
      className={className}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      style={objectPosition ? { objectPosition } : undefined}
      draggable={draggable}
    />
  )
}
