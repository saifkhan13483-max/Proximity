import { useEffect } from 'react'
import { siteMetadata } from '@config/site'

interface SEOHeadProps {
  title: string
  description: string
  ogImage?: string
  canonicalPath?: string
  schemaMarkup?: Record<string, unknown>
  keywords?: string
}

function setOrUpdateMeta(selector: string, attribute: string, value: string): HTMLElement {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    if (selector.includes('property=')) {
      el.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '')
    } else if (selector.includes('name=')) {
      el.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '')
    } else if (selector.includes('rel=')) {
      el.setAttribute('rel', selector.match(/rel="([^"]+)"/)?.[1] || '')
    }
    document.head.appendChild(el)
  }
  el.setAttribute(attribute, value)
  return el
}

export default function SEOHead({
  title,
  description,
  ogImage = '/og-image.png',
  canonicalPath,
  schemaMarkup,
  keywords,
}: SEOHeadProps) {
  useEffect(() => {
    const siteUrl = siteMetadata.siteUrl
    const fullTitle = `${title} | Proximity Credit Repair`
    const canonicalUrl = `${siteUrl}${canonicalPath || ''}`
    const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`

    document.title = fullTitle

    const addMeta = (selector: string, attr: string, value: string) => {
      setOrUpdateMeta(selector, attr, value)
    }

    addMeta('meta[name="description"]', 'content', description)
    addMeta('meta[name="robots"]', 'content', 'index, follow')

    if (keywords) {
      addMeta('meta[name="keywords"]', 'content', keywords)
    }

    addMeta('meta[property="og:type"]', 'content', 'website')
    addMeta('meta[property="og:site_name"]', 'content', 'Proximity Credit Repair')
    addMeta('meta[property="og:title"]', 'content', fullTitle)
    addMeta('meta[property="og:description"]', 'content', description)
    addMeta('meta[property="og:image"]', 'content', absoluteOgImage)
    addMeta('meta[property="og:image:width"]', 'content', '1200')
    addMeta('meta[property="og:image:height"]', 'content', '630')
    addMeta('meta[property="og:url"]', 'content', canonicalUrl)

    addMeta('meta[name="twitter:card"]', 'content', 'summary_large_image')
    addMeta('meta[name="twitter:site"]', 'content', siteMetadata.twitterHandle)
    addMeta('meta[name="twitter:title"]', 'content', fullTitle)
    addMeta('meta[name="twitter:description"]', 'content', description)
    addMeta('meta[name="twitter:image"]', 'content', absoluteOgImage)

    addMeta('link[rel="canonical"]', 'href', canonicalUrl)

    let schemaEl: HTMLScriptElement | null = null
    if (schemaMarkup) {
      schemaEl = document.createElement('script')
      schemaEl.type = 'application/ld+json'
      schemaEl.text = JSON.stringify(schemaMarkup)
      document.head.appendChild(schemaEl)
    }

    return () => {
      if (schemaEl) document.head.removeChild(schemaEl)
    }
  }, [title, description, ogImage, canonicalPath, schemaMarkup, keywords])

  return null
}
