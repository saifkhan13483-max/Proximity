const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined

interface CloudinaryOptions {
  width?: number
  height?: number
  quality?: string
}

export function getImageUrl(publicId: string, options: CloudinaryOptions = {}): string {
  if (!cloudName) {
    console.warn('[cloudinary] VITE_CLOUDINARY_CLOUD_NAME is not set. Returning public ID as-is.')
    return publicId
  }

  const transforms: string[] = ['f_auto']

  if (options.quality) {
    transforms.push(`q_${options.quality}`)
  } else {
    transforms.push('q_auto')
  }

  if (options.width) {
    transforms.push(`w_${options.width}`)
  }

  if (options.height) {
    transforms.push(`h_${options.height}`)
  }

  const transformStr = transforms.join(',')
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformStr}/${publicId}`
}
