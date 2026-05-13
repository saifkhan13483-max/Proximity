const cloudinary = require('cloudinary').v2
const { Readable } = require('stream')

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

let isConfigured = false

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret })
  isConfigured = true
  console.log(`[cloudinary] Configured for cloud: ${cloudName}`)
} else {
  console.warn('[cloudinary] Credentials not configured. Upload endpoints will be unavailable.')
}

const ALLOWED_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg']
const MAX_FILE_SIZE_MB = 10
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

function validateUpload(file) {
  if (!file) return { valid: false, error: 'No file provided.' }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { valid: false, error: `File size must be under ${MAX_FILE_SIZE_MB}MB.` }
  }
  const ext = (file.originalname || '').split('.').pop()?.toLowerCase()
  if (!ext || !ALLOWED_FORMATS.includes(ext)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${ALLOWED_FORMATS.join(', ')}.`,
    }
  }
  return { valid: true }
}

async function uploadBuffer(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'proximity-credit-repair',
        allowed_formats: ALLOWED_FORMATS,
        max_bytes: MAX_FILE_SIZE_BYTES,
        transformation: options.transformation || [],
        use_filename: true,
        unique_filename: true,
        overwrite: false,
        ...options,
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    )
    const readable = new Readable()
    readable.push(buffer)
    readable.push(null)
    readable.pipe(uploadStream)
  })
}

async function deleteAsset(publicId) {
  if (!isConfigured) throw new Error('Cloudinary is not configured.')
  return cloudinary.uploader.destroy(publicId)
}

function getOptimizedUrl(publicId, options = {}) {
  return cloudinary.url(publicId, {
    fetch_format: 'auto',
    quality: 'auto',
    ...options,
  })
}

function getTransformedUrl(publicId, width, height, options = {}) {
  return cloudinary.url(publicId, {
    width,
    height,
    crop: 'fill',
    gravity: 'auto',
    fetch_format: 'auto',
    quality: 'auto',
    ...options,
  })
}

module.exports = {
  cloudinary,
  isConfigured,
  validateUpload,
  uploadBuffer,
  deleteAsset,
  getOptimizedUrl,
  getTransformedUrl,
  ALLOWED_FORMATS,
  MAX_FILE_SIZE_MB,
}
