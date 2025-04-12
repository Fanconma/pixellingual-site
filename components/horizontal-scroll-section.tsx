"use client"

import React, { useRef, useCallback } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { throttle } from "@/lib/performance"

interface HorizontalScrollSectionProps {
  title?: string
  description?: string
  viewAllHref?: string
  className?: string
  children: React.ReactNode
}

export default function HorizontalScrollSection({
  title,
  description,
  viewAllHref,
  className,
  children,
}: HorizontalScrollSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Throttle scroll function to improve performance
  const scroll = useCallback(
    throttle((direction: "left" | "right") => {
      if (!scrollContainerRef.current) return

      const container = scrollContainerRef.current
      const scrollAmount = container.clientWidth * 0.8

      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }, 300),
    [],
  )

  return (
    <div className={cn("relative", className)}>
      {title && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-pixel">{title}</h2>
            {viewAllHref && (
              <Button asChild variant="link" className="font-pixel">
                <Link href={viewAllHref}>View All</Link>
              </Button>
            )}
          </div>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="relative group">
        <Button
          variant="outline"
          size="icon"
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
          onClick={() => scroll("left")}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Scroll left</span>
        </Button>

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
          style={{ willChange: "transform" }} // Optimize for GPU acceleration
        >
          <div className="flex space-x-4" style={{ minWidth: "max-content" }}>
            {React.Children.map(children, (child, index) => (
              <div key={index} className="isolate">
                {child}
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
          onClick={() => scroll("right")}
        >
          <ArrowRight className="h-4 w-4" />
          <span className="sr-only">Scroll right</span>
        </Button>
      </div>
    </div>
  )
}
