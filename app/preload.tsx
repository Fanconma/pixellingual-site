"use client"

import { useEffect } from "react"

export default function Preload() {
  useEffect(() => {
    // Preload critical images
    const preloadImages = ["/logo.png", "/favicon.ico"]
    preloadImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })

    // Preconnect to external domains
    const domains = ["https://cdnjs.cloudflare.com"]
    domains.forEach((domain) => {
      const link = document.createElement("link")
      link.rel = "preconnect"
      link.href = domain
      document.head.appendChild(link)
    })

    // Prefetch important pages
    const pagesToPrefetch = ["/market"]
    pagesToPrefetch.forEach((page) => {
      const link = document.createElement("link")
      link.rel = "prefetch"
      link.href = page
      document.head.appendChild(link)
    })
  }, [])

  return null
}
