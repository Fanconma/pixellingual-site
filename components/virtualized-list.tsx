"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { throttle } from "@/lib/performance"

interface VirtualizedListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  itemHeight: number
  windowHeight: number
  overscan?: number
}

export default function VirtualizedList<T>({
  items,
  renderItem,
  itemHeight,
  windowHeight,
  overscan = 5,
}: VirtualizedListProps<T>) {
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateVisibleItems = useCallback(
    throttle(() => {
      if (!containerRef.current) return

      const scrollTop = containerRef.current.scrollTop
      const visibleStart = Math.floor(scrollTop / itemHeight)
      const visibleEnd = Math.min(items.length - 1, Math.floor((scrollTop + windowHeight) / itemHeight))

      setStartIndex(Math.max(0, visibleStart - overscan))
      setEndIndex(Math.min(items.length - 1, visibleEnd + overscan))
    }, 100),
    [items.length, itemHeight, windowHeight, overscan],
  )

  useEffect(() => {
    updateVisibleItems()
  }, [updateVisibleItems, items])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", updateVisibleItems)
      return () => container.removeEventListener("scroll", updateVisibleItems)
    }
  }, [updateVisibleItems])

  const visibleItems = items.slice(startIndex, endIndex + 1)
  const totalHeight = items.length * itemHeight
  const offsetY = startIndex * itemHeight

  return (
    <div ref={containerRef} style={{ height: windowHeight, overflow: "auto" }} className="virtualized-container">
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ position: "absolute", top: offsetY, width: "100%" }}>
          {visibleItems.map((item, index) => renderItem(item, startIndex + index))}
        </div>
      </div>
    </div>
  )
}
