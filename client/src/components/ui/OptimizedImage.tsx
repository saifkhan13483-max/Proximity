import { useState } from 'react'
import { cn } from '@lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  fallbackSrc?: string
}

export default function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  fallbackSrc,
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      if (fallbackSrc) {
        setImgSrc(fallbackSrc)
      }
    }
  }

  if (hasError && !fallbackSrc) {
    return (
      <div
        className={cn('bg-card-black flex items-center justify-center', className)}
        role="img"
        aria-label={alt}
        {...(width !== undefined ? { style: { width, height } } : {})}
      >
        <span className="text-muted-text text-xs font-body">{alt}</span>
      </div>
    )
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={handleError}
      {...(width !== undefined ? { width } : {})}
      {...(height !== undefined ? { height } : {})}
    />
  )
}
