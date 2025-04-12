"use client"

import React from "react"

import { useState, useEffect, Suspense, type ComponentType } from "react"

// Dynamic import with loading state
export function useDynamicImport<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  LoadingComponent: React.ReactNode = null,
) {
  const [Component, setComponent] = useState<T | null>(null)

  useEffect(() => {
    let mounted = true
    importFn().then((module) => {
      if (mounted) {
        setComponent(() => module.default)
      }
    })
    return () => {
      mounted = false
    }
  }, [importFn])

  if (!Component) {
    return LoadingComponent
  }

  return <Component />
}

// Lazy loading wrapper component
export function LazyLoad<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  LoadingComponent: React.ReactNode = null,
) {
  const LazyComponent = React.lazy(importFn)

  return (
    <Suspense fallback={LoadingComponent}>
      <LazyComponent />
    </Suspense>
  )
}

// Intersection observer hook for lazy loading
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = { threshold: 0.1 },
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [elementRef, options])

  return isIntersecting
}

// Debounce function to limit expensive calculations
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function for scroll events
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
